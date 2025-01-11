import express from 'express';
import ContractDatabaseRepository from './ContractDatabaseRepository';
import GenerateInvoices from './GenerateInvoices';
import PgPromiseAdapter from './PgPromiseAdapter';
import LogDecorator from './LogDecorator';
const app = express();
app.use(express.json());

const connection = new PgPromiseAdapter();
const contractRepository = new ContractDatabaseRepository(connection);
const generateInvoices = new LogDecorator(new GenerateInvoices(contractRepository));

app.post('/generate_invoices', async (req, res) => {
    const input = req.body;
    input.userAgent = req.headers['user-agent'];
    input.host = req.headers.host;
    const output = await generateInvoices.execute(input);
    res.json(output);
});

app.listen(3000);