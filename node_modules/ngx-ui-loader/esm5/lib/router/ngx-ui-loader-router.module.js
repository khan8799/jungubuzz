/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { NgModule, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_TASK_ID } from '../utils/constants';
import { getExcludeObj, isIgnored } from '../utils/functions';
var NgxUiLoaderRouterModule = /** @class */ (function () {
    /**
     * Constructor
     */
    function NgxUiLoaderRouterModule(parentModule, customConfig, router, loader) {
        var _this = this;
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderRouterModule is already loaded. It should be imported in the root `AppModule` only!');
        }
        /** @type {?} */
        var config = {
            loaderId: loader.getDefaultConfig().masterLoaderId,
            showForeground: true
        };
        this.exclude = getExcludeObj(customConfig);
        if (customConfig) {
            config = tslib_1.__assign({}, config, customConfig);
        }
        router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        function (event) {
            if (event instanceof NavigationStart) {
                if (!isIgnored(event.url, _this.exclude.strs, _this.exclude.regExps)) {
                    if (config.showForeground) {
                        loader.startLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
                    }
                    else {
                        loader.startBackgroundLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
                    }
                }
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                if (!isIgnored(event.url, _this.exclude.strs, _this.exclude.regExps)) {
                    if (config.showForeground) {
                        loader.stopLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
                    }
                    else {
                        loader.stopBackgroundLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
                    }
                }
            }
        }));
    }
    /**
     * forRoot
     * @returns A module with its provider dependencies
     */
    /**
     * forRoot
     * @param {?} routerConfig
     * @return {?} A module with its provider dependencies
     */
    NgxUiLoaderRouterModule.forRoot = /**
     * forRoot
     * @param {?} routerConfig
     * @return {?} A module with its provider dependencies
     */
    function (routerConfig) {
        return {
            ngModule: NgxUiLoaderRouterModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,
                    useValue: routerConfig
                }
            ]
        };
    };
    NgxUiLoaderRouterModule.decorators = [
        { type: NgModule, args: [{},] }
    ];
    /** @nocollapse */
    NgxUiLoaderRouterModule.ctorParameters = function () { return [
        { type: NgxUiLoaderRouterModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,] }] },
        { type: Router },
        { type: NgxUiLoaderService }
    ]; };
    return NgxUiLoaderRouterModule;
}());
export { NgxUiLoaderRouterModule };
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderRouterModule.prototype.exclude;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXIvbmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsT0FBTyxFQUFFLFFBQVEsRUFBdUIsTUFBTSxFQUFFLFFBQVEsRUFBRSxRQUFRLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDMUYsT0FBTyxFQUFFLGdCQUFnQixFQUFFLGFBQWEsRUFBRSxlQUFlLEVBQUUsZUFBZSxFQUFFLE1BQU0sRUFBZSxNQUFNLGlCQUFpQixDQUFDO0FBRXpILE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLCtCQUErQixDQUFDO0FBRW5FLE9BQU8sRUFBRSxpQ0FBaUMsRUFBRSxNQUFNLHFDQUFxQyxDQUFDO0FBQ3hGLE9BQU8sRUFBRSxxQkFBcUIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBQzNELE9BQU8sRUFBRSxhQUFhLEVBQUUsU0FBUyxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFHOUQ7SUFvQkU7O09BRUc7SUFDSCxpQ0FDMEIsWUFBcUMsRUFDTixZQUFxQyxFQUM1RixNQUFjLEVBQ2QsTUFBMEI7UUFKNUIsaUJBMENDO1FBcENDLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsa0hBQWtILENBQUMsQ0FBQztTQUNySTs7WUFFRyxNQUFNLEdBQTRCO1lBQ3BDLFFBQVEsRUFBRSxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxjQUFjO1lBQ2xELGNBQWMsRUFBRSxJQUFJO1NBQ3JCO1FBRUQsSUFBSSxDQUFDLE9BQU8sR0FBRyxhQUFhLENBQUMsWUFBWSxDQUFDLENBQUM7UUFFM0MsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSx3QkFBUSxNQUFNLEVBQUssWUFBWSxDQUFFLENBQUM7U0FDekM7UUFFRCxNQUFNLENBQUMsTUFBTSxDQUFDLFNBQVM7Ozs7UUFBQyxVQUFDLEtBQWtCO1lBQ3pDLElBQUksS0FBSyxZQUFZLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLEtBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2xFLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTt3QkFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7cUJBQzVEO3lCQUFNO3dCQUNMLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7cUJBQ3RFO2lCQUNGO2FBQ0Y7WUFFRCxJQUFJLEtBQUssWUFBWSxhQUFhLElBQUksS0FBSyxZQUFZLGdCQUFnQixJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7Z0JBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxLQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNsRSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUU7d0JBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3FCQUMzRDt5QkFBTTt3QkFDTCxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3FCQUNyRTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDO0lBN0REOzs7T0FHRzs7Ozs7O0lBQ0ksK0JBQU87Ozs7O0lBQWQsVUFBZSxZQUFxQztRQUNsRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlDQUFpQztvQkFDMUMsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7Z0JBbEJGLFFBQVEsU0FBQyxFQUFFOzs7O2dCQXdCOEIsdUJBQXVCLHVCQUE1RCxRQUFRLFlBQUksUUFBUTtnREFDcEIsUUFBUSxZQUFJLE1BQU0sU0FBQyxpQ0FBaUM7Z0JBbENtQixNQUFNO2dCQUV6RSxrQkFBa0I7O0lBeUUzQiw4QkFBQztDQUFBLEFBbEVELElBa0VDO1NBakVZLHVCQUF1Qjs7Ozs7O0lBQ2xDLDBDQUF5QiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBJbmplY3QsIE9wdGlvbmFsLCBTa2lwU2VsZiB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgTmF2aWdhdGlvbkNhbmNlbCwgTmF2aWdhdGlvbkVuZCwgTmF2aWdhdGlvbkVycm9yLCBOYXZpZ2F0aW9uU3RhcnQsIFJvdXRlciwgUm91dGVyRXZlbnQgfSBmcm9tICdAYW5ndWxhci9yb3V0ZXInO1xuXG5pbXBvcnQgeyBOZ3hVaUxvYWRlclNlcnZpY2UgfSBmcm9tICcuLi9jb3JlL25neC11aS1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBOZ3hVaUxvYWRlclJvdXRlckNvbmZpZyB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTkdYX1VJX0xPQURFUl9ST1VURVJfQ09ORklHX1RPS0VOIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLXJvdXRlci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgUk9VVEVSX0xPQURFUl9UQVNLX0lEIH0gZnJvbSAnLi4vdXRpbHMvY29uc3RhbnRzJztcbmltcG9ydCB7IGdldEV4Y2x1ZGVPYmosIGlzSWdub3JlZCB9IGZyb20gJy4uL3V0aWxzL2Z1bmN0aW9ucyc7XG5pbXBvcnQgeyBFeGNsdWRlIH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XG5cbkBOZ01vZHVsZSh7fSlcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlclJvdXRlck1vZHVsZSB7XG4gIHByaXZhdGUgZXhjbHVkZTogRXhjbHVkZTtcblxuICAvKipcbiAgICogZm9yUm9vdFxuICAgKiBAcmV0dXJucyBBIG1vZHVsZSB3aXRoIGl0cyBwcm92aWRlciBkZXBlbmRlbmNpZXNcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KHJvdXRlckNvbmZpZzogTmd4VWlMb2FkZXJSb3V0ZXJDb25maWcpOiBNb2R1bGVXaXRoUHJvdmlkZXJzIHtcbiAgICByZXR1cm4ge1xuICAgICAgbmdNb2R1bGU6IE5neFVpTG9hZGVyUm91dGVyTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfVUlfTE9BREVSX1JPVVRFUl9DT05GSUdfVE9LRU4sXG4gICAgICAgICAgdXNlVmFsdWU6IHJvdXRlckNvbmZpZ1xuICAgICAgICB9XG4gICAgICBdXG4gICAgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoXG4gICAgQE9wdGlvbmFsKCkgQFNraXBTZWxmKCkgcGFyZW50TW9kdWxlOiBOZ3hVaUxvYWRlclJvdXRlck1vZHVsZSxcbiAgICBAT3B0aW9uYWwoKSBASW5qZWN0KE5HWF9VSV9MT0FERVJfUk9VVEVSX0NPTkZJR19UT0tFTikgY3VzdG9tQ29uZmlnOiBOZ3hVaUxvYWRlclJvdXRlckNvbmZpZyxcbiAgICByb3V0ZXI6IFJvdXRlcixcbiAgICBsb2FkZXI6IE5neFVpTG9hZGVyU2VydmljZVxuICApIHtcbiAgICBpZiAocGFyZW50TW9kdWxlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1tuZ3gtdWktbG9hZGVyXSAtIE5neFVpTG9hZGVyUm91dGVyTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJdCBzaG91bGQgYmUgaW1wb3J0ZWQgaW4gdGhlIHJvb3QgYEFwcE1vZHVsZWAgb25seSEnKTtcbiAgICB9XG5cbiAgICBsZXQgY29uZmlnOiBOZ3hVaUxvYWRlclJvdXRlckNvbmZpZyA9IHtcbiAgICAgIGxvYWRlcklkOiBsb2FkZXIuZ2V0RGVmYXVsdENvbmZpZygpLm1hc3RlckxvYWRlcklkLFxuICAgICAgc2hvd0ZvcmVncm91bmQ6IHRydWVcbiAgICB9O1xuXG4gICAgdGhpcy5leGNsdWRlID0gZ2V0RXhjbHVkZU9iaihjdXN0b21Db25maWcpO1xuXG4gICAgaWYgKGN1c3RvbUNvbmZpZykge1xuICAgICAgY29uZmlnID0geyAuLi5jb25maWcsIC4uLmN1c3RvbUNvbmZpZyB9O1xuICAgIH1cblxuICAgIHJvdXRlci5ldmVudHMuc3Vic2NyaWJlKChldmVudDogUm91dGVyRXZlbnQpID0+IHtcbiAgICAgIGlmIChldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25TdGFydCkge1xuICAgICAgICBpZiAoIWlzSWdub3JlZChldmVudC51cmwsIHRoaXMuZXhjbHVkZS5zdHJzLCB0aGlzLmV4Y2x1ZGUucmVnRXhwcykpIHtcbiAgICAgICAgICBpZiAoY29uZmlnLnNob3dGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICBsb2FkZXIuc3RhcnRMb2FkZXIoY29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX1RBU0tfSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkZXIuc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKGNvbmZpZy5sb2FkZXJJZCwgUk9VVEVSX0xPQURFUl9UQVNLX0lEKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkVuZCB8fCBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25DYW5jZWwgfHwgZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRXJyb3IpIHtcbiAgICAgICAgaWYgKCFpc0lnbm9yZWQoZXZlbnQudXJsLCB0aGlzLmV4Y2x1ZGUuc3RycywgdGhpcy5leGNsdWRlLnJlZ0V4cHMpKSB7XG4gICAgICAgICAgaWYgKGNvbmZpZy5zaG93Rm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgbG9hZGVyLnN0b3BMb2FkZXIoY29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX1RBU0tfSUQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBsb2FkZXIuc3RvcEJhY2tncm91bmRMb2FkZXIoY29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX1RBU0tfSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9XG59XG4iXX0=