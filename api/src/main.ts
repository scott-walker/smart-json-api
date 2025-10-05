import { NestFactory } from "@nestjs/core"
import { AppModule } from "./app.module"
import { CorsConfig, ServerConfig } from "@types"
import { CORS_CONFIG_KEY, SERVER_CONFIG_KEY } from "@config"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  const corsSettings = app.get<CorsConfig>(CORS_CONFIG_KEY)
  const serverSettings = app.get<ServerConfig>(SERVER_CONFIG_KEY)

  app.enableCors(corsSettings)

  await app.listen(serverSettings.port)
}

bootstrap().catch((error) => {
  console.error(error)

  process.exit(1)
})
