/*
  Warnings:

  - You are about to drop the column `usename` on the `usuarios` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[username]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `username` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `usuarios_usename_key` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `usename`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_username_key` ON `usuarios`(`username`);
