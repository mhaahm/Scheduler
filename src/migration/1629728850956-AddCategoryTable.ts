import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddCategoryTable1629728850956 implements MigrationInterface {
  name = 'AddCategoryTable1629728850956';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` CHANGE \`category\` \`categoryId\` int NOT NULL`,
    );
    await queryRunner.query(
      `CREATE TABLE \`scheduler\`.\`category\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_23c05c292c439d77b0de816b50\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` CHANGE \`categoryId\` \`categoryId\` int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` ADD CONSTRAINT \`FK_687524d58d853196e2cce34fa0f\` FOREIGN KEY (\`categoryId\`) REFERENCES \`scheduler\`.\`category\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` DROP FOREIGN KEY \`FK_687524d58d853196e2cce34fa0f\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` CHANGE \`categoryId\` \`categoryId\` int NOT NULL`,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_23c05c292c439d77b0de816b50\` ON \`scheduler\`.\`category\``,
    );
    await queryRunner.query(`DROP TABLE \`scheduler\`.\`category\``);
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collector\` CHANGE \`categoryId\` \`category\` int NOT NULL`,
    );
  }
}
