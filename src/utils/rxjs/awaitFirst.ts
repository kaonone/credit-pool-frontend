import { Observable } from 'rxjs';
import { first } from 'rxjs/operators';

export function awaitFirst<T>(input: Observable<T>): Promise<T> {
  return input.pipe(first()).toPromise();
}
