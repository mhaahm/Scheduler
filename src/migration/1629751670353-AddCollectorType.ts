import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCollectorType1629751670353 implements MigrationInterface {
  name = 'AddCollectorType1629751670353';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` ADD \`collectorType\` int NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` DROP COLUMN \`collectorType\``,
    );
  }
}
