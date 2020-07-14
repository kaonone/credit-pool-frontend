import * as React from 'react';
import { GetProps } from '_helpers';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles } from 'utils/styles';

type Props = {
  backgroundColor?: string;
} & GetProps<typeof SvgIcon>;

function InfoIcon(props: Props) {
  const { backgroundColor, ...rest } = props;
  const classes = useStyles(props);

  return (
    <SvgIcon {...rest} viewBox="0 0 16 16" classes={classes}>
      <path
        fill={backgroundColor}
        d="M7.898 15.242c4.141 0 7.57-3.43 7.57-7.578 0-4.14-3.437-7.57-7.577-7.57C3.75.094.32 3.524.32 7.664c0 4.149 3.437 7.578 7.577 7.578zM7.836 5.078c-.54 0-.977-.437-.977-.976 0-.555.438-.985.977-.985.547 0 .976.43.976.985 0 .539-.43.976-.976.976zm1.766 6.64H6.594c-.305 0-.555-.226-.555-.546 0-.297.25-.531.555-.531H7.5V7.359h-.773c-.313 0-.555-.226-.555-.546 0-.297.242-.532.555-.532h1.398c.383 0 .594.274.594.688v3.672h.883c.312 0 .562.234.562.53 0 .321-.25.548-.562.548z"
      />
    </SvgIcon>
  );
}

const useStyles = makeStyles(() => ({
  root: ({ fontSize }: GetProps<typeof InfoIcon>) => ({
    fontSize: fontSize === 'inherit' ? 'inherit' : 16,
  }),
}));

export { InfoIcon };
