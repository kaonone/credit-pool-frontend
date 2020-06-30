import { Observable, isObservable, of } from 'rxjs';

function toObservable<T>(value: T | Observable<T>): Observable<T>;
function toObservable<T>(value?: T | Observable<T>): Observable<T | undefined>;
function toObservable<T>(value?: T | Observable<T>) {
  return isObservable(value) ? value : of(value);
}

export { toObservable };
