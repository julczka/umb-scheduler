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
    publications: Publication[],
  ) {
    this.id = id;
    this.name = name;
    this.language = language;
    this.mandatory = mandatory;
    this.versions = versions;
    this.publications = publications;
  }
}

const versionA: Version = {
  id: 'kjhdsajk87216',
  name: 'Version A',
};

const versionB: Version = {
  id: '897qwe76dshgd',
  name: 'Version A',
};

const versionC: Version = {
  id: 'hsa89qw67wqdcs',
  name: 'Version A',
};

const versionD: Version = {
  id: '897398712dqawd',
  name: 'Version A',
};

export const Variant1: Variant = {
  id: 'jhjkdhakjdsh87112',

  name: 'English (USA)',

  language: 'ENG',

  mandatory: true,

  versions: [versionA, versionB],

  publications: [],
};

export const Variant2: Variant = {
  id: 'ashgaa762ew0ds',

  name: 'Danish',

  language: 'DK',

  mandatory: false,

  versions: [versionC, versionD],

  publications: [],
};
