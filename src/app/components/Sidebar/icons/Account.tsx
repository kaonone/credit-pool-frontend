import * as React from 'react';
import { makeIcon } from './private';

export const Account = makeIcon(() => {
  return (
    <>
      <defs>
        <path id="prefix__a" d="M12.009 12.292c2.384 0 4.307-2.105 4.307-4.705C16.316 5.03 14.393 3 12.01 3 9.635 3 7.679 5.063 7.69 7.598c.011 2.6 1.934 4.694 4.319 4.694zm0-1.321c-1.59 0-2.912-1.472-2.912-3.373-.01-1.837 1.311-3.277 2.912-3.277 1.6 0 2.9 1.418 2.9 3.266 0 1.89-1.31 3.384-2.9 3.384zm6.466 10.667c1.569 0 2.31-.484 2.31-1.547 0-2.654-3.34-6.456-8.787-6.456-5.457 0-8.798 3.803-8.798 6.456 0 1.063.741 1.547 2.31 1.547h12.965zm.387-1.322H5.122c-.386 0-.515-.107-.515-.376 0-1.836 2.664-4.984 7.39-4.984 4.727 0 7.391 3.148 7.391 4.984 0 .269-.14.376-.526.376z" />
      </defs>
      <g fill="none" fill-rule="evenodd">
        <path fill="#0A0A0E" fill-opacity=".01" d="M0 0H24V24H0z" transform="translate(.5)" />
        <g fill-rule="nonzero" transform="translate(.5)">
          <use fill="#FFF" xlinkHref="#prefix__a" />
          <use fill="#FFF" xlinkHref="#prefix__a" />
          <use xlinkHref="#prefix__a" />
        </g>
      </g>
    </>
  );
});
