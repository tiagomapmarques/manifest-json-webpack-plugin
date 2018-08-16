"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const parseFilepath = require("parse-filepath");
const mime = require("mime-to-extensions");
const INDENTATION = 2;
// tslint:disable-next-line no-default-export
class ManifestJsonPlugin {
    constructor(config) {
        this.config = config;
        this.assets = {};
    }
    apply(compiler) {
        compiler.plugin('emit', (compilation, done) => {
            this.assets = compilation.assets;
            compilation.assets[`${this.config.path || ''}/manifest.json`] = this.getManifest();
            done();
        });
    }
    getManifest() {
        const manifestJson = {
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
        return new webpack_sources_1.RawSource(JSON.stringify(manifestJson, null, indentation));
    }
    getIcons() {
        let icons = [];
        if (this.config.icons && typeof this.config.icons === 'string') {
            icons = Object.keys(this.assets)
                .filter(asset => asset.indexOf(this.config.icons) === 0);
        }
        else if (this.config.icons && typeof this.config.icons === 'object' && this.config.icons.length) {
            icons = this.config.icons;
        }
        return icons.map(icon => this.iconToManifest(icon)).filter(icon => icon.type.indexOf('image/') === 0);
    }
    iconToManifest(file) {
        const sizes = (new RegExp('[0-9]+x[0-9]+')).exec(parseFilepath(file).name);
        return {
            src: file,
            type: mime.lookup(file),
            sizes: sizes && sizes[sizes.length - 1] || undefined,
        };
    }
}
module.exports = ManifestJsonPlugin;
//# sourceMappingURL=index.js.map