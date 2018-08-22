import { Compiler, compilation } from 'webpack';
import { RawSource } from 'webpack-sources';
import * as parseFilepath from 'parse-filepath';
import * as mime from 'mime-to-extensions';
import { ManifestIcon, Options, AssetsObject } from './types';

const INDENTATION = 2;

class ManifestJsonPlugin {
  private options: Options;
  private indentation: number;
  private path: string;

  constructor(options: Options) {
    this.options = options;
    this.indentation = (this.options.pretty && INDENTATION) || 0;
    this.path = `${this.options.path || ''}/manifest.json`.replace('//', '/');
  }

  public apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(
      'ManifestJsonPlugin',
      (compilationObject: compilation.Compilation, done: Function) => {
        compilationObject.assets[this.path] = this.getManifestSource(compilationObject.assets);
        done();
      },
    );
  }

  private getManifestSource(assets: AssetsObject): RawSource {
    return new RawSource(JSON.stringify({
      name: this.options.name,
      short_name: this.options.short_name || this.options.name,
      description: this.options.description,
      lang: this.options.lang,
      icons: this.getIcons(assets),
      start_url: this.options.start_url || '.',
      scope: this.options.scope || '/',
      dir: this.options.dir || 'ltr',
      orientation: this.options.orientation || 'portrait-primary',
      display: this.options.display || 'browser',
      background_color: this.options.background_color || 'white',
      theme_color: this.options.theme_color || 'black',
    }, null, this.indentation));
  }

  private getIcons(assets: AssetsObject): ManifestIcon[] {
    let icons: string[] = [];
    if (this.options.icons && typeof this.options.icons === 'string') {
      icons = Object.keys(assets)
        .filter(asset => asset.indexOf(this.options.icons as string) === 0);
    } else if (
      this.options.icons &&
      typeof this.options.icons === 'object' &&
      this.options.icons.length
    ) {
      icons = this.options.icons;
    }
    return icons.map(icon => this.iconToManifest(icon))
      .filter(icon => icon.type.indexOf('image/') === 0);
  }

  private iconToManifest(src: string): ManifestIcon {
    const sizes = (new RegExp('[0-9]+x[0-9]+')).exec(parseFilepath(src).name);
    return {
      src,
      type: mime.lookup(src),
      sizes: (sizes && sizes[sizes.length - 1]) || undefined,
    };
  }
}

module.exports = ManifestJsonPlugin;
