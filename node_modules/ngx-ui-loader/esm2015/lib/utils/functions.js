/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * Coerce a value (string) to a number
 * @param {?} value
 * @param {?} fallbackValue
 * @return {?}
 */
export function coerceNumber(value, fallbackValue) {
    return !isNaN(parseFloat((/** @type {?} */ (value)))) && !isNaN(Number(value)) ? Number(value) : fallbackValue;
}
/**
 * @param {?} config
 * @return {?}
 */
export function getExcludeObj(config) {
    /** @type {?} */
    let strs;
    /** @type {?} */
    let regExps;
    if (config) {
        if (config.exclude) {
            strs = config.exclude.map((/**
             * @param {?} url
             * @return {?}
             */
            url => url.toLowerCase()));
        }
        if (config.excludeRegexp) {
            regExps = config.excludeRegexp.map((/**
             * @param {?} regexp
             * @return {?}
             */
            regexp => new RegExp(regexp, 'i')));
        }
    }
    return { strs, regExps };
}
/**
 * @param {?} url
 * @param {?} excludeStrings
 * @param {?} excludeRegexps
 * @return {?}
 */
export function isIgnored(url, excludeStrings, excludeRegexps) {
    if (excludeStrings) {
        // do not show the loader for urls in the `exclude` list
        if (excludeStrings.findIndex((/**
         * @param {?} str
         * @return {?}
         */
        str => url.toLowerCase().startsWith(str))) !== -1) {
            return true;
        }
    }
    if (excludeRegexps) {
        // do not show the loader for urls which matches regexps in the `excludeRegexp` list
        if (excludeRegexps.findIndex((/**
         * @param {?} regexp
         * @return {?}
         */
        regexp => regexp.test(url))) !== -1) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBSyxFQUFFLGFBQWE7SUFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUNuRyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBYzs7UUFDdEMsSUFBYzs7UUFDZCxPQUFpQjtJQUVyQixJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUN4QixPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHOzs7O1lBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQUMsQ0FBQztTQUN2RTtLQUNGO0lBRUQsT0FBTyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsQ0FBQztBQUMzQixDQUFDOzs7Ozs7O0FBRUQsTUFBTSxVQUFVLFNBQVMsQ0FBQyxHQUFXLEVBQUUsY0FBd0IsRUFBRSxjQUF3QjtJQUN2RixJQUFJLGNBQWMsRUFBRTtRQUNsQix3REFBd0Q7UUFDeEQsSUFBSSxjQUFjLENBQUMsU0FBUzs7OztRQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLFdBQVcsRUFBRSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQzdFLE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUVELElBQUksY0FBYyxFQUFFO1FBQ2xCLG9GQUFvRjtRQUNwRixJQUFJLGNBQWMsQ0FBQyxTQUFTOzs7O1FBQUMsTUFBTSxDQUFDLEVBQUUsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7WUFDL0QsT0FBTyxJQUFJLENBQUM7U0FDYjtLQUNGO0lBRUQsT0FBTyxLQUFLLENBQUM7QUFDZixDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uZmlnLCBFeGNsdWRlIH0gZnJvbSAnLi9pbnRlcmZhY2VzJztcblxuLyoqXG4gKiBDb2VyY2UgYSB2YWx1ZSAoc3RyaW5nKSB0byBhIG51bWJlclxuICovXG5leHBvcnQgZnVuY3Rpb24gY29lcmNlTnVtYmVyKHZhbHVlLCBmYWxsYmFja1ZhbHVlKTogbnVtYmVyIHtcbiAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlIGFzIGFueSkpICYmICFpc05hTihOdW1iZXIodmFsdWUpKSA/IE51bWJlcih2YWx1ZSkgOiBmYWxsYmFja1ZhbHVlO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0RXhjbHVkZU9iaihjb25maWc6IENvbmZpZyk6IEV4Y2x1ZGUge1xuICBsZXQgc3Ryczogc3RyaW5nW107XG4gIGxldCByZWdFeHBzOiBSZWdFeHBbXTtcblxuICBpZiAoY29uZmlnKSB7XG4gICAgaWYgKGNvbmZpZy5leGNsdWRlKSB7XG4gICAgICBzdHJzID0gY29uZmlnLmV4Y2x1ZGUubWFwKHVybCA9PiB1cmwudG9Mb3dlckNhc2UoKSk7XG4gICAgfVxuXG4gICAgaWYgKGNvbmZpZy5leGNsdWRlUmVnZXhwKSB7XG4gICAgICByZWdFeHBzID0gY29uZmlnLmV4Y2x1ZGVSZWdleHAubWFwKHJlZ2V4cCA9PiBuZXcgUmVnRXhwKHJlZ2V4cCwgJ2knKSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHsgc3RycywgcmVnRXhwcyB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNJZ25vcmVkKHVybDogc3RyaW5nLCBleGNsdWRlU3RyaW5nczogc3RyaW5nW10sIGV4Y2x1ZGVSZWdleHBzOiBSZWdFeHBbXSk6IGJvb2xlYW4ge1xuICBpZiAoZXhjbHVkZVN0cmluZ3MpIHtcbiAgICAvLyBkbyBub3Qgc2hvdyB0aGUgbG9hZGVyIGZvciB1cmxzIGluIHRoZSBgZXhjbHVkZWAgbGlzdFxuICAgIGlmIChleGNsdWRlU3RyaW5ncy5maW5kSW5kZXgoc3RyID0+IHVybC50b0xvd2VyQ2FzZSgpLnN0YXJ0c1dpdGgoc3RyKSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoZXhjbHVkZVJlZ2V4cHMpIHtcbiAgICAvLyBkbyBub3Qgc2hvdyB0aGUgbG9hZGVyIGZvciB1cmxzIHdoaWNoIG1hdGNoZXMgcmVnZXhwcyBpbiB0aGUgYGV4Y2x1ZGVSZWdleHBgIGxpc3RcbiAgICBpZiAoZXhjbHVkZVJlZ2V4cHMuZmluZEluZGV4KHJlZ2V4cCA9PiByZWdleHAudGVzdCh1cmwpKSAhPT0gLTEpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cbiJdfQ==