import { CorsOptions } from "@nestjs/common/interfaces/external/cors-options.interface"

/**
 * Конфигурация сервера
 */
export interface ServerConfig {
  /**
   * API ключ
   */
  apiToken: string

  /**
   * Порт сервера
   */
  port: number
}

/**
 * Конфигурация CORS
 */
export interface CorsConfig extends CorsOptions {
  /**
   * Разрешенные домены
   */
  origin: string[]
}
