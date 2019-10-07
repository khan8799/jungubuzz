/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Directive, ElementRef, Input, Renderer2 } from '@angular/core';
import { filter } from 'rxjs/operators';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { coerceNumber } from '../utils/functions';
import { FOREGROUND, WAITING_FOR_OVERLAY_DISAPPEAR } from '../utils/constants';
export class NgxUiLoaderBlurredDirective {
    /**
     * @param {?} elementRef
     * @param {?} renderer
     * @param {?} loader
     */
    constructor(elementRef, renderer, loader) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this.loader = loader;
        this.blurNumber = this.loader.getDefaultConfig().blur;
        this.loaderId = this.loader.getDefaultConfig().masterLoaderId;
    }
    /**
     * @return {?}
     */
    get blur() {
        return this.blurNumber;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set blur(value) {
        this.blurNumber = coerceNumber(value, this.loader.getDefaultConfig().blur);
    }
    /**
     * On Init event
     * @return {?}
     */
    ngOnInit() {
        this.showForegroundWatcher = this.loader.showForeground$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        (showEvent) => this.loaderId === showEvent.loaderId)))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        data => {
            if (data.isShow) {
                /** @type {?} */
                const filterValue = `blur(${this.blurNumber}px)`;
                this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', filterValue);
                this.renderer.setStyle(this.elementRef.nativeElement, 'filter', filterValue);
            }
            else {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (!this.loader.hasRunningTask(FOREGROUND, data.loaderId)) {
                        this.renderer.setStyle(this.elementRef.nativeElement, '-webkit-filter', 'none');
                        this.renderer.setStyle(this.elementRef.nativeElement, 'filter', 'none');
                    }
                }), WAITING_FOR_OVERLAY_DISAPPEAR);
            }
        }));
    }
    /**
     * On destroy event
     * @return {?}
     */
    ngOnDestroy() {
        if (this.showForegroundWatcher) {
            this.showForegroundWatcher.unsubscribe();
        }
    }
}
NgxUiLoaderBlurredDirective.decorators = [
    { type: Directive, args: [{ selector: '[ngxUiLoaderBlurred]' },] }
];
/** @nocollapse */
NgxUiLoaderBlurredDirective.ctorParameters = () => [
    { type: ElementRef },
    { type: Renderer2 },
    { type: NgxUiLoaderService }
];
NgxUiLoaderBlurredDirective.propDecorators = {
    blur: [{ type: Input }],
    loaderId: [{ type: Input }]
};
if (false) {
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.blurNumber;
    /** @type {?} */
    NgxUiLoaderBlurredDirective.prototype.loaderId;
    /** @type {?} */
    NgxUiLoaderBlurredDirective.prototype.showForegroundWatcher;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.elementRef;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.renderer;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderBlurredDirective.prototype.loader;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci1ibHVycmVkLmRpcmVjdGl2ZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL25neC11aS1sb2FkZXIvIiwic291cmNlcyI6WyJsaWIvY29yZS9uZ3gtdWktbG9hZGVyLWJsdXJyZWQuZGlyZWN0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxLQUFLLEVBQWEsU0FBUyxFQUFVLE1BQU0sZUFBZSxDQUFDO0FBRTNGLE9BQU8sRUFBRSxNQUFNLEVBQUUsTUFBTSxnQkFBZ0IsQ0FBQztBQUV4QyxPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUM3RCxPQUFPLEVBQUUsWUFBWSxFQUFFLE1BQU0sb0JBQW9CLENBQUM7QUFFbEQsT0FBTyxFQUFFLFVBQVUsRUFBRSw2QkFBNkIsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRy9FLE1BQU0sT0FBTywyQkFBMkI7Ozs7OztJQWdCdEMsWUFBb0IsVUFBc0IsRUFBVSxRQUFtQixFQUFVLE1BQTBCO1FBQXZGLGVBQVUsR0FBVixVQUFVLENBQVk7UUFBVSxhQUFRLEdBQVIsUUFBUSxDQUFXO1FBQVUsV0FBTSxHQUFOLE1BQU0sQ0FBb0I7UUFDekcsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsTUFBTSxDQUFDLGdCQUFnQixFQUFFLENBQUMsSUFBSSxDQUFDO1FBQ3RELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDLGNBQWMsQ0FBQztJQUNoRSxDQUFDOzs7O0lBaEJELElBQ0ksSUFBSTtRQUNOLE9BQU8sSUFBSSxDQUFDLFVBQVUsQ0FBQztJQUN6QixDQUFDOzs7OztJQUVELElBQUksSUFBSSxDQUFDLEtBQWE7UUFDcEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxZQUFZLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLEVBQUUsQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUM3RSxDQUFDOzs7OztJQWNELFFBQVE7UUFDTixJQUFJLENBQUMscUJBQXFCLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxlQUFlO2FBQ3JELElBQUksQ0FBQyxNQUFNOzs7O1FBQUMsQ0FBQyxTQUFvQixFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxRQUFRLEVBQUMsQ0FBQzthQUM1RSxTQUFTOzs7O1FBQUMsSUFBSSxDQUFDLEVBQUU7WUFDaEIsSUFBSSxJQUFJLENBQUMsTUFBTSxFQUFFOztzQkFDVCxXQUFXLEdBQUcsUUFBUSxJQUFJLENBQUMsVUFBVSxLQUFLO2dCQUNoRCxJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxnQkFBZ0IsRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDckYsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxhQUFhLEVBQUUsUUFBUSxFQUFFLFdBQVcsQ0FBQyxDQUFDO2FBQzlFO2lCQUFNO2dCQUNMLFVBQVU7OztnQkFBQyxHQUFHLEVBQUU7b0JBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLFVBQVUsRUFBRSxJQUFJLENBQUMsUUFBUSxDQUFDLEVBQUU7d0JBQzFELElBQUksQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsYUFBYSxFQUFFLGdCQUFnQixFQUFFLE1BQU0sQ0FBQyxDQUFDO3dCQUNoRixJQUFJLENBQUMsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGFBQWEsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDLENBQUM7cUJBQ3pFO2dCQUNILENBQUMsR0FBRSw2QkFBNkIsQ0FBQyxDQUFDO2FBQ25DO1FBQ0gsQ0FBQyxFQUFDLENBQUM7SUFDUCxDQUFDOzs7OztJQUtELFdBQVc7UUFDVCxJQUFJLElBQUksQ0FBQyxxQkFBcUIsRUFBRTtZQUM5QixJQUFJLENBQUMscUJBQXFCLENBQUMsV0FBVyxFQUFFLENBQUM7U0FDMUM7SUFDSCxDQUFDOzs7WUFuREYsU0FBUyxTQUFDLEVBQUUsUUFBUSxFQUFFLHNCQUFzQixFQUFFOzs7O1lBVDNCLFVBQVU7WUFBb0IsU0FBUztZQUlsRCxrQkFBa0I7OzttQkFTeEIsS0FBSzt1QkFTTCxLQUFLOzs7Ozs7O0lBWE4saURBQTJCOztJQVczQiwrQ0FBMEI7O0lBRTFCLDREQUFvQzs7Ozs7SUFFeEIsaURBQThCOzs7OztJQUFFLCtDQUEyQjs7Ozs7SUFBRSw2Q0FBa0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBEaXJlY3RpdmUsIEVsZW1lbnRSZWYsIElucHV0LCBPbkRlc3Ryb3ksIFJlbmRlcmVyMiwgT25Jbml0IH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJTZXJ2aWNlIH0gZnJvbSAnLi9uZ3gtdWktbG9hZGVyLnNlcnZpY2UnO1xuaW1wb3J0IHsgY29lcmNlTnVtYmVyIH0gZnJvbSAnLi4vdXRpbHMvZnVuY3Rpb25zJztcbmltcG9ydCB7IFNob3dFdmVudCB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgRk9SRUdST1VORCwgV0FJVElOR19GT1JfT1ZFUkxBWV9ESVNBUFBFQVIgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuXG5ARGlyZWN0aXZlKHsgc2VsZWN0b3I6ICdbbmd4VWlMb2FkZXJCbHVycmVkXScgfSlcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlckJsdXJyZWREaXJlY3RpdmUgaW1wbGVtZW50cyBPbkluaXQsIE9uRGVzdHJveSB7XG4gIHByaXZhdGUgYmx1ck51bWJlcjogbnVtYmVyO1xuXG4gIEBJbnB1dCgpXG4gIGdldCBibHVyKCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuYmx1ck51bWJlcjtcbiAgfVxuXG4gIHNldCBibHVyKHZhbHVlOiBudW1iZXIpIHtcbiAgICB0aGlzLmJsdXJOdW1iZXIgPSBjb2VyY2VOdW1iZXIodmFsdWUsIHRoaXMubG9hZGVyLmdldERlZmF1bHRDb25maWcoKS5ibHVyKTtcbiAgfVxuXG4gIEBJbnB1dCgpIGxvYWRlcklkOiBzdHJpbmc7XG5cbiAgc2hvd0ZvcmVncm91bmRXYXRjaGVyOiBTdWJzY3JpcHRpb247XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBlbGVtZW50UmVmOiBFbGVtZW50UmVmLCBwcml2YXRlIHJlbmRlcmVyOiBSZW5kZXJlcjIsIHByaXZhdGUgbG9hZGVyOiBOZ3hVaUxvYWRlclNlcnZpY2UpIHtcbiAgICB0aGlzLmJsdXJOdW1iZXIgPSB0aGlzLmxvYWRlci5nZXREZWZhdWx0Q29uZmlnKCkuYmx1cjtcbiAgICB0aGlzLmxvYWRlcklkID0gdGhpcy5sb2FkZXIuZ2V0RGVmYXVsdENvbmZpZygpLm1hc3RlckxvYWRlcklkO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIEluaXQgZXZlbnRcbiAgICovXG4gIG5nT25Jbml0KCkge1xuICAgIHRoaXMuc2hvd0ZvcmVncm91bmRXYXRjaGVyID0gdGhpcy5sb2FkZXIuc2hvd0ZvcmVncm91bmQkXG4gICAgICAucGlwZShmaWx0ZXIoKHNob3dFdmVudDogU2hvd0V2ZW50KSA9PiB0aGlzLmxvYWRlcklkID09PSBzaG93RXZlbnQubG9hZGVySWQpKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgaWYgKGRhdGEuaXNTaG93KSB7XG4gICAgICAgICAgY29uc3QgZmlsdGVyVmFsdWUgPSBgYmx1cigke3RoaXMuYmx1ck51bWJlcn1weClgO1xuICAgICAgICAgIHRoaXMucmVuZGVyZXIuc2V0U3R5bGUodGhpcy5lbGVtZW50UmVmLm5hdGl2ZUVsZW1lbnQsICctd2Via2l0LWZpbHRlcicsIGZpbHRlclZhbHVlKTtcbiAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZmlsdGVyJywgZmlsdGVyVmFsdWUpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgICAgaWYgKCF0aGlzLmxvYWRlci5oYXNSdW5uaW5nVGFzayhGT1JFR1JPVU5ELCBkYXRhLmxvYWRlcklkKSkge1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnLXdlYmtpdC1maWx0ZXInLCAnbm9uZScpO1xuICAgICAgICAgICAgICB0aGlzLnJlbmRlcmVyLnNldFN0eWxlKHRoaXMuZWxlbWVudFJlZi5uYXRpdmVFbGVtZW50LCAnZmlsdGVyJywgJ25vbmUnKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBXQUlUSU5HX0ZPUl9PVkVSTEFZX0RJU0FQUEVBUik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGRlc3Ryb3kgZXZlbnRcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIGlmICh0aGlzLnNob3dGb3JlZ3JvdW5kV2F0Y2hlcikge1xuICAgICAgdGhpcy5zaG93Rm9yZWdyb3VuZFdhdGNoZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gIH1cbn1cbiJdfQ==