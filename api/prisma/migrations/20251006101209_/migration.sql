/*
  Warnings:

  - A unique constraint covering the columns `[url]` on the table `Endpoint` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Endpoint_url_key" ON "Endpoint"("url");
