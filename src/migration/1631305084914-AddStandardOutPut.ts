import {MigrationInterface, QueryRunner} from "typeorm";

export class AddStandardOutPut1631305084914 implements MigrationInterface {
    name = 'AddStandardOutPut1631305084914'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`collector\` ADD \`isStandardOutData\` tinyint NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`scheduler\`.\`collector\` DROP COLUMN \`isStandardOutData\``);
    }

}
