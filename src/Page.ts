/* eslint-disable no-redeclare */

import { nanoid } from 'nanoid';
import type { Variant } from './types/contentTypes';

export class Page implements Page {
  id: string;

  pageTitle: string;

  icon: string;

  variants: Variant[];

  constructor(
    pagetitle: string,
    id: string,
    icon: string,
    variants: Variant[]
  ) {
    this.id = id;
    this.pageTitle = pagetitle;
    this.icon = icon;
    this.variants = variants;
  }
}

const id = nanoid();

export const pageState = new Page('Mypage about many things', id, 'bug', []);
