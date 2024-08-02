export interface IRequestHandler<O> {
  handle(...p: any): O;
}
