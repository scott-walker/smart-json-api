import { corsConfig, CORS_CONFIG_KEY } from "./cors.config"
import { serverConfig, SERVER_CONFIG_KEY } from "./server.config"

export { CORS_CONFIG_KEY, SERVER_CONFIG_KEY }
export const config = [corsConfig, serverConfig]
