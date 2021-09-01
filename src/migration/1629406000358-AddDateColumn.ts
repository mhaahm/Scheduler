import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddDateColumn1629406000358 implements MigrationInterface {
  name = 'AddDateColumn1629406000358';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` ADD \`creation_date\` datetime NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` DROP COLUMN \`creation_date\``,
    );
  }
}
