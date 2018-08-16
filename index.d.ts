import { Plugin } from 'webpack';

interface Configuration {
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

export default ManifestJsonPlugin;

declare class ManifestJsonPlugin extends Plugin {
  constructor(configuration: Configuration);
}

declare namespace ManifestJsonPlugin {}
