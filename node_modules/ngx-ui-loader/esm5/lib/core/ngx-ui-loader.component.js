/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxUiLoaderService } from './ngx-ui-loader.service';
import { filter } from 'rxjs/operators';
import { POSITION, PB_DIRECTION, SPINNER } from '../utils/enums';
import { SPINNER_CONFIG } from '../utils/constants';
import { coerceNumber } from '../utils/functions';
var NgxUiLoaderComponent = /** @class */ (function () {
    /**
     * Constructor
     */
    function NgxUiLoaderComponent(domSanitizer, changeDetectorRef, ngxService) {
        this.domSanitizer = domSanitizer;
        this.changeDetectorRef = changeDetectorRef;
        this.ngxService = ngxService;
        this.initialized = false;
        this.defaultConfig = this.ngxService.getDefaultConfig();
        this.bgsColor = this.defaultConfig.bgsColor;
        this.bgsOpacity = this.defaultConfig.bgsOpacity;
        this.bgsPosition = this.defaultConfig.bgsPosition;
        this.bgsSize = this.defaultConfig.bgsSize;
        this.bgsType = this.defaultConfig.bgsType;
        this.fgsColor = this.defaultConfig.fgsColor;
        this.fgsPosition = this.defaultConfig.fgsPosition;
        this.fgsSize = this.defaultConfig.fgsSize;
        this.fgsType = this.defaultConfig.fgsType;
        this.gap = this.defaultConfig.gap;
        this.loaderId = this.defaultConfig.masterLoaderId;
        this.logoPosition = this.defaultConfig.logoPosition;
        this.logoSize = this.defaultConfig.logoSize;
        this.logoUrl = this.defaultConfig.logoUrl;
        this.overlayBorderRadius = this.defaultConfig.overlayBorderRadius;
        this.overlayColor = this.defaultConfig.overlayColor;
        this.pbColor = this.defaultConfig.pbColor;
        this.pbDirection = this.defaultConfig.pbDirection;
        this.pbThickness = this.defaultConfig.pbThickness;
        this.hasProgressBar = this.defaultConfig.hasProgressBar;
        this.text = this.defaultConfig.text;
        this.textColor = this.defaultConfig.textColor;
        this.textPosition = this.defaultConfig.textPosition;
    }
    /**
     * On init event
     */
    /**
     * On init event
     * @return {?}
     */
    NgxUiLoaderComponent.prototype.ngOnInit = /**
     * On init event
     * @return {?}
     */
    function () {
        var _this = this;
        this.initializeSpinners();
        this.ngxService.bindLoaderData(this.loaderId);
        this.determinePositions();
        this.bgsPosition = (/** @type {?} */ (this.validate('bgsPosition', this.bgsPosition, POSITION, this.defaultConfig.bgsPosition)));
        this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl);
        this.pbDirection = (/** @type {?} */ (this.validate('pbDirection', this.pbDirection, PB_DIRECTION, this.defaultConfig.pbDirection)));
        this.showForegroundWatcher = this.ngxService.showForeground$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        function (showEvent) { return _this.loaderId === showEvent.loaderId; })))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.showForeground = data.isShow;
            _this.changeDetectorRef.markForCheck();
        }));
        this.showBackgroundWatcher = this.ngxService.showBackground$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        function (showEvent) { return _this.loaderId === showEvent.loaderId; })))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.showBackground = data.isShow;
            _this.changeDetectorRef.markForCheck();
        }));
        this.foregroundClosingWatcher = this.ngxService.foregroundClosing$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        function (showEvent) { return _this.loaderId === showEvent.loaderId; })))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.foregroundClosing = data.isShow;
            _this.changeDetectorRef.markForCheck();
        }));
        this.backgroundClosingWatcher = this.ngxService.backgroundClosing$
            .pipe(filter((/**
         * @param {?} showEvent
         * @return {?}
         */
        function (showEvent) { return _this.loaderId === showEvent.loaderId; })))
            .subscribe((/**
         * @param {?} data
         * @return {?}
         */
        function (data) {
            _this.backgroundClosing = data.isShow;
            _this.changeDetectorRef.markForCheck();
        }));
        this.initialized = true;
    };
    /**
     * On changes event
     */
    /**
     * On changes event
     * @param {?} changes
     * @return {?}
     */
    NgxUiLoaderComponent.prototype.ngOnChanges = /**
     * On changes event
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (!this.initialized) {
            return;
        }
        /** @type {?} */
        var bgsTypeChange = changes.bgsType;
        /** @type {?} */
        var bgsPositionChange = changes.bgsPosition;
        /** @type {?} */
        var fgsTypeChange = changes.fgsType;
        /** @type {?} */
        var loaderIdChange = changes.loaderId;
        /** @type {?} */
        var logoUrlChange = changes.logoUrl;
        /** @type {?} */
        var pbDirectionChange = changes.pbDirection;
        if (fgsTypeChange || bgsTypeChange) {
            this.initializeSpinners();
        }
        if (loaderIdChange) {
            this.ngxService.updateLoaderId(loaderIdChange.previousValue, this.loaderId);
        }
        this.determinePositions();
        if (bgsPositionChange) {
            this.bgsPosition = (/** @type {?} */ (this.validate('bgsPosition', this.bgsPosition, POSITION, this.defaultConfig.bgsPosition)));
        }
        if (logoUrlChange) {
            this.trustedLogoUrl = this.domSanitizer.bypassSecurityTrustResourceUrl(this.logoUrl);
        }
        if (pbDirectionChange) {
            this.pbDirection = (/** @type {?} */ (this.validate('pbDirection', this.pbDirection, PB_DIRECTION, this.defaultConfig.pbDirection)));
        }
    };
    /**
     * Initialize spinners
     */
    /**
     * Initialize spinners
     * @private
     * @return {?}
     */
    NgxUiLoaderComponent.prototype.initializeSpinners = /**
     * Initialize spinners
     * @private
     * @return {?}
     */
    function () {
        this.fgsType = (/** @type {?} */ (this.validate('fgsType', this.fgsType, SPINNER, this.defaultConfig.fgsType)));
        this.bgsType = (/** @type {?} */ (this.validate('bgsType', this.bgsType, SPINNER, this.defaultConfig.bgsType)));
        this.fgDivs = Array(SPINNER_CONFIG[this.fgsType].divs).fill(1);
        this.fgSpinnerClass = SPINNER_CONFIG[this.fgsType].class;
        this.bgDivs = Array(SPINNER_CONFIG[this.bgsType].divs).fill(1);
        this.bgSpinnerClass = SPINNER_CONFIG[this.bgsType].class;
    };
    /**
     * Determine the positions of spinner, logo and text
     */
    /**
     * Determine the positions of spinner, logo and text
     * @private
     * @return {?}
     */
    NgxUiLoaderComponent.prototype.determinePositions = /**
     * Determine the positions of spinner, logo and text
     * @private
     * @return {?}
     */
    function () {
        this.fgsPosition = (/** @type {?} */ (this.validate('fgsPosition', this.fgsPosition, POSITION, this.defaultConfig.fgsPosition)));
        this.logoPosition = (/** @type {?} */ (this.validate('logoPosition', this.logoPosition, POSITION, this.defaultConfig.logoPosition)));
        this.textPosition = (/** @type {?} */ (this.validate('textPosition', this.textPosition, POSITION, this.defaultConfig.textPosition)));
        this.gap = coerceNumber(this.gap, this.defaultConfig.gap);
        this.logoTop = 'initial';
        this.spinnerTop = 'initial';
        this.textTop = 'initial';
        /** @type {?} */
        var textSize = 24;
        if (this.logoPosition.startsWith('center')) {
            this.logoTop = '50%';
        }
        else if (this.logoPosition.startsWith('top')) {
            this.logoTop = '30px';
        }
        if (this.fgsPosition.startsWith('center')) {
            this.spinnerTop = '50%';
        }
        else if (this.fgsPosition.startsWith('top')) {
            this.spinnerTop = '30px';
        }
        if (this.textPosition.startsWith('center')) {
            this.textTop = '50%';
        }
        else if (this.textPosition.startsWith('top')) {
            this.textTop = '30px';
        }
        if (this.fgsPosition === POSITION.centerCenter) {
            if (this.logoUrl && this.logoPosition === POSITION.centerCenter) {
                if (this.text && this.textPosition === POSITION.centerCenter) {
                    // logo, spinner and text
                    this.logoTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% - " + this.fgsSize / 2 + "px - " + textSize / 2 + "px - " + this.gap + "px)");
                    this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% + " + this.logoSize / 2 + "px - " + textSize / 2 + "px)");
                    this.textTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% + " + this.logoSize / 2 + "px + " + this.gap + "px + " + this.fgsSize / 2 + "px)");
                }
                else {
                    // logo and spinner
                    this.logoTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% - " + this.fgsSize / 2 + "px - " + this.gap / 2 + "px)");
                    this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% + " + this.logoSize / 2 + "px + " + this.gap / 2 + "px)");
                }
            }
            else {
                if (this.text && this.textPosition === POSITION.centerCenter) {
                    // spinner and text
                    this.spinnerTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% - " + textSize / 2 + "px - " + this.gap / 2 + "px)");
                    this.textTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% + " + this.fgsSize / 2 + "px + " + this.gap / 2 + "px)");
                }
            }
        }
        else {
            if (this.logoUrl && this.logoPosition === POSITION.centerCenter && this.text && this.textPosition === POSITION.centerCenter) {
                // logo and text
                this.logoTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% - " + textSize / 2 + "px - " + this.gap / 2 + "px)");
                this.textTop = this.domSanitizer.bypassSecurityTrustStyle("calc(50% + " + this.logoSize / 2 + "px + " + this.gap / 2 + "px)");
            }
        }
    };
    /**
     * @private
     * @param {?} inputName
     * @param {?} value
     * @param {?} validTypeObj
     * @param {?} fallbackValue
     * @return {?}
     */
    NgxUiLoaderComponent.prototype.validate = /**
     * @private
     * @param {?} inputName
     * @param {?} value
     * @param {?} validTypeObj
     * @param {?} fallbackValue
     * @return {?}
     */
    function (inputName, value, validTypeObj, fallbackValue) {
        if (Object.keys(validTypeObj)
            .map((/**
         * @param {?} k
         * @return {?}
         */
        function (k) { return validTypeObj[k]; }))
            .findIndex((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v === value; })) === -1) {
            console.error("[ngx-ui-loader] - " + inputName + " (\"" + value + "\") is invalid. " + ("Default value \"" + fallbackValue + "\" is used."));
            return fallbackValue;
        }
        return value;
    };
    /**
     * On destroy event
     */
    /**
     * On destroy event
     * @return {?}
     */
    NgxUiLoaderComponent.prototype.ngOnDestroy = /**
     * On destroy event
     * @return {?}
     */
    function () {
        this.ngxService.destroyLoaderData(this.loaderId);
        if (this.showForegroundWatcher) {
            this.showForegroundWatcher.unsubscribe();
        }
        if (this.showBackgroundWatcher) {
            this.showBackgroundWatcher.unsubscribe();
        }
        if (this.foregroundClosingWatcher) {
            this.foregroundClosingWatcher.unsubscribe();
        }
        if (this.backgroundClosingWatcher) {
            this.backgroundClosingWatcher.unsubscribe();
        }
    };
    NgxUiLoaderComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-ui-loader',
                    template: "<!-- Progress bar {{{ -->\n<div\n  *ngIf=\"hasProgressBar\"\n  class=\"ngx-progress-bar\"\n  [class.ngx-position-absolute]=\"loaderId !== defaultConfig.masterLoaderId\"\n  [ngClass]=\"'ngx-progress-bar-' + pbDirection\"\n  [style.height.px]=\"pbThickness\"\n  [style.color]=\"pbColor\"\n  [class.loading-foreground]=\"showForeground\"\n  [class.foreground-closing]=\"foregroundClosing\"\n></div>\n<!-- Progress bar }}} -->\n\n<!-- Foreground container {{{ -->\n<div\n  class=\"ngx-overlay\"\n  [class.ngx-position-absolute]=\"loaderId !== defaultConfig.masterLoaderId\"\n  [style.background-color]=\"overlayColor\"\n  [style.border-radius]=\"overlayBorderRadius\"\n  [class.loading-foreground]=\"showForeground\"\n  [class.foreground-closing]=\"foregroundClosing\"\n>\n  <!-- Logo {{{ -->\n  <img\n    *ngIf=\"logoUrl\"\n    class=\"ngx-loading-logo\"\n    [ngClass]=\"logoPosition\"\n    [src]=\"trustedLogoUrl\"\n    [style.width.px]=\"logoSize\"\n    [style.height.px]=\"logoSize\"\n    [style.top]=\"logoTop\"\n  />\n  <!-- Logo }}} -->\n\n  <!-- Foreground spinner {{{ -->\n  <div\n    class=\"ngx-foreground-spinner\"\n    [ngClass]=\"fgsPosition\"\n    [style.color]=\"fgsColor\"\n    [style.width.px]=\"fgsSize\"\n    [style.height.px]=\"fgsSize\"\n    [style.top]=\"spinnerTop\"\n  >\n    <div [class]=\"fgSpinnerClass\">\n      <div *ngFor=\"let div of fgDivs\"></div>\n    </div>\n  </div>\n  <!-- Foreground spinner }}} -->\n\n  <!-- Loading text {{{ -->\n  <div class=\"ngx-loading-text\" [ngClass]=\"textPosition\" [style.top]=\"textTop\" [style.color]=\"textColor\">{{ text }}</div>\n  <!-- Loading text }}} -->\n</div>\n<!-- Foreground container }}} -->\n\n<!-- Background spinner {{{ -->\n<div\n  class=\"ngx-background-spinner\"\n  [class.ngx-position-absolute]=\"loaderId !== defaultConfig.masterLoaderId\"\n  [ngClass]=\"bgsPosition\"\n  [class.loading-background]=\"showBackground\"\n  [class.background-closing]=\"backgroundClosing\"\n  [style.width.px]=\"bgsSize\"\n  [style.height.px]=\"bgsSize\"\n  [style.color]=\"bgsColor\"\n  [style.opacity]=\"bgsOpacity\"\n>\n  <div [class]=\"bgSpinnerClass\">\n    <div *ngFor=\"let div of bgDivs\"></div>\n  </div>\n</div>\n<!-- Background spinner }}} -->\n",
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    styles: [".ngx-progress-bar{position:fixed;top:0;left:0;width:100%;height:3px;z-index:99999!important;display:none;color:#00acc1;overflow:hidden}.ngx-progress-bar.foreground-closing,.ngx-progress-bar.loading-foreground{display:block}.ngx-progress-bar.foreground-closing{opacity:0!important;transition:opacity .5s ease-out .5s}.ngx-progress-bar::after,.ngx-progress-bar::before{background-color:currentColor;content:\"\";display:block;width:100%;height:100%;position:absolute;top:0}.ngx-progress-bar-ltr::before{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}.ngx-progress-bar-ltr::after{-webkit-animation:20s ease-out progressBar-slide-ltr;animation:20s ease-out progressBar-slide-ltr;-webkit-transform:translate3d(-5%,0,0);transform:translate3d(-5%,0,0)}.ngx-progress-bar-rtl::before{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}.ngx-progress-bar-rtl::after{-webkit-animation:20s ease-out progressBar-slide-rtl;animation:20s ease-out progressBar-slide-rtl;-webkit-transform:translate3d(5%,0,0);transform:translate3d(5%,0,0)}.foreground-closing.ngx-progress-bar-ltr::before{-webkit-animation:1s ease-out progressBar-slide-complete-ltr;animation:1s ease-out progressBar-slide-complete-ltr;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}.foreground-closing.ngx-progress-bar-rtl::before{-webkit-animation:1s ease-out progressBar-slide-complete-rtl;animation:1s ease-out progressBar-slide-complete-rtl;-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}@-webkit-keyframes progressBar-slide-ltr{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{-webkit-transform:translate3d(-5%,0,0);transform:translate3d(-5%,0,0)}}@keyframes progressBar-slide-ltr{from{-webkit-transform:translate3d(-100%,0,0);transform:translate3d(-100%,0,0)}to{-webkit-transform:translate3d(-5%,0,0);transform:translate3d(-5%,0,0)}}@-webkit-keyframes progressBar-slide-rtl{from{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{-webkit-transform:translate3d(5%,0,0);transform:translate3d(5%,0,0)}}@keyframes progressBar-slide-rtl{from{-webkit-transform:translate3d(100%,0,0);transform:translate3d(100%,0,0)}to{-webkit-transform:translate3d(5%,0,0);transform:translate3d(5%,0,0)}}@-webkit-keyframes progressBar-slide-complete-ltr{0%{-webkit-transform:translate3d(-75%,0,0);transform:translate3d(-75%,0,0)}50%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes progressBar-slide-complete-ltr{0%{-webkit-transform:translate3d(-75%,0,0);transform:translate3d(-75%,0,0)}50%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@-webkit-keyframes progressBar-slide-complete-rtl{0%{-webkit-transform:translate3d(75%,0,0);transform:translate3d(75%,0,0)}50%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}@keyframes progressBar-slide-complete-rtl{0%{-webkit-transform:translate3d(75%,0,0);transform:translate3d(75%,0,0)}50%{-webkit-transform:translate3d(0,0,0);transform:translate3d(0,0,0)}}.ngx-overlay{position:fixed;top:0;left:0;width:100%;height:100%;z-index:99998!important;background-color:rgba(40,40,40,.8);cursor:progress;display:none}.ngx-overlay.foreground-closing,.ngx-overlay.loading-foreground{display:block}.ngx-overlay.foreground-closing{opacity:0!important;transition:opacity .5s ease-out .5s}.ngx-overlay>.ngx-foreground-spinner{position:fixed;width:60px;height:60px;margin:0;color:#00acc1}.ngx-overlay>.ngx-loading-logo{position:fixed;margin:0;width:120px;height:120px}.ngx-overlay>.ngx-loading-text{position:fixed;margin:0;font-family:sans-serif;font-weight:400;font-size:1.2em;color:#fff}.ngx-background-spinner{position:fixed;z-index:99997!important;width:60px;height:60px;margin:0;color:#00acc1;opacity:.6;display:none}.ngx-background-spinner.background-closing,.ngx-background-spinner.loading-background{display:block}.ngx-background-spinner.background-closing{opacity:0!important;transition:opacity .7s ease-out}.ngx-position-absolute,.ngx-position-absolute>.ngx-foreground-spinner,.ngx-position-absolute>.ngx-loading-logo,.ngx-position-absolute>.ngx-loading-text{position:absolute!important}.ngx-position-absolute.ngx-progress-bar{z-index:99996!important}.ngx-position-absolute.ngx-overlay{z-index:99995!important}.ngx-position-absolute .sk-square-jelly-box>div:nth-child(1),.ngx-position-absolute.ngx-background-spinner{z-index:99994!important}.top-left{top:30px;left:30px}.top-center{top:30px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.top-right{top:30px;right:30px}.center-left{top:50%;left:30px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.center-center{top:50%;left:50%;-webkit-transform:translate(-50%,-50%);transform:translate(-50%,-50%)}.center-right{top:50%;right:30px;-webkit-transform:translateY(-50%);transform:translateY(-50%)}.bottom-left{bottom:30px;left:30px}.bottom-center{bottom:30px;left:50%;-webkit-transform:translateX(-50%);transform:translateX(-50%)}.bottom-right{bottom:30px;right:30px}.sk-ball-scale-multiple,.sk-ball-scale-multiple>div{position:relative;box-sizing:border-box}.sk-ball-scale-multiple{width:100%;height:100%;font-size:0}.sk-ball-scale-multiple>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:0;left:0;width:100%;height:100%;border-radius:100%;opacity:0;-webkit-animation:1s linear infinite ball-scale-multiple;animation:1s linear infinite ball-scale-multiple}.sk-ball-scale-multiple>div:nth-child(2){-webkit-animation-delay:.2s;animation-delay:.2s}.sk-ball-scale-multiple>div:nth-child(3){-webkit-animation-delay:.4s;animation-delay:.4s}@-webkit-keyframes ball-scale-multiple{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}5%{opacity:.75}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-scale-multiple{0%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}5%{opacity:.75}100%{opacity:0;-webkit-transform:scale(1);transform:scale(1)}}.sk-ball-spin,.sk-ball-spin>div{position:relative;box-sizing:border-box}.sk-ball-spin{width:100%;height:100%;font-size:0}.sk-ball-spin>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:25%;height:25%;margin-top:-12.5%;margin-left:-12.5%;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin-clockwise;animation:1s ease-in-out infinite ball-spin-clockwise}.sk-ball-spin>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.sk-ball-spin>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.sk-ball-spin>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.sk-ball-spin>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.sk-ball-spin>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.sk-ball-spin>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.sk-ball-spin>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.sk-ball-spin>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}@-webkit-keyframes ball-spin{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes ball-spin{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}.sk-ball-spin-clockwise,.sk-ball-spin-clockwise>div{position:relative;box-sizing:border-box}.sk-ball-spin-clockwise{width:100%;height:100%;font-size:0}.sk-ball-spin-clockwise>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:25%;height:25%;margin-top:-12.5%;margin-left:-12.5%;border-radius:100%;-webkit-animation:1s ease-in-out infinite ball-spin-clockwise;animation:1s ease-in-out infinite ball-spin-clockwise}.sk-ball-spin-clockwise>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-875ms;animation-delay:-875ms}.sk-ball-spin-clockwise>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.sk-ball-spin-clockwise>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-625ms;animation-delay:-625ms}.sk-ball-spin-clockwise>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-ball-spin-clockwise>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-375ms;animation-delay:-375ms}.sk-ball-spin-clockwise>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.sk-ball-spin-clockwise>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-125ms;animation-delay:-125ms}.sk-ball-spin-clockwise>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}@-webkit-keyframes ball-spin-clockwise{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}@keyframes ball-spin-clockwise{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}20%{opacity:1}80%{opacity:0;-webkit-transform:scale(0);transform:scale(0)}}.sk-ball-spin-clockwise-fade-rotating,.sk-ball-spin-clockwise-fade-rotating>div{position:relative;box-sizing:border-box}.sk-ball-spin-clockwise-fade-rotating{font-size:0;width:100%;height:100%;-webkit-animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate;animation:6s linear infinite ball-spin-clockwise-fade-rotating-rotate}.sk-ball-spin-clockwise-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:25%;height:25%;margin-top:-12.5%;margin-left:-12.5%;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-clockwise-fade-rotating;animation:1s linear infinite ball-spin-clockwise-fade-rotating}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-875ms;animation-delay:-875ms}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-.75s;animation-delay:-.75s}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-625ms;animation-delay:-625ms}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-375ms;animation-delay:-375ms}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-.25s;animation-delay:-.25s}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-125ms;animation-delay:-125ms}.sk-ball-spin-clockwise-fade-rotating>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:0s;animation-delay:0s}@-webkit-keyframes ball-spin-clockwise-fade-rotating-rotate{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes ball-spin-clockwise-fade-rotating-rotate{100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@-webkit-keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}@keyframes ball-spin-clockwise-fade-rotating{50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}}.sk-ball-spin-fade-rotating,.sk-ball-spin-fade-rotating>div{position:relative;box-sizing:border-box}.sk-ball-spin-fade-rotating{width:100%;height:100%;font-size:0;-webkit-animation:6s linear infinite ball-spin-fade-rotate;animation:6s linear infinite ball-spin-fade-rotate}.sk-ball-spin-fade-rotating>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;position:absolute;top:50%;left:50%;width:25%;height:25%;margin-top:-12.5%;margin-left:-12.5%;border-radius:100%;-webkit-animation:1s linear infinite ball-spin-fade;animation:1s linear infinite ball-spin-fade}.sk-ball-spin-fade-rotating>div:nth-child(1){top:5%;left:50%;-webkit-animation-delay:-1.125s;animation-delay:-1.125s}.sk-ball-spin-fade-rotating>div:nth-child(2){top:18.1801948466%;left:81.8198051534%;-webkit-animation-delay:-1.25s;animation-delay:-1.25s}.sk-ball-spin-fade-rotating>div:nth-child(3){top:50%;left:95%;-webkit-animation-delay:-1.375s;animation-delay:-1.375s}.sk-ball-spin-fade-rotating>div:nth-child(4){top:81.8198051534%;left:81.8198051534%;-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.sk-ball-spin-fade-rotating>div:nth-child(5){top:94.9999999966%;left:50.0000000005%;-webkit-animation-delay:-1.625s;animation-delay:-1.625s}.sk-ball-spin-fade-rotating>div:nth-child(6){top:81.8198046966%;left:18.1801949248%;-webkit-animation-delay:-1.75s;animation-delay:-1.75s}.sk-ball-spin-fade-rotating>div:nth-child(7){top:49.9999750815%;left:5.0000051215%;-webkit-animation-delay:-1.875s;animation-delay:-1.875s}.sk-ball-spin-fade-rotating>div:nth-child(8){top:18.179464974%;left:18.1803700518%;-webkit-animation-delay:-2s;animation-delay:-2s}@-webkit-keyframes ball-spin-fade-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes ball-spin-fade-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes ball-spin-fade{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}}@keyframes ball-spin-fade{0%,100%{opacity:1;-webkit-transform:scale(1);transform:scale(1)}50%{opacity:.25;-webkit-transform:scale(.5);transform:scale(.5)}}.sk-chasing-dots{margin:auto;width:100%;height:100%;position:absolute;text-align:center;-webkit-animation:2s linear infinite sk-chasingDots-rotate;animation:2s linear infinite sk-chasingDots-rotate}.sk-chasing-dots>div{width:60%;height:60%;display:inline-block;position:absolute;top:0;background-color:currentColor;border-radius:100%;-webkit-animation:2s ease-in-out infinite sk-chasingDots-bounce;animation:2s ease-in-out infinite sk-chasingDots-bounce}.sk-chasing-dots>div:nth-child(2){top:auto;bottom:0;-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-chasingDots-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes sk-chasingDots-rotate{100%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes sk-chasingDots-bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-chasingDots-bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}.sk-circle{margin:auto;width:100%;height:100%;position:relative}.sk-circle>div{width:100%;height:100%;position:absolute;left:0;top:0}.sk-circle>div::before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:currentColor;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-circle-bounceDelay;animation:1.2s ease-in-out infinite both sk-circle-bounceDelay}.sk-circle>div:nth-child(2){-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-circle>div:nth-child(3){-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-circle>div:nth-child(4){-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-circle>div:nth-child(5){-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-circle>div:nth-child(6){-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-circle>div:nth-child(7){-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-circle>div:nth-child(8){-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-circle>div:nth-child(9){-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-circle>div:nth-child(10){-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-circle>div:nth-child(11){-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-circle>div:nth-child(12){-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-circle>div:nth-child(2)::before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-circle>div:nth-child(3)::before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-circle>div:nth-child(4)::before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-circle>div:nth-child(5)::before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-circle>div:nth-child(6)::before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-circle>div:nth-child(7)::before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-circle>div:nth-child(8)::before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-circle>div:nth-child(9)::before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-circle>div:nth-child(10)::before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-circle>div:nth-child(11)::before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-circle>div:nth-child(12)::before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-circle-bounceDelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-circle-bounceDelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.sk-cube-grid{width:100%;height:100%;margin:auto}.sk-cube-grid>div{width:33%;height:33%;background-color:currentColor;float:left;-webkit-animation:1.3s ease-in-out infinite sk-cubeGrid-scaleDelay;animation:1.3s ease-in-out infinite sk-cubeGrid-scaleDelay}.sk-cube-grid>div:nth-child(1){-webkit-animation-delay:.2s;animation-delay:.2s}.sk-cube-grid>div:nth-child(2){-webkit-animation-delay:.3s;animation-delay:.3s}.sk-cube-grid>div:nth-child(3){-webkit-animation-delay:.4s;animation-delay:.4s}.sk-cube-grid>div:nth-child(4){-webkit-animation-delay:.1s;animation-delay:.1s}.sk-cube-grid>div:nth-child(5){-webkit-animation-delay:.2s;animation-delay:.2s}.sk-cube-grid>div:nth-child(6){-webkit-animation-delay:.3s;animation-delay:.3s}.sk-cube-grid>div:nth-child(7){-webkit-animation-delay:0s;animation-delay:0s}.sk-cube-grid>div:nth-child(8){-webkit-animation-delay:.1s;animation-delay:.1s}.sk-cube-grid>div:nth-child(9){-webkit-animation-delay:.2s;animation-delay:.2s}@-webkit-keyframes sk-cubeGrid-scaleDelay{0%,100%,70%{-webkit-transform:scale3D(1,1,1);transform:scale3D(1,1,1)}35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}}@keyframes sk-cubeGrid-scaleDelay{0%,100%,70%{-webkit-transform:scale3D(1,1,1);transform:scale3D(1,1,1)}35%{-webkit-transform:scale3D(0,0,1);transform:scale3D(0,0,1)}}.sk-double-bounce{width:100%;height:100%;position:relative;margin:auto}.sk-double-bounce>div{width:100%;height:100%;border-radius:50%;background-color:currentColor;opacity:.6;position:absolute;top:0;left:0;-webkit-animation:2s ease-in-out infinite sk-doubleBounce-bounce;animation:2s ease-in-out infinite sk-doubleBounce-bounce}.sk-double-bounce>div:nth-child(2){-webkit-animation-delay:-1s;animation-delay:-1s}@-webkit-keyframes sk-doubleBounce-bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-doubleBounce-bounce{0%,100%{-webkit-transform:scale(0);transform:scale(0)}50%{-webkit-transform:scale(1);transform:scale(1)}}.sk-fading-circle{margin:auto;width:100%;height:100%;position:relative}.sk-fading-circle>div{width:100%;height:100%;position:absolute;left:0;top:0}.sk-fading-circle>div::before{content:\"\";display:block;margin:0 auto;width:15%;height:15%;background-color:currentColor;border-radius:100%;-webkit-animation:1.2s ease-in-out infinite both sk-fadingCircle-FadeDelay;animation:1.2s ease-in-out infinite both sk-fadingCircle-FadeDelay}.sk-fading-circle>div:nth-child(2){-webkit-transform:rotate(30deg);transform:rotate(30deg)}.sk-fading-circle>div:nth-child(3){-webkit-transform:rotate(60deg);transform:rotate(60deg)}.sk-fading-circle>div:nth-child(4){-webkit-transform:rotate(90deg);transform:rotate(90deg)}.sk-fading-circle>div:nth-child(5){-webkit-transform:rotate(120deg);transform:rotate(120deg)}.sk-fading-circle>div:nth-child(6){-webkit-transform:rotate(150deg);transform:rotate(150deg)}.sk-fading-circle>div:nth-child(7){-webkit-transform:rotate(180deg);transform:rotate(180deg)}.sk-fading-circle>div:nth-child(8){-webkit-transform:rotate(210deg);transform:rotate(210deg)}.sk-fading-circle>div:nth-child(9){-webkit-transform:rotate(240deg);transform:rotate(240deg)}.sk-fading-circle>div:nth-child(10){-webkit-transform:rotate(270deg);transform:rotate(270deg)}.sk-fading-circle>div:nth-child(11){-webkit-transform:rotate(300deg);transform:rotate(300deg)}.sk-fading-circle>div:nth-child(12){-webkit-transform:rotate(330deg);transform:rotate(330deg)}.sk-fading-circle>div:nth-child(2)::before{-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-fading-circle>div:nth-child(3)::before{-webkit-animation-delay:-1s;animation-delay:-1s}.sk-fading-circle>div:nth-child(4)::before{-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-fading-circle>div:nth-child(5)::before{-webkit-animation-delay:-.8s;animation-delay:-.8s}.sk-fading-circle>div:nth-child(6)::before{-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-fading-circle>div:nth-child(7)::before{-webkit-animation-delay:-.6s;animation-delay:-.6s}.sk-fading-circle>div:nth-child(8)::before{-webkit-animation-delay:-.5s;animation-delay:-.5s}.sk-fading-circle>div:nth-child(9)::before{-webkit-animation-delay:-.4s;animation-delay:-.4s}.sk-fading-circle>div:nth-child(10)::before{-webkit-animation-delay:-.3s;animation-delay:-.3s}.sk-fading-circle>div:nth-child(11)::before{-webkit-animation-delay:-.2s;animation-delay:-.2s}.sk-fading-circle>div:nth-child(12)::before{-webkit-animation-delay:-.1s;animation-delay:-.1s}@-webkit-keyframes sk-fadingCircle-FadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}@keyframes sk-fadingCircle-FadeDelay{0%,100%,39%{opacity:0}40%{opacity:1}}.sk-folding-cube{margin:auto;width:100%;height:100%;position:relative;-webkit-transform:rotateZ(45deg);transform:rotateZ(45deg)}.sk-folding-cube>div{float:left;width:50%;height:50%;position:relative;-webkit-transform:scale(1.1);transform:scale(1.1)}.sk-folding-cube>div::before{content:\"\";position:absolute;top:0;left:0;width:100%;height:100%;background-color:currentColor;-webkit-animation:2.4s linear infinite both sk-foldingCube-angle;animation:2.4s linear infinite both sk-foldingCube-angle;-webkit-transform-origin:100% 100%;transform-origin:100% 100%}.sk-folding-cube>div:nth-child(2){-webkit-transform:scale(1.1) rotateZ(90deg);transform:scale(1.1) rotateZ(90deg)}.sk-folding-cube>div:nth-child(3){-webkit-transform:scale(1.1) rotateZ(270deg);transform:scale(1.1) rotateZ(270deg)}.sk-folding-cube>div:nth-child(4){-webkit-transform:scale(1.1) rotateZ(180deg);transform:scale(1.1) rotateZ(180deg)}.sk-folding-cube>div:nth-child(2)::before{-webkit-animation-delay:.3s;animation-delay:.3s}.sk-folding-cube>div:nth-child(3)::before{-webkit-animation-delay:.9s;animation-delay:.9s}.sk-folding-cube>div:nth-child(4)::before{-webkit-animation-delay:.6s;animation-delay:.6s}@-webkit-keyframes sk-foldingCube-angle{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0);transform:perspective(140px) rotateX(0);opacity:1}100%,90%{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}@keyframes sk-foldingCube-angle{0%,10%{-webkit-transform:perspective(140px) rotateX(-180deg);transform:perspective(140px) rotateX(-180deg);opacity:0}25%,75%{-webkit-transform:perspective(140px) rotateX(0);transform:perspective(140px) rotateX(0);opacity:1}100%,90%{-webkit-transform:perspective(140px) rotateY(180deg);transform:perspective(140px) rotateY(180deg);opacity:0}}.sk-pulse{width:100%;height:100%;margin:auto}.sk-pulse>div{width:100%;height:100%;background-color:currentColor;border-radius:100%;-webkit-animation:1s ease-in-out infinite sk-pulse-scaleOut;animation:1s ease-in-out infinite sk-pulse-scaleOut}@-webkit-keyframes sk-pulse-scaleOut{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}@keyframes sk-pulse-scaleOut{0%{-webkit-transform:scale(0);transform:scale(0)}100%{-webkit-transform:scale(1);transform:scale(1);opacity:0}}.sk-rectangle-bounce{margin:auto;width:100%;height:100%;text-align:center;font-size:0}.sk-rectangle-bounce>div{background-color:currentColor;height:100%;width:10%;margin:0 5%;display:inline-block;-webkit-animation:1.2s ease-in-out infinite sk-rectangleBounce-stretchDelay;animation:1.2s ease-in-out infinite sk-rectangleBounce-stretchDelay}.sk-rectangle-bounce>div:nth-child(2){-webkit-animation-delay:-1.1s;animation-delay:-1.1s}.sk-rectangle-bounce>div:nth-child(3){-webkit-animation-delay:-1s;animation-delay:-1s}.sk-rectangle-bounce>div:nth-child(4){-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-rectangle-bounce>div:nth-child(5){-webkit-animation-delay:-.8s;animation-delay:-.8s}@-webkit-keyframes sk-rectangleBounce-stretchDelay{0%,100%,40%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}20%{-webkit-transform:scaleY(1);transform:scaleY(1)}}@keyframes sk-rectangleBounce-stretchDelay{0%,100%,40%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}20%{-webkit-transform:scaleY(1);transform:scaleY(1)}}.sk-rectangle-bounce-party,.sk-rectangle-bounce-party>div{position:relative;box-sizing:border-box}.sk-rectangle-bounce-party{margin:auto;width:100%;height:100%;text-align:center;font-size:0}.sk-rectangle-bounce-party>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10%;height:100%;margin:0 5%;border-radius:0;-webkit-animation-name:rectangle-bounce-party;animation-name:rectangle-bounce-party;-webkit-animation-iteration-count:infinite;animation-iteration-count:infinite}.sk-rectangle-bounce-party>div:nth-child(1){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.23s;animation-delay:-.23s}.sk-rectangle-bounce-party>div:nth-child(2){-webkit-animation-duration:.62s;animation-duration:.62s;-webkit-animation-delay:-.32s;animation-delay:-.32s}.sk-rectangle-bounce-party>div:nth-child(3){-webkit-animation-duration:.43s;animation-duration:.43s;-webkit-animation-delay:-.44s;animation-delay:-.44s}.sk-rectangle-bounce-party>div:nth-child(4){-webkit-animation-duration:.8s;animation-duration:.8s;-webkit-animation-delay:-.31s;animation-delay:-.31s}.sk-rectangle-bounce-party>div:nth-child(5){-webkit-animation-duration:.74s;animation-duration:.74s;-webkit-animation-delay:-.24s;animation-delay:-.24s}@-webkit-keyframes rectangle-bounce-party{0%,100%{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}}@keyframes rectangle-bounce-party{0%,100%{-webkit-transform:scaleY(1);transform:scaleY(1)}50%{-webkit-transform:scaleY(.4);transform:scaleY(.4)}}.sk-rectangle-bounce-pulse-out,.sk-rectangle-bounce-pulse-out>div{position:relative;box-sizing:border-box}.sk-rectangle-bounce-pulse-out{margin:auto;width:100%;height:100%;text-align:center;font-size:0}.sk-rectangle-bounce-pulse-out>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10%;height:100%;margin:0 5%;border-radius:0;-webkit-animation:.9s cubic-bezier(.85,.25,.37,.85) infinite rectangle-bounce-pulse-out;animation:.9s cubic-bezier(.85,.25,.37,.85) infinite rectangle-bounce-pulse-out}.sk-rectangle-bounce-pulse-out>div:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-rectangle-bounce-pulse-out>div:nth-child(2),.sk-rectangle-bounce-pulse-out>div:nth-child(4){-webkit-animation-delay:-.7s;animation-delay:-.7s}.sk-rectangle-bounce-pulse-out>div:nth-child(1),.sk-rectangle-bounce-pulse-out>div:nth-child(5){-webkit-animation-delay:-.5s;animation-delay:-.5s}@-webkit-keyframes rectangle-bounce-pulse-out{0%,100%{-webkit-transform:scaley(1);transform:scaley(1)}50%{-webkit-transform:scaley(.4);transform:scaley(.4)}}@keyframes rectangle-bounce-pulse-out{0%,100%{-webkit-transform:scaley(1);transform:scaley(1)}50%{-webkit-transform:scaley(.4);transform:scaley(.4)}}.sk-rectangle-bounce-pulse-out-rapid,.sk-rectangle-bounce-pulse-out-rapid>div{position:relative;box-sizing:border-box}.sk-rectangle-bounce-pulse-out-rapid{margin:auto;width:100%;height:100%;text-align:center;font-size:0}.sk-rectangle-bounce-pulse-out-rapid>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor;width:10%;height:100%;margin:0 5%;border-radius:0;-webkit-animation:.9s cubic-bezier(.11,.49,.38,.78) infinite rectangle-bounce-pulse-out-rapid;animation:.9s cubic-bezier(.11,.49,.38,.78) infinite rectangle-bounce-pulse-out-rapid}.sk-rectangle-bounce-pulse-out-rapid>div:nth-child(3){-webkit-animation-delay:-.9s;animation-delay:-.9s}.sk-rectangle-bounce-pulse-out-rapid>div:nth-child(2),.sk-rectangle-bounce-pulse-out-rapid>div:nth-child(4){-webkit-animation-delay:-.65s;animation-delay:-.65s}.sk-rectangle-bounce-pulse-out-rapid>div:nth-child(1),.sk-rectangle-bounce-pulse-out-rapid>div:nth-child(5){-webkit-animation-delay:-.4s;animation-delay:-.4s}@-webkit-keyframes rectangle-bounce-pulse-out-rapid{0%,90%{-webkit-transform:scaley(1);transform:scaley(1)}80%{-webkit-transform:scaley(.4);transform:scaley(.4)}}@keyframes rectangle-bounce-pulse-out-rapid{0%,90%{-webkit-transform:scaley(1);transform:scaley(1)}80%{-webkit-transform:scaley(.4);transform:scaley(.4)}}.sk-rotating-plane{width:100%;height:100%;text-align:center;margin:auto}.sk-rotating-plane>div{width:100%;height:100%;background-color:currentColor;-webkit-animation:1.2s ease-in-out infinite sk-rotatePlane;animation:1.2s ease-in-out infinite sk-rotatePlane}@-webkit-keyframes sk-rotatePlane{0%{-webkit-transform:perspective(120px) rotateX(0) rotateY(0);transform:perspective(120px) rotateX(0) rotateY(0)}50%{-webkit-transform:perspective(120px) rotateX(-180.1deg) rotateY(0);transform:perspective(120px) rotateX(-180.1deg) rotateY(0)}100%{-webkit-transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg);transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}@keyframes sk-rotatePlane{0%{-webkit-transform:perspective(120px) rotateX(0) rotateY(0);transform:perspective(120px) rotateX(0) rotateY(0)}50%{-webkit-transform:perspective(120px) rotateX(-180.1deg) rotateY(0);transform:perspective(120px) rotateX(-180.1deg) rotateY(0)}100%{-webkit-transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg);transform:perspective(120px) rotateX(-180deg) rotateY(-179.9deg)}}.sk-square-jelly-box,.sk-square-jelly-box>div{position:relative;box-sizing:border-box}.sk-square-jelly-box{width:100%;height:100%;font-size:0}.sk-square-jelly-box>div{display:inline-block;float:none;background-color:currentColor;border:0 solid currentColor}.sk-square-jelly-box>div:nth-child(1),.sk-square-jelly-box>div:nth-child(2){position:absolute;left:0;width:100%}.sk-square-jelly-box>div:nth-child(1){top:-25%;z-index:99997;height:100%;border-radius:10%;-webkit-animation:.6s linear -.1s infinite square-jelly-box-animate;animation:.6s linear -.1s infinite square-jelly-box-animate}.sk-square-jelly-box>div:nth-child(2){bottom:-9%;height:10%;background:#000;border-radius:50%;opacity:.2;-webkit-animation:.6s linear -.1s infinite square-jelly-box-shadow;animation:.6s linear -.1s infinite square-jelly-box-shadow}@-webkit-keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-webkit-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1,.9) rotate(45deg);transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{-webkit-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-webkit-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@keyframes square-jelly-box-animate{17%{border-bottom-right-radius:10%}25%{-webkit-transform:translateY(25%) rotate(22.5deg);transform:translateY(25%) rotate(22.5deg)}50%{border-bottom-right-radius:100%;-webkit-transform:translateY(50%) scale(1,.9) rotate(45deg);transform:translateY(50%) scale(1,.9) rotate(45deg)}75%{-webkit-transform:translateY(25%) rotate(67.5deg);transform:translateY(25%) rotate(67.5deg)}100%{-webkit-transform:translateY(0) rotate(90deg);transform:translateY(0) rotate(90deg)}}@-webkit-keyframes square-jelly-box-shadow{50%{-webkit-transform:scale(1.25,1);transform:scale(1.25,1)}}@keyframes square-jelly-box-shadow{50%{-webkit-transform:scale(1.25,1);transform:scale(1.25,1)}}.sk-square-loader,.sk-square-loader>div{position:relative;box-sizing:border-box}.sk-square-loader{font-size:0;width:100%;height:100%}.sk-square-loader>div{display:inline-block;float:none;border:3px solid currentColor;width:100%;height:100%;background:0 0;border-radius:0;-webkit-animation:2s infinite square-loader;animation:2s infinite square-loader}.sk-square-loader>div:after{display:inline-block;width:100%;vertical-align:top;content:\"\";background-color:currentColor;-webkit-animation:2s ease-in infinite square-loader-inner;animation:2s ease-in infinite square-loader-inner}@-webkit-keyframes square-loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}25%,50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%,75%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@keyframes square-loader{0%{-webkit-transform:rotate(0);transform:rotate(0)}25%,50%{-webkit-transform:rotate(180deg);transform:rotate(180deg)}100%,75%{-webkit-transform:rotate(360deg);transform:rotate(360deg)}}@-webkit-keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}@keyframes square-loader-inner{0%,100%,25%{height:0}50%,75%{height:100%}}.sk-three-bounce{margin:auto;width:100%;height:100%;text-align:center}.sk-three-bounce>div{margin-top:35%;width:30%;height:30%;background-color:currentColor;border-radius:100%;display:inline-block;-webkit-animation:1.4s ease-in-out infinite both sk-threeBounce-bounceDelay;animation:1.4s ease-in-out infinite both sk-threeBounce-bounceDelay}.bottom-center>.sk-three-bounce>div,.bottom-left>.sk-three-bounce>div,.bottom-right>.sk-three-bounce>div{margin-top:70%!important}.top-center>.sk-three-bounce>div,.top-left>.sk-three-bounce>div,.top-right>.sk-three-bounce>div{margin-top:0!important}.sk-three-bounce>div:nth-child(1){-webkit-animation-delay:-.32s;animation-delay:-.32s}.sk-three-bounce>div:nth-child(2){-webkit-animation-delay:-.16s;animation-delay:-.16s}@-webkit-keyframes sk-threeBounce-bounceDelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}@keyframes sk-threeBounce-bounceDelay{0%,100%,80%{-webkit-transform:scale(0);transform:scale(0)}40%{-webkit-transform:scale(1);transform:scale(1)}}.sk-three-strings{width:100%;height:100%}.sk-three-strings>div{position:absolute;box-sizing:border-box;width:100%;height:100%;border-radius:50%}.sk-three-strings>div:nth-child(1){left:0;top:0;-webkit-animation:1s linear infinite sk-threeStrings-rotateOne;animation:1s linear infinite sk-threeStrings-rotateOne;border-bottom:3px solid currentColor}.sk-three-strings>div:nth-child(2){right:0;top:0;-webkit-animation:1s linear infinite sk-threeStrings-rotateTwo;animation:1s linear infinite sk-threeStrings-rotateTwo;border-right:3px solid currentColor}.sk-three-strings>div:nth-child(3){right:0;bottom:0;-webkit-animation:1s linear infinite sk-threeStrings-rotateThree;animation:1s linear infinite sk-threeStrings-rotateThree;border-top:3px solid currentColor}@-webkit-keyframes sk-threeStrings-rotateOne{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(0);transform:rotateX(35deg) rotateY(-45deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg)}}@keyframes sk-threeStrings-rotateOne{0%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(0);transform:rotateX(35deg) rotateY(-45deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(-45deg) rotateZ(360deg)}}@-webkit-keyframes sk-threeStrings-rotateTwo{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(0);transform:rotateX(50deg) rotateY(10deg) rotateZ(0)}100%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg);transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg)}}@keyframes sk-threeStrings-rotateTwo{0%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(0);transform:rotateX(50deg) rotateY(10deg) rotateZ(0)}100%{-webkit-transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg);transform:rotateX(50deg) rotateY(10deg) rotateZ(360deg)}}@-webkit-keyframes sk-threeStrings-rotateThree{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(0);transform:rotateX(35deg) rotateY(55deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg)}}@keyframes sk-threeStrings-rotateThree{0%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(0);transform:rotateX(35deg) rotateY(55deg) rotateZ(0)}100%{-webkit-transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg);transform:rotateX(35deg) rotateY(55deg) rotateZ(360deg)}}.sk-wandering-cubes{margin:auto;width:100%;height:100%;position:relative;text-align:center}.sk-wandering-cubes>div{background-color:currentColor;width:25%;height:25%;position:absolute;top:0;left:0;-webkit-animation:1.8s ease-in-out infinite sk-wanderingCubes-cubeMove;animation:1.8s ease-in-out infinite sk-wanderingCubes-cubeMove}.sk-wandering-cubes>div:nth-child(2){-webkit-animation-delay:-.9s;animation-delay:-.9s}@-webkit-keyframes sk-wanderingCubes-cubeMove{25%{-webkit-transform:translateX(290%) rotate(-90deg) scale(.5);transform:translateX(290%) rotate(-90deg) scale(.5)}50%{-webkit-transform:translateX(290%) translateY(290%) rotate(-179deg);transform:translateX(290%) translateY(290%) rotate(-179deg)}50.1%{-webkit-transform:translateX(290%) translateY(290%) rotate(-180deg);transform:translateX(290%) translateY(290%) rotate(-180deg)}75%{-webkit-transform:translateX(0) translateY(290%) rotate(-270deg) scale(.5);transform:translateX(0) translateY(290%) rotate(-270deg) scale(.5)}100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}@keyframes sk-wanderingCubes-cubeMove{25%{-webkit-transform:translateX(290%) rotate(-90deg) scale(.5);transform:translateX(290%) rotate(-90deg) scale(.5)}50%{-webkit-transform:translateX(290%) translateY(290%) rotate(-179deg);transform:translateX(290%) translateY(290%) rotate(-179deg)}50.1%{-webkit-transform:translateX(290%) translateY(290%) rotate(-180deg);transform:translateX(290%) translateY(290%) rotate(-180deg)}75%{-webkit-transform:translateX(0) translateY(290%) rotate(-270deg) scale(.5);transform:translateX(0) translateY(290%) rotate(-270deg) scale(.5)}100%{-webkit-transform:rotate(-360deg);transform:rotate(-360deg)}}"]
                }] }
    ];
    /** @nocollapse */
    NgxUiLoaderComponent.ctorParameters = function () { return [
        { type: DomSanitizer },
        { type: ChangeDetectorRef },
        { type: NgxUiLoaderService }
    ]; };
    NgxUiLoaderComponent.propDecorators = {
        bgsColor: [{ type: Input }],
        bgsOpacity: [{ type: Input }],
        bgsPosition: [{ type: Input }],
        bgsSize: [{ type: Input }],
        bgsType: [{ type: Input }],
        fgsColor: [{ type: Input }],
        fgsPosition: [{ type: Input }],
        fgsSize: [{ type: Input }],
        fgsType: [{ type: Input }],
        gap: [{ type: Input }],
        loaderId: [{ type: Input }],
        logoPosition: [{ type: Input }],
        logoSize: [{ type: Input }],
        logoUrl: [{ type: Input }],
        overlayBorderRadius: [{ type: Input }],
        overlayColor: [{ type: Input }],
        pbColor: [{ type: Input }],
        pbDirection: [{ type: Input }],
        pbThickness: [{ type: Input }],
        hasProgressBar: [{ type: Input }],
        text: [{ type: Input }],
        textColor: [{ type: Input }],
        textPosition: [{ type: Input }]
    };
    return NgxUiLoaderComponent;
}());
export { NgxUiLoaderComponent };
if (false) {
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgsColor;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgsOpacity;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgsPosition;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgsSize;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgsType;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.fgsColor;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.fgsPosition;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.fgsSize;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.fgsType;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.gap;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.loaderId;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.logoPosition;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.logoSize;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.logoUrl;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.overlayBorderRadius;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.overlayColor;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.pbColor;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.pbDirection;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.pbThickness;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.hasProgressBar;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.text;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.textColor;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.textPosition;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.fgDivs;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.fgSpinnerClass;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgDivs;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.bgSpinnerClass;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.showForeground;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.showBackground;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.foregroundClosing;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.backgroundClosing;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.trustedLogoUrl;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.logoTop;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.spinnerTop;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.textTop;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.showForegroundWatcher;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.showBackgroundWatcher;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.foregroundClosingWatcher;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.backgroundClosingWatcher;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.defaultConfig;
    /** @type {?} */
    NgxUiLoaderComponent.prototype.initialized;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderComponent.prototype.domSanitizer;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderComponent.prototype.changeDetectorRef;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderComponent.prototype.ngxService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdWktbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL2NvcmUvbmd4LXVpLWxvYWRlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUFBLE9BQU8sRUFDTCxTQUFTLEVBQ1QsS0FBSyxFQU1MLHVCQUF1QixFQUN2QixpQkFBaUIsRUFDbEIsTUFBTSxlQUFlLENBQUM7QUFDdkIsT0FBTyxFQUFFLFlBQVksRUFBOEIsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRixPQUFPLEVBQUUsa0JBQWtCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUU3RCxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFJeEMsT0FBTyxFQUFFLFFBQVEsRUFBRSxZQUFZLEVBQUUsT0FBTyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFDakUsT0FBTyxFQUFFLGNBQWMsRUFBRSxNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sRUFBRSxZQUFZLEVBQUUsTUFBTSxvQkFBb0IsQ0FBQztBQUVsRDtJQXFERTs7T0FFRztJQUNILDhCQUFvQixZQUEwQixFQUFVLGlCQUFvQyxFQUFVLFVBQThCO1FBQWhILGlCQUFZLEdBQVosWUFBWSxDQUFjO1FBQVUsc0JBQWlCLEdBQWpCLGlCQUFpQixDQUFtQjtRQUFVLGVBQVUsR0FBVixVQUFVLENBQW9CO1FBQ2xJLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3pCLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBRXhELElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUM7UUFDNUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUNoRCxJQUFJLENBQUMsV0FBVyxHQUFHLElB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b0M7O0lBQ3BDLHdDQUEwQjs7SUFDMUIsdUNBQXlCOztJQUN6QixtREFBcUM7O0lBQ3JDLDRDQUE4Qjs7SUFDOUIsdUNBQXlCOztJQUN6QiwyQ0FBb0M7O0lBQ3BDLDJDQUE2Qjs7SUFDN0IsOENBQWlDOztJQUNqQyxvQ0FBc0I7O0lBQ3RCLHlDQUEyQjs7SUFDM0IsNENBQW9DOztJQUVwQyxzQ0FBaUI7O0lBQ2pCLDhDQUF1Qjs7SUFDdkIsc0NBQWlCOztJQUNqQiw4Q0FBdUI7O0lBQ3ZCLDhDQUF3Qjs7SUFDeEIsOENBQXdCOztJQUN4QixpREFBMkI7O0lBQzNCLGlEQUEyQjs7SUFFM0IsOENBQWdDOztJQUNoQyx1Q0FBbUI7O0lBQ25CLDBDQUFzQjs7SUFDdEIsdUNBQW1COztJQUVuQixxREFBb0M7O0lBQ3BDLHFEQUFvQzs7SUFDcEMsd0RBQXVDOztJQUN2Qyx3REFBdUM7O0lBRXZDLDZDQUFpQzs7SUFDakMsMkNBQXFCOzs7OztJQUtULDRDQUFrQzs7Ozs7SUFBRSxpREFBNEM7Ozs7O0lBQUUsMENBQXNDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgQ29tcG9uZW50LFxuICBJbnB1dCxcbiAgT25Jbml0LFxuICBPbkNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZXMsXG4gIFNpbXBsZUNoYW5nZSxcbiAgT25EZXN0cm95LFxuICBDaGFuZ2VEZXRlY3Rpb25TdHJhdGVneSxcbiAgQ2hhbmdlRGV0ZWN0b3JSZWZcbn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBEb21TYW5pdGl6ZXIsIFNhZmVSZXNvdXJjZVVybCwgU2FmZVN0eWxlIH0gZnJvbSAnQGFuZ3VsYXIvcGxhdGZvcm0tYnJvd3Nlcic7XG5pbXBvcnQgeyBOZ3hVaUxvYWRlclNlcnZpY2UgfSBmcm9tICcuL25neC11aS1sb2FkZXIuc2VydmljZSc7XG5pbXBvcnQgeyBTdWJzY3JpcHRpb24gfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IGZpbHRlciB9IGZyb20gJ3J4anMvb3BlcmF0b3JzJztcblxuaW1wb3J0IHsgTmd4VWlMb2FkZXJDb25maWcgfSBmcm9tICcuLi91dGlscy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IERpcmVjdGlvblR5cGUsIFBvc2l0aW9uVHlwZSwgU3Bpbm5lclR5cGUgfSBmcm9tICcuLi91dGlscy90eXBlcyc7XG5pbXBvcnQgeyBQT1NJVElPTiwgUEJfRElSRUNUSU9OLCBTUElOTkVSIH0gZnJvbSAnLi4vdXRpbHMvZW51bXMnO1xuaW1wb3J0IHsgU1BJTk5FUl9DT05GSUcgfSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgU2hvd0V2ZW50IH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBjb2VyY2VOdW1iZXIgfSBmcm9tICcuLi91dGlscy9mdW5jdGlvbnMnO1xuXG5AQ29tcG9uZW50KHtcbiAgc2VsZWN0b3I6ICduZ3gtdWktbG9hZGVyJyxcbiAgdGVtcGxhdGVVcmw6ICcuL25neC11aS1sb2FkZXIuY29tcG9uZW50Lmh0bWwnLFxuICBzdHlsZVVybHM6IFsnLi9uZ3gtdWktbG9hZGVyLmNvbXBvbmVudC5zY3NzJ10sXG4gIGNoYW5nZURldGVjdGlvbjogQ2hhbmdlRGV0ZWN0aW9uU3RyYXRlZ3kuT25QdXNoXG59KVxuZXhwb3J0IGNsYXNzIE5neFVpTG9hZGVyQ29tcG9uZW50IGltcGxlbWVudHMgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCB7XG4gIEBJbnB1dCgpIGJnc0NvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGJnc09wYWNpdHk6IG51bWJlcjtcbiAgQElucHV0KCkgYmdzUG9zaXRpb246IFBvc2l0aW9uVHlwZTtcbiAgQElucHV0KCkgYmdzU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBiZ3NUeXBlOiBTcGlubmVyVHlwZTtcbiAgQElucHV0KCkgZmdzQ29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgZmdzUG9zaXRpb246IFBvc2l0aW9uVHlwZTtcbiAgQElucHV0KCkgZmdzU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBmZ3NUeXBlOiBTcGlubmVyVHlwZTtcbiAgQElucHV0KCkgZ2FwOiBudW1iZXI7XG4gIEBJbnB1dCgpIGxvYWRlcklkOiBzdHJpbmc7XG4gIEBJbnB1dCgpIGxvZ29Qb3NpdGlvbjogUG9zaXRpb25UeXBlO1xuICBASW5wdXQoKSBsb2dvU2l6ZTogbnVtYmVyO1xuICBASW5wdXQoKSBsb2dvVXJsOiBzdHJpbmc7XG4gIEBJbnB1dCgpIG92ZXJsYXlCb3JkZXJSYWRpdXM6IHN0cmluZztcbiAgQElucHV0KCkgb3ZlcmxheUNvbG9yOiBzdHJpbmc7XG4gIEBJbnB1dCgpIHBiQ29sb3I6IHN0cmluZztcbiAgQElucHV0KCkgcGJEaXJlY3Rpb246IERpcmVjdGlvblR5cGU7XG4gIEBJbnB1dCgpIHBiVGhpY2tuZXNzOiBudW1iZXI7XG4gIEBJbnB1dCgpIGhhc1Byb2dyZXNzQmFyOiBib29sZWFuO1xuICBASW5wdXQoKSB0ZXh0OiBzdHJpbmc7XG4gIEBJbnB1dCgpIHRleHRDb2xvcjogc3RyaW5nO1xuICBASW5wdXQoKSB0ZXh0UG9zaXRpb246IFBvc2l0aW9uVHlwZTtcblxuICBmZ0RpdnM6IG51bWJlcltdO1xuICBmZ1NwaW5uZXJDbGFzczogc3RyaW5nO1xuICBiZ0RpdnM6IG51bWJlcltdO1xuICBiZ1NwaW5uZXJDbGFzczogc3RyaW5nO1xuICBzaG93Rm9yZWdyb3VuZDogYm9vbGVhbjtcbiAgc2hvd0JhY2tncm91bmQ6IGJvb2xlYW47XG4gIGZvcmVncm91bmRDbG9zaW5nOiBib29sZWFuO1xuICBiYWNrZ3JvdW5kQ2xvc2luZzogYm9vbGVhbjtcblxuICB0cnVzdGVkTG9nb1VybDogU2FmZVJlc291cmNlVXJsO1xuICBsb2dvVG9wOiBTYWZlU3R5bGU7XG4gIHNwaW5uZXJUb3A6IFNhZmVTdHlsZTtcbiAgdGV4dFRvcDogU2FmZVN0eWxlO1xuXG4gIHNob3dGb3JlZ3JvdW5kV2F0Y2hlcjogU3Vic2NyaXB0aW9uO1xuICBzaG93QmFja2dyb3VuZFdhdGNoZXI6IFN1YnNjcmlwdGlvbjtcbiAgZm9yZWdyb3VuZENsb3NpbmdXYXRjaGVyOiBTdWJzY3JpcHRpb247XG4gIGJhY2tncm91bmRDbG9zaW5nV2F0Y2hlcjogU3Vic2NyaXB0aW9uO1xuXG4gIGRlZmF1bHRDb25maWc6IE5neFVpTG9hZGVyQ29uZmlnO1xuICBpbml0aWFsaXplZDogYm9vbGVhbjtcblxuICAvKipcbiAgICogQ29uc3RydWN0b3JcbiAgICovXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgZG9tU2FuaXRpemVyOiBEb21TYW5pdGl6ZXIsIHByaXZhdGUgY2hhbmdlRGV0ZWN0b3JSZWY6IENoYW5nZURldGVjdG9yUmVmLCBwcml2YXRlIG5neFNlcnZpY2U6IE5neFVpTG9hZGVyU2VydmljZSkge1xuICAgIHRoaXMuaW5pdGlhbGl6ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB0aGlzLm5neFNlcnZpY2UuZ2V0RGVmYXVsdENvbmZpZygpO1xuXG4gICAgdGhpcy5iZ3NDb2xvciA9IHRoaXMuZGVmYXVsdENvbmZpZy5iZ3NDb2xvcjtcbiAgICB0aGlzLmJnc09wYWNpdHkgPSB0aGlzLmRlZmF1bHRDb25maWcuYmdzT3BhY2l0eTtcbiAgICB0aGlzLmJnc1Bvc2l0aW9uID0gdGhpcy5kZWZhdWx0Q29uZmlnLmJnc1Bvc2l0aW9uO1xuICAgIHRoaXMuYmdzU2l6ZSA9IHRoaXMuZGVmYXVsdENvbmZpZy5iZ3NTaXplO1xuICAgIHRoaXMuYmdzVHlwZSA9IHRoaXMuZGVmYXVsdENvbmZpZy5iZ3NUeXBlO1xuICAgIHRoaXMuZmdzQ29sb3IgPSB0aGlzLmRlZmF1bHRDb25maWcuZmdzQ29sb3I7XG4gICAgdGhpcy5mZ3NQb3NpdGlvbiA9IHRoaXMuZGVmYXVsdENvbmZpZy5mZ3NQb3NpdGlvbjtcbiAgICB0aGlzLmZnc1NpemUgPSB0aGlzLmRlZmF1bHRDb25maWcuZmdzU2l6ZTtcbiAgICB0aGlzLmZnc1R5cGUgPSB0aGlzLmRlZmF1bHRDb25maWcuZmdzVHlwZTtcbiAgICB0aGlzLmdhcCA9IHRoaXMuZGVmYXVsdENvbmZpZy5nYXA7XG4gICAgdGhpcy5sb2FkZXJJZCA9IHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZDtcbiAgICB0aGlzLmxvZ29Qb3NpdGlvbiA9IHRoaXMuZGVmYXVsdENvbmZpZy5sb2dvUG9zaXRpb247XG4gICAgdGhpcy5sb2dvU2l6ZSA9IHRoaXMuZGVmYXVsdENvbmZpZy5sb2dvU2l6ZTtcbiAgICB0aGlzLmxvZ29VcmwgPSB0aGlzLmRlZmF1bHRDb25maWcubG9nb1VybDtcbiAgICB0aGlzLm92ZXJsYXlCb3JkZXJSYWRpdXMgPSB0aGlzLmRlZmF1bHRDb25maWcub3ZlcmxheUJvcmRlclJhZGl1cztcbiAgICB0aGlzLm92ZXJsYXlDb2xvciA9IHRoaXMuZGVmYXVsdENvbmZpZy5vdmVybGF5Q29sb3I7XG4gICAgdGhpcy5wYkNvbG9yID0gdGhpcy5kZWZhdWx0Q29uZmlnLnBiQ29sb3I7XG4gICAgdGhpcy5wYkRpcmVjdGlvbiA9IHRoaXMuZGVmYXVsdENvbmZpZy5wYkRpcmVjdGlvbjtcbiAgICB0aGlzLnBiVGhpY2tuZXNzID0gdGhpcy5kZWZhdWx0Q29uZmlnLnBiVGhpY2tuZXNzO1xuICAgIHRoaXMuaGFzUHJvZ3Jlc3NCYXIgPSB0aGlzLmRlZmF1bHRDb25maWcuaGFzUHJvZ3Jlc3NCYXI7XG4gICAgdGhpcy50ZXh0ID0gdGhpcy5kZWZhdWx0Q29uZmlnLnRleHQ7XG4gICAgdGhpcy50ZXh0Q29sb3IgPSB0aGlzLmRlZmF1bHRDb25maWcudGV4dENvbG9yO1xuICAgIHRoaXMudGV4dFBvc2l0aW9uID0gdGhpcy5kZWZhdWx0Q29uZmlnLnRleHRQb3NpdGlvbjtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBpbml0IGV2ZW50XG4gICAqL1xuICBuZ09uSW5pdCgpIHtcbiAgICB0aGlzLmluaXRpYWxpemVTcGlubmVycygpO1xuICAgIHRoaXMubmd4U2VydmljZS5iaW5kTG9hZGVyRGF0YSh0aGlzLmxvYWRlcklkKTtcbiAgICB0aGlzLmRldGVybWluZVBvc2l0aW9ucygpO1xuXG4gICAgdGhpcy5iZ3NQb3NpdGlvbiA9IHRoaXMudmFsaWRhdGUoJ2Jnc1Bvc2l0aW9uJywgdGhpcy5iZ3NQb3NpdGlvbiwgUE9TSVRJT04sIHRoaXMuZGVmYXVsdENvbmZpZy5iZ3NQb3NpdGlvbikgYXMgUG9zaXRpb25UeXBlO1xuXG4gICAgdGhpcy50cnVzdGVkTG9nb1VybCA9IHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0aGlzLmxvZ29VcmwpO1xuXG4gICAgdGhpcy5wYkRpcmVjdGlvbiA9IHRoaXMudmFsaWRhdGUoJ3BiRGlyZWN0aW9uJywgdGhpcy5wYkRpcmVjdGlvbiwgUEJfRElSRUNUSU9OLCB0aGlzLmRlZmF1bHRDb25maWcucGJEaXJlY3Rpb24pIGFzIERpcmVjdGlvblR5cGU7XG5cbiAgICB0aGlzLnNob3dGb3JlZ3JvdW5kV2F0Y2hlciA9IHRoaXMubmd4U2VydmljZS5zaG93Rm9yZWdyb3VuZCRcbiAgICAgIC5waXBlKGZpbHRlcigoc2hvd0V2ZW50OiBTaG93RXZlbnQpID0+IHRoaXMubG9hZGVySWQgPT09IHNob3dFdmVudC5sb2FkZXJJZCkpXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLnNob3dGb3JlZ3JvdW5kID0gZGF0YS5pc1Nob3c7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcblxuICAgIHRoaXMuc2hvd0JhY2tncm91bmRXYXRjaGVyID0gdGhpcy5uZ3hTZXJ2aWNlLnNob3dCYWNrZ3JvdW5kJFxuICAgICAgLnBpcGUoZmlsdGVyKChzaG93RXZlbnQ6IFNob3dFdmVudCkgPT4gdGhpcy5sb2FkZXJJZCA9PT0gc2hvd0V2ZW50LmxvYWRlcklkKSlcbiAgICAgIC5zdWJzY3JpYmUoZGF0YSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0JhY2tncm91bmQgPSBkYXRhLmlzU2hvdztcbiAgICAgICAgdGhpcy5jaGFuZ2VEZXRlY3RvclJlZi5tYXJrRm9yQ2hlY2soKTtcbiAgICAgIH0pO1xuXG4gICAgdGhpcy5mb3JlZ3JvdW5kQ2xvc2luZ1dhdGNoZXIgPSB0aGlzLm5neFNlcnZpY2UuZm9yZWdyb3VuZENsb3NpbmckXG4gICAgICAucGlwZShmaWx0ZXIoKHNob3dFdmVudDogU2hvd0V2ZW50KSA9PiB0aGlzLmxvYWRlcklkID09PSBzaG93RXZlbnQubG9hZGVySWQpKVxuICAgICAgLnN1YnNjcmliZShkYXRhID0+IHtcbiAgICAgICAgdGhpcy5mb3JlZ3JvdW5kQ2xvc2luZyA9IGRhdGEuaXNTaG93O1xuICAgICAgICB0aGlzLmNoYW5nZURldGVjdG9yUmVmLm1hcmtGb3JDaGVjaygpO1xuICAgICAgfSk7XG5cbiAgICB0aGlzLmJhY2tncm91bmRDbG9zaW5nV2F0Y2hlciA9IHRoaXMubmd4U2VydmljZS5iYWNrZ3JvdW5kQ2xvc2luZyRcbiAgICAgIC5waXBlKGZpbHRlcigoc2hvd0V2ZW50OiBTaG93RXZlbnQpID0+IHRoaXMubG9hZGVySWQgPT09IHNob3dFdmVudC5sb2FkZXJJZCkpXG4gICAgICAuc3Vic2NyaWJlKGRhdGEgPT4ge1xuICAgICAgICB0aGlzLmJhY2tncm91bmRDbG9zaW5nID0gZGF0YS5pc1Nob3c7XG4gICAgICAgIHRoaXMuY2hhbmdlRGV0ZWN0b3JSZWYubWFya0ZvckNoZWNrKCk7XG4gICAgICB9KTtcbiAgICB0aGlzLmluaXRpYWxpemVkID0gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBPbiBjaGFuZ2VzIGV2ZW50XG4gICAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiBTaW1wbGVDaGFuZ2VzKSB7XG4gICAgaWYgKCF0aGlzLmluaXRpYWxpemVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYmdzVHlwZUNoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5iZ3NUeXBlO1xuICAgIGNvbnN0IGJnc1Bvc2l0aW9uQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmJnc1Bvc2l0aW9uO1xuICAgIGNvbnN0IGZnc1R5cGVDaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMuZmdzVHlwZTtcbiAgICBjb25zdCBsb2FkZXJJZENoYW5nZTogU2ltcGxlQ2hhbmdlID0gY2hhbmdlcy5sb2FkZXJJZDtcbiAgICBjb25zdCBsb2dvVXJsQ2hhbmdlOiBTaW1wbGVDaGFuZ2UgPSBjaGFuZ2VzLmxvZ29Vcmw7XG4gICAgY29uc3QgcGJEaXJlY3Rpb25DaGFuZ2U6IFNpbXBsZUNoYW5nZSA9IGNoYW5nZXMucGJEaXJlY3Rpb247XG5cbiAgICBpZiAoZmdzVHlwZUNoYW5nZSB8fCBiZ3NUeXBlQ2hhbmdlKSB7XG4gICAgICB0aGlzLmluaXRpYWxpemVTcGlubmVycygpO1xuICAgIH1cblxuICAgIGlmIChsb2FkZXJJZENoYW5nZSkge1xuICAgICAgdGhpcy5uZ3hTZXJ2aWNlLnVwZGF0ZUxvYWRlcklkKGxvYWRlcklkQ2hhbmdlLnByZXZpb3VzVmFsdWUsIHRoaXMubG9hZGVySWQpO1xuICAgIH1cblxuICAgIHRoaXMuZGV0ZXJtaW5lUG9zaXRpb25zKCk7XG5cbiAgICBpZiAoYmdzUG9zaXRpb25DaGFuZ2UpIHtcbiAgICAgIHRoaXMuYmdzUG9zaXRpb24gPSB0aGlzLnZhbGlkYXRlKCdiZ3NQb3NpdGlvbicsIHRoaXMuYmdzUG9zaXRpb24sIFBPU0lUSU9OLCB0aGlzLmRlZmF1bHRDb25maWcuYmdzUG9zaXRpb24pIGFzIFBvc2l0aW9uVHlwZTtcbiAgICB9XG5cbiAgICBpZiAobG9nb1VybENoYW5nZSkge1xuICAgICAgdGhpcy50cnVzdGVkTG9nb1VybCA9IHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RSZXNvdXJjZVVybCh0aGlzLmxvZ29VcmwpO1xuICAgIH1cblxuICAgIGlmIChwYkRpcmVjdGlvbkNoYW5nZSkge1xuICAgICAgdGhpcy5wYkRpcmVjdGlvbiA9IHRoaXMudmFsaWRhdGUoJ3BiRGlyZWN0aW9uJywgdGhpcy5wYkRpcmVjdGlvbiwgUEJfRElSRUNUSU9OLCB0aGlzLmRlZmF1bHRDb25maWcucGJEaXJlY3Rpb24pIGFzIERpcmVjdGlvblR5cGU7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEluaXRpYWxpemUgc3Bpbm5lcnNcbiAgICovXG4gIHByaXZhdGUgaW5pdGlhbGl6ZVNwaW5uZXJzKCk6IHZvaWQge1xuICAgIHRoaXMuZmdzVHlwZSA9IHRoaXMudmFsaWRhdGUoJ2Znc1R5cGUnLCB0aGlzLmZnc1R5cGUsIFNQSU5ORVIsIHRoaXMuZGVmYXVsdENvbmZpZy5mZ3NUeXBlKSBhcyBTcGlubmVyVHlwZTtcbiAgICB0aGlzLmJnc1R5cGUgPSB0aGlzLnZhbGlkYXRlKCdiZ3NUeXBlJywgdGhpcy5iZ3NUeXBlLCBTUElOTkVSLCB0aGlzLmRlZmF1bHRDb25maWcuYmdzVHlwZSkgYXMgU3Bpbm5lclR5cGU7XG5cbiAgICB0aGlzLmZnRGl2cyA9IEFycmF5KFNQSU5ORVJfQ09ORklHW3RoaXMuZmdzVHlwZV0uZGl2cykuZmlsbCgxKTtcbiAgICB0aGlzLmZnU3Bpbm5lckNsYXNzID0gU1BJTk5FUl9DT05GSUdbdGhpcy5mZ3NUeXBlXS5jbGFzcztcbiAgICB0aGlzLmJnRGl2cyA9IEFycmF5KFNQSU5ORVJfQ09ORklHW3RoaXMuYmdzVHlwZV0uZGl2cykuZmlsbCgxKTtcbiAgICB0aGlzLmJnU3Bpbm5lckNsYXNzID0gU1BJTk5FUl9DT05GSUdbdGhpcy5iZ3NUeXBlXS5jbGFzcztcbiAgfVxuXG4gIC8qKlxuICAgKiBEZXRlcm1pbmUgdGhlIHBvc2l0aW9ucyBvZiBzcGlubmVyLCBsb2dvIGFuZCB0ZXh0XG4gICAqL1xuICBwcml2YXRlIGRldGVybWluZVBvc2l0aW9ucygpOiB2b2lkIHtcbiAgICB0aGlzLmZnc1Bvc2l0aW9uID0gdGhpcy52YWxpZGF0ZSgnZmdzUG9zaXRpb24nLCB0aGlzLmZnc1Bvc2l0aW9uLCBQT1NJVElPTiwgdGhpcy5kZWZhdWx0Q29uZmlnLmZnc1Bvc2l0aW9uKSBhcyBQb3NpdGlvblR5cGU7XG4gICAgdGhpcy5sb2dvUG9zaXRpb24gPSB0aGlzLnZhbGlkYXRlKCdsb2dvUG9zaXRpb24nLCB0aGlzLmxvZ29Qb3NpdGlvbiwgUE9TSVRJT04sIHRoaXMuZGVmYXVsdENvbmZpZy5sb2dvUG9zaXRpb24pIGFzIFBvc2l0aW9uVHlwZTtcbiAgICB0aGlzLnRleHRQb3NpdGlvbiA9IHRoaXMudmFsaWRhdGUoJ3RleHRQb3NpdGlvbicsIHRoaXMudGV4dFBvc2l0aW9uLCBQT1NJVElPTiwgdGhpcy5kZWZhdWx0Q29uZmlnLnRleHRQb3NpdGlvbikgYXMgUG9zaXRpb25UeXBlO1xuICAgIHRoaXMuZ2FwID0gY29lcmNlTnVtYmVyKHRoaXMuZ2FwLCB0aGlzLmRlZmF1bHRDb25maWcuZ2FwKTtcblxuICAgIHRoaXMubG9nb1RvcCA9ICdpbml0aWFsJztcbiAgICB0aGlzLnNwaW5uZXJUb3AgPSAnaW5pdGlhbCc7XG4gICAgdGhpcy50ZXh0VG9wID0gJ2luaXRpYWwnO1xuICAgIGNvbnN0IHRleHRTaXplID0gMjQ7XG5cbiAgICBpZiAodGhpcy5sb2dvUG9zaXRpb24uc3RhcnRzV2l0aCgnY2VudGVyJykpIHtcbiAgICAgIHRoaXMubG9nb1RvcCA9ICc1MCUnO1xuICAgIH0gZWxzZSBpZiAodGhpcy5sb2dvUG9zaXRpb24uc3RhcnRzV2l0aCgndG9wJykpIHtcbiAgICAgIHRoaXMubG9nb1RvcCA9ICczMHB4JztcbiAgICB9XG5cbiAgICBpZiAodGhpcy5mZ3NQb3NpdGlvbi5zdGFydHNXaXRoKCdjZW50ZXInKSkge1xuICAgICAgdGhpcy5zcGlubmVyVG9wID0gJzUwJSc7XG4gICAgfSBlbHNlIGlmICh0aGlzLmZnc1Bvc2l0aW9uLnN0YXJ0c1dpdGgoJ3RvcCcpKSB7XG4gICAgICB0aGlzLnNwaW5uZXJUb3AgPSAnMzBweCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMudGV4dFBvc2l0aW9uLnN0YXJ0c1dpdGgoJ2NlbnRlcicpKSB7XG4gICAgICB0aGlzLnRleHRUb3AgPSAnNTAlJztcbiAgICB9IGVsc2UgaWYgKHRoaXMudGV4dFBvc2l0aW9uLnN0YXJ0c1dpdGgoJ3RvcCcpKSB7XG4gICAgICB0aGlzLnRleHRUb3AgPSAnMzBweCc7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZmdzUG9zaXRpb24gPT09IFBPU0lUSU9OLmNlbnRlckNlbnRlcikge1xuICAgICAgaWYgKHRoaXMubG9nb1VybCAmJiB0aGlzLmxvZ29Qb3NpdGlvbiA9PT0gUE9TSVRJT04uY2VudGVyQ2VudGVyKSB7XG4gICAgICAgIGlmICh0aGlzLnRleHQgJiYgdGhpcy50ZXh0UG9zaXRpb24gPT09IFBPU0lUSU9OLmNlbnRlckNlbnRlcikge1xuICAgICAgICAgIC8vIGxvZ28sIHNwaW5uZXIgYW5kIHRleHRcbiAgICAgICAgICB0aGlzLmxvZ29Ub3AgPSB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICAgICAgICBgY2FsYyg1MCUgLSAke3RoaXMuZmdzU2l6ZSAvIDJ9cHggLSAke3RleHRTaXplIC8gMn1weCAtICR7dGhpcy5nYXB9cHgpYFxuICAgICAgICAgICk7XG4gICAgICAgICAgdGhpcy5zcGlubmVyVG9wID0gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBjYWxjKDUwJSArICR7dGhpcy5sb2dvU2l6ZSAvIDJ9cHggLSAke3RleHRTaXplIC8gMn1weClgKTtcbiAgICAgICAgICB0aGlzLnRleHRUb3AgPSB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoXG4gICAgICAgICAgICBgY2FsYyg1MCUgKyAke3RoaXMubG9nb1NpemUgLyAyfXB4ICsgJHt0aGlzLmdhcH1weCArICR7dGhpcy5mZ3NTaXplIC8gMn1weClgXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBsb2dvIGFuZCBzcGlubmVyXG4gICAgICAgICAgdGhpcy5sb2dvVG9wID0gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBjYWxjKDUwJSAtICR7dGhpcy5mZ3NTaXplIC8gMn1weCAtICR7dGhpcy5nYXAgLyAyfXB4KWApO1xuICAgICAgICAgIHRoaXMuc3Bpbm5lclRvcCA9IHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgY2FsYyg1MCUgKyAke3RoaXMubG9nb1NpemUgLyAyfXB4ICsgJHt0aGlzLmdhcCAvIDJ9cHgpYCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLnRleHQgJiYgdGhpcy50ZXh0UG9zaXRpb24gPT09IFBPU0lUSU9OLmNlbnRlckNlbnRlcikge1xuICAgICAgICAgIC8vIHNwaW5uZXIgYW5kIHRleHRcbiAgICAgICAgICB0aGlzLnNwaW5uZXJUb3AgPSB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYGNhbGMoNTAlIC0gJHt0ZXh0U2l6ZSAvIDJ9cHggLSAke3RoaXMuZ2FwIC8gMn1weClgKTtcbiAgICAgICAgICB0aGlzLnRleHRUb3AgPSB0aGlzLmRvbVNhbml0aXplci5ieXBhc3NTZWN1cml0eVRydXN0U3R5bGUoYGNhbGMoNTAlICsgJHt0aGlzLmZnc1NpemUgLyAyfXB4ICsgJHt0aGlzLmdhcCAvIDJ9cHgpYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9nb1VybCAmJiB0aGlzLmxvZ29Qb3NpdGlvbiA9PT0gUE9TSVRJT04uY2VudGVyQ2VudGVyICYmIHRoaXMudGV4dCAmJiB0aGlzLnRleHRQb3NpdGlvbiA9PT0gUE9TSVRJT04uY2VudGVyQ2VudGVyKSB7XG4gICAgICAgIC8vIGxvZ28gYW5kIHRleHRcbiAgICAgICAgdGhpcy5sb2dvVG9wID0gdGhpcy5kb21TYW5pdGl6ZXIuYnlwYXNzU2VjdXJpdHlUcnVzdFN0eWxlKGBjYWxjKDUwJSAtICR7dGV4dFNpemUgLyAyfXB4IC0gJHt0aGlzLmdhcCAvIDJ9cHgpYCk7XG4gICAgICAgIHRoaXMudGV4dFRvcCA9IHRoaXMuZG9tU2FuaXRpemVyLmJ5cGFzc1NlY3VyaXR5VHJ1c3RTdHlsZShgY2FsYyg1MCUgKyAke3RoaXMubG9nb1NpemUgLyAyfXB4ICsgJHt0aGlzLmdhcCAvIDJ9cHgpYCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSB2YWxpZGF0ZShpbnB1dE5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZywgdmFsaWRUeXBlT2JqOiB7fSwgZmFsbGJhY2tWYWx1ZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgICBpZiAoXG4gICAgICBPYmplY3Qua2V5cyh2YWxpZFR5cGVPYmopXG4gICAgICAgIC5tYXAoayA9PiB2YWxpZFR5cGVPYmpba10pXG4gICAgICAgIC5maW5kSW5kZXgodiA9PiB2ID09PSB2YWx1ZSkgPT09IC0xXG4gICAgKSB7XG4gICAgICBjb25zb2xlLmVycm9yKGBbbmd4LXVpLWxvYWRlcl0gLSAke2lucHV0TmFtZX0gKFwiJHt2YWx1ZX1cIikgaXMgaW52YWxpZC4gYCArIGBEZWZhdWx0IHZhbHVlIFwiJHtmYWxsYmFja1ZhbHVlfVwiIGlzIHVzZWQuYCk7XG4gICAgICByZXR1cm4gZmFsbGJhY2tWYWx1ZTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xuICB9XG5cbiAgLyoqXG4gICAqIE9uIGRlc3Ryb3kgZXZlbnRcbiAgICovXG4gIG5nT25EZXN0cm95KCkge1xuICAgIHRoaXMubmd4U2VydmljZS5kZXN0cm95TG9hZGVyRGF0YSh0aGlzLmxvYWRlcklkKTtcbiAgICBpZiAodGhpcy5zaG93Rm9yZWdyb3VuZFdhdGNoZXIpIHtcbiAgICAgIHRoaXMuc2hvd0ZvcmVncm91bmRXYXRjaGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICAgIGlmICh0aGlzLnNob3dCYWNrZ3JvdW5kV2F0Y2hlcikge1xuICAgICAgdGhpcy5zaG93QmFja2dyb3VuZFdhdGNoZXIudW5zdWJzY3JpYmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMuZm9yZWdyb3VuZENsb3NpbmdXYXRjaGVyKSB7XG4gICAgICB0aGlzLmZvcmVncm91bmRDbG9zaW5nV2F0Y2hlci51bnN1YnNjcmliZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5iYWNrZ3JvdW5kQ2xvc2luZ1dhdGNoZXIpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZENsb3NpbmdXYXRjaGVyLnVuc3Vic2NyaWJlKCk7XG4gICAgfVxuICB9XG59XG4iXX0=