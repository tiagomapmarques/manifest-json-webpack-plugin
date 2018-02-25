
declare module 'parse-filepath' {
  interface ParseFilepathResult {
    root: string;
    dir: string;
    base: string;
    ext: string;
    name: string;
    extname: string;
    basename: string;
    dirname: string;
    stem: string;
    path: string;
  }

  let parseFilepath: (filename: string) => ParseFilepathResult;
  export = parseFilepath;
}
