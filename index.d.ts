export declare const root: boolean
export declare namespace env {
  const es2022: boolean
  const browser: boolean
}
export declare const ignorePatterns: string[]
export declare const parser: string
declare const _extends: string[]
export { _extends as extends }
export declare const rules: {
  'no-console': (string | {
    allow: string[];
  })[];
  'object-curly-spacing': (string | {
    arraysInObjects: boolean;
    objectsInObjects: boolean;
  })[];
  'comma-spacing': (string | {
    before: boolean;
    after: boolean;
  })[];
  'key-spacing': (string | {
    afterColon: boolean;
    beforeColon: boolean;
  })[];
  'object-curly-newline': (string | {
    ImportDeclaration: {
      consistent: boolean;
      multiline: boolean;
    };
    ObjectPattern: {
      consistent: boolean;
      multiline: boolean;
    };
  })[];
  'arrow-parens': string[];
  'comma-dangle': string[];
  'no-multi-spaces': string;
  'linebreak-style': string[];
  quotes: (string | {
    allowTemplateLiterals: boolean;
  })[];
  'space-infix-ops': (string | {
    int32Hint: boolean;
  })[];
  'keyword-spacing': (string | {
    before: boolean;
  })[];
  'space-before-blocks': string[];
  semi: string[];
}
export declare const overrides: {
  files: string[];
  extends: string[];
}[]
