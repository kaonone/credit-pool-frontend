import * as React from 'react';

import { SidebarIcon } from './models';

export const Account: SidebarIcon = {
  Active: () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <defs>
        <linearGradient id="prefix__b" x1="100%" x2="0%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#544CF2" />
          <stop offset="100%" stopColor="#D93CEF" />
        </linearGradient>
        <path
          id="prefix__a1"
          d="M12.009 12.292c2.384 0 4.307-2.105 4.307-4.705C16.316 5.03 14.393 3 12.01 3 9.635 3 7.679 5.063 7.69 7.598c.011 2.6 1.934 4.694 4.319 4.694zm0-1.321c-1.59 0-2.912-1.472-2.912-3.373-.01-1.837 1.311-3.277 2.912-3.277 1.6 0 2.9 1.418 2.9 3.266 0 1.89-1.31 3.384-2.9 3.384zm6.466 10.667c1.569 0 2.31-.484 2.31-1.547 0-2.654-3.34-6.456-8.787-6.456-5.457 0-8.798 3.803-8.798 6.456 0 1.063.741 1.547 2.31 1.547h12.965zm.387-1.322H5.122c-.386 0-.515-.107-.515-.376 0-1.836 2.664-4.984 7.39-4.984 4.727 0 7.391 3.148 7.391 4.984 0 .269-.14.376-.526.376z"
        />
      </defs>
      <g fill="none" fillRule="evenodd">
        <path fill="#0A0A0E" fillOpacity=".01" d="M0 0H24V24H0z" />
        <g fillRule="nonzero">
          <use fill="url(#prefix__b)" xlinkHref="#prefix__a1" />
        </g>
      </g>
    </svg>
  ),

  Inactive: () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">
      <g fill="none" fillRule="evenodd">
        <path fill="#0A0A0E" fillOpacity=".01" d="M0 0H24V24H0z" transform="translate(.5)" />
        <path
          fill="#FFF"
          fillRule="nonzero"
          d="M12.03 11.884c2.277 0 4.038-1.955 4.038-4.49C16.068 4.987 14.253 3 12.03 3 9.795 3 7.97 4.998 7.99 7.394c.032 2.535 1.762 4.49 4.04 4.49zm0-.58c-1.945 0-3.449-1.687-3.449-3.91C8.55 5.31 10.117 3.58 12.03 3.58c1.902 0 3.46 1.719 3.46 3.814 0 2.223-1.515 3.91-3.46 3.91zm6.82 9.678c1.129 0 1.666-.386 1.666-1.267 0-2.61-3.277-6.241-8.508-6.241-5.232 0-8.508 3.63-8.508 6.24 0 .882.537 1.268 1.665 1.268h13.686zm.022-.569H5.144c-.806 0-1.064-.193-1.064-.709 0-2.374 2.965-5.65 7.928-5.65s7.917 3.276 7.917 5.65c0 .516-.247.71-1.053.71z"
          opacity=".5"
          transform="translate(.5)"
        />
      </g>
    </svg>
  ),
};
