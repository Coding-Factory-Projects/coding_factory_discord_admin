import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { compareSync, hashSync } from 'bcrypt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';



@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(userDto: CreateUserDto) {
    const user = await this.usersService.findByEmail(userDto.email)
    if (user) {
      throw new ConflictException("User already exists")
    }

    const password = hashSync(userDto.password, 10)

    const createdUser = this.usersService.create({
      ...userDto,
      password
    })
    return createdUser
  }

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);

    if (!compareSync(pass, user?.password)) {
      throw new UnauthorizedException();
    }

    const payload = { email: user.email, sub: user.id };

    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
