-- CreateTable
CREATE TABLE "category" (
    "id" SERIAL NOT NULL,
    "mainname" TEXT NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" SERIAL NOT NULL,
    "prname" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "prize" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "category_mainname_key" ON "category"("mainname");

-- CreateIndex
CREATE UNIQUE INDEX "Product_prname_key" ON "Product"("prname");

-- AddForeignKey
ALTER TABLE "Product" ADD CONSTRAINT "Product_slug_fkey" FOREIGN KEY ("slug") REFERENCES "category"("mainname") ON DELETE RESTRICT ON UPDATE CASCADE;
