/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Inject, Optional, SkipSelf } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NGX_UI_LOADER_ROUTER_CONFIG_TOKEN } from './ngx-ui-loader-router-config.token';
import { ROUTER_LOADER_TASK_ID } from '../utils/constants';
import { getExcludeObj, isIgnored } from '../utils/functions';
export class NgxUiLoaderRouterModule {
    /**
     * Constructor
     * @param {?} parentModule
     * @param {?} customConfig
     * @param {?} router
     * @param {?} loader
     */
    constructor(parentModule, customConfig, router, loader) {
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderRouterModule is already loaded. It should be imported in the root `AppModule` only!');
        }
        /** @type {?} */
        let config = {
            loaderId: loader.getDefaultConfig().masterLoaderId,
            showForeground: true
        };
        this.exclude = getExcludeObj(customConfig);
        if (customConfig) {
            config = Object.assign({}, config, customConfig);
        }
        router.events.subscribe((/**
         * @param {?} event
         * @return {?}
         */
        (event) => {
            if (event instanceof NavigationStart) {
                if (!isIgnored(event.url, this.exclude.strs, this.exclude.regExps)) {
                    if (config.showForeground) {
                        loader.startLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
                    }
                    else {
                        loader.startBackgroundLoader(config.loaderId, ROUTER_LOADER_TASK_ID);
                    }
                }
            }
            if (event instanceof NavigationEnd || event instanceof NavigationCancel || event instanceof NavigationError) {
                if (!isIgnored(event.url, this.exclude.strs, this.exclude.regExps)) {
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
     * @param {?} routerConfig
     * @return {?} A module with its provider dependencies
     */
    static forRoot(routerConfig) {
        return {
            ngModule: NgxUiLoaderRouterModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,
                    useValue: routerConfig
                }
            ]
        };
    }
}
NgxUiLoaderRouterModule.decorators = [
    { type: NgModule, args: [{},] }
];
/** @nocollapse */
NgxUiLoaderRouterModule.ctorParameters = () => [
    { type: NgxUiLoaderRouterModule, decorators: [{ type: Optional }, { type: SkipSelf }] },
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_ROUTER_CONFIG_TOKEN,] }] },
    { type: Router },
    { type: NgxUiLoaderService }
];
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderRouterModule.prototype.exclude;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9yb3V0ZXIvbmd4LXVpLWxvYWRlci1yb3V0ZXIubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixNQUFNLEVBQUUsUUFBUSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUMxRixPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsYUFBYSxFQUFFLGVBQWUsRUFBRSxlQUFlLEVBQUUsTUFBTSxFQUFlLE1BQU0saUJBQWlCLENBQUM7QUFFekgsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0sK0JBQStCLENBQUM7QUFFbkUsT0FBTyxFQUFFLGlDQUFpQyxFQUFFLE1BQU0scUNBQXFDLENBQUM7QUFDeEYsT0FBTyxFQUFFLHFCQUFxQixFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFDM0QsT0FBTyxFQUFFLGFBQWEsRUFBRSxTQUFTLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUk5RCxNQUFNLE9BQU8sdUJBQXVCOzs7Ozs7OztJQXNCbEMsWUFDMEIsWUFBcUMsRUFDTixZQUFxQyxFQUM1RixNQUFjLEVBQ2QsTUFBMEI7UUFFMUIsSUFBSSxZQUFZLEVBQUU7WUFDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxrSEFBa0gsQ0FBQyxDQUFDO1NBQ3JJOztZQUVHLE1BQU0sR0FBNEI7WUFDcEMsUUFBUSxFQUFFLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGNBQWM7WUFDbEQsY0FBYyxFQUFFLElBQUk7U0FDckI7UUFFRCxJQUFJLENBQUMsT0FBTyxHQUFHLGFBQWEsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUUzQyxJQUFJLFlBQVksRUFBRTtZQUNoQixNQUFNLHFCQUFRLE1BQU0sRUFBSyxZQUFZLENBQUUsQ0FBQztTQUN6QztRQUVELE1BQU0sQ0FBQyxNQUFNLENBQUMsU0FBUzs7OztRQUFDLENBQUMsS0FBa0IsRUFBRSxFQUFFO1lBQzdDLElBQUksS0FBSyxZQUFZLGVBQWUsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEVBQUU7b0JBQ2xFLElBQUksTUFBTSxDQUFDLGNBQWMsRUFBRTt3QkFDekIsTUFBTSxDQUFDLFdBQVcsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7cUJBQzVEO3lCQUFNO3dCQUNMLE1BQU0sQ0FBQyxxQkFBcUIsQ0FBQyxNQUFNLENBQUMsUUFBUSxFQUFFLHFCQUFxQixDQUFDLENBQUM7cUJBQ3RFO2lCQUNGO2FBQ0Y7WUFFRCxJQUFJLEtBQUssWUFBWSxhQUFhLElBQUksS0FBSyxZQUFZLGdCQUFnQixJQUFJLEtBQUssWUFBWSxlQUFlLEVBQUU7Z0JBQzNHLElBQUksQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO29CQUNsRSxJQUFJLE1BQU0sQ0FBQyxjQUFjLEVBQUU7d0JBQ3pCLE1BQU0sQ0FBQyxVQUFVLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3FCQUMzRDt5QkFBTTt3QkFDTCxNQUFNLENBQUMsb0JBQW9CLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO3FCQUNyRTtpQkFDRjthQUNGO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDTCxDQUFDOzs7Ozs7SUF6REQsTUFBTSxDQUFDLE9BQU8sQ0FBQyxZQUFxQztRQUNsRCxPQUFPO1lBQ0wsUUFBUSxFQUFFLHVCQUF1QjtZQUNqQyxTQUFTLEVBQUU7Z0JBQ1Q7b0JBQ0UsT0FBTyxFQUFFLGlDQUFpQztvQkFDMUMsUUFBUSxFQUFFLFlBQVk7aUJBQ3ZCO2FBQ0Y7U0FDRixDQUFDO0lBQ0osQ0FBQzs7O1lBbEJGLFFBQVEsU0FBQyxFQUFFOzs7O1lBd0I4Qix1QkFBdUIsdUJBQTVELFFBQVEsWUFBSSxRQUFROzRDQUNwQixRQUFRLFlBQUksTUFBTSxTQUFDLGlDQUFpQztZQWxDbUIsTUFBTTtZQUV6RSxrQkFBa0I7Ozs7Ozs7SUFTekIsMENBQXlCIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgTmdNb2R1bGUsIE1vZHVsZVdpdGhQcm92aWRlcnMsIEluamVjdCwgT3B0aW9uYWwsIFNraXBTZWxmIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBOYXZpZ2F0aW9uQ2FuY2VsLCBOYXZpZ2F0aW9uRW5kLCBOYXZpZ2F0aW9uRXJyb3IsIE5hdmlnYXRpb25TdGFydCwgUm91dGVyLCBSb3V0ZXJFdmVudCB9IGZyb20gJ0Bhbmd1bGFyL3JvdXRlcic7XG5cbmltcG9ydCB7IE5neFVpTG9hZGVyU2VydmljZSB9IGZyb20gJy4uL2NvcmUvbmd4LXVpLWxvYWRlci5zZXJ2aWNlJztcbmltcG9ydCB7IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnIH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX1JPVVRFUl9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC11aS1sb2FkZXItcm91dGVyLWNvbmZpZy50b2tlbic7XG5pbXBvcnQgeyBST1VURVJfTE9BREVSX1RBU0tfSUQgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgZ2V0RXhjbHVkZU9iaiwgaXNJZ25vcmVkIH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25zJztcbmltcG9ydCB7IEV4Y2x1ZGUgfSBmcm9tICcuLi91dGlscy9pbnRlcmZhY2VzJztcblxuQE5nTW9kdWxlKHt9KVxuZXhwb3J0IGNsYXNzIE5neFVpTG9hZGVyUm91dGVyTW9kdWxlIHtcbiAgcHJpdmF0ZSBleGNsdWRlOiBFeGNsdWRlO1xuXG4gIC8qKlxuICAgKiBmb3JSb290XG4gICAqIEByZXR1cm5zIEEgbW9kdWxlIHdpdGggaXRzIHByb3ZpZGVyIGRlcGVuZGVuY2llc1xuICAgKi9cbiAgc3RhdGljIGZvclJvb3Qocm91dGVyQ29uZmlnOiBOZ3hVaUxvYWRlclJvdXRlckNvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4VWlMb2FkZXJSb3V0ZXJNb2R1bGUsXG4gICAgICBwcm92aWRlcnM6IFtcbiAgICAgICAge1xuICAgICAgICAgIHByb3ZpZGU6IE5HWF9VSV9MT0FERVJfUk9VVEVSX0NPTkZJR19UT0tFTixcbiAgICAgICAgICB1c2VWYWx1ZTogcm91dGVyQ29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihcbiAgICBAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IE5neFVpTG9hZGVyUm91dGVyTW9kdWxlLFxuICAgIEBPcHRpb25hbCgpIEBJbmplY3QoTkdYX1VJX0xPQURFUl9ST1VURVJfQ09ORklHX1RPS0VOKSBjdXN0b21Db25maWc6IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnLFxuICAgIHJvdXRlcjogUm91dGVyLFxuICAgIGxvYWRlcjogTmd4VWlMb2FkZXJTZXJ2aWNlXG4gICkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW25neC11aS1sb2FkZXJdIC0gTmd4VWlMb2FkZXJSb3V0ZXJNb2R1bGUgaXMgYWxyZWFkeSBsb2FkZWQuIEl0IHNob3VsZCBiZSBpbXBvcnRlZCBpbiB0aGUgcm9vdCBgQXBwTW9kdWxlYCBvbmx5IScpO1xuICAgIH1cblxuICAgIGxldCBjb25maWc6IE5neFVpTG9hZGVyUm91dGVyQ29uZmlnID0ge1xuICAgICAgbG9hZGVySWQ6IGxvYWRlci5nZXREZWZhdWx0Q29uZmlnKCkubWFzdGVyTG9hZGVySWQsXG4gICAgICBzaG93Rm9yZWdyb3VuZDogdHJ1ZVxuICAgIH07XG5cbiAgICB0aGlzLmV4Y2x1ZGUgPSBnZXRFeGNsdWRlT2JqKGN1c3RvbUNvbmZpZyk7XG5cbiAgICBpZiAoY3VzdG9tQ29uZmlnKSB7XG4gICAgICBjb25maWcgPSB7IC4uLmNvbmZpZywgLi4uY3VzdG9tQ29uZmlnIH07XG4gICAgfVxuXG4gICAgcm91dGVyLmV2ZW50cy5zdWJzY3JpYmUoKGV2ZW50OiBSb3V0ZXJFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvblN0YXJ0KSB7XG4gICAgICAgIGlmICghaXNJZ25vcmVkKGV2ZW50LnVybCwgdGhpcy5leGNsdWRlLnN0cnMsIHRoaXMuZXhjbHVkZS5yZWdFeHBzKSkge1xuICAgICAgICAgIGlmIChjb25maWcuc2hvd0ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgIGxvYWRlci5zdGFydExvYWRlcihjb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfVEFTS19JRCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWRlci5zdGFydEJhY2tncm91bmRMb2FkZXIoY29uZmlnLmxvYWRlcklkLCBST1VURVJfTE9BREVSX1RBU0tfSUQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZXZlbnQgaW5zdGFuY2VvZiBOYXZpZ2F0aW9uRW5kIHx8IGV2ZW50IGluc3RhbmNlb2YgTmF2aWdhdGlvbkNhbmNlbCB8fCBldmVudCBpbnN0YW5jZW9mIE5hdmlnYXRpb25FcnJvcikge1xuICAgICAgICBpZiAoIWlzSWdub3JlZChldmVudC51cmwsIHRoaXMuZXhjbHVkZS5zdHJzLCB0aGlzLmV4Y2x1ZGUucmVnRXhwcykpIHtcbiAgICAgICAgICBpZiAoY29uZmlnLnNob3dGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICBsb2FkZXIuc3RvcExvYWRlcihjb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfVEFTS19JRCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvYWRlci5zdG9wQmFja2dyb3VuZExvYWRlcihjb25maWcubG9hZGVySWQsIFJPVVRFUl9MT0FERVJfVEFTS19JRCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==