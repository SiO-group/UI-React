export const createComponentType = (name: string) => Symbol.for(name);

export const isComponentType = (child: any, type: Symbol): boolean => child?.type?.$$type === type;