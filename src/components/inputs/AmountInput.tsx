import React, {
  useEffect,
  useMemo,
  useCallback,
  ComponentPropsWithoutRef,
  useRef,
  useState,
} from 'react';
import BN from 'bn.js';
import MenuItem from '@material-ui/core/MenuItem';
import { Observable } from 'rxjs';

import { fromBaseUnit, toBaseUnit, bnToBn } from 'utils/bn';
import { toObservable } from 'utils/rxjs';
import { Amount } from 'model/entities';
import { makeStyles } from 'utils/styles';
import { ICurrency, IToBN } from 'model/types';
import { useSubscribable } from 'utils/react';

import { Button } from '../Button/Button';
import { TextInput } from './TextInput';

interface IOwnProps<A extends Amount<ICurrency>> {
  currencies: Array<A['currency']>;
  value: A | null | '';
  maxValue?: BN | IToBN | Observable<BN | IToBN>;
  onChange: (value: A) => void;
  makeAmount(value: BN, currency: A['currency']): A;
  getCurrencyIdentifier(currency: A['currency']): string;
}

export type AmountInputProps<A extends Amount<ICurrency>> = IOwnProps<A> &
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'onChange'>;

// TODO add support of negative value
// TODO move value changing logic to DecimalsInput
export function AmountInput<A extends Amount<ICurrency>>(props: AmountInputProps<A>) {
  const {
    onChange,
    value,
    maxValue: max,
    disabled,
    currencies,
    makeAmount,
    getCurrencyIdentifier,
    ...restInputProps
  } = props;
  const classes = useStyles();

  const tokenAmount = value || null;

  const defaultCurrency = currencies[0] as A['currency'] | undefined;

  const currentValue = tokenAmount?.toBN() || new BN(0);
  const currentCurrency = tokenAmount?.currency || defaultCurrency;
  const currentDecimals = currentCurrency?.decimals || 0;

  const currentCurrencyUpdatingTrigger = useUpdatingTrigger(currentCurrency, (a, b) =>
    Boolean(a && b && a.equals(b)),
  );

  const isDisabledCurrencySelector = Boolean(currencies.length <= 1 && currentCurrency);

  // initialize or update value if currencies is not contain current currency
  useEffect(() => {
    const isWrongCurrentCurrency =
      currentCurrency && !currencies.find(item => item.equals(currentCurrency));

    if (defaultCurrency && (!tokenAmount || isWrongCurrentCurrency)) {
      // async change is necessary for the correct working of subscriptions in the final-form during the first render
      Promise.resolve().then(() => onChange(makeAmount(currentValue, defaultCurrency)));
    }
  }, [currentCurrency, currencies]);

  const [suffix, setSuffix] = React.useState('');
  const [needToShowEmpty, setNeedToShowEmpty] = React.useState(() => !value || value.isZero());

  useEffect(() => {
    needToShowEmpty && value && !value.toBN().isZero() && setNeedToShowEmpty(false);
  }, [needToShowEmpty, value]);

  useEffect(() => setSuffix(''), [currentValue.toString(), currentDecimals]);

  const inputValue = useMemo(
    () => currentValue && fromBaseUnit(currentValue, currentDecimals) + suffix,
    [currentValue, suffix, currentDecimals],
  );

  const handleInputChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const maxFractionLength = currentDecimals;
      const inputValidationRegExp = new RegExp(
        `^$|^\\d+?${maxFractionLength > 0 ? `(\\.?\\d{0,${maxFractionLength}})` : ''}$`,
      );

      if (inputValidationRegExp.test(event.target.value)) {
        if (!event.target.value) {
          setNeedToShowEmpty(true);
          setSuffix('');
          !currentValue.isZero() &&
            currentCurrency &&
            onChange(makeAmount(new BN(0), currentCurrency));
          return;
        }

        setNeedToShowEmpty(false);

        const nextValue = toBaseUnit(event.target.value, currentDecimals);

        if (!nextValue.eq(currentValue)) {
          currentCurrency && onChange(makeAmount(nextValue, currentCurrency));
        }

        const suffixMatch = event.target.value.match(/^.+?((\.|\.0+)|(\.[0-9]*?(0*)))$/);

        if (suffixMatch) {
          const [, , dotWithZeros, , zerosAfterDot] = suffixMatch;
          setSuffix(dotWithZeros || zerosAfterDot || '');
        } else {
          setSuffix('');
        }
      }
    },
    [currentDecimals, currentCurrencyUpdatingTrigger, currentValue.toString()],
  );

  const [maxValue] = useSubscribable(() => toObservable(max), [max]);

  const handleMaxButtonClick = React.useCallback(() => {
    setSuffix('');
    maxValue && currentCurrency && onChange(makeAmount(bnToBn(maxValue), currentCurrency));
  }, [onChange, maxValue?.toString(), currentCurrencyUpdatingTrigger]);

  const handleCurrencyChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const nextValue = event.target.value;
      const currency = currencies.find(item => getCurrencyIdentifier(item) === nextValue);

      currency && onChange(makeAmount(currentValue, currency));
    },
    [onChange, maxValue?.toString(), currentCurrencyUpdatingTrigger],
  );

  return (
    <div className={classes.root}>
      <TextInput
        {...restInputProps}
        disabled={disabled}
        value={needToShowEmpty ? '' : inputValue}
        variant="outlined"
        fullWidth
        onChange={handleInputChange}
        InputProps={{
          endAdornment: maxValue && (
            <Button disabled={disabled} color="primary" onClick={handleMaxButtonClick}>
              MAX
            </Button>
          ),
        }}
        className={classes.amount}
      />
      {/* TODO uncomment after adding multiple tokens */}
      {false && (
        <TextInput
          select
          disabled={isDisabledCurrencySelector}
          value={currentCurrency && getCurrencyIdentifier(currentCurrency!)}
          variant="outlined"
          onChange={handleCurrencyChange}
        >
          {currencies.map(item => {
            const id = getCurrencyIdentifier(item);
            return (
              <MenuItem key={id} value={id}>
                {item.symbol}
              </MenuItem>
            );
          })}
        </TextInput>
      )}
    </div>
  );
}

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  amount: {
    width: 0,
    flexGrow: 1,
    // TODO uncomment after adding multiple tokens
    // marginRight: theme.spacing(1),
  },
}));

function useUpdatingTrigger<V>(deps: V, isEquals: (prev: V, cur: V) => boolean) {
  const prevValueRef = useRef<V>();
  const [updatedDepsTrigger, setUpdatedDepsTrigger] = useState<{}>(() => ({}));

  useEffect(() => {
    const prevDeps = prevValueRef.current;
    prevValueRef.current = deps;

    if (prevDeps && !isEquals(prevDeps, deps)) {
      setUpdatedDepsTrigger({});
    }
  }, [deps]);

  return updatedDepsTrigger;
}
