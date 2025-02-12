import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { DbService } from 'src/db/db.service';
import { UploadService } from 'src/lib/upload/upload.service';
import { CreateUserDto, SignInDto } from './auth.dto';
import { $Enums, User } from '@prisma/client';
import { LibService } from 'src/lib/lib.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly db: DbService,
        private readonly jwt: JwtService,
        private readonly config: ConfigService,
        private readonly upload: UploadService,
        private readonly lib: LibService
    ) { }

    private async createUser(data: {
        name: string,
        email: string,
        password: string,
    }) {
        return this.db.user.create({
            data,

        })
    }

    private async isExist(email: string) {
        const user = await this.db.user.findUnique({
            where: {
                email
            },
            include: {
                img: true
            }
        })

        if (!user) throw new HttpException(`User with email ${email} does not exist`, HttpStatus.NOT_FOUND)

        return user
    }

    public async isMatched(password: string, hashedPassword: string): Promise<boolean> {
        const matched = await this.lib.comparePassword({
            hashedPassword,
            password
        })
        if (matched) return true
        throw new HttpException('Wrong Password', HttpStatus.UNAUTHORIZED)
    }

    public async signUp({
        img,
        userData
    }: {
        userData: CreateUserDto,
        img: Express.Multer.File
    }): Promise<{
        user: {
            id: string;
            name: string;
            email: string;
            role: $Enums.UserRole;
            img: {
                fileUrl: string;
            } | null;
        } | null,
        token: string,
        success: boolean,
        message: string
    }> {
        if (userData.role === $Enums.UserRole.ADMIN) {
            throw new HttpException("Creating admin user is restricted", HttpStatus.METHOD_NOT_ALLOWED)
        }
        const user = await this.db.user.create({
            data: {
                name: userData.name,
                email: userData.email,
                password: await this.lib.hashPassword({ password: userData.password }),
                role: userData.role
            }
        })
        await this.upload.uploadFile({
            file: img,
            userId: user.id
        })
        return {
            user: await this.db.user.findUnique({
                where: {
                    id: user.id
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true,
                    img: {
                        select: {
                            fileUrl: true
                        }
                    }
                },
            }),
            token: await this.jwt.signAsync({ id: user.id, role: user.role }, {
                secret: this.config.getOrThrow('JWT_SECRET'),
                expiresIn: '24h'
            }),
            success: true,
            message: "User created successfully"
        }
    }

    public async signIn({
        email,
        password
    }: SignInDto) {
        const user = await this.isExist(email)
        const matched = await this.isMatched(password, user.password)

        if (user && matched) return {
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                img: user.img ? {
                    fileUrl: user.img.fileUrl
                } : null
            },
            token: await this.jwt.signAsync({ id: user.id, role: user.role }, {
                secret: this.config.getOrThrow('JWT_SECRET'),
                expiresIn: '24h'
            }),
            success: true,
            message: "User signed in successfully"
        }
    }

}
