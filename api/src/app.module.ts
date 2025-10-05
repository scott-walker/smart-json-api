import { Module } from "@nestjs/common"
import { APP_GUARD } from "@nestjs/core"
import { ConfigModule } from "@nestjs/config"
import { AppController } from "./app.controller"
import { AppService } from "./app.service"
import { AiService } from "./ai.service"
import { AuthGuard } from "./guards/auth.guard"
import { config } from "@config"

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: config,
    }),
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
