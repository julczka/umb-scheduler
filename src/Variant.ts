import type { Id, Publication, Version } from './types/contentTypes';

export class Variant implements Variant {
  id: String;

  name: String;

  language: String;

  mandatory: Boolean;

  versions: Version[];

  publications: Publication[] | undefined;

  constructor(
    id: Id,
    name: String,
    language: String,
    mandatory: Boolean,
    versions: Version[],
    publications?: Publication[],
  ) {
    this.id = id;
    this.name = name;
    this.language = language;
    this.mandatory = mandatory;
    this.versions = versions;
    this.publications = publications;
  }
}
