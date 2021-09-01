import { MigrationInterface, QueryRunner } from 'typeorm';

export class addIndexColumnToCollector1629586981562
  implements MigrationInterface
{
  name = 'addIndexColumnToCollector1629586981562';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` ADD UNIQUE INDEX \`IDX_eacb329ec121c2322ed3c8ad91\` (\`title\`)`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` CHANGE \`creation_date\` \`creation_date\` datetime NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` CHANGE \`creation_date\` \`creation_date\` datetime NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` DROP INDEX \`IDX_eacb329ec121c2322ed3c8ad91\``,
    );
  }
}
