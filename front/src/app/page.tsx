"use client"

// import Image from "next/image"
import { useState } from "react"
import { apiClient } from "@shared/api"
import { Textarea } from "@shared/ui/Textarea"
import { Input } from "@shared/ui/Input"
import { Button } from "@shared/ui/Button"
import { Card } from "@shared/ui/Card"
import { Tag } from "@shared/ui/Tag"

interface DataSchema {
  title: string
  description: string
  cases: string[]
  stack: string[]
}

interface ResponseSchema {
  data: DataSchema[]
}

export default function Home() {
  const [items, setItems] = useState<DataSchema[]>([])
  const [query, setQuery] = useState<string>("")
  const [limit, setLimit] = useState<string>("10")
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsLoading(true)

    const data = {
      limit: parseInt(limit),
      query,
    }
    const response = await apiClient.post<ResponseSchema>("test", { json: data }).json()

    setItems(response.data || [])
    setIsLoading(false)
  }

  //Нужны кейсы для публикации в портфолио fullstack разработчика (react/nextjs + nestjs + сопутствующий стек)

  return (
    <div className="flex gap-6">
      <div className="flex flex-col gap-6 w-1/3">
        <Card title="API builder">
          <form className="flex flex-col items-center gap-4" onSubmit={onSubmit}>
            <Textarea name="query" value={query} onChange={setQuery} />
            <Input name="limit" value={limit} onChange={setLimit} />
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Generating..." : "Generate"}
            </Button>
          </form>
        </Card>
        {/* <Card title="Response">
          <pre className="overflow-x-auto">{JSON.stringify(items, null, 2)}</pre>
        </Card> */}
      </div>

      <div className="flex flex-col gap-4 w-2/3">
        {!items.length ? <h2 className="p-2 text-3xl font-display">No items</h2> : ""}

        {items.map((item) => (
          <Card key={item.title}>
            <h2 className=" mb-4 text-2xl font-display font-bold">{item.title}</h2>
            <div className="mb-4">{item.description}</div>
            <div>
              <ul className="flex gap-2 flex-wrap list-disc pl-8 pb-8">
                {item.cases.map((caseItem) => (
                  <li key={caseItem}>{caseItem}</li>
                ))}
              </ul>
              <ul className="flex gap-3 flex-wrap">
                {item.stack.map((stackItem) => (
                  <li key={stackItem}>
                    <Tag>{stackItem}</Tag>
                  </li>
                ))}
              </ul>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
