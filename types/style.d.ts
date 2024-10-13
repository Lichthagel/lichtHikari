declare module "*.css" {

}

declare module "*?inline" {
  const styleText: string;
  export default styleText;
}
