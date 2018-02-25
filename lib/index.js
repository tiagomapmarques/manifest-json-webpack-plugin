"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var webpack_sources_1 = require("webpack-sources");
var parseFilepath = require("parse-filepath");
var mime = require("mime-to-extensions");
var INDENTATION = 2;
var ManifestJsonPlugin = (function () {
    function ManifestJsonPlugin(config) {
        this.config = config;
        this.assets = {};
    }
    ManifestJsonPlugin.prototype.apply = function (compiler) {
        var _this = this;
        compiler.plugin('emit', function (compilation, done) {
            _this.assets = compilation.assets;
            compilation.assets[(_this.config.path || '') + "/manifest.json"] = _this.getManifest();
            done();
        });
    };
    ManifestJsonPlugin.prototype.getManifest = function () {
        var manifestJson = {
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
        var indentation = this.config.pretty && INDENTATION || undefined;
        return new webpack_sources_1.RawSource(JSON.stringify(manifestJson, null, indentation));
    };
    ManifestJsonPlugin.prototype.getIcons = function () {
        var _this = this;
        var icons = [];
        if (this.config.icons && typeof this.config.icons === 'string') {
            icons = Object.keys(this.assets)
                .filter(function (asset) { return asset.indexOf(_this.config.icons) === 0; });
        }
        else if (this.config.icons && typeof this.config.icons === 'object' && this.config.icons.length) {
            icons = this.config.icons;
        }
        return icons.map(function (icon) { return _this.iconToManifest(icon); }).filter(function (icon) { return icon.type.indexOf('image/') === 0; });
    };
    ManifestJsonPlugin.prototype.iconToManifest = function (file) {
        var sizes = (new RegExp('[0-9]+x[0-9]+')).exec(parseFilepath(file).name);
        return {
            src: file,
            type: mime.lookup(file),
            sizes: sizes && sizes[sizes.length - 1] || undefined,
        };
    };
    return ManifestJsonPlugin;
}());
exports.default = ManifestJsonPlugin;
