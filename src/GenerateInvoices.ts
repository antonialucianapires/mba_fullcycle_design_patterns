import moment from "moment";
import pgp from "pg-promise";

export default class GenerateInvoices {
    async execute(input: Input): Promise<Output[]> {
        const connection = pgp()("postgresql://admin:admin123@localhost:5432/app");
        const contracts = await connection.query("SELECT * FROM branas.contract");
        const output: Output[] = [];
        for (const contract of contracts) {
            const payments = await connection.query("SELECT * FROM branas.payment WHERE id_contract = $1", [contract.id_contract]);
            for (const payment of payments) {
                if (payment.date.getMonth() + 1 !== input.month || payment.date.getFullYear() !== input.year) {
                    continue;
                }
                output.push({
                    date: moment(payment.date).format("YYYY-MM-DD"),
                    amount: parseFloat(payment.amount)
                });
            }
        }
        await connection.$pool.end();
        return output;
    }
}

type Input = {
    month: number;
    year: number;
}

type Output = {
    date: string;
    amount: number;
}