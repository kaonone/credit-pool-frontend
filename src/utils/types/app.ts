import { Reducer } from 'redux';

import * as i18nNS from 'services/i18n/namespace';
import { Api } from 'services/api';

export type IDictionary<T, S extends keyof any = string> = {
  [key in S]: T;
};

export interface IDependencies {
  api: Api;
}

export interface IReduxEntry {
  reducers: { [key in keyof IAppReduxState]?: Reducer<IAppReduxState[key]> };
}

export interface IAppReduxState {
  // services
  i18n: i18nNS.IReduxState;
  // features
}

export type Lang = 'en' | 'he';
