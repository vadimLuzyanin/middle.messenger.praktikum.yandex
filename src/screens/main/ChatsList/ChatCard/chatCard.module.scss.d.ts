declare namespace ChatCardModuleScssNamespace {
  export interface IChatCardModuleScss {
    avatarContainer: string;
    container: string;
    date: string;
    dateAndNotifier: string;
    divider: string;
    messageAuthor: string;
    messageContainer: string;
    messageContent: string;
    notifier: string;
    outerWrapper: string;
    selected: string;
    topDivider: string;
    wrapper: string;
  }
}

declare const ChatCardModuleScssModule: ChatCardModuleScssNamespace.IChatCardModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChatCardModuleScssNamespace.IChatCardModuleScss;
};

export = ChatCardModuleScssModule;
