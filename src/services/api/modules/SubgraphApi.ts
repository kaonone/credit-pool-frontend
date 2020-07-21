import { ReplaySubject } from 'rxjs';
import ApolloClient from 'apollo-client';
import gql from 'graphql-tag';

import { getSdk } from 'generated/gql/subgraphRequests';

import { SubgraphApi } from './SubgraphApi.model';

export function makeSubgraphApi(apolloClient: ApolloClient<any>): SubgraphApi {
  return getSdk({
    request: (query: string, variables?: any) => {
      const subject = new ReplaySubject();
      if (query.startsWith('subscription')) {
        const observable = apolloClient.subscribe({ query: gql(query), variables });
        observable.subscribe(
          (value: any) => subject.next(value?.data),
          (value: any) => subject.error(value),
          () => subject.complete(),
        );
      } else {
        const promise = apolloClient.query({ query: gql(query), variables });
        promise
          .then((value: any) => {
            subject.next(value?.data);
            subject.complete();
          })
          .catch((value: any) => subject.error(value));
      }
      return subject;
    },
  } as any) as any;
}
