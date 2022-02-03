declare namespace ProfileButtonModuleScssNamespace {
  export interface IProfileButtonModuleScss {
    button: string;
    inner: string;
  }
}

declare const ProfileButtonModuleScssModule: ProfileButtonModuleScssNamespace.IProfileButtonModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ProfileButtonModuleScssNamespace.IProfileButtonModuleScss;
};

export = ProfileButtonModuleScssModule;
