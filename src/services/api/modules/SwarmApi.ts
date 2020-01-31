import { Bzz } from '@erebos/bzz';
import { autobind } from 'core-decorators';
import * as R from 'ramda';
import { Observable, from } from 'rxjs';

import { SWARM_GATEWAY_URL } from 'env';
import { memoize } from 'utils/decorators';

export class SwarmApi {
  bzz = new Bzz<any, any>({ url: SWARM_GATEWAY_URL });

  @autobind
  public upload<T>(data: T): Promise<string> {
    return this.bzz.uploadData(data);
  }

  @memoize(R.identity)
  @autobind
  public read<T>(hash: string): Observable<T> {
    return from(this.bzz.downloadData<T>(hash));
  }
}
