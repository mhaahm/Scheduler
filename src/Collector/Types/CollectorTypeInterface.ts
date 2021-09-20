export interface CollectorTypeInterface {
  createScriptFile(): string;
  createLauncherFile(param: string): string;
}
