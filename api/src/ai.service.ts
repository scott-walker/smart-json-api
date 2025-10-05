import { Groq } from "groq-sdk"
import { ChatCompletion } from "groq-sdk/resources/chat/completions"

import { Injectable, Logger, ServiceUnavailableException } from "@nestjs/common"
import { ConfigService } from "@nestjs/config"
import { AiConfig } from "@types"
import { AI_CONFIG_KEY } from "@config"

/**
 * Схема для создания запроса JSON
 */
export interface CompletionSchema {
  [key: string]: string
}

/**
 * Параметры для создания запроса
 */
export interface CreateCompletionParams {
  query: string
  limit: number
  schema: CompletionSchema
}

/**
 * Распарсенный ответ в формате JSON
 */
export type ParsedResponse<T> = T | null

/**
 * Параметры для создания запроса
 */
export interface CreateCompletionResponse<T> {
  data: ParsedResponse<T>
}

@Injectable()
export class AiService {
  private client: Groq
  private logger = new Logger(AiService.name)

  /**
   * Правила для запроса
   */
  private rules: string[] = [
    "- Return only valid JSON",
    "- Return only {limit} items",
    "- Use the following schema: {schema}",
    "- Write in Russian",
    "- All fields are required",
    "- Do not use markdown",
    "- Do not ask questions",
  ]

  /**
   * Инициализировать сервис
   * @param configService - Сервис конфигурации
   */
  constructor(private readonly configService: ConfigService) {
    this.initClient()
  }

  /**
   * Инициализировать AI клиент
   */
  private initClient() {
    this.client = new Groq({
      apiKey: this.configService.get<AiConfig>(AI_CONFIG_KEY)!.apiKey,
    })
  }

  /**
   * Парсинг ответа
   * @param response - Ответ в формате JSON
   */
  private parseResponse<T>(response: ChatCompletion): ParsedResponse<T> {
    try {
      const json = response.choices[0]?.message?.content || "null"

      return JSON.parse(json) as T
    } catch (error) {
      this.logger.error(`Ошибка при парсинге ответа: ${error}`)
      this.logger.error(`Ответ: ${JSON.stringify(response, null, 2)}`)

      return null
    }
  }

  /**
   * Сформировать правила для запроса
   * @param schema - Схема
   */
  private makeRules(schema: string, limit: number): string {
    return this.rules.join("\n").replace("{schema}", schema).replace("{limit}", limit.toString())
  }

  /**
   * Создать запрос
   * @param params - Параметры запроса
   */
  async createCompletion<T>(params: CreateCompletionParams): Promise<CreateCompletionResponse<T>> {
    this.logger.log(`Запрос к AI: ${params.query}`)
    this.logger.log(`Схема: ${JSON.stringify(params.schema, null, 2)}`)

    try {
      const { model } = this.configService.get<AiConfig>(AI_CONFIG_KEY)!
      const schema = JSON.stringify(params.schema)
      const completion = await this.client.chat.completions.create({
        model,
        messages: [
          { role: "system", content: this.makeRules(schema, params.limit || 10) },
          { role: "user", content: params.query },
        ],
      })

      this.logger.log(`Ответ от AI: ${JSON.stringify(completion, null, 2)}`)

      return {
        data: this.parseResponse<T>(completion),
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : "Unknown error"

      this.logger.error(`Ошибка при создании запроса к AI: ${message}`)

      throw new ServiceUnavailableException(message)
    }
  }
}
