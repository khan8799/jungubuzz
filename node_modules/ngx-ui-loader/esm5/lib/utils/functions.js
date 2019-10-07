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
    var strs;
    /** @type {?} */
    var regExps;
    if (config) {
        if (config.exclude) {
            strs = config.exclude.map((/**
             * @param {?} url
             * @return {?}
             */
            function (url) { return url.toLowerCase(); }));
        }
        if (config.excludeRegexp) {
            regExps = config.excludeRegexp.map((/**
             * @param {?} regexp
             * @return {?}
             */
            function (regexp) { return new RegExp(regexp, 'i'); }));
        }
    }
    return { strs: strs, regExps: regExps };
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
        function (str) { return url.toLowerCase().startsWith(str); })) !== -1) {
            return true;
        }
    }
    if (excludeRegexps) {
        // do not show the loader for urls which matches regexps in the `excludeRegexp` list
        if (excludeRegexps.findIndex((/**
         * @param {?} regexp
         * @return {?}
         */
        function (regexp) { return regexp.test(url); })) !== -1) {
            return true;
        }
    }
    return false;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9mdW5jdGlvbnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLE1BQU0sVUFBVSxZQUFZLENBQUMsS0FBSyxFQUFFLGFBQWE7SUFDL0MsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsbUJBQUEsS0FBSyxFQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLGFBQWEsQ0FBQztBQUNuRyxDQUFDOzs7OztBQUVELE1BQU0sVUFBVSxhQUFhLENBQUMsTUFBYzs7UUFDdEMsSUFBYzs7UUFDZCxPQUFpQjtJQUVyQixJQUFJLE1BQU0sRUFBRTtRQUNWLElBQUksTUFBTSxDQUFDLE9BQU8sRUFBRTtZQUNsQixJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxHQUFHLElBQUksT0FBQSxHQUFHLENBQUMsV0FBVyxFQUFFLEVBQWpCLENBQWlCLEVBQUMsQ0FBQztTQUNyRDtRQUVELElBQUksTUFBTSxDQUFDLGFBQWEsRUFBRTtZQUN4QixPQUFPLEdBQUcsTUFBTSxDQUFDLGFBQWEsQ0FBQyxHQUFHOzs7O1lBQUMsVUFBQSxNQUFNLElBQUksT0FBQSxJQUFJLE1BQU0sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEVBQXZCLENBQXVCLEVBQUMsQ0FBQztTQUN2RTtLQUNGO0lBRUQsT0FBTyxFQUFFLElBQUksTUFBQSxFQUFFLE9BQU8sU0FBQSxFQUFFLENBQUM7QUFDM0IsQ0FBQzs7Ozs7OztBQUVELE1BQU0sVUFBVSxTQUFTLENBQUMsR0FBVyxFQUFFLGNBQXdCLEVBQUUsY0FBd0I7SUFDdkYsSUFBSSxjQUFjLEVBQUU7UUFDbEIsd0RBQXdEO1FBQ3hELElBQUksY0FBYyxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFBLEdBQUcsSUFBSSxPQUFBLEdBQUcsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQWpDLENBQWlDLEVBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtZQUM3RSxPQUFPLElBQUksQ0FBQztTQUNiO0tBQ0Y7SUFFRCxJQUFJLGNBQWMsRUFBRTtRQUNsQixvRkFBb0Y7UUFDcEYsSUFBSSxjQUFjLENBQUMsU0FBUzs7OztRQUFDLFVBQUEsTUFBTSxJQUFJLE9BQUEsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBaEIsQ0FBZ0IsRUFBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1lBQy9ELE9BQU8sSUFBSSxDQUFDO1NBQ2I7S0FDRjtJQUVELE9BQU8sS0FBSyxDQUFDO0FBQ2YsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbmZpZywgRXhjbHVkZSB9IGZyb20gJy4vaW50ZXJmYWNlcyc7XG5cbi8qKlxuICogQ29lcmNlIGEgdmFsdWUgKHN0cmluZykgdG8gYSBudW1iZXJcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNvZXJjZU51bWJlcih2YWx1ZSwgZmFsbGJhY2tWYWx1ZSk6IG51bWJlciB7XG4gIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSBhcyBhbnkpKSAmJiAhaXNOYU4oTnVtYmVyKHZhbHVlKSkgPyBOdW1iZXIodmFsdWUpIDogZmFsbGJhY2tWYWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEV4Y2x1ZGVPYmooY29uZmlnOiBDb25maWcpOiBFeGNsdWRlIHtcbiAgbGV0IHN0cnM6IHN0cmluZ1tdO1xuICBsZXQgcmVnRXhwczogUmVnRXhwW107XG5cbiAgaWYgKGNvbmZpZykge1xuICAgIGlmIChjb25maWcuZXhjbHVkZSkge1xuICAgICAgc3RycyA9IGNvbmZpZy5leGNsdWRlLm1hcCh1cmwgPT4gdXJsLnRvTG93ZXJDYXNlKCkpO1xuICAgIH1cblxuICAgIGlmIChjb25maWcuZXhjbHVkZVJlZ2V4cCkge1xuICAgICAgcmVnRXhwcyA9IGNvbmZpZy5leGNsdWRlUmVnZXhwLm1hcChyZWdleHAgPT4gbmV3IFJlZ0V4cChyZWdleHAsICdpJykpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7IHN0cnMsIHJlZ0V4cHMgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzSWdub3JlZCh1cmw6IHN0cmluZywgZXhjbHVkZVN0cmluZ3M6IHN0cmluZ1tdLCBleGNsdWRlUmVnZXhwczogUmVnRXhwW10pOiBib29sZWFuIHtcbiAgaWYgKGV4Y2x1ZGVTdHJpbmdzKSB7XG4gICAgLy8gZG8gbm90IHNob3cgdGhlIGxvYWRlciBmb3IgdXJscyBpbiB0aGUgYGV4Y2x1ZGVgIGxpc3RcbiAgICBpZiAoZXhjbHVkZVN0cmluZ3MuZmluZEluZGV4KHN0ciA9PiB1cmwudG9Mb3dlckNhc2UoKS5zdGFydHNXaXRoKHN0cikpICE9PSAtMSkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGV4Y2x1ZGVSZWdleHBzKSB7XG4gICAgLy8gZG8gbm90IHNob3cgdGhlIGxvYWRlciBmb3IgdXJscyB3aGljaCBtYXRjaGVzIHJlZ2V4cHMgaW4gdGhlIGBleGNsdWRlUmVnZXhwYCBsaXN0XG4gICAgaWYgKGV4Y2x1ZGVSZWdleHBzLmZpbmRJbmRleChyZWdleHAgPT4gcmVnZXhwLnRlc3QodXJsKSkgIT09IC0xKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXX0=