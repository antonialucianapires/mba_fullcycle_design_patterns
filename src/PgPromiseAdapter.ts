import DatabaseConnection from "./DatabaseConnection";
import pgp from "pg-promise";

export default class PgPromiseAdapter implements DatabaseConnection {

    connection: any;

    constructor() {
        this.connection = pgp()("postgresql://admin:admin123@localhost:5432/app");
    }

    query(statement: string, params: any): Promise<any> {
        return this.connection.query(statement, params);
    }
    close(): Promise<void> {
        return this.connection.$pool.end();
    }

}