import * as React from 'react';
import cn from 'classnames';
import { CheckIdentity } from '_helpers';
import FormHelperText, { FormHelperTextProps } from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio, { RadioProps } from '@material-ui/core/Radio';

import { useStyles } from './RadioButton.style';

type IProps = RadioProps & {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  formHelperTextProps?: FormHelperTextProps;
};

interface INormalizedProps {
  formHelperTextProps: FormHelperTextProps | null;
  radioProps: RadioProps;
  other: {
    label: React.ReactNode | null;
    helperText: React.ReactNode;
  };
}

function RadioButton(props: IProps) {
  const { formHelperTextProps, radioProps, other } = normalizeProps(props);
  const { label, helperText } = other;
  const classes = useStyles();

  return (
    <>
      <FormControlLabel
        control={
          <Radio
            {...radioProps}
            checkedIcon={<span className={cn(classes.icon, classes.iconChecked)} />}
            icon={<span className={classes.icon} />}
          />
        }
        label={label}
      />
      {helperText && <FormHelperText {...formHelperTextProps}>{helperText}</FormHelperText>}
    </>
  );
}

function normalizeProps(props: IProps): INormalizedProps {
  const { helperText = null, label, formHelperTextProps = null, ...rest } = props;

  const radioProps: CheckIdentity<RadioProps, typeof rest> = rest;

  return {
    formHelperTextProps,
    radioProps,
    other: { label, helperText },
  };
}

export { RadioButton };
