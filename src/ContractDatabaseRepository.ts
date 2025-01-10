import Contract from "./Contract";
import ContractRepository from "./ContractRepository";
import DatabaseConnection from "./DatabaseConnection";
import Payment from "./Payment";

export default class ContractDatabaseRepository implements ContractRepository {

    constructor(readonly connection: DatabaseConnection) {}

    async list(): Promise<Contract[]> {
        const contracts: Contract[] = [];
        const contracstData = await this.connection.query("SELECT * FROM branas.contract", []);
        for (const contractData of contracstData) {
            const contract = new Contract(contractData.id_contract, contractData.description, contractData.amount, contractData.periods, contractData.date);
            const paymentsDate = await this.connection.query("SELECT * FROM branas.payment WHERE id_contract = $1", [contract.idContract]);
            for (const paymentData of paymentsDate) {
                contract.payments.push(new Payment(paymentData.id_payment, paymentData.date, parseFloat(paymentData.amount)));
            }
            contracts.push(contract);
        }
        return contracts;
    }

}