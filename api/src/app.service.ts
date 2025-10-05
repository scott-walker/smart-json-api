import { Injectable } from "@nestjs/common"
import { AiService } from "./ai.service"

@Injectable()
export class AppService {
  constructor(private readonly aiService: AiService) {}

  async getTest(limit: number): Promise<{ data: Record<string, unknown>[] }> {
    const response = await this.aiService.createCompletion({
      query:
        "Нужны кейсы для публикации в потфолио fullstack разработчика (react/nextjs + nestjs + сопутствующий стек)",
      limit,
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
