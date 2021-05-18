export type Id = String;
export interface Publication {
  id: Id;
  start: Date | null;
  end: Date | null;
  versionId: Id;
}

export interface Version {
  id: Id;
  name: String;
  author?: string;
}
export interface Variant {
  id: Id;
  name?: String;
  language: String;
  mandatory: Boolean;
  versions: Version[];
  publications?: Publication[];
}

export interface Page {
  id: Id;
  pageTitle: String;
  icon: String;
  variants: Variant[];
}
