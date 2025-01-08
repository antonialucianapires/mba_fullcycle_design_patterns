import pgp from "pg-promise";

export default class GenerateInvoices {
    async execute() {
        const connection = pgp()("postgresql://admin:admin123@localhost:5432/app");
        const contracts = await connection.query("SELECT * FROM branas.contract");
        console.log(contracts);
        return [];
    }
}