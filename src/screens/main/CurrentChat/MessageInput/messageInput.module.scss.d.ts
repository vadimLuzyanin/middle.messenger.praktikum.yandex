declare namespace MessageInputModuleScssNamespace {
  export interface IMessageInputModuleScss {
    attachButton: string;
    input: string;
    notValid: string;
    sendButton: string;
    wrapper: string;
  }
}

declare const MessageInputModuleScssModule: MessageInputModuleScssNamespace.IMessageInputModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: MessageInputModuleScssNamespace.IMessageInputModuleScss;
};

export = MessageInputModuleScssModule;
