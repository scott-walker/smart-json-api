import { registerAs } from "@nestjs/config"
import { ServerConfig } from "@types"

/**
 * Ключ конфигурации сервера
 */
export const SERVER_CONFIG_KEY = "server"

/**
 * Конфигурация сервера
 */
export const serverConfig = registerAs(
  SERVER_CONFIG_KEY,
  (): ServerConfig => ({
    apiToken: process.env.API_TOKEN ?? "",
    port: parseInt(process.env.PORT ?? "3000"),
  }),
)
