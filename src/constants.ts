export enum LogInComponentType {
  "LOG_IN",
  "SIGN_UP",
}

export interface conversations {
  name: string;
  email: string;
  id: string;
  conversationId: string;
}

export const storageKey = {
  walletID: "WalletID",
};
