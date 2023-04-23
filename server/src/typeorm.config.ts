import {DataSource} from "typeorm";

const AppDataSource: DataSource = new DataSource(
    {
        type: "postgres",
        host: "database",
        port: 5432,
        username: "postgres",
        password: "root",
        database: "users",
        entities: ["../src/entity/*.ts"],
        migrations: ["../src/migration/*.ts"],
        synchronize: false,
    }
);
export default AppDataSource;