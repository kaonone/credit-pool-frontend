import React from 'react';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Field } from 'react-final-form';

import { LiquidityAmount } from 'model/entities';
import { useApi } from 'services/api';
import { useSubscribable } from 'utils/react';
import { ButtonProps, Button, Grid, FormattedAmount } from 'components';
import { calcInterestShare } from 'model';
import { formatBalance } from 'utils/format';
import { makeStyles } from 'utils/styles';

interface AmountPrefillerProps {
  fieldName: string;
  loanSize: string;
  minValue$: Observable<LiquidityAmount>;
  maxValue$: Observable<LiquidityAmount>;
}
interface PrefillValue {
  value: LiquidityAmount;
  interestShare: string;
}

export function AmountPrefiller(props: AmountPrefillerProps) {
  const { fieldName, loanSize, maxValue$, minValue$ } = props;
  const api = useApi();
  const classes = useStyles();

  const [values] = useSubscribable<PrefillValue[]>(
    () =>
      combineLatest([minValue$, maxValue$, api.loanModule.calculateFullLoanStake$(loanSize)]).pipe(
        map(([minValue, maxValue, fullLoanStake]) => {
          const valueDelta = maxValue.sub(minValue);
          const interestShareDecimals = 2;

          return [0, 50, 100].map<PrefillValue>(size => {
            const value = minValue.add(valueDelta.mul(size).div(100));

            const interestShare = calcInterestShare(
              value.toBN(),
              fullLoanStake,
              interestShareDecimals,
            );

            return {
              value,
              interestShare: `${formatBalance({
                amountInBaseUnits: interestShare,
                baseDecimals: interestShareDecimals,
                precision: 0,
              })}%`,
            };
          });
        }),
      ),
    [minValue$, maxValue$, loanSize],
    [],
  );

  return values.length ? (
    <Grid container spacing={1}>
      {values.map(({ interestShare: sharePercent, value }, index) => (
        <Grid key={index} item xs>
          <ApplyValueButton
            fullWidth
            name={fieldName}
            fieldValue={value}
            size="small"
            variant="contained"
            className={classes.buttonOverride}
          >
            <FormattedAmount sum={value} precision={0} /> -&gt; {sharePercent}
          </ApplyValueButton>
        </Grid>
      ))}
    </Grid>
  ) : null;
}

const useStyles = makeStyles({
  buttonOverride: {
    display: 'block',
  },
});

interface ApplyValueButtonProps<V> extends ButtonProps {
  name: string;
  fieldValue: V;
  children: React.ReactNode;
}

function ApplyValueButton<V>({
  children,
  fieldValue,
  name,
  ...restProps
}: ApplyValueButtonProps<V>) {
  return (
    <Field<V> name={name}>
      {({ input }) => (
        <Button
          {...restProps}
          onClick={e => {
            input.onChange(fieldValue);
            restProps.onClick && restProps.onClick(e);
          }}
        >
          {children}
        </Button>
      )}
    </Field>
  );
}
