
import {MysqlConnectionOptions} from "typeorm/driver/mysql/MysqlConnectionOptions";
const config: MysqlConnectionOptions = {
    "type": "mysql",
    "host": "localhost",
    "port": 3306,
    "username": "root",
    "password": "root",
    "database": "scheduler",
    "entities": ["dist/src/**/*.entity{.ts,.js}"],
    "synchronize": false,
    "migrationsTableName": "custom_migration_table",
    "migrations": ["dist/src/migration/*{.ts,.js}"],
    "cli": {
        "migrationsDir": "src/migration",
         "entitiesDir": "src/entity"
    }
};

export default config;