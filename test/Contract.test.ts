import Contract from "../src/Contract"

test("Deve gerar faturas de um contrato", () => {
    const contract = new Contract("1", "Contrato de teste", 6000, 12, new Date("2022-01-01T10:00:00"));
    const invoices = contract.generateInvoices(1, 2022, "accrual"); 
    expect(invoices.at(0)?.date).toEqual(new Date("2022-01-01T13:00:00Z"));
    expect(invoices.at(0)?.amount).toBe(500);
});