import * as React from 'react';
import { connect } from 'react-redux';
import { withRouter, RouteComponentProps } from 'react-router';
import Polyglot from 'node-polyglot';

import { IAppReduxState } from 'utils/types/app';
import { withProps } from 'utils/react';

import { ITranslateFunction, Lang, ITranslateKey } from '../../namespace';
import * as selectors from '../../redux/selectors';
import { DEFAULT_LANGUAGE, TContext, tKeys } from '../../constants';
import { phrasesByLocale as phrases } from '../../locales';

interface IOwnProps {
  phrasesByLocale: typeof phrases;
}

interface IStateProps {
  locale: Lang;
}

type IProps = IStateProps & IOwnProps & RouteComponentProps;

class I18nProviderComponent extends React.Component<IProps> {
  public polyglot: Polyglot = new Polyglot({
    locale: DEFAULT_LANGUAGE,
    phrases: this.props.phrasesByLocale[DEFAULT_LANGUAGE],
  });

  public state = { translator: makeTranslator(this.polyglot) };

  public componentDidUpdate(prevProps: IProps) {
    const { locale, phrasesByLocale } = this.props;
    if (prevProps.locale !== locale || prevProps.phrasesByLocale !== phrasesByLocale) {
      this.polyglot.locale(locale);
      this.polyglot.replace(phrasesByLocale[locale]);
      // eslint-disable-next-line react/no-did-update-set-state
      this.setState({ translator: makeTranslator(this.polyglot) });
    }
  }

  public render() {
    const { children, locale } = this.props;
    const { translator } = this.state;
    return (
      <TContext.Provider value={{ t: translator, locale, tKeys }}>{children}</TContext.Provider>
    );
  }
}

function makeTranslator(polyglot: Polyglot): ITranslateFunction {
  return (
    phrase: ITranslateKey,
    smartCountOrInterpolationOptions?: number | Polyglot.InterpolationOptions,
  ) => {
    if (typeof phrase === 'string') {
      return polyglot.t(phrase, smartCountOrInterpolationOptions as any);
    }
    return polyglot.t(phrase.key, phrase.params);
  };
}

function mapState(state: IAppReduxState) {
  return {
    locale: selectors.selectCurrentLocale(state),
  };
}

export const I18nProvider = withRouter(
  // needed for rerendering on route change
  withProps(connect(mapState)(I18nProviderComponent), { phrasesByLocale: phrases }),
);
