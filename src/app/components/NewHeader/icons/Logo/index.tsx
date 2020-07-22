// tslint:disable: max-line-length
import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

import { makeStyles } from 'utils/styles';

const useStyles = makeStyles({
  root: {
    width: 'unset',
    height: '40px',
  },
});

export const Logo: React.FC = () => {
  const classes = useStyles();

  return (
    <SvgIcon classes={classes} viewBox="0 0 136 40">
      <defs>
        <linearGradient id="CreditPoolLogo-gradient" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#544CF2" />
          <stop offset="100%" stopColor="#D93CEF" />
        </linearGradient>
      </defs>
      <g fill="none" fillRule="evenodd">
        <path
          fill="url(#CreditPoolLogo-gradient)"
          d="M52.98 27.29c.58 0 1.18-.07 1.77-.2.6-.15 1.13-.37 1.61-.68.48-.3.87-.7 1.18-1.18.3-.49.46-1.07.46-1.76 0-.63-.12-1.16-.35-1.58-.24-.42-.55-.77-.94-1.05s-.83-.5-1.32-.65c-.5-.17-1-.3-1.5-.43l-1.5-.33c-.5-.1-.94-.23-1.33-.39a2.6 2.6 0 0 1-.94-.6 1.34 1.34 0 0 1-.35-.96 1.89 1.89 0 0 1 .9-1.73c.26-.17.57-.29.92-.36.35-.07.7-.1 1.06-.1.89 0 1.62.2 2.19.61.57.42.9 1.09 1 2.01h1.62a4.53 4.53 0 0 0-.4-1.83 3.56 3.56 0 0 0-1.01-1.27 4.16 4.16 0 0 0-1.49-.73 6.87 6.87 0 0 0-3.55-.01c-.56.15-1.06.37-1.5.68a3.4 3.4 0 0 0-1.45 2.85c0 .6.12 1.08.35 1.47.24.4.55.7.94.95s.83.45 1.32.6c.5.15 1 .28 1.5.4l1.5.33c.5.1.94.25 1.33.42.4.17.7.4.94.68.23.27.35.63.35 1.08 0 .46-.1.85-.29 1.15-.2.3-.44.53-.76.7-.3.18-.66.3-1.05.38a6.38 6.38 0 0 1-2.56-.07 3.5 3.5 0 0 1-1.2-.56 2.86 2.86 0 0 1-.83-.97 2.9 2.9 0 0 1-.31-1.39h-1.62c0 .78.14 1.45.42 2.02.28.57.67 1.04 1.15 1.4.49.37 1.05.65 1.7.83.64.18 1.32.27 2.04.27zm13.2-.29v-5.26h3.92c1.3.02 2.28-.31 2.95-.99.66-.67 1-1.6 1-2.8 0-1.2-.34-2.14-1-2.8-.67-.67-1.65-1-2.95-1h-5.63V27h1.7zm3.35-6.7h-3.35V15.6h3.35c.97 0 1.68.2 2.13.6.45.4.67.99.67 1.76 0 .76-.22 1.35-.67 1.76-.45.4-1.16.6-2.13.6zm9.9 6.7l1.44-3.87h5.44l1.4 3.87h1.9l-5.03-12.85H82.7L77.7 27h1.74zm6.34-5.31h-4.36l2.18-6h.04l2.14 6zM96.97 27v-5.49h4.18c.42 0 .76.06 1 .19s.46.3.62.5c.16.21.27.46.34.74a9.35 9.35 0 0 1 .29 1.85l.04.9c0 .29.04.54.08.77.04.23.12.4.24.54h1.9a2.2 2.2 0 0 1-.4-.75 5.85 5.85 0 0 1-.3-1.84 8.27 8.27 0 0 0-.2-1.85 2.73 2.73 0 0 0-.3-.79 1.97 1.97 0 0 0-.56-.6 2.29 2.29 0 0 0-.91-.36v-.04a2.73 2.73 0 0 0 1.7-1.2 3.9 3.9 0 0 0 .53-2.06 3.1 3.1 0 0 0-1.04-2.46c-.69-.6-1.64-.9-2.87-.9h-6.05V27h1.71zm3.57-6.93h-3.57v-4.48h4.25c.8 0 1.39.2 1.75.61.36.4.54.94.54 1.58 0 .47-.08.85-.24 1.15-.17.3-.38.52-.65.7-.27.17-.59.29-.95.35s-.74.09-1.13.09zM116.3 27V15.59h4.28v-1.44H110.3v1.44h4.29V27h1.7zm8.68 0l1.44-3.87h5.44l1.4 3.87h1.89l-5.02-12.85h-1.9l-5 12.85h1.75zm6.34-5.31h-4.36l2.18-6h.03l2.15 6z"
        />
        <path
          fill="url(#CreditPoolLogo-gradient)"
          d="M18.17 0c.95 0 1.85.28 2.7.72l12.76 7.3a5.26 5.26 0 0 1 2.7 4.58v14.54c0 1.9-1.03 3.65-2.7 4.59l-12.76 7.24a5.2 5.2 0 0 1-2.7.72 5.2 5.2 0 0 1-2.7-.72L2.7 31.73a5.26 5.26 0 0 1-2.7-4.6V12.6c0-1.9 1.03-3.65 2.7-4.59L15.47.72C16.3.22 17.2 0 18.17 0zm0 1.71c-.64 0-1.26.18-1.8.5L3.54 9.45A3.73 3.73 0 0 0 1.7 12.6v14.48c0 1.33.73 2.49 1.85 3.15l12.77 7.24a3.73 3.73 0 0 0 3.71 0L32.8 30.3a3.73 3.73 0 0 0 1.86-3.15V12.6c0-1.32-.73-2.49-1.86-3.15L20.02 2.21a3.73 3.73 0 0 0-1.85-.5zm0 4.81c.5 0 1 .11 1.46.44l9.17 5.2c.9.5 1.46 1.44 1.46 2.49v10.39c0 1-.56 1.99-1.46 2.49l-9.17 5.2c-.45.27-.96.38-1.46.38-.51 0-1.02-.11-1.47-.39l-9.16-5.2a2.82 2.82 0 0 1-1.47-2.48V14.59c0-1 .57-1.99 1.47-2.49l9.16-5.2c.45-.27.96-.38 1.47-.38zm0 1.44c-.23 0-.51.05-.73.22l-9.12 5.2c-.45.27-.73.77-.73 1.27v10.44c0 .56.28 1 .73 1.28l9.17 5.19c.23.17.45.22.73.22.28 0 .5-.1.73-.22l9.17-5.2c.45-.27.72-.75.73-1.27V14.64c0-.55-.28-.99-.73-1.27L18.9 8.18a1.14 1.14 0 0 0-.73-.22zm0 5.08c.28 0 .5.06.73.23l4.72 2.65c.45.27.72.75.73 1.27v5.36c0 .55-.28 1-.73 1.27l-4.72 2.66c-.23.16-.45.22-.73.22-.23 0-.51-.11-.74-.22l-4.72-2.66a1.53 1.53 0 0 1-.73-1.27V17.2c0-.55.28-1 .73-1.27l4.72-2.65c.23-.17.45-.22.74-.22zm.05 1.33h-.11l-4.72 2.65-.06 5.48 4.78 2.76 4.84-2.65.05-5.48-4.78-2.76z"
        />
      </g>
    </SvgIcon>
  );
};