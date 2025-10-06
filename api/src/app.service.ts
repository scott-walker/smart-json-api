import { Injectable } from "@nestjs/common"
import { AiService } from "./common/ai.service"

/**
 * Параметры запроса к AI
 */
interface SendRequestParams {
  limit: number
  query: string
}

/**
 * Сервис для работы с AI
 */
@Injectable()
export class AppService {
  /**
   * Инициализировать
   * @param aiService - Сервис для работы с AI
   */
  constructor(private readonly aiService: AiService) {}

  /**
   * Отправить запрос к AI
   * @param params - Параметры запроса
   * @returns Данные ответа
   */
  async sendRequest(params: SendRequestParams): Promise<{ data: Record<string, unknown>[] }> {
    const response = await this.aiService.createCompletion({
      query: params.query,
      limit: params.limit,
      schema: {
        title: "string - название проекта",
        description: "string - описание проекта",
        cases: "string[] - интересные которые решал разработчик (5 штук)",
        stack: "string[] - стек технологий",
      },
    })

    return {
      data: response.data as Record<string, unknown>[],
    }
  }
}
