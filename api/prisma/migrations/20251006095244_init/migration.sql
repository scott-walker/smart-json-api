-- CreateTable
CREATE TABLE "Endpoint" (
    "id" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "params" JSONB NOT NULL,
    "schema" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Endpoint_pkey" PRIMARY KEY ("id")
);
