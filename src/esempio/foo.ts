export const newOrder = (customerInfo: {
  codiceFiscale: string;
  nome: string;
  cognome: string;
  email: string;
}): {
  orderId: number;
  customer: {
    codiceFiscale: string;
    nome: string;
    cognome: string;
    email: string;
  };
} => {
  const orderId = Math.floor(Math.random() * 1000) + 1;

  const order = {
    orderId: orderId,
    customer: {
      codiceFiscale: customerInfo.codiceFiscale,
      nome: customerInfo.nome,
      cognome: customerInfo.cognome,
      email: customerInfo.email,
    },
  };

  return order;
};

export const addGiftcard = (
  order: {
    orderId: number;
    customer: {
      codiceFiscale: string;
      nome: string;
      cognome: string;
      email: string;
    };
    giftcards: {
      tipologia: "digitale" | "cartacea";
      taglio: 10 | 20 | 50 | 100;
      quantità: number;
    }[];
  },
  giftcard: {
    tipologia: string;
    taglio: number;
    quantità: number;
  }
): {
  orderId: number;
  customer: {
    codiceFiscale: string;
    nome: string;
    cognome: string;
    email: string;
  };
  giftcards: {
    tipologia: "digitale" | "cartacea";
    taglio: 10 | 20 | 50 | 100;
    quantità: number;
  }[];
} => {
  if (
    (giftcard.tipologia !== "digitale" && giftcard.tipologia !== "cartacea") ||
    ![10, 20, 50, 100].includes(giftcard.taglio)
  ) {
    throw new Error("Tipologia o taglio della giftcard non validi");
  }

  if (!order.giftcards) {
    order.giftcards = [];
  }

  order.giftcards.push({
    tipologia: giftcard.tipologia as "digitale" | "cartacea",
    taglio: giftcard.taglio as 10 | 20 | 50 | 100,
    quantità: giftcard.quantità,
  });

  return order;
};
