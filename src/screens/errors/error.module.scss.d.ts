declare namespace ErrorModuleScssNamespace {
  export interface IErrorModuleScss {
    content: string;
    description: string;
    title: string;
    wrapper: string;
  }
}

declare const ErrorModuleScssModule: ErrorModuleScssNamespace.IErrorModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ErrorModuleScssNamespace.IErrorModuleScss;
};

export = ErrorModuleScssModule;
