const myHeaders = new Headers();
myHeaders.append("Content-Type", "application/json");

export const transact = async (payload: {
  walletId: string;
  amount: number;
  description: string;
}) => {
  const raw = JSON.stringify({
    amount: payload.amount,
    description: payload.description,
  });

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/wallet/transact/${payload.walletId}`,
    requestOptions
  );

  return response.json();
};

export const creatWalletApi = async (payload: {
  name: string;
  balance: number;
}) => {
  const raw = JSON.stringify(payload);

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
  };

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/wallet/setup`,
    requestOptions
  );

  return response.json();
};

export const getTransactions = async (payload: {
  walletId: string;
  skip: number;
  limit: number;
}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/wallet/transactions?walletId=${payload.walletId}&skip=${payload.skip}&limit=${payload.limit}`,
    { method: "GET" }
  );

  return response.json();
};

export const getWalletDetails = async (walletId: string) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/wallet/${walletId}`,
    { method: "GET" }
  );

  return response.json();
};
