declare namespace SettingsModuleScssNamespace {
  export interface ISettingsModuleScss {
    avatar: string;
    avatarContainer: string;
    avatarContainerWithHover: string;
    back: string;
    backIcon: string;
    buttons: string;
    content: string;
    field: string;
    fieldName: string;
    fields: string;
    name: string;
    wrapper: string;
  }
}

declare const SettingsModuleScssModule: SettingsModuleScssNamespace.ISettingsModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SettingsModuleScssNamespace.ISettingsModuleScss;
};

export = SettingsModuleScssModule;
