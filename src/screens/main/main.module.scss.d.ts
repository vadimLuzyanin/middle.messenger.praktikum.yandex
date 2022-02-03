declare namespace MainModuleScssNamespace {
  export interface IMainModuleScss {
    wrapper: string;
  }
}

declare const MainModuleScssModule: MainModuleScssNamespace.IMainModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MainModuleScssNamespace.IMainModuleScss;
};

export = MainModuleScssModule;
