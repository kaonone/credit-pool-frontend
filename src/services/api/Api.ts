import { Observable, from, interval } from 'rxjs';
import { skipWhile, switchMap } from 'rxjs/operators';
import Web3 from 'web3';
import BN from 'bn.js';
import * as R from 'ramda';

import { createErc20 } from 'utils/contracts';
import { getAccount } from 'utils/ethereum';
import { memoize } from 'utils/decorators';

export class Api {
  private dai = createErc20(this.web3, '0x5592ec0cfb4dbc12d3ab100b257153436a1f0fea');

  constructor(private web3: Web3) {}

  public getEthAccount$(): Observable<string | null> {
    return from(getAccount(this.web3)).pipe(
      skipWhile(account => !account),
      switchMap(() => interval(1000).pipe(switchMap(() => getAccount(this.web3)))),
    );
  }

  @memoize(R.identity)
  public getDaiBalance$(address: string): Observable<BN> {
    return this.dai.methods.balanceOf(
      { _owner: address },
      { Transfer: [{ filter: { _from: address } }, { filter: { _to: address } }] },
    );
  }
}
