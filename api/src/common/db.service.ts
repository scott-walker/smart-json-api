import { Injectable, OnModuleDestroy, OnModuleInit } from "@nestjs/common"
import { PrismaClient } from "@prisma/client"
import { ConfigService } from "@nestjs/config"
import { DbConfig } from "@types"
import { DB_CONFIG_KEY } from "@config"

/**
 * Сервис для работы с БД
 */
@Injectable()
export class DbService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
  /**
   * Конфигурация БД
   */
  private readonly config: DbConfig

  /**
   * Инициализировать сервис
   * @param configService - Сервис конфигурации
   */
  constructor(configService: ConfigService) {
    const config = configService.get<DbConfig>(DB_CONFIG_KEY)!

    super({
      datasources: { db: { url: config.connectionUrl } },
      log: config.logLevel,
    })
    this.config = config
  }

  async onModuleInit() {
    await this.$connect()
  }

  async onModuleDestroy() {
    await this.$disconnect()
  }
}
