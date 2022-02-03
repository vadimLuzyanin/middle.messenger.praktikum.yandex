declare namespace LogoutModalContentModuleScssNamespace {
  export interface ILogoutModalContentModuleScss {
    buttons: string;
    title: string;
    wrapper: string;
  }
}

declare const LogoutModalContentModuleScssModule: LogoutModalContentModuleScssNamespace.ILogoutModalContentModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: LogoutModalContentModuleScssNamespace.ILogoutModalContentModuleScss;
};

export = LogoutModalContentModuleScssModule;
