export type Id = String;

export interface Content {
  id: Id;
  pageTitle: String;
  icon: String;
  variants: Variant[];
}

export interface Variant {
  id: Id;
  name?: String;
  language: String;
  mandatory: Boolean;
  versions: Version[];
  publications: Publication[];
}

export interface Version {
  id: Id;
  name: String;
  author?: string;
  publications: Publication[];
}

export interface Publication {
  id: Id;
  start: Date | null;
  end: Date | null;
}
