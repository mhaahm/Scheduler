import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCollectorTable1629364055235 implements MigrationInterface {
    name = 'AddCollectorTable1629364055235'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`scheduler\`.\`collector\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`script\` text NOT NULL, \`description\` text NOT NULL, \`category\` int NOT NULL, \`colParams\` json NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`scheduler\`.\`collector\``);
    }

}
