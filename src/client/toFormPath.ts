export const toFormPath = (path: string | undefined, name: string) => {
    return path ? `${path}.${name}` : name;
}