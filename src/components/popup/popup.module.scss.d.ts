declare namespace PopupModuleScssNamespace {
  export interface IPopupModuleScss {
    popup: string;
    warn: string;
  }
}

declare const PopupModuleScssModule: PopupModuleScssNamespace.IPopupModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: PopupModuleScssNamespace.IPopupModuleScss;
};

export = PopupModuleScssModule;
