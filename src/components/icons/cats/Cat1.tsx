import * as React from 'react';
import SvgIcon from '@material-ui/core/SvgIcon';

function Cat1(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props} viewBox="0 0 52 52">
      <defs>
        <linearGradient id="catIcon-gradient-a" x1="50%" x2="50%" y1="100%" y2="0%">
          <stop offset="0%" stopColor="#F868E0" />
          <stop offset="100%" stopColor="#FC8BE2" />
        </linearGradient>
        <linearGradient id="catIcon-gradient-b" x1="50%" x2="50%" y1="27.49%" y2="100%">
          <stop offset="0%" stopColor="#494972" />
          <stop offset="100%" stopColor="#0A0A0E" />
        </linearGradient>
        <circle id="catIcon-shape" cx="26" cy="26" r="26" />
      </defs>
      <g fill="none" fillRule="evenodd">
        <mask id="catIcon-mask" fill="#fff">
          <use xlinkHref="#catIcon-shape" />
        </mask>
        <g mask="url(#catIcon-mask)">
          <use fill="url(#catIcon-gradient-a)" xlinkHref="#catIcon-shape" />
          <g transform="translate(2.7 9.46)">
            <path
              fill="#191924"
              d="M28.02 3.57c3.78-2.22 6.81-2.9 9.08-2.02 2.26.87 2.47 5.3.6 13.31l-9.68-11.3zm-9.13 0c-3.78-2.22-6.81-2.9-9.08-2.02-2.26.87-2.47 5.3-.6 13.31l9.68-11.3z"
            />
            <path
              fill="url(#catIcon-gradient-b)"
              d="M.72 36.15c-.44-1.77 0-3.9 1.3-6.38a19 19 0 0 1 5.76-6.48C5.61 21 4.8 18.57 5.32 15.95c.8-3.92 3.9-4.99 3.9-4.99.74-3.36 2.2-4.66 4.03-6.44C16.31 1.57 20.43.54 24.13.54c5.92 0 11.2 4.08 14.02 10.42.01 0 3 .03 4.1 5 1 4.56-2.3 6.99-2.3 7.33 0 .24 5.5 1.21 7.08 5a74.26 74.26 0 0 1 2.12 6.3c-7.87 10.7-16.48 16.06-25.83 16.06-9.34 0-16.88-4.83-22.6-14.5z"
            />
            <ellipse cx="33.68" cy="12.62" fill="#FED798" rx="4.48" ry="4.41" />
            <ellipse cx="13.61" cy="12.62" fill="#FED798" rx="4.48" ry="4.41" />
            <ellipse cx="13.5" cy="12.54" fill="#000" rx="2.52" ry="3.42" />
            <ellipse cx="33.57" cy="12.54" fill="#000" rx="2.52" ry="3.42" />
            <path
              fill="#000"
              d="M23.9 16.64c1.11-.16 1.11-1 2.45-1.3 1.33-.29 1.68-3.62-1.57-3.62s-4.36.73-4.36 2.14c0 1.42 1.1 1.35 1.86 1.78.76.43.5 1.17 1.61 1z"
            />
            <path
              stroke="#0A0A0E"
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M13.58 18.23c1.77 1.9 3.75 2.61 5.94 2.17a5.07 5.07 0 0 0 4.18-3.75c1.25 2.17 2.81 3.25 4.68 3.25 1.87 0 3.43-.75 4.68-2.25m-11.47 5.7c1.91 1.82 3.6 1.82 5.07 0"
            />
          </g>
        </g>
      </g>
    </SvgIcon>
  );
}

export { Cat1 };
