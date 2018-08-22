import { Plugin, Compiler } from 'webpack';

export = ManifestJsonPlugin;

declare class ManifestJsonPlugin extends Plugin {
    constructor(config: ManifestJsonPlugin.Options);
    apply(compiler: Compiler): void;
}

declare namespace ManifestJsonPlugin {
    interface Options {
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
}
