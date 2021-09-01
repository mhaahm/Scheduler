import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNbRetryColumn1630047733510 implements MigrationInterface {
  name = 'AddNbRetryColumn1630047733510';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` ADD \`nbRetry\` int NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` ADD \`collectorId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` ADD CONSTRAINT \`FK_6e795f8775c2b2ad3e5579ddbf3\` FOREIGN KEY (\`collectorId\`) REFERENCES \`scheduler\`.\`collector\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` DROP FOREIGN KEY \`FK_6e795f8775c2b2ad3e5579ddbf3\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` DROP COLUMN \`collectorId\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` DROP COLUMN \`nbRetry\``,
    );
  }
}
