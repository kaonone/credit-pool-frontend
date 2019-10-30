import { Observable, from, merge, empty } from 'rxjs';
import { skipUntil, mergeMap, throttleTime } from 'rxjs/operators';
import { EventEmitter } from 'web3/types';
import Contract from 'web3/eth/contract';
import { BlockType } from 'web3/eth/types';

import { fromWeb3Event } from 'utils/rxjs';

interface ISubscribeEventOptions {
  filter?: object;
  fromBlock?: BlockType;
  topics?: string[];
}

export type EventsForReload =
  | 'none'
  | 'all'
  | Partial<Record<string, ISubscribeEventOptions | Array<ISubscribeEventOptions>>>;

interface IOptions<IV, RV> {
  eventsForReload?: EventsForReload;
  reloadTrigger$?: Observable<any>;
  args?: Array<string | number>;
  convert?(value: IV): RV;
}

function identity(value: any) {
  return value;
}

export function getContractData$<IV, RV>(
  contract: Contract,
  method: string,
  options: IOptions<IV, RV> = {},
): Observable<RV> {
  const { eventsForReload = 'none', reloadTrigger$ = empty(), args = [], convert = identity } = options;

  const load = async () => {
    const data = await contract.methods[method](...args).call();
    return convert(data);
  };

  const emitters = [eventsForReload === 'all' ? contract.events.allEvents() : null]
    .concat(
      typeof eventsForReload === 'string'
        ? []
        : Object.entries(eventsForReload)
            .filter((value): value is [string, ISubscribeEventOptions] => !!value[1])
            .reduce<Array<readonly [string, ISubscribeEventOptions]>>(
              (acc, [name, filterOptions]) => [
                ...acc,
                ...(Array.isArray(filterOptions)
                  ? filterOptions.map(item => [name, item] as const)
                  : [[name, filterOptions] as const]),
              ],
              [],
            )
            .map(([event, filterOptions]) => contract.events[event](filterOptions)),
    )
    .filter((value): value is EventEmitter => Boolean(value));

  const first$ = from(load());
  const fromEvents$ = merge(...emitters.map(emitter => fromWeb3Event(emitter, 'data'))).pipe(
    skipUntil(first$),
    throttleTime(200),
    mergeMap(() => from(load()), 1),
  );

  return merge(first$, fromEvents$, reloadTrigger$);
}
