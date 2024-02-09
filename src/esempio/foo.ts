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
