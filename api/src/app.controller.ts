import { Controller, Get, Query } from "@nestjs/common"
import { AppService } from "./app.service"

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getIndex(): { version: string; data: Record<string, unknown>[] } {
    return { version: "1.0.0", data: [] }
  }

  @Get("test")
  async getTest(@Query("limit") limit: number = 10): Promise<{ data: unknown }> {
    const { data } = await this.appService.getTest(limit)

    return { data }
  }
}
