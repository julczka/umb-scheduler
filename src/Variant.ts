import type { Id, Version } from './types/contentTypes';
import { generateId } from './utils/utils';

export class Variant implements Variant {
  id: String;

  name: String;

  language: String;

  mandatory: Boolean;

  versions: Version[];

  constructor(
    id: Id,
    name: String,
    language: String,
    mandatory: Boolean,
    versions: Version[],
  ) {
    this.id = id;
    this.name = name;
    this.language = language;
    this.mandatory = mandatory;
    this.versions = versions;
  }
}

const versionA: Version = {
  id: generateId(),
  name: 'Version A',
};

const versionB: Version = {
  id: generateId(),
  name: 'Version A',
};

const versionC: Version = {
  id: generateId(),
  name: 'Version A',
};

const versionD: Version = {
  id: generateId(),
  name: 'Version A',
};

export const Variant1: Variant = {
  id: generateId(),

  name: 'English (USA)',

  language: 'ENG',

  mandatory: true,

  versions: [versionA, versionB],
};

export const Variant2: Variant = {
  id: generateId(),

  name: 'Danish',

  language: 'DK',

  mandatory: false,

  versions: [versionC, versionD],
};
