import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateTables1636667300262 implements MigrationInterface {
    name = 'CreateTables1636667300262'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab\` DROP FOREIGN KEY \`FK_0279d8e1f64e507c4a5752f23c2\``);
        await queryRunner.query(`CREATE TABLE \`scheduler\`.\`crontab_collections_collection\` (\`crontabId\` int NOT NULL, \`collectionId\` int NOT NULL, INDEX \`IDX_7cafae00785f1773a613878b79\` (\`crontabId\`), INDEX \`IDX_6e2350be8e1ebaf92431ebd334\` (\`collectionId\`), PRIMARY KEY (\`crontabId\`, \`collectionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab\` DROP COLUMN \`collectionsId\``);
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab_collections_collection\` ADD CONSTRAINT \`FK_7cafae00785f1773a613878b799\` FOREIGN KEY (\`crontabId\`) REFERENCES \`scheduler\`.\`crontab\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab_collections_collection\` ADD CONSTRAINT \`FK_6e2350be8e1ebaf92431ebd334d\` FOREIGN KEY (\`collectionId\`) REFERENCES \`scheduler\`.\`collection\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab_collections_collection\` DROP FOREIGN KEY \`FK_6e2350be8e1ebaf92431ebd334d\``);
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab_collections_collection\` DROP FOREIGN KEY \`FK_7cafae00785f1773a613878b799\``);
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab\` ADD \`collectionsId\` int NULL`);
        await queryRunner.query(`DROP INDEX \`IDX_6e2350be8e1ebaf92431ebd334\` ON \`scheduler\`.\`crontab_collections_collection\``);
        await queryRunner.query(`DROP INDEX \`IDX_7cafae00785f1773a613878b79\` ON \`scheduler\`.\`crontab_collections_collection\``);
        await queryRunner.query(`DROP TABLE \`scheduler\`.\`crontab_collections_collection\``);
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`crontab\` ADD CONSTRAINT \`FK_0279d8e1f64e507c4a5752f23c2\` FOREIGN KEY (\`collectionsId\`) REFERENCES \`scheduler\`.\`collection\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
