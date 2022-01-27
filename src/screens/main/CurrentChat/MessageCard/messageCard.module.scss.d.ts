declare namespace MessageCardModuleScssNamespace {
  export interface IMessageCardModuleScss {
    card: string;
    notReaded: string;
    readed: string;
    received: string;
    sent: string;
    time: string;
  }
}

declare const MessageCardModuleScssModule: MessageCardModuleScssNamespace.IMessageCardModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MessageCardModuleScssNamespace.IMessageCardModuleScss;
};

export = MessageCardModuleScssModule;
