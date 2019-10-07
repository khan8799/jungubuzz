/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Injectable, Inject, Optional } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { HTTP_LOADER_TASK_ID } from '../utils/constants';
import { getExcludeObj, isIgnored } from '../utils/functions';
var NgxUiLoaderHttpInterceptor = /** @class */ (function () {
    /**
     * Constructor
     */
    function NgxUiLoaderHttpInterceptor(customConfig, loader) {
        this.loader = loader;
        this.count = 0;
        this.config = {
            loaderId: this.loader.getDefaultConfig().masterLoaderId,
            showForeground: false
        };
        this.exclude = getExcludeObj(customConfig);
        if (customConfig) {
            this.config = tslib_1.__assign({}, this.config, customConfig);
        }
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    NgxUiLoaderHttpInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        var _this = this;
        if (isIgnored(req.url, this.exclude.strs, this.exclude.regExps)) {
            return next.handle(req);
        }
        this.count++;
        if (this.config.showForeground) {
            this.loader.startLoader(this.config.loaderId, HTTP_LOADER_TASK_ID, this.config);
        }
        else {
            this.loader.startBackgroundLoader(this.config.loaderId, HTTP_LOADER_TASK_ID, this.config);
        }
        return next.handle(req).pipe(finalize((/**
         * @return {?}
         */
        function () {
            _this.count--;
            if (_this.count === 0) {
                if (_this.config.showForeground) {
                    _this.loader.stopLoader(_this.config.loaderId, HTTP_LOADER_TASK_ID);
                }
                else {
                    _this.loader.stopBackgroundLoader(_this.config.loaderId, HTTP_LOADER_TASK_ID);
                }
            }
        })));
    };
    NgxUiLoaderHttpInterceptor.decorators = [
        { type: Injectable }
    ];
    /** @nocollapse */
    NgxUiLoaderHttpInterceptor.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_HTTP_CONFIG_TOKEN,] }] },
        { type: NgxUiLoaderService }
    ]; };
    return NgxUiLoaderHttpInterceptor;
}());
export { NgxUiLoaderHttpInterceptor };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.count;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.config;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.exclude;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderHttpInterceptor.prototype.loader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9odHRwL25neC11aS1sb2FkZXItaHR0cC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUc3RCxPQUFPLEVBQUUsUUFBUSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFFMUMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFDbkUsT0FBTyxFQUFFLCtCQUErQixFQUFFLE1BQU0sbUNBQW1DLENBQUM7QUFFcEYsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDekQsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUc5RDtJQU1FOztPQUVHO0lBQ0gsb0NBQ3VELFlBQW1DLEVBQ2hGLE1BQTBCO1FBQTFCLFdBQU0sR0FBTixNQUFNLENBQW9CO1FBRWxDLElBQUksQ0FBQyxLQUFLLEdBQUcsQ0FBQyxDQUFDO1FBQ2YsSUFBSSxDQUFDLE1BQU0sR0FBRztZQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsY0FBYztZQUN2RCxjQUFjLEVBQUUsS0FBSztTQUN0QixDQUFDO1FBRUYsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFM0MsSUFBSSxZQUFZLEVBQUU7WUFDaEIsSUFBSSxDQUFDLE1BQU0sd0JBQVEsSUFBSSxDQUFDLE1BQU0sRUFBSyxZQUFZLENBQUUsQ0FBQztTQUNuRDtJQUNILENBQUM7Ozs7OztJQUVELDhDQUFTOzs7OztJQUFULFVBQVUsR0FBcUIsRUFBRSxJQUFpQjtRQUFsRCxpQkF3QkM7UUF2QkMsSUFBSSxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQy9ELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztTQUN6QjtRQUVELElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNiLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxjQUFjLEVBQUU7WUFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQ2pGO2FBQU07WUFDTCxJQUFJLENBQUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLG1CQUFtQixFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUMzRjtRQUVELE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQzFCLFFBQVE7OztRQUFDO1lBQ1AsS0FBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxLQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxLQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtvQkFDOUIsS0FBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsS0FBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztpQkFDbkU7cUJBQU07b0JBQ0wsS0FBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxLQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2lCQUM3RTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7O2dCQWxERixVQUFVOzs7O2dEQVVOLFFBQVEsWUFBSSxNQUFNLFNBQUMsK0JBQStCO2dCQWpCOUMsa0JBQWtCOztJQTBEM0IsaUNBQUM7Q0FBQSxBQW5ERCxJQW1EQztTQWxEWSwwQkFBMEI7Ozs7OztJQUNyQywyQ0FBc0I7Ozs7O0lBQ3RCLDRDQUFzQzs7Ozs7SUFDdEMsNkNBQXlCOzs7OztJQU92Qiw0Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlLCBJbmplY3QsIE9wdGlvbmFsIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBIdHRwSW50ZXJjZXB0b3IsIEh0dHBFdmVudCwgSHR0cEhhbmRsZXIsIEh0dHBSZXF1ZXN0IH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuaW1wb3J0IHsgZmluYWxpemUgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IE5neFVpTG9hZGVyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbmd4LXVpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5HWF9VSV9MT0FERVJfSFRUUF9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC11aS1sb2FkZXItaHR0cC1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJIdHRwQ29uZmlnIH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBIVFRQX0xPQURFUl9UQVNLX0lEIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEV4Y2x1ZGVPYmosIGlzSWdub3JlZCB9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XG5cbkBJbmplY3RhYmxlKClcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlckh0dHBJbnRlcmNlcHRvciBpbXBsZW1lbnRzIEh0dHBJbnRlcmNlcHRvciB7XG4gIHByaXZhdGUgY291bnQ6IG51bWJlcjtcbiAgcHJpdmF0ZSBjb25maWc6IE5neFVpTG9hZGVySHR0cENvbmZpZztcbiAgcHJpdmF0ZSBleGNsdWRlOiBFeGNsdWRlO1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQEluamVjdChOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOKSBjdXN0b21Db25maWc6IE5neFVpTG9hZGVySHR0cENvbmZpZyxcbiAgICBwcml2YXRlIGxvYWRlcjogTmd4VWlMb2FkZXJTZXJ2aWNlXG4gICkge1xuICAgIHRoaXMuY291bnQgPSAwO1xuICAgIHRoaXMuY29uZmlnID0ge1xuICAgICAgbG9hZGVySWQ6IHRoaXMubG9hZGVyLmdldERlZmF1bHRDb25maWcoKS5tYXN0ZXJMb2FkZXJJZCxcbiAgICAgIHNob3dGb3JlZ3JvdW5kOiBmYWxzZVxuICAgIH07XG5cbiAgICB0aGlzLmV4Y2x1ZGUgPSBnZXRFeGNsdWRlT2JqKGN1c3RvbUNvbmZpZyk7XG5cbiAgICBpZiAoY3VzdG9tQ29uZmlnKSB7XG4gICAgICB0aGlzLmNvbmZpZyA9IHsgLi4udGhpcy5jb25maWcsIC4uLmN1c3RvbUNvbmZpZyB9O1xuICAgIH1cbiAgfVxuXG4gIGludGVyY2VwdChyZXE6IEh0dHBSZXF1ZXN0PGFueT4sIG5leHQ6IEh0dHBIYW5kbGVyKTogT2JzZXJ2YWJsZTxIdHRwRXZlbnQ8YW55Pj4ge1xuICAgIGlmIChpc0lnbm9yZWQocmVxLnVybCwgdGhpcy5leGNsdWRlLnN0cnMsIHRoaXMuZXhjbHVkZS5yZWdFeHBzKSkge1xuICAgICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSk7XG4gICAgfVxuXG4gICAgdGhpcy5jb3VudCsrO1xuICAgIGlmICh0aGlzLmNvbmZpZy5zaG93Rm9yZWdyb3VuZCkge1xuICAgICAgdGhpcy5sb2FkZXIuc3RhcnRMb2FkZXIodGhpcy5jb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX1RBU0tfSUQsIHRoaXMuY29uZmlnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5sb2FkZXIuc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKHRoaXMuY29uZmlnLmxvYWRlcklkLCBIVFRQX0xPQURFUl9UQVNLX0lELCB0aGlzLmNvbmZpZyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHQuaGFuZGxlKHJlcSkucGlwZShcbiAgICAgIGZpbmFsaXplKCgpID0+IHtcbiAgICAgICAgdGhpcy5jb3VudC0tO1xuICAgICAgICBpZiAodGhpcy5jb3VudCA9PT0gMCkge1xuICAgICAgICAgIGlmICh0aGlzLmNvbmZpZy5zaG93Rm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5sb2FkZXIuc3RvcExvYWRlcih0aGlzLmNvbmZpZy5sb2FkZXJJZCwgSFRUUF9MT0FERVJfVEFTS19JRCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLnN0b3BCYWNrZ3JvdW5kTG9hZGVyKHRoaXMuY29uZmlnLmxvYWRlcklkLCBIVFRQX0xPQURFUl9UQVNLX0lEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcbiAgfVxufVxuIl19