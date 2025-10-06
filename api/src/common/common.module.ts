import { Module } from "@nestjs/common"
import { DbService } from "./db.service"
import { AiService } from "./ai.service"

@Module({
  providers: [AiService, DbService],
  exports: [AiService, DbService],
})
export class CommonModule {}
