export interface Transaction {
    transactionId: number;
    amount: number;
    reason?: string;
    date?: Date;
    idCategory: number;
    senderCVU: string;
    recipientCVU: string;
  }
  