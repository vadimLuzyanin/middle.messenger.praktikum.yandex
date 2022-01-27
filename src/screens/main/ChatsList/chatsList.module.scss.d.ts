declare namespace ChatsListModuleScssNamespace {
  export interface IChatsListModuleScss {
    cards: string;
    topButtonsWrapper: string;
    wrapper: string;
  }
}

declare const ChatsListModuleScssModule: ChatsListModuleScssNamespace.IChatsListModuleScss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: ChatsListModuleScssNamespace.IChatsListModuleScss;
};

export = ChatsListModuleScssModule;
