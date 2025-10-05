import { registerAs } from "@nestjs/config"
import { CorsConfig } from "@types"

/**
 * Ключ конфигурации CORS
 */
export const CORS_CONFIG_KEY = "cors"

/**
 * Конфигурация CORS
 */
export const corsConfig = registerAs(
  CORS_CONFIG_KEY,
  (): CorsConfig => ({
    origin: [process.env.CORS_ORIGIN!],
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],

    // Разрешенные заголовки
    // Укажите заголовки, которые фронтенд может отправлять
    allowedHeaders: ["Content-Type", "Authorization"],

    // Разрешение на отправку cookies и заголовков авторизации
    // Крайне важно для аутентификации
    credentials: true,
  }),
)
