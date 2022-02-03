declare namespace ActionButtonModuleScssNamespace {
  export interface IActionButtonModuleScss {
    action: string;
    addUserIcon: string;
    removeUserIcon: string;
  }
}

declare const ActionButtonModuleScssModule: ActionButtonModuleScssNamespace.IActionButtonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ActionButtonModuleScssNamespace.IActionButtonModuleScss;
};

export = ActionButtonModuleScssModule;
