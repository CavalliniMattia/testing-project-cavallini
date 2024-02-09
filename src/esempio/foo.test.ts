import { newOrder } from "./foo";
import { addGiftcard } from "./foo";
import { getAmount } from "./foo";

describe("Test in classe", () => {
  // Sezione test newOrder
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

  // Sezione test addGiftcard
  test("Test per aggiungere una carta regalo all'ordine", () => {
    const order = {
      orderId: 123,
      customer: {
        codiceFiscale: "RSSMRA85T10A562S",
        nome: "Mario",
        cognome: "Rossi",
        email: "mario@example.com",
      },
      giftcards: [],
    };

    const giftcard = {
      tipologia: "digitale",
      taglio: 20,
      quantità: 1,
    };

    const updatedOrder = addGiftcard(order, giftcard);

    expect(updatedOrder.giftcards).toHaveLength(1);
    expect(updatedOrder.giftcards[0]).toEqual(giftcard);
  });

  test("Test per aggiungere una carta regalo digitale all'ordine", () => {
    const order = {
      orderId: 123,
      customer: {
        codiceFiscale: "RSSMRA85T10A562S",
        nome: "Mario",
        cognome: "Rossi",
        email: "mario@example.com",
      },
      giftcards: [],
    };

    const giftcard = {
      tipologia: "digitale" as const,
      taglio: 20 as const,
      quantità: 1,
    };

    const updatedOrder = addGiftcard(order, giftcard);

    expect(updatedOrder.giftcards).toHaveLength(1);
    expect(updatedOrder.giftcards[0]).toEqual(giftcard);
  });
  test("Test per aggiungere una carta regalo digitale all'ordine che già contiene altre carte regalo", () => {
    const order = {
      orderId: 123,
      customer: {
        codiceFiscale: "RSSMRA85T10A562S",
        nome: "Mario",
        cognome: "Rossi",
        email: "mario@example.com",
      },
      giftcards: [
        {
          tipologia: "cartacea" as const,
          taglio: 10 as const,
          quantità: 2,
        },
      ],
    };

    const giftcard = {
      tipologia: "digitale" as const,
      taglio: 20 as const,
      quantità: 1,
    };

    const updatedOrder = addGiftcard(order, giftcard);

    expect(updatedOrder.giftcards).toHaveLength(2);
    expect(updatedOrder.giftcards[1]).toEqual(giftcard);
  });
  test("Test per aggiungere una carta regalo digitale all'ordine che già contiene altre carte regalo", () => {
    const order = {
      orderId: 123,
      customer: {
        codiceFiscale: "RSSMRA85T10A562S",
        nome: "Mario",
        cognome: "Rossi",
        email: "mario@example.com",
      },
      giftcards: [
        {
          tipologia: "cartacea" as const,
          taglio: 10 as const,
          quantità: 2,
        },
      ],
    };

    const giftcard = {
      tipologia: "digitale" as const,
      taglio: 20 as const,
      quantità: 1,
    };

    const updatedOrder = addGiftcard(order, giftcard);

    expect(updatedOrder.giftcards).toHaveLength(2);
    expect(updatedOrder.giftcards[1]).toEqual(giftcard);
  });

  test("Test per restituire i totali corretti per un array vuoto di giftcard", () => {
    const totals = getAmount([]);
    expect(totals.importoTotale).toBe(0);
    expect(totals.iva).toBe(0);
    expect(totals.totaleDaPagare).toBe(0);
  });

  test("Test per restituire i totali corretti per un array di giftcard con valori specifici", () => {
    const giftcards = [
      { taglio: 20, quantità: 2 },
      { taglio: 50, quantità: 1 },
    ];
    const totals = getAmount(giftcards);
    // Importo totale 40 + 50 = 90
    expect(totals.importoTotale).toBe(90);
    // IVA 22% dell'importo totale 90 * 0.22 = 19.80
    expect(totals.iva).toBe(19.8);
    // Importo totale + IVA 90 + 19.80 = 109.80
    expect(totals.totaleDaPagare).toBe(109.8);
  });
});
