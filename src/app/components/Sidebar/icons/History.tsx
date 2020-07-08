import * as React from 'react';

import { makeIcon } from './private';

export const History = makeIcon(() => {
  return (
    <g fill="none" fill-rule="evenodd">
      <path fill="#0A0A0E" fill-opacity=".01" d="M0 0H24V24H0z" transform="translate(.5)" />
      <path fill="#FFF" fill-rule="nonzero" d="M11.84 21.69c5.414 0 9.84-4.436 9.84-9.85S17.254 2 11.84 2 2 6.426 2 11.84s4.426 9.85 9.84 9.85zm0-.59c-5.103 0-9.26-4.158-9.26-9.26 0-5.103 4.157-9.25 9.26-9.25 5.102 0 9.26 4.147 9.26 9.25 0 5.102-4.158 9.26-9.26 9.26zm0-8.465c.172 0 .29-.13.29-.301V4.771c0-.16-.118-.279-.29-.279-.15 0-.269.118-.269.28v7.293H5.975c-.172 0-.29.13-.29.269 0 .172.118.3.29.3h5.865z" opacity=".5" transform="translate(.5)" />
    </g>
  );
});
