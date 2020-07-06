declare module 'filemanager-webpack-plugin';
declare module 'react-jazzicon';

interface Window {
  __PRERENDER_INJECTED__?: {
    isServer: boolean;
  };
}

declare module '*.woff' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.woff2' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.ttf' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.svg' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}

declare module '*.pdf' {
  const url: string;
  // eslint-disable-next-line import/no-default-export
  export default url;
}
