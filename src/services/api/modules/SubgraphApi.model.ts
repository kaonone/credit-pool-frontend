import { Observable } from 'rxjs';

import { getSdk } from 'generated/gql/subgraphRequests';

export type SubgraphApi = MakeSubgraphApi<ReturnType<typeof getSdk>>;

type MakeSubgraphApi<T extends Record<string, (...args: any[]) => Promise<any>>> = {
  [key in keyof T]: PromiseToObservable<T[key]>;
};

type PromiseToObservable<F extends (...args: any[]) => Promise<any>> = (
  ...args: Parameters<F>
) => Observable<UnboxPromise<ReturnType<F>>>;

type UnboxPromise<T extends Promise<any>> = T extends Promise<infer R> ? R : never;
