import type { Id, Version } from './types/contentTypes';
import { generateId } from './utils/utils';

export class Variant implements Variant {
  id: string;

  name: string;

  language: string;

  mandatory: boolean;

  versions: Version[];

  constructor(
    id: Id,
    name: string,
    language: string,
    mandatory: boolean,
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
  name: 'Version B',
};

const versionC: Version = {
  id: generateId(),
  name: 'Version C',
};

const versionD: Version = {
  id: generateId(),
  name: 'Version D',
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
