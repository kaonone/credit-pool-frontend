import BN from 'bn.js';
import { Observable } from 'rxjs';
import { A, B } from 'ts-toolbelt';

import Web3 from 'web3';
import PromiEvent from 'web3/promiEvent';
import { Callback, EventLog as Web3EventLog, TransactionReceipt } from 'web3/types';
import { ABIDefinition } from 'web3/eth/abi';
import Contract from 'web3/eth/contract';
import { BlockType, Tx } from 'web3/eth/types';

import { getContractData$ } from './getContractData$';

/* ***** OVERRIDE WEB3 TYPES ***** */

type EventLog<T> = Omit<Web3EventLog, 'returnValues'> & { returnValues: T };

export interface EventEmitter<T> {
  on(type: 'data', handler: (event: EventLog<T>) => void): EventEmitter<T>;
  on(type: 'changed', handler: (receipt: EventLog<T>) => void): EventEmitter<T>;
  on(type: 'error', handler: (error: Error) => void): EventEmitter<T>;
  on(
    type: 'error' | 'data' | 'changed',
    handler: (error: Error | TransactionReceipt | string) => void,
  ): EventEmitter<T>;
}

/* ***** */

interface GenericDescriptor {
  callMethods: Record<string, MethodDescriptor>;
  sendMethods: Record<string, MethodDescriptor>;
  events: Record<string, EventDescriptor>;
}

type MethodDescriptor = {
  inputs?: readonly Input[];
  output?: Output;
};

interface EventDescriptor {
  inputs: readonly Input[];
}

interface Input<N extends string = string, T extends ABIDataType = ABIDataType> {
  name: N;
  type: T;
}

type Output = ABIDataType;

type ABIDataType = keyof RequestByABIDataType;

interface RequestByABIDataType {
  address: string;
  uint256: BN;
  bool: boolean;
}

type InferTypeProp<T> = T extends Input<infer Name, infer Type> ? { [key in Name]: RequestByABIDataType[Type] } : never;
type InputsToArg<T> = MergeTupleMembers<{ [P in keyof T]: InferTypeProp<T[P]> }>;
type MaybeInputsToArgs<S> = S extends readonly any[]
  ? A.Equals<S, readonly []> extends B.True
    ? void
    : A.Equals<S, []> extends B.True
    ? void
    : InputsToArg<S>
  : void;

type CallMethod<M extends MethodDescriptor, E extends Record<string, EventDescriptor>> = (
  input: MaybeInputsToArgs<M['inputs']>,
  eventsForReload?: EventsForReload<E>,
) => Observable<RequestByABIDataType[NonNullable<M['output']>]>;

type SendMethod<M extends MethodDescriptor> = (
  input: MaybeInputsToArgs<M['inputs']>,
  tx?: Tx,
) => PromiEvent<RequestByABIDataType[NonNullable<M['output']>]>;

type EventMethod<E extends EventDescriptor> = (
  options?: SubscribeEventOptions<E>,
  cb?: Callback<EventLog<MaybeInputsToArgs<E>>>,
) => EventEmitter<MaybeInputsToArgs<E>>;

interface SubscribeEventOptions<E extends EventDescriptor> {
  filter?: Partial<MaybeInputsToArgs<E['inputs']>>;
  fromBlock?: BlockType;
  topics?: string[];
}

type ContractWrapper<D extends GenericDescriptor> = {
  methods: {
    [key in keyof D['callMethods']]: CallMethod<D['callMethods'][key], D['events']>;
  } &
    {
      [key in keyof D['sendMethods']]: SendMethod<D['sendMethods'][key]>;
    };
  events: {
    [key in keyof D['events']]: EventMethod<D['events'][key]>;
  } & {
    allEvents: Contract['events']['allEvents'];
  };
  getPastEvents: Contract['getPastEvents'];
};

type EventsForReload<Events extends Record<string, EventDescriptor> = Record<string, EventDescriptor>> =
  | 'none'
  | 'all'
  | {
      [key in keyof Events]?: SubscribeEventOptions<Events[key]> | Array<SubscribeEventOptions<Events[key]>>;
    };

export function getInput<N extends string, T extends ABIDataType>(name: N, type: T): Input<N, T> {
  return { name, type };
}

export function getOutput<T extends Output>(type: T): T {
  return type;
}

const toRequest: { [key in ABIDataType]: (input: RequestByABIDataType[key]) => string | boolean } = {
  address: value => value,
  bool: value => value,
  uint256: value => value.toString(),
};

const fromResponse: { [key in ABIDataType]: (input: string | boolean | BN) => RequestByABIDataType[key] } = {
  address: value => String(value),
  bool: value => Boolean(value),
  uint256: value => new BN(value as string | BN),
};

export function makeContractCreator<D extends GenericDescriptor>(_abi: ABIDefinition[], _descriptor: D) {
  return (web3: Web3, address: string): ContractWrapper<D> => {
    const baseContract = new web3.eth.Contract(_abi, address);

    const methodsProxy = new Proxy<Contract['methods']>(
      {},
      {
        get(target: Contract['methods'], prop: string) {
          const callMethodDescriptor = _descriptor.callMethods[prop];
          const sendMethodDescriptor = _descriptor.sendMethods[prop];

          if (callMethodDescriptor) {
            const { inputs = [], output } = callMethodDescriptor;
            return (input: Record<string, BN | string | boolean>, eventsForReload?: EventsForReload) => {
              return getContractData$(baseContract, prop, {
                args: inputs.map(({ name, type }) => (toRequest[type] as any)(input[name])),
                eventsForReload,
                convert: (value: string | boolean | BN) => (output ? fromResponse[output](value) : value),
              });
            };
          }

          // TODO need to debug this block
          if (sendMethodDescriptor) {
            const { inputs = [], output } = sendMethodDescriptor;
            return (input: Record<string, BN | string | boolean>, tx?: Tx) => {
              const basePromiEvent = baseContract.methods[prop](
                ...inputs.map(({ name, type }) => (toRequest[type] as any)(input[name])),
              ).send(tx);
              const resultPromiEvent = basePromiEvent.then(value => (output ? fromResponse[output](value) : value));

              type PromiEventKeys = keyof typeof basePromiEvent;

              const resultPromiEventKeys = ['then', 'catch', 'finally'] as const;
              type ResultPromiEventKey = (typeof resultPromiEventKeys)[number];
              const isResultPromiEventKey = (value: string): value is ResultPromiEventKey =>
                resultPromiEventKeys.includes(value as ResultPromiEventKey);

              return new Proxy(basePromiEvent, {
                get(promiEventTarget, promiEventProp: PromiEventKeys) {
                  if (isResultPromiEventKey(promiEventProp)) {
                    return resultPromiEvent[promiEventProp].bind(resultPromiEvent);
                  }
                  return promiEventTarget[promiEventProp];
                },
              });
            };
          }

          return target[prop];
        },
      },
    );

    return (new Proxy<Contract>(baseContract, {
      get(target, prop: keyof Contract) {
        if (prop === 'methods') {
          return methodsProxy;
        }
        if (prop === 'events') {
          return target[prop]; // TODO integrate with RxJS Observables
        }
        return target[prop];
      },
    }) as unknown) as ContractWrapper<D>;
  };
}

/* ***** MERGE ***** */

type MergeArguments<T, K extends string = 'whatever'> = {
  [Key in K]: T extends (first: infer A) => void ? A : MergeOnePlus<T, K>;
}[K];

type MergeOnePlus<T, K extends string> = {
  [Key in K]: T extends (first: infer A, ...args: infer U) => void
    ? A & MergeArguments<(...args: U) => void, K>
    : never;
}[K];

type IntoSignature<T extends readonly unknown[]> = (...args: T) => void;

type MergeTupleMembers<T extends readonly unknown[] | {}> = MergeArguments<IntoSignature<T extends unknown[] ? T : []>>;
