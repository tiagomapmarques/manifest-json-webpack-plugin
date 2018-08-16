import { Plugin, Compiler } from 'webpack';

export = ManifestJsonPlugin;

declare class ManifestJsonPlugin extends Plugin {
    private config;
    private assets;
    constructor(config: ManifestJsonPlugin.ConfigurationInput);
    apply(compiler: Compiler): void;
    private getManifest;
    private getIcons;
    private iconToManifest;
}

declare namespace ManifestJsonPlugin {
    interface ConfigurationInput {
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
