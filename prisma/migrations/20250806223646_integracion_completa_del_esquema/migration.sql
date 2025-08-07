/*
  Warnings:

  - You are about to drop the column `createdAt` on the `usuarios` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `usuarios` table. All the data in the column will be lost.
  - You are about to alter the column `nombre` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `correo` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `rol` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - You are about to alter the column `area` on the `usuarios` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `VarChar(45)`.
  - A unique constraint covering the columns `[usename]` on the table `usuarios` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `usename` to the `usuarios` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX `usuarios_username_key` ON `usuarios`;

-- AlterTable
ALTER TABLE `usuarios` DROP COLUMN `createdAt`,
    DROP COLUMN `username`,
    ADD COLUMN `usename` VARCHAR(191) NOT NULL,
    MODIFY `password` VARCHAR(255) NOT NULL,
    MODIFY `nombre` VARCHAR(45) NULL,
    MODIFY `correo` VARCHAR(45) NULL,
    MODIFY `rol` VARCHAR(45) NULL,
    MODIFY `area` VARCHAR(45) NULL;

-- CreateTable
CREATE TABLE `homologaciones` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombreHomol` VARCHAR(45) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `eventos` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `detalle` VARCHAR(45) NULL,
    `id_homol` INTEGER NOT NULL,

    INDEX `eventos_id_homol_idx`(`id_homol`),
    PRIMARY KEY (`id`, `id_homol`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `oportunidades` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(255) NOT NULL,
    `pais` VARCHAR(45) NOT NULL,
    `id_canal` INTEGER NOT NULL,

    INDEX `oportunidades_id_canal_idx`(`id_canal`),
    PRIMARY KEY (`id`, `id_canal`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `relacion_oport_homol` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `oportunidades_id` INTEGER NOT NULL,
    `oportunidades_canal_id` INTEGER NOT NULL,
    `homologaciones_id` INTEGER NOT NULL,

    INDEX `relacion_oport_homol_oportunidades_id_oportunidades_canal_id_idx`(`oportunidades_id`, `oportunidades_canal_id`),
    INDEX `relacion_oport_homol_homologaciones_id_idx`(`homologaciones_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateIndex
CREATE UNIQUE INDEX `usuarios_usename_key` ON `usuarios`(`usename`);

-- AddForeignKey
ALTER TABLE `eventos` ADD CONSTRAINT `eventos_id_homol_fkey` FOREIGN KEY (`id_homol`) REFERENCES `homologaciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `oportunidades` ADD CONSTRAINT `oportunidades_id_canal_fkey` FOREIGN KEY (`id_canal`) REFERENCES `canales`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacion_oport_homol` ADD CONSTRAINT `relacion_oport_homol_oportunidades_id_oportunidades_canal_i_fkey` FOREIGN KEY (`oportunidades_id`, `oportunidades_canal_id`) REFERENCES `oportunidades`(`id`, `id_canal`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `relacion_oport_homol` ADD CONSTRAINT `relacion_oport_homol_homologaciones_id_fkey` FOREIGN KEY (`homologaciones_id`) REFERENCES `homologaciones`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
