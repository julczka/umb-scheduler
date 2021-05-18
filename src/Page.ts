/* eslint-disable no-redeclare */

import type { Publication, Variant } from './types/contentTypes';

export class Page implements Page {
  id: string;

  pageTitle: string;

  icon: string;

  variants: Variant[];

  publications: Publication[];

  constructor(
    pagetitle: string,
    id: string,
    icon: string,
    variants: Variant[],
    publications: Publication[],
  ) {
    this.id = id;
    this.pageTitle = pagetitle;
    this.icon = icon;
    this.variants = variants;
    this.publications = publications;
  }
}

const id = 'kjaskjdjkh128712786';

export const pageInitialState = new Page(
  'Mypage about many things',
  id,
  'bug',
  [],
  [],
);
