import ky from "ky"

/**
 * Конфигурация API клиента
 */
interface ApiClientConfig {
  baseUrl: string
}

/**
 * Создаём базовый инстанс API клиента
 */
export const createApiClient = (config: ApiClientConfig) => {
  const client = ky.create({
    prefixUrl: config.baseUrl,
    // headers: {
    //   Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`,
    // },
    timeout: 5000,
    retry: 2,
  })

  return client
}

/**
 * Базовый инстанс API клиента
 */
export const apiClient = createApiClient({
  baseUrl: process.env.NEXT_PUBLIC_API_URL!,
})
