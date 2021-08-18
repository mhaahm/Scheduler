import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateCollector1629232975075 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // create table query
        const sql = "CREATE TABLE `collector` (\n" +
            "\t`id` INT(11) NOT NULL AUTO_INCREMENT,\n" +
            "\t`title` VARCHAR(255) NULL DEFAULT NULL,\n" +
            "\t`script` TEXT NULL DEFAULT NULL,\n" +
            "\t`description` TEXT NULL DEFAULT NULL,\n" +
            "\t`category` INT(11) NULL DEFAULT NULL,\n" +
            "\t`optional` TINYINT(4) NULL DEFAULT NULL,\n" +
            "\t`ColParams` JSON NULL DEFAULT NULL," +
            "PRIMARY KEY (`id`)\n" +
            ")\n" +
            "COLLATE='latin1_swedish_ci'\n" +
            ";\n";
        await queryRunner.query(sql);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("collector");
    }

}
