import * as React from 'react';
import { CheckIdentity } from '_helpers';
import FormControl, { FormControlProps } from '@material-ui/core/FormControl';
import FormHelperText, { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch, { SwitchProps } from '@material-ui/core/Switch';

import { useStyles } from './SwitchInput.style';

type IProps = SwitchProps &
  Pick<FormControlProps, 'error' | 'required' | 'fullWidth'> & {
    label?: React.ReactNode;
    helperText?: React.ReactNode;
    formHelperTextProps?: FormHelperTextProps;
  };

interface INormalizedProps {
  formControlProps: FormControlProps;
  formHelperTextProps: FormHelperTextProps | null;
  switchProps: SwitchProps;
  other: {
    label: React.ReactNode | null;
    helperText: React.ReactNode;
  };
}

function SwitchInput(props: IProps) {
  const { formControlProps, formHelperTextProps, switchProps, other } = normalizeProps(props);
  const { label, helperText } = other;
  const classes = useStyles();

  return (
    <FormControl {...formControlProps}>
      <FormControlLabel
        control={
          <Switch
            {...switchProps}
            classes={{
              root: classes.root,
              switchBase: classes.switchBase,
              checked: classes.checked,
              thumb: classes.thumb,
              track: classes.track,
            }}
          />
        }
        label={label}
      />
      {helperText && <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>}
    </FormControl>
  );
}

function normalizeProps(props: IProps): INormalizedProps {
  const { error, helperText = null, label, formHelperTextProps = null, fullWidth, ...rest } = props;

  const switchProps: CheckIdentity<SwitchProps, typeof rest> = rest;
  const formControlProps: FormControlProps = { error, required: rest.required, fullWidth };

  return {
    formHelperTextProps,
    formControlProps,
    switchProps,
    other: { label, helperText },
  };
}

export { SwitchInput };
