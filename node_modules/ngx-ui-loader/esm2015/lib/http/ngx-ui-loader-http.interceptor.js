/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Injectable, Inject, Optional } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
import { HTTP_LOADER_TASK_ID } from '../utils/constants';
import { getExcludeObj, isIgnored } from '../utils/functions';
export class NgxUiLoaderHttpInterceptor {
    /**
     * Constructor
     * @param {?} customConfig
     * @param {?} loader
     */
    constructor(customConfig, loader) {
        this.loader = loader;
        this.count = 0;
        this.config = {
            loaderId: this.loader.getDefaultConfig().masterLoaderId,
            showForeground: false
        };
        this.exclude = getExcludeObj(customConfig);
        if (customConfig) {
            this.config = Object.assign({}, this.config, customConfig);
        }
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    intercept(req, next) {
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
        () => {
            this.count--;
            if (this.count === 0) {
                if (this.config.showForeground) {
                    this.loader.stopLoader(this.config.loaderId, HTTP_LOADER_TASK_ID);
                }
                else {
                    this.loader.stopBackgroundLoader(this.config.loaderId, HTTP_LOADER_TASK_ID);
                }
            }
        })));
    }
}
NgxUiLoaderHttpInterceptor.decorators = [
    { type: Injectable }
];
/** @nocollapse */
NgxUiLoaderHttpInterceptor.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_HTTP_CONFIG_TOKEN,] }] },
    { type: NgxUiLoaderService }
];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLmludGVyY2VwdG9yLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9odHRwL25neC11aS1sb2FkZXItaHR0cC5pbnRlcmNlcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBRzdELE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUUxQyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSwrQkFBK0IsQ0FBQztBQUNuRSxPQUFPLEVBQUUsK0JBQStCLEVBQUUsTUFBTSxtQ0FBbUMsQ0FBQztBQUVwRixPQUFPLEVBQUUsbUJBQW1CLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsYUFBYSxFQUFFLFNBQVMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBSTlELE1BQU0sT0FBTywwQkFBMEI7Ozs7OztJQVFyQyxZQUN1RCxZQUFtQyxFQUNoRixNQUEwQjtRQUExQixXQUFNLEdBQU4sTUFBTSxDQUFvQjtRQUVsQyxJQUFJLENBQUMsS0FBSyxHQUFHLENBQUMsQ0FBQztRQUNmLElBQUksQ0FBQyxNQUFNLEdBQUc7WUFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGNBQWM7WUFDdkQsY0FBYyxFQUFFLEtBQUs7U0FDdEIsQ0FBQztRQUVGLElBQUksQ0FBQyxPQUFPLEdBQUcsYUFBYSxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBRTNDLElBQUksWUFBWSxFQUFFO1lBQ2hCLElBQUksQ0FBQyxNQUFNLHFCQUFRLElBQUksQ0FBQyxNQUFNLEVBQUssWUFBWSxDQUFFLENBQUM7U0FDbkQ7SUFDSCxDQUFDOzs7Ozs7SUFFRCxTQUFTLENBQUMsR0FBcUIsRUFBRSxJQUFpQjtRQUNoRCxJQUFJLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDL0QsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ3pCO1FBRUQsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ2IsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtZQUM5QixJQUFJLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDakY7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLENBQUMscUJBQXFCLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLEVBQUUsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1NBQzNGO1FBRUQsT0FBTyxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FDMUIsUUFBUTs7O1FBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ2IsSUFBSSxJQUFJLENBQUMsS0FBSyxLQUFLLENBQUMsRUFBRTtnQkFDcEIsSUFBSSxJQUFJLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRTtvQkFDOUIsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxRQUFRLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztpQkFDbkU7cUJBQU07b0JBQ0wsSUFBSSxDQUFDLE1BQU0sQ0FBQyxvQkFBb0IsQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxtQkFBbUIsQ0FBQyxDQUFDO2lCQUM3RTthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQ0gsQ0FBQztJQUNKLENBQUM7OztZQWxERixVQUFVOzs7OzRDQVVOLFFBQVEsWUFBSSxNQUFNLFNBQUMsK0JBQStCO1lBakI5QyxrQkFBa0I7Ozs7Ozs7SUFTekIsMkNBQXNCOzs7OztJQUN0Qiw0Q0FBc0M7Ozs7O0lBQ3RDLDZDQUF5Qjs7Ozs7SUFPdkIsNENBQWtDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgSW5qZWN0LCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgSHR0cEludGVyY2VwdG9yLCBIdHRwRXZlbnQsIEh0dHBIYW5kbGVyLCBIdHRwUmVxdWVzdCB9IGZyb20gJ0Bhbmd1bGFyL2NvbW1vbi9odHRwJztcbmltcG9ydCB7IE9ic2VydmFibGUgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbmFsaXplIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuXG5pbXBvcnQgeyBOZ3hVaUxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL25neC11aS1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLWh0dHAtY29uZmlnLnRva2VuJztcbmltcG9ydCB7IE5neFVpTG9hZGVySHR0cENvbmZpZyB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgSFRUUF9MT0FERVJfVEFTS19JRCB9IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBnZXRFeGNsdWRlT2JqLCBpc0lnbm9yZWQgfSBmcm9tICcuLi91dGlscy9mdW5jdGlvbnMnO1xuaW1wb3J0IHsgRXhjbHVkZSB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTmd4VWlMb2FkZXJIdHRwSW50ZXJjZXB0b3IgaW1wbGVtZW50cyBIdHRwSW50ZXJjZXB0b3Ige1xuICBwcml2YXRlIGNvdW50OiBudW1iZXI7XG4gIHByaXZhdGUgY29uZmlnOiBOZ3hVaUxvYWRlckh0dHBDb25maWc7XG4gIHByaXZhdGUgZXhjbHVkZTogRXhjbHVkZTtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdYX1VJX0xPQURFUl9IVFRQX0NPTkZJR19UT0tFTikgY3VzdG9tQ29uZmlnOiBOZ3hVaUxvYWRlckh0dHBDb25maWcsXG4gICAgcHJpdmF0ZSBsb2FkZXI6IE5neFVpTG9hZGVyU2VydmljZVxuICApIHtcbiAgICB0aGlzLmNvdW50ID0gMDtcbiAgICB0aGlzLmNvbmZpZyA9IHtcbiAgICAgIGxvYWRlcklkOiB0aGlzLmxvYWRlci5nZXREZWZhdWx0Q29uZmlnKCkubWFzdGVyTG9hZGVySWQsXG4gICAgICBzaG93Rm9yZWdyb3VuZDogZmFsc2VcbiAgICB9O1xuXG4gICAgdGhpcy5leGNsdWRlID0gZ2V0RXhjbHVkZU9iaihjdXN0b21Db25maWcpO1xuXG4gICAgaWYgKGN1c3RvbUNvbmZpZykge1xuICAgICAgdGhpcy5jb25maWcgPSB7IC4uLnRoaXMuY29uZmlnLCAuLi5jdXN0b21Db25maWcgfTtcbiAgICB9XG4gIH1cblxuICBpbnRlcmNlcHQocmVxOiBIdHRwUmVxdWVzdDxhbnk+LCBuZXh0OiBIdHRwSGFuZGxlcik6IE9ic2VydmFibGU8SHR0cEV2ZW50PGFueT4+IHtcbiAgICBpZiAoaXNJZ25vcmVkKHJlcS51cmwsIHRoaXMuZXhjbHVkZS5zdHJzLCB0aGlzLmV4Y2x1ZGUucmVnRXhwcykpIHtcbiAgICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpO1xuICAgIH1cblxuICAgIHRoaXMuY291bnQrKztcbiAgICBpZiAodGhpcy5jb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgIHRoaXMubG9hZGVyLnN0YXJ0TG9hZGVyKHRoaXMuY29uZmlnLmxvYWRlcklkLCBIVFRQX0xPQURFUl9UQVNLX0lELCB0aGlzLmNvbmZpZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMubG9hZGVyLnN0YXJ0QmFja2dyb3VuZExvYWRlcih0aGlzLmNvbmZpZy5sb2FkZXJJZCwgSFRUUF9MT0FERVJfVEFTS19JRCwgdGhpcy5jb25maWcpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXh0LmhhbmRsZShyZXEpLnBpcGUoXG4gICAgICBmaW5hbGl6ZSgoKSA9PiB7XG4gICAgICAgIHRoaXMuY291bnQtLTtcbiAgICAgICAgaWYgKHRoaXMuY291bnQgPT09IDApIHtcbiAgICAgICAgICBpZiAodGhpcy5jb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMubG9hZGVyLnN0b3BMb2FkZXIodGhpcy5jb25maWcubG9hZGVySWQsIEhUVFBfTE9BREVSX1RBU0tfSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLmxvYWRlci5zdG9wQmFja2dyb3VuZExvYWRlcih0aGlzLmNvbmZpZy5sb2FkZXJJZCwgSFRUUF9MT0FERVJfVEFTS19JRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG4gIH1cbn1cbiJdfQ==