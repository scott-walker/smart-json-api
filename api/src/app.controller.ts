import { Controller, Get, Post, Body } from "@nestjs/common"
import { AppService } from "./app.service"

interface TestBody {
  limit: number
  query: string
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): { version: string; data: Record<string, unknown>[] } {
    return { version: "1.0.0", data: [] }
  }

  @Post("test")
  async getTest(@Body() body: TestBody): Promise<{ data: unknown }> {
    const { data } = await this.appService.sendRequest(body)

    return { data }
  }
}
