-- CreateTable
CREATE TABLE "urls" (
    "id" TEXT NOT NULL,
    "short_url" TEXT NOT NULL,
    "long_url" TEXT NOT NULL,

    CONSTRAINT "urls_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "urls_short_url_key" ON "urls"("short_url");

-- CreateIndex
CREATE UNIQUE INDEX "urls_long_url_key" ON "urls"("long_url");

-- CreateIndex
CREATE INDEX "urls_short_url_idx" ON "urls"("short_url");
