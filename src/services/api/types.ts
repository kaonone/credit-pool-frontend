export interface ISubmittedTransaction {
  type: 'someTransactionName';
  payload: any;
  tx: string;
  promise: Promise<void>;
}
