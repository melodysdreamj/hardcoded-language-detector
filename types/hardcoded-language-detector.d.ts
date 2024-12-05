declare module "hardcoded-language-detector" {
  interface ScriptResult {
    top: string;
    [key: string]: number | string;
  }

  function detectScriptFamily(text: string): ScriptResult;
  export = detectScriptFamily;
}
