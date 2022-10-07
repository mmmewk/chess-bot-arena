declare module '*.txt' {
  const content: string;
  export default content;
}

declare module '*.module.scss' {
  const styles: {
    [name: string]: string;
  };
  export = styles;
}

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement>
  >;

  const src: string;
  export default src;
}

/** PNG images */
declare module '*.png' {
  const value: any;
  export = value;
}

/** JPG images */
declare module '*.jpg' {
  const value: any;
  export = value;
}

/** MD files */
declare module '*.md' {
  const value: string;
  export = value;
}
