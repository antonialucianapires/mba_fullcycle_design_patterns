import ContractDatabaseRepository from "../src/ContractDatabaseRepository";
import ContractRepository from "../src/ContractRepository";
import CsvPresenter from "../src/CSVPresenter";
import DatabaseConnection from "../src/DatabaseConnection";
import GenerateInvoices from "../src/GenerateInvoices";
import PgPromiseAdapter from "../src/PgPromiseAdapter";

let generateInvoices: GenerateInvoices;
let connection: DatabaseConnection;
let contractRepository: ContractRepository;

beforeEach(() => {
    connection = new PgPromiseAdapter();
	contractRepository = new ContractDatabaseRepository(connection);
	generateInvoices = new GenerateInvoices(contractRepository);
})

test("Deve gerar as notas fiscais por regime de caixa", async function () {
    const input = {
        month: 1,
        year: 2022,
        type: "cash"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2022-01-05");
    expect(output.at(0)?.amount).toBe(6000);
});

test("Deve gerar as notas fiscais por regime de competência", async function () {
    const input = {
        month: 1,
        year: 2022,
        type: "accrual"
    }
    const output = await generateInvoices.execute(input);
    expect(output.at(0)?.date).toBe("2022-01-01");
    expect(output.at(0)?.amount).toBe(500);
});

test("Deve gerar as notas fiscais por regime de competência por csv", async function () {
	const input = {
		month: 1,
		year: 2022,
		type: "accrual",
		format: "csv"
	};
	const presenter = new CsvPresenter();
	const generateInvoices = new GenerateInvoices(contractRepository, presenter);
	const output = await generateInvoices.execute(input);
	expect(output).toBe("2022-01-01;500");
});
