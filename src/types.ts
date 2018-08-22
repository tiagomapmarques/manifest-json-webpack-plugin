import { Source } from 'webpack-sources';

export interface AssetsObject {
  [key: string]: Source;
}

export interface ManifestIcon {
  src: string;
  type: string;
  sizes?: string | string[];
}

export interface Options {
  path: string;
  pretty: boolean;
  name: string;
  description: string;
  lang: string;
  short_name?: string;
  icons?: string | string[];
  start_url?: string;
  scope?: string;
  dir?: string;
  orientation?: string;
  display?: string;
  background_color?: string;
  theme_color?: string;
}
