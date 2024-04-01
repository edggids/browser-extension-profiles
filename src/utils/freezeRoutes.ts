export type FrozenRoutes<T> = T extends object
  ? Readonly<{[p in keyof T ]: (p extends 'component' ? T[p]: FrozenRoutes<T[p]>)}>
  : T

export function freezeRoutes<T extends object>(target: T)
{
    const propNames = Object.keys(target);

    for (const name of propNames) {
        // we don't want to freeze the component
        if (typeof target[name] === 'object' && name !== 'component') {
            target[name] = freezeRoutes(target[name]);
        }
    }

    return Object.freeze(target) as FrozenRoutes<T>;
}
