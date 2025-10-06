import { registerAs } from "@nestjs/config"
import { DbConfig } from "@types"

/**
 * Ключ конфигурации DB
 */
export const DB_CONFIG_KEY = "db"

/**
 * Конфигурация DB
 */
export const dbConfig = registerAs(
  DB_CONFIG_KEY,
  (): DbConfig => ({
    connectionUrl: process.env.DB_CONNECTION!,
    logLevel: ["query", "error", "warn"],
  }),
)
