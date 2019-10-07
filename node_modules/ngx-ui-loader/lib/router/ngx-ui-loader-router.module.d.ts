import { ModuleWithProviders } from '@angular/core';
import { Router } from '@angular/router';
import { NgxUiLoaderService } from '../core/ngx-ui-loader.service';
import { NgxUiLoaderRouterConfig } from '../utils/interfaces';
export declare class NgxUiLoaderRouterModule {
    private exclude;
    /**
     * forRoot
     * @returns A module with its provider dependencies
     */
    static forRoot(routerConfig: NgxUiLoaderRouterConfig): ModuleWithProviders;
    /**
     * Constructor
     */
    constructor(parentModule: NgxUiLoaderRouterModule, customConfig: NgxUiLoaderRouterConfig, router: Router, loader: NgxUiLoaderService);
}
