import { registerAs } from "@nestjs/config"
import { AiConfig } from "@types"

/**
 * Ключ конфигурации AI
 */
export const AI_CONFIG_KEY = "ai"

/**
 * Конфигурация AI
 */
export const aiConfig = registerAs(
  AI_CONFIG_KEY,
  (): AiConfig => ({
    model: "openai/gpt-oss-20b",
    apiKey: process.env.AI_API_KEY!,
  }),
)
