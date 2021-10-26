export interface Module {
    id: string,
    description: string,
    isDefault: boolean,
    urlMatch: (currentUrl: string, oldUrl: string) => boolean,
    code: () => void,
    load?: () => void
}