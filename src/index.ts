import { Compiler } from 'webpack';
import { RawSource, Source } from 'webpack-sources';
import * as parseFilepath from 'parse-filepath';
import * as mime from 'mime-to-extensions';
import { ManifestIcon, ConfigurationInput, Configuration } from './types';

export interface AssetsObject {
  [key: string]: Source;
}

const INDENTATION = 2;

// tslint:disable-next-line no-default-export
export default class ManifestJsonPlugin {
  private config: ConfigurationInput;
  private assets: AssetsObject;

  constructor(config: ConfigurationInput) {
    this.config = config;
    this.assets = {};
  }

  public apply(compiler: Compiler) {
    compiler.plugin('emit', (compilation: { assets: AssetsObject }, done: Function) => {
      this.assets = compilation.assets;
      compilation.assets[`${this.config.path || ''}/manifest.json`] = this.getManifest();
      done();
    });
  }

  private getManifest(): RawSource {
    const manifestJson: Configuration = {
      name: this.config.name,
      short_name: this.config.short_name || this.config.name,
      description: this.config.description,
      lang: this.config.lang,
      icons: this.getIcons(),
      start_url: this.config.start_url || '.',
      scope: this.config.scope || '/',
      dir: this.config.dir || 'ltr',
      orientation: this.config.orientation || 'portrait-primary',
      display: this.config.display || 'browser',
      background_color: this.config.background_color || 'white',
      theme_color: this.config.theme_color || 'black',
    };
    const indentation = this.config.pretty && INDENTATION || undefined;
    return new RawSource(JSON.stringify(manifestJson, null, indentation));
  }

  private getIcons(): ManifestIcon[] {
    let icons: string[] = [];
    if (this.config.icons && typeof this.config.icons === 'string') {
      icons = Object.keys(this.assets)
        .filter(asset => asset.indexOf(this.config.icons as string) === 0);
    } else if (this.config.icons && typeof this.config.icons === 'object' && this.config.icons.length) {
      icons = this.config.icons;
    }
    return icons.map(icon => this.iconToManifest(icon)).filter(icon => icon.type.indexOf('image/') === 0);
  }

  private iconToManifest(file: string): ManifestIcon {
    const sizes = (new RegExp('[0-9]+x[0-9]+')).exec(parseFilepath(file).name);
    return {
      src: file,
      type: mime.lookup(file),
      sizes: sizes && sizes[sizes.length - 1] || undefined,
    };
  }
}
