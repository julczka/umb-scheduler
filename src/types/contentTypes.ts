export type Id = string;
export interface Publication {
  id: Id;
  start: Date | null;
  end: Date | null;
  versionId: Id;
  variantId: Id;
}

export interface Version {
  id: Id;
  name: string;
  author?: string;
}
export interface Variant {
  id: Id;
  name?: string;
  language: string;
  mandatory: boolean;
  versions: Version[];
}

export interface Page {
  id: Id;
  pageTitle: string;
  icon: string;
  variants: Variant[];
  publications?: Publication[];
}
