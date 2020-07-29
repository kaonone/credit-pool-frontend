import { Observable } from 'rxjs';

import { getSdk } from 'generated/gql/subgraphRequests';

export type SubgraphSdk = MakeSubgraphSdk<ReturnType<typeof getSdk>>;

type MakeSubgraphSdk<T extends Record<string, (...args: any[]) => Promise<any>>> = {
  [key in keyof T]: PromiseToObservable<T[key]>;
};

type PromiseToObservable<F extends (...args: any[]) => Promise<any>> = (
  ...args: Parameters<F>
) => Observable<UnboxPromise<ReturnType<F>>>;

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer R> ? R : never;
