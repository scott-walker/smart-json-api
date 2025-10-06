import { WinstonModule } from "nest-winston"
import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AiService } from "./common/ai.service"
import { AuthGuard } from "./guards/auth.guard"
import { config, loggerConfig } from "@config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
    WinstonModule.forRoot(loggerConfig),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AiService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
