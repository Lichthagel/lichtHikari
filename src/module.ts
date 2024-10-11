export type Module = {
  code: () => Promise<void> | void;
  description: string;
  id: string;
  isDefault: boolean;
  load?: () => void;
  urlMatch: (currentUrl: string, oldUrl: string) => boolean;
};
