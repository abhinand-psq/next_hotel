-- DropIndex
DROP INDEX "user_id_key";

-- AlterTable
ALTER TABLE "user" ADD CONSTRAINT "user_pkey" PRIMARY KEY ("id");
