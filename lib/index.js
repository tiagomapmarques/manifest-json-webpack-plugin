"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const webpack_sources_1 = require("webpack-sources");
const parseFilepath = require("parse-filepath");
const mime = require("mime-to-extensions");
const INDENTATION = 2;
class ManifestJsonPlugin {
    constructor(options) {
        this.options = options;
        this.indentation = (this.options.pretty && INDENTATION) || 0;
        this.path = `${this.options.path || ''}/manifest.json`.replace('//', '/');
    }
    apply(compiler) {
        compiler.hooks.emit.tap('ManifestJsonPlugin', (compilationObject) => {
            compilationObject.assets[this.path] = this.getManifestSource(compilationObject.assets);
        });
    }
    getManifestSource(assets) {
        return new webpack_sources_1.RawSource(JSON.stringify({
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
    getIcons(assets) {
        let icons = [];
        if (this.options.icons && typeof this.options.icons === 'string') {
            icons = Object.keys(assets)
                .filter(asset => asset.indexOf(this.options.icons) === 0);
        }
        else if (this.options.icons &&
            typeof this.options.icons === 'object' &&
            this.options.icons.length) {
            icons = this.options.icons;
        }
        return icons.map(icon => this.iconToManifest(icon))
            .filter(icon => icon.type.indexOf('image/') === 0);
    }
    iconToManifest(src) {
        const sizes = (new RegExp('[0-9]+x[0-9]+')).exec(parseFilepath(src).name);
        return {
            src,
            type: mime.lookup(src),
            sizes: (sizes && sizes[sizes.length - 1]) || undefined,
        };
    }
}
module.exports = ManifestJsonPlugin;
//# sourceMappingURL=index.js.map