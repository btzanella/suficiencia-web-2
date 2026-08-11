import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  login(username: string, password: string) {
    if (username !== 'admin' || password !== 'admin123') {
      throw new UnauthorizedException('Login incorreto, tente novamente');
    }

    const payload = { username };
    return {
      access_token: this.jwtService.sign(payload), // Gera o token de acesso
    };
  }
}
