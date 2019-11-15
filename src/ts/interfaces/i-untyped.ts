export interface IUntyped {
    [key: string]: string | number | boolean | Function | IUntyped;
}
