/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxUiLoaderHttpInterceptor } from './ngx-ui-loader-http.interceptor';
import { NGX_UI_LOADER_HTTP_CONFIG_TOKEN } from './ngx-ui-loader-http-config.token';
export class NgxUiLoaderHttpModule {
    /**
     * Constructor
     * @param {?} parentModule
     */
    constructor(parentModule) {
        if (parentModule) {
            throw new Error('[ngx-ui-loader] - NgxUiLoaderHttpModule is already loaded. It should be imported in the root `AppModule` only!');
        }
    }
    /**
     * forRoot
     * @param {?} httpConfig
     * @return {?} A module with its provider dependencies
     */
    static forRoot(httpConfig) {
        return {
            ngModule: NgxUiLoaderHttpModule,
            providers: [
                {
                    provide: NGX_UI_LOADER_HTTP_CONFIG_TOKEN,
                    useValue: httpConfig
                }
            ]
        };
    }
}
NgxUiLoaderHttpModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    {
                        provide: HTTP_INTERCEPTORS,
                        useClass: NgxUiLoaderHttpInterceptor,
                        multi: true
                    }
                ]
            },] }
];
/** @nocollapse */
NgxUiLoaderHttpModule.ctorParameters = () => [
    { type: NgxUiLoaderHttpModule, decorators: [{ type: Optional }, { type: SkipSelf }] }
];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1odHRwLm1vZHVsZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvaHR0cC9uZ3gtdWktbG9hZGVyLWh0dHAubW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsUUFBUSxFQUF1QixRQUFRLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ2xGLE9BQU8sRUFBRSxpQkFBaUIsRUFBRSxNQUFNLHNCQUFzQixDQUFDO0FBRXpELE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLGtDQUFrQyxDQUFDO0FBRTlFLE9BQU8sRUFBRSwrQkFBK0IsRUFBRSxNQUFNLG1DQUFtQyxDQUFDO0FBV3BGLE1BQU0sT0FBTyxxQkFBcUI7Ozs7O0lBSWhDLFlBQW9DLFlBQW1DO1FBQ3JFLElBQUksWUFBWSxFQUFFO1lBQ2hCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0hBQWdILENBQUMsQ0FBQztTQUNuSTtJQUNILENBQUM7Ozs7OztJQU1ELE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBaUM7UUFDOUMsT0FBTztZQUNMLFFBQVEsRUFBRSxxQkFBcUI7WUFDL0IsU0FBUyxFQUFFO2dCQUNUO29CQUNFLE9BQU8sRUFBRSwrQkFBK0I7b0JBQ3hDLFFBQVEsRUFBRSxVQUFVO2lCQUNyQjthQUNGO1NBQ0YsQ0FBQztJQUNKLENBQUM7OztZQWpDRixRQUFRLFNBQUM7Z0JBQ1IsU0FBUyxFQUFFO29CQUNUO3dCQUNFLE9BQU8sRUFBRSxpQkFBaUI7d0JBQzFCLFFBQVEsRUFBRSwwQkFBMEI7d0JBQ3BDLEtBQUssRUFBRSxJQUFJO3FCQUNaO2lCQUNGO2FBQ0Y7Ozs7WUFLbUQscUJBQXFCLHVCQUExRCxRQUFRLFlBQUksUUFBUSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5nTW9kdWxlLCBNb2R1bGVXaXRoUHJvdmlkZXJzLCBPcHRpb25hbCwgU2tpcFNlbGYgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEhUVFBfSU5URVJDRVBUT1JTIH0gZnJvbSAnQGFuZ3VsYXIvY29tbW9uL2h0dHAnO1xuXG5pbXBvcnQgeyBOZ3hVaUxvYWRlckh0dHBJbnRlcmNlcHRvciB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLmludGVyY2VwdG9yJztcbmltcG9ydCB7IE5neFVpTG9hZGVySHR0cENvbmZpZyB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgTkdYX1VJX0xPQURFUl9IVFRQX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1odHRwLWNvbmZpZy50b2tlbic7XG5cbkBOZ01vZHVsZSh7XG4gIHByb3ZpZGVyczogW1xuICAgIHtcbiAgICAgIHByb3ZpZGU6IEhUVFBfSU5URVJDRVBUT1JTLFxuICAgICAgdXNlQ2xhc3M6IE5neFVpTG9hZGVySHR0cEludGVyY2VwdG9yLFxuICAgICAgbXVsdGk6IHRydWVcbiAgICB9XG4gIF1cbn0pXG5leHBvcnQgY2xhc3MgTmd4VWlMb2FkZXJIdHRwTW9kdWxlIHtcbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBAU2tpcFNlbGYoKSBwYXJlbnRNb2R1bGU6IE5neFVpTG9hZGVySHR0cE1vZHVsZSkge1xuICAgIGlmIChwYXJlbnRNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignW25neC11aS1sb2FkZXJdIC0gTmd4VWlMb2FkZXJIdHRwTW9kdWxlIGlzIGFscmVhZHkgbG9hZGVkLiBJdCBzaG91bGQgYmUgaW1wb3J0ZWQgaW4gdGhlIHJvb3QgYEFwcE1vZHVsZWAgb25seSEnKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogZm9yUm9vdFxuICAgKiBAcmV0dXJucyBBIG1vZHVsZSB3aXRoIGl0cyBwcm92aWRlciBkZXBlbmRlbmNpZXNcbiAgICovXG4gIHN0YXRpYyBmb3JSb290KGh0dHBDb25maWc6IE5neFVpTG9hZGVySHR0cENvbmZpZyk6IE1vZHVsZVdpdGhQcm92aWRlcnMge1xuICAgIHJldHVybiB7XG4gICAgICBuZ01vZHVsZTogTmd4VWlMb2FkZXJIdHRwTW9kdWxlLFxuICAgICAgcHJvdmlkZXJzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBwcm92aWRlOiBOR1hfVUlfTE9BREVSX0hUVFBfQ09ORklHX1RPS0VOLFxuICAgICAgICAgIHVzZVZhbHVlOiBodHRwQ29uZmlnXG4gICAgICAgIH1cbiAgICAgIF1cbiAgICB9O1xuICB9XG59XG4iXX0=