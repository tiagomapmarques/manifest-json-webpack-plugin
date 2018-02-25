
declare module 'mime-to-extensions' {
  interface MimeToExtensions {
    lookup: (str: string) => string;
    contentType: (str: string) => string;
    extension: (str: string) => string;
    allExtensions: (str: string) => string[];
    charset: (str: string) => string;
  }

  let mimeToExtensions: MimeToExtensions;
  export = mimeToExtensions;
}
