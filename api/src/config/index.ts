import { corsConfig, CORS_CONFIG_KEY } from "./cors.config"
import { serverConfig, SERVER_CONFIG_KEY } from "./server.config"
import { aiConfig, AI_CONFIG_KEY } from "./ai.config"

export { loggerConfig } from "./logger.config"

export { CORS_CONFIG_KEY, SERVER_CONFIG_KEY, AI_CONFIG_KEY }
export const config = [corsConfig, serverConfig, aiConfig]
