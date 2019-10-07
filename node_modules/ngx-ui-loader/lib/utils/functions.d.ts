import { Config, Exclude } from './interfaces';
/**
 * Coerce a value (string) to a number
 */
export declare function coerceNumber(value: any, fallbackValue: any): number;
export declare function getExcludeObj(config: Config): Exclude;
export declare function isIgnored(url: string, excludeStrings: string[], excludeRegexps: RegExp[]): boolean;
