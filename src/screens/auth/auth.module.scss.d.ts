declare namespace AuthModuleScssNamespace {
  export interface IAuthModuleScss {
    buttons: string;
    content: string;
    inputs: string;
    title: string;
    wrapper: string;
  }
}

declare const AuthModuleScssModule: AuthModuleScssNamespace.IAuthModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: AuthModuleScssNamespace.IAuthModuleScss;
};

export = AuthModuleScssModule;
