declare namespace ActionModalModuleScssNamespace {
  export interface IActionModalModuleScss {
    inputWrapper: string;
    title: string;
    wrapper: string;
  }
}

declare const ActionModalModuleScssModule: ActionModalModuleScssNamespace.IActionModalModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActionModalModuleScssNamespace.IActionModalModuleScss;
};

export = ActionModalModuleScssModule;
