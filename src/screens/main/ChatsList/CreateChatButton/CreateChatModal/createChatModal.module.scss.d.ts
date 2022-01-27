declare namespace CreateChatModalModuleScssNamespace {
  export interface ICreateChatModalModuleScss {
    buttons: string;
    title: string;
    wrapper: string;
  }
}

declare const CreateChatModalModuleScssModule: CreateChatModalModuleScssNamespace.ICreateChatModalModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CreateChatModalModuleScssNamespace.ICreateChatModalModuleScss;
};

export = CreateChatModalModuleScssModule;
