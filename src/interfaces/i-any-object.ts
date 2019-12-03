export interface IAnyObject {
  [key: string]: string | number | boolean | Function | IAnyObject;
}
