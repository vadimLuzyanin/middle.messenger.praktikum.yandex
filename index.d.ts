declare module "*.hbs" {
  const templateFn: (params: any) => string;
  export default templateFn;
}

declare module "*.svg" {
  const src: string;
  export default src;
}
