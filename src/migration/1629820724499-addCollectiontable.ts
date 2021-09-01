import { MigrationInterface, QueryRunner } from 'typeorm';

export class addCollectiontable1629820724499 implements MigrationInterface {
  name = 'addCollectiontable1629820724499';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`scheduler\`.\`transfert_mod\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`config\` json NOT NULL, UNIQUE INDEX \`IDX_8930021e2d58c778421249ec72\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `CREATE TABLE \`scheduler\`.\`collection\` (\`id\` int NOT NULL AUTO_INCREMENT, \`title\` varchar(255) NOT NULL, \`params\` json NOT NULL, \`transfertModeId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`,
    );
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` ADD CONSTRAINT \`FK_ee0907f3f1fd902f5bff9e88e63\` FOREIGN KEY (\`transfertModeId\`) REFERENCES \`scheduler\`.\`transfert_mod\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`scheduler\`.\`collection\` DROP FOREIGN KEY \`FK_ee0907f3f1fd902f5bff9e88e63\``,
    );
    await queryRunner.query(`DROP TABLE \`scheduler\`.\`collection\``);
    await queryRunner.query(
      `DROP INDEX \`IDX_8930021e2d58c778421249ec72\` ON \`scheduler\`.\`transfert_mod\``,
    );
    await queryRunner.query(`DROP TABLE \`scheduler\`.\`transfert_mod\``);
  }
}
