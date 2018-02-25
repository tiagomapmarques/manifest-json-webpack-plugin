
export interface ManifestIcon {
  src: string;
  type: string;
  sizes?: string | string[];
}

export interface ConfigurationInput {
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

export interface Configuration {
  name: string;
  short_name: string;
  description: string;
  lang: string;
  icons: ManifestIcon[];
  start_url: string;
  scope: string;
  dir: string;
  orientation: string;
  display: string;
  background_color: string;
  theme_color: string;
}
