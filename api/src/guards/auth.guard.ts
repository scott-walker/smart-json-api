import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { ServerConfig } from "@types"
// import { SERVER_CONFIG_KEY } from "@config"
import { Request } from "express"

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  /**
   * Проверяет, имеет ли запрос допустимый API ключ
   * @param context - Контекст выполнения
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>()
    const apiKeyFromHeader = this.extractTokenFromHeader(request)
    const serverSettings = this.configService.get<ServerConfig>("server")

    if (!apiKeyFromHeader) {
      throw new UnauthorizedException("API ключ отсутствует")
    }
    if (apiKeyFromHeader !== serverSettings?.apiToken) {
      throw new UnauthorizedException("Неверный API ключ")
    }

    return true
  }

  /**
   * Извлекает токен из заголовка авторизации
   * @param request - Запрос
   */
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []

    return type === "Bearer" ? token : undefined
  }
}
