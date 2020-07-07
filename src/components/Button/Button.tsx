import * as React from 'react';
import cn from 'classnames';
import MuiButton, { ButtonTypeMap as MuiButtonTypeMap } from '@material-ui/core/Button';
import { OverridableComponent, OverrideProps } from '@material-ui/core/OverridableComponent';

import { useStyles } from './Button.style';

type ButtonClassKey = keyof ReturnType<typeof useStyles>;

interface ButtonTypeMap<P = {}, D extends React.ElementType = 'button'> {
  props: P & MuiButtonTypeMap['props'];
  defaultComponent: D;
  classKey: ButtonClassKey;
}

export type ButtonProps<
  D extends React.ElementType = ButtonTypeMap['defaultComponent'],
  P = {}
> = OverrideProps<ButtonTypeMap<P, D>, D>;

const Button: OverridableComponent<ButtonTypeMap> = function ButtonFunc<
  P = {},
  D extends React.ElementType = 'button'
>(props: ButtonProps<D, P>) {
  const classes = useStyles();
  const { classes: muiClasses = {}, ...rest } = props;

  return (
    <MuiButton
      {...rest}
      classes={{
        root: cn(classes.root, muiClasses.root),
        disabled: cn(classes.disabled, muiClasses.disabled),
        sizeLarge: cn(classes.sizeLarge, muiClasses.sizeLarge),
        sizeSmall: cn(classes.sizeSmall, muiClasses.sizeSmall),
        focusVisible: cn(classes.focusVisible, muiClasses.focusVisible),
        containedPrimary: cn(classes.containedPrimary, muiClasses.containedPrimary),
        outlinedPrimary: cn(classes.outlinedPrimary, muiClasses.outlinedPrimary),
        ...rest.classes,
      }}
    />
  );
};

export { Button };
