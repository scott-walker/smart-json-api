"use client"

// import Image from "next/image"
import { useEffect, useState } from "react"
import { apiClient } from "@shared/api"

export default function Home() {
  const [response, setResponse] = useState<Record<string, unknown> | null>(null)

  useEffect(() => {
    apiClient.get<Record<string, unknown>>("").json().then(setResponse)
  }, [])

  return (
    <div>
      <pre>{JSON.stringify(response, null, 2)}</pre>
    </div>
  )
}
