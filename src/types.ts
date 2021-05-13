export type Id = String;

export interface Content {
  id: Id;
  pageTitle: String;
  variants: Variant[];
}

export interface Variant {
  id: Id;
  name: String;
  language: String;
  publications: Publication[];
}

export interface Publication {
  start: Date;
  end: Date;
}
