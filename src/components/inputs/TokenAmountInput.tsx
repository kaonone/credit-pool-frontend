import React, { useEffect, useMemo, useCallback, ComponentPropsWithoutRef } from 'react';
import BN from 'bn.js';
import Button from '@material-ui/core/Button';
import MenuItem from '@material-ui/core/MenuItem';

import { fromBaseUnit, toBaseUnit } from 'utils/bn';
import { TokenAmount, Token } from 'model/entities';
import { makeStyles } from 'utils/styles';

import { TextInput } from './TextInput';

interface IOwnProps {
  token: Token;
  value: TokenAmount | null | '';
  maxValue?: BN;
  onChange: (value: TokenAmount) => void;
}

export type TokenAmountInputProps = IOwnProps &
  Omit<ComponentPropsWithoutRef<typeof TextInput>, 'onChange'>;

export function TokenAmountInput(props: TokenAmountInputProps) {
  const { onChange, value, maxValue, disabled, token, ...restInputProps } = props;
  const classes = useStyles();

  const tokenAmount = value || null;

  const currentValue = tokenAmount?.value || new BN(0);
  const currentDecimals = tokenAmount?.token.decimals || 0;
  const currentToken = tokenAmount?.token || token;

  useEffect(() => {
    if (!tokenAmount || tokenAmount.token.address !== token.address) {
      onChange(new TokenAmount(currentValue, token));
    }
  }, [token.address]);

  const [suffix, setSuffix] = React.useState('');
  const [needToShowEmpty, setNeedToShowEmpty] = React.useState(false);

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
          !currentValue.isZero() && onChange(new TokenAmount(new BN(0), currentToken));
          return;
        }

        setNeedToShowEmpty(false);

        const nextValue = toBaseUnit(event.target.value, currentDecimals);

        if (!nextValue.eq(currentValue)) {
          onChange(new TokenAmount(nextValue, currentToken));
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
    [currentDecimals, currentToken.address, currentValue.toString()],
  );

  const handleMaxButtonClick = React.useCallback(() => {
    setSuffix('');
    maxValue && onChange(new TokenAmount(maxValue, currentToken));
  }, [onChange, maxValue?.toString(), currentToken.address]);

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
      <TextInput select disabled value={currentToken.address} variant="outlined">
        <MenuItem value={currentToken.address}>{currentToken.symbol}</MenuItem>
      </TextInput>
    </div>
  );
}

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  amount: {
    width: 0,
    flexGrow: 1,
    marginRight: theme.spacing(1),
  },
}));
