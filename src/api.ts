import express from 'express';
import ContractDatabaseRepository from './ContractDatabaseRepository';
import GenerateInvoices from './GenerateInvoices';
import PgPromiseAdapter from './PgPromiseAdapter';
const app = express();
app.use(express.json());

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new GenerateInvoices(contractRepository);

app.post('/generate_invoices', async (req, res) => {
    const input = req.body;
    const output = await generateInvoices.execute(input);
    res.json(output);
});

app.listen(3000);