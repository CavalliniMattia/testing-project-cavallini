import { newOrder } from "./foo";
describe("Test in classe", () => {
  test("Test generazione orderId", () => {
    const customerInfo = {
      codiceFiscale: "RSSMRA85T10A562S",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario@example.com",
    };

    const order = newOrder(customerInfo);

    expect(order).toHaveProperty("orderId");
  });

  test("Test correttezza informazioni cliente", () => {
    const customerInfo = {
      codiceFiscale: "RSSMRA85T10A562S",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario@example.com",
    };

    const order = newOrder(customerInfo);

    expect(order.customer).toEqual(customerInfo);
  });

  test("Test definizione campi cliente", () => {
    const customerInfo = {
      codiceFiscale: "RSSMRA85T10A562S",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario@example.com",
    };

    const order = newOrder(customerInfo);

    expect(order.customer).toHaveProperty("codiceFiscale");
    expect(order.customer).toHaveProperty("nome");
    expect(order.customer).toHaveProperty("cognome");
    expect(order.customer).toHaveProperty("email");
  });

  test("Test lunghezza codice fiscale", () => {
    const customerInfo = {
      codiceFiscale: "RSSMRA85T10A562S",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario@example.com",
    };

    const order = newOrder(customerInfo);

    expect(order.customer.codiceFiscale.length).toBe(16);
  });

  test("Test formato codice fiscale", () => {
    const customerInfo = {
      codiceFiscale: "RSSMRA85T10A562S",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario@example.com",
    };

    const order = newOrder(customerInfo);

    expect(order.customer.codiceFiscale).toMatch(/^[a-zA-Z0-9]+$/);
  });

  test("Test validità nome e cognome", () => {
    const customerInfo = {
      codiceFiscale: "RSSMRA85T10A562S",
      nome: "Mario",
      cognome: "Rossi",
      email: "mario@example.com",
    };

    const order = newOrder(customerInfo);

    expect(order.customer.nome).toMatch(/^[a-zA-Z]+$/);
    expect(order.customer.cognome).toMatch(/^[a-zA-Z]+$/);
  });
});
