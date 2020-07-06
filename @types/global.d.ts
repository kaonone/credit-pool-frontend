declare module 'filemanager-webpack-plugin';
declare module 'react-jazzicon';

interface Window {
  __PRERENDER_INJECTED__?: {
    isServer: boolean;
  };
  __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?(): any;
  __data: any; // initial redux state, maybe undefined
  idensic: any;
  requestIdleCallback: any;
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
