/*
  Warnings:

  - You are about to drop the column `oportunidades_canal_id` on the `relacion_oport_homol` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `oportunidades` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE `relacion_oport_homol` DROP FOREIGN KEY `relacion_oport_homol_oportunidades_id_oportunidades_canal_i_fkey`;

-- DropIndex
DROP INDEX `relacion_oport_homol_oportunidades_id_oportunidades_canal_id_idx` ON `relacion_oport_homol`;

-- AlterTable
ALTER TABLE `relacion_oport_homol` DROP COLUMN `oportunidades_canal_id`;

-- CreateIndex
CREATE UNIQUE INDEX `oportunidades_id_key` ON `oportunidades`(`id`);

-- CreateIndex
CREATE INDEX `relacion_oport_homol_oportunidades_id_idx` ON `relacion_oport_homol`(`oportunidades_id`);

-- AddForeignKey
ALTER TABLE `relacion_oport_homol` ADD CONSTRAINT `relacion_oport_homol_oportunidades_id_fkey` FOREIGN KEY (`oportunidades_id`) REFERENCES `oportunidades`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION;
