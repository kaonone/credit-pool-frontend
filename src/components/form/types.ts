export type FieldNames<T extends Record<string, any>> = {
  [key in keyof T]: key;
};
