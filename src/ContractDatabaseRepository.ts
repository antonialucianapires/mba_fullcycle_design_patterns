import ContractRepository from "./ContractRepository";
import pgp from "pg-promise";

export default class ContractDatabaseRepository implements ContractRepository{
    async list(): Promise<any> {
        const connection = pgp()("postgresql://admin:admin123@localhost:5432/app");
        const contracts = await connection.query("SELECT * FROM branas.contract");
        for (const contract of contracts) {
            contract.payments = await connection.query("SELECT * FROM branas.payment WHERE id_contract = $1", [contract.id_contract]);
    
        }
        await connection.$pool.end();
        return contracts;
    }
   
}