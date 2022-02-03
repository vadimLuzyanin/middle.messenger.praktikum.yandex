declare namespace ModalContentModuleScssNamespace {
  export interface IModalContentModuleScss {
    wrapper: string;
  }
}

declare const ModalContentModuleScssModule: ModalContentModuleScssNamespace.IModalContentModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ModalContentModuleScssNamespace.IModalContentModuleScss;
};

export = ModalContentModuleScssModule;
