declare namespace CurrentChatModuleScssNamespace {
  export interface ICurrentChatModuleScss {
    actions: string;
    avatarContainer: string;
    chatContent: string;
    chatInfo: string;
    chatName: string;
    header: string;
    stub: string;
    usersCount: string;
    wrapper: string;
  }
}

declare const CurrentChatModuleScssModule: CurrentChatModuleScssNamespace.ICurrentChatModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: CurrentChatModuleScssNamespace.ICurrentChatModuleScss;
};

export = CurrentChatModuleScssModule;
