declare namespace InputModuleScssNamespace {
  export interface IInputModuleScss {
    errorMessage: string;
    fixPlaceholder: string;
    input: string;
    inputWrapper: string;
    placeholder: string;
    wrapper: string;
  }
}

declare const InputModuleScssModule: InputModuleScssNamespace.IInputModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: InputModuleScssNamespace.IInputModuleScss;
};

export = InputModuleScssModule;
