import * as React from 'react';
import BN from 'bn.js';
import Grid from '@material-ui/core/Grid';

import { fromBaseUnit, toBaseUnit } from 'utils/bn';

import { Button } from '../Button/Button';
import { TextInput } from './TextInput';

interface IOwnProps {
  baseDecimals: number;
  baseUnitName?: string;
  value: string;
  maxValue?: BN;
  onChange: (value: string) => void;
}

type IProps = IOwnProps & Omit<React.ComponentProps<typeof TextInput>, 'ref'>;

function DecimalsInput(props: IProps) {
  const {
    onChange,
    baseDecimals,
    value,
    maxValue,
    baseUnitName,
    disabled,
    ...restInputProps
  } = props;

  const [suffix, setSuffix] = React.useState('');
  const [needToShowEmpty, setNeedToShowEmpty] = React.useState(() => !value || value === '0');

  React.useEffect(() => {
    needToShowEmpty && value && value !== '0' && setNeedToShowEmpty(false);
  }, [needToShowEmpty, value]);

  const amount = React.useMemo(() => value && fromBaseUnit(value, baseDecimals) + suffix, [
    value,
    suffix,
    baseDecimals,
  ]);

  const handleInputChange = React.useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const maxFractionLength = baseDecimals;
      const inputValidationRegExp = new RegExp(
        `^$|^\\d+?${maxFractionLength > 0 ? `(\\.?\\d{0,${maxFractionLength}})` : ''}$`,
      );

      if (inputValidationRegExp.test(event.target.value)) {
        setNeedToShowEmpty(!event.target.value);

        const suffixMatch = event.target.value.match(/^.+?((\.|\.0+)|(\.[0-9]*?(0*)))$/);

        if (suffixMatch) {
          const [, , dotWithZeros, , zerosAfterDot] = suffixMatch;
          setSuffix(dotWithZeros || zerosAfterDot || '');
        } else {
          setSuffix('');
        }

        onChange(event.target.value && toBaseUnit(event.target.value, baseDecimals).toString());
      }
    },
    [baseDecimals],
  );

  const handleMaxButtonClick = React.useCallback(() => {
    setSuffix('');
    maxValue && onChange(maxValue.toString());
  }, [onChange, maxValue && maxValue.toString()]);

  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={baseUnitName ? 10 : 12}>
          <TextInput
            {...restInputProps}
            disabled={disabled}
            value={needToShowEmpty ? '' : amount}
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
          />
        </Grid>
        {baseUnitName && (
          <Grid item xs={2}>
            <TextInput disabled value={baseUnitName} variant="outlined" fullWidth />
          </Grid>
        )}
      </Grid>
    </>
  );
}

export { DecimalsInput };
