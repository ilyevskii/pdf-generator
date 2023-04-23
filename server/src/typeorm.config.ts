import {DataSource} from "typeorm";

const AppDataSource: DataSource = new DataSource(
    {
        type: "postgres",
        host: "database",
        port: 5432,
        username: "postgres",
        password: "root",
        database: "users_db",
        entities: ["../src/entities/*.ts"],
        migrations: ["../src/migrations/*.ts"],
        synchronize: false,
    }
);
export default AppDataSource;