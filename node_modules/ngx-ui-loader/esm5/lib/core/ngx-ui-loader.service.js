/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import * as tslib_1 from "tslib";
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BACKGROUND, CLOSING_TIME, DEFAULT_BG_TASK_ID, DEFAULT_CONFIG, DEFAULT_FG_TASK_ID, DEFAULT_TIME, FOREGROUND, MIN_DELAY, MIN_TIME, WAITING_FOR_OVERLAY_DISAPPEAR } from '../utils/constants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-ui-loader-config.token";
var NgxUiLoaderService = /** @class */ (function () {
    /**
     * Constructor
     */
    function NgxUiLoaderService(config) {
        this.config = config;
        this.defaultConfig = tslib_1.__assign({}, DEFAULT_CONFIG);
        if (this.config) {
            if (this.config.minTime && this.config.minTime < MIN_TIME) {
                this.config.minTime = MIN_TIME;
            }
            this.defaultConfig = tslib_1.__assign({}, this.defaultConfig, this.config);
        }
        this.loaders = {};
        this.showForeground = new BehaviorSubject({ loaderId: '', isShow: false });
        this.showForeground$ = this.showForeground.asObservable();
        this.showBackground = new BehaviorSubject({ loaderId: '', isShow: false });
        this.showBackground$ = this.showBackground.asObservable();
        this.fgClosing = new BehaviorSubject({ loaderId: '', isShow: false });
        this.foregroundClosing$ = this.fgClosing.asObservable();
        this.bgClosing = new BehaviorSubject({ loaderId: '', isShow: false });
        this.backgroundClosing$ = this.bgClosing.asObservable();
    }
    /**
     * For internal use only.
     * @docs-private
     */
    /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    NgxUiLoaderService.prototype.bindLoaderData = /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    function (loaderId) {
        /** @type {?} */
        var isMaster = false;
        if (loaderId === this.defaultConfig.masterLoaderId) {
            this.throwErrorIfMasterLoaderExists(true);
            isMaster = true;
        }
        else {
            // not master loader
            this.throwErrorIfLoaderExists(loaderId, true);
        }
        if (this.loaders[loaderId]) {
            this.loaders[loaderId].isBound = true;
            this.loaders[loaderId].isMaster = isMaster;
            // emit showEvent after data loader is bound
            if (this.hasRunningTask(FOREGROUND, loaderId)) {
                this.showForeground.next({ loaderId: loaderId, isShow: true });
            }
            else {
                if (this.hasRunningTask(BACKGROUND, loaderId)) {
                    this.showBackground.next({ loaderId: loaderId, isShow: true });
                }
            }
        }
        else {
            this.createLoaderData(loaderId, isMaster, true);
        }
    };
    /**
     * For internal use only.
     * @docs-private
     */
    /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @param {?} newLoaderId
     * @return {?}
     */
    NgxUiLoaderService.prototype.updateLoaderId = /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @param {?} newLoaderId
     * @return {?}
     */
    function (loaderId, newLoaderId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        if (this.loaders[loaderId].loaderId === this.defaultConfig.masterLoaderId) {
            console.warn("[ngx-ui-loader] - Cannot change loaderId of master loader. The current " +
                ("master's loaderId is \"" + this.defaultConfig.masterLoaderId + "\". If you really want to ") +
                "change it, please use NgxUiLoaderModule.forRoot() method.");
            return;
        }
        if (newLoaderId !== loaderId) {
            this.throwErrorIfLoaderExists(newLoaderId, true);
            this.loaders[newLoaderId] = {
                loaderId: newLoaderId,
                tasks: tslib_1.__assign({}, this.loaders[loaderId].tasks),
                isMaster: false,
                isBound: this.loaders[loaderId].isBound
            };
            delete this.loaders[loaderId];
        }
    };
    /**
     * For internal use only.
     * @docs-private
     */
    /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    NgxUiLoaderService.prototype.destroyLoaderData = /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    function (loaderId) {
        this.stopAllLoader(loaderId);
        delete this.loaders[loaderId];
    };
    /**
     * Get default loader configuration
     * @returns default configuration object
     */
    /**
     * Get default loader configuration
     * @return {?} default configuration object
     */
    NgxUiLoaderService.prototype.getDefaultConfig = /**
     * Get default loader configuration
     * @return {?} default configuration object
     */
    function () {
        return tslib_1.__assign({}, this.defaultConfig);
    };
    /**
     * Get all the loaders
     */
    /**
     * Get all the loaders
     * @return {?}
     */
    NgxUiLoaderService.prototype.getLoaders = /**
     * Get all the loaders
     * @return {?}
     */
    function () {
        return JSON.parse(JSON.stringify(this.loaders));
    };
    /**
     * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
     */
    /**
     * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
     * @param {?=} loaderId
     * @return {?}
     */
    NgxUiLoaderService.prototype.getLoader = /**
     * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
     * @param {?=} loaderId
     * @return {?}
     */
    function (loaderId) {
        if (loaderId) {
            this.throwErrorIfLoaderNotExist(loaderId);
        }
        else {
            this.throwErrorIfMasterLoaderNotExist();
            loaderId = this.defaultConfig.masterLoaderId;
        }
        return JSON.parse(JSON.stringify(this.loaders[loaderId]));
    };
    /**
     * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
     * @param loaderId the loader Id
     * @param taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     */
    /**
     * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     * @param {?=} time
     * @return {?}
     */
    NgxUiLoaderService.prototype.startLoader = /**
     * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     * @param {?=} time
     * @return {?}
     */
    function (loaderId, taskId, time) {
        if (taskId === void 0) { taskId = DEFAULT_FG_TASK_ID; }
        if (!this.readyToStart(loaderId, taskId, true, time)) {
            return;
        }
        if (!this.loaders[loaderId].tasks[taskId].isOtherRunning) {
            // no other foreground task running
            if (this.hasRunningTask(BACKGROUND, loaderId)) {
                this.backgroundCloseout(loaderId);
                this.showBackground.next({ loaderId: loaderId, isShow: false });
            }
            this.showForeground.next({ loaderId: loaderId, isShow: true });
        }
    };
    /**
     * Start the foreground loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stop() method.
     * NOTE: Really this function just wraps startLoader() function
     * @param taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     */
    /**
     * Start the foreground loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stop() method.
     * NOTE: Really this function just wraps startLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     * @param {?=} time
     * @return {?}
     */
    NgxUiLoaderService.prototype.start = /**
     * Start the foreground loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stop() method.
     * NOTE: Really this function just wraps startLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     * @param {?=} time
     * @return {?}
     */
    function (taskId, time) {
        if (taskId === void 0) { taskId = DEFAULT_FG_TASK_ID; }
        this.startLoader(this.defaultConfig.masterLoaderId, taskId, time);
    };
    /**
     * Start the background loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
     * @param loaderId the loader Id
     * @param taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     */
    /**
     * Start the background loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     * @param {?=} time
     * @return {?}
     */
    NgxUiLoaderService.prototype.startBackgroundLoader = /**
     * Start the background loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     * @param {?=} time
     * @return {?}
     */
    function (loaderId, taskId, time) {
        if (taskId === void 0) { taskId = DEFAULT_BG_TASK_ID; }
        if (!this.readyToStart(loaderId, taskId, false, time)) {
            return;
        }
        if (!this.hasRunningTask(FOREGROUND, loaderId) && !this.loaders[loaderId].tasks[taskId].isOtherRunning) {
            this.showBackground.next({ loaderId: loaderId, isShow: true });
        }
    };
    /**
     * Start the background loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
     * NOTE: Really this function just wraps startBackgroundLoader() function
     * @param taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     */
    /**
     * Start the background loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
     * NOTE: Really this function just wraps startBackgroundLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     * @param {?=} time
     * @return {?}
     */
    NgxUiLoaderService.prototype.startBackground = /**
     * Start the background loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
     * NOTE: Really this function just wraps startBackgroundLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     * @param {?=} time
     * @return {?}
     */
    function (taskId, time) {
        if (taskId === void 0) { taskId = DEFAULT_BG_TASK_ID; }
        this.startBackgroundLoader(this.defaultConfig.masterLoaderId, taskId, time);
    };
    /**
     * Stop a foreground loading of loader having `loaderId` with specific `taskId`
     * @param loaderId the loader Id
     * @param taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @returns Object
     */
    /**
     * Stop a foreground loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @return {?} Object
     */
    NgxUiLoaderService.prototype.stopLoader = /**
     * Stop a foreground loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @return {?} Object
     */
    function (loaderId, taskId) {
        var _this = this;
        if (taskId === void 0) { taskId = DEFAULT_FG_TASK_ID; }
        if (!this.readyToStop(loaderId, taskId)) {
            return;
        }
        if (!this.hasRunningTask(FOREGROUND, loaderId)) {
            this.foregroundCloseout(loaderId);
            this.showForeground.next({ loaderId: loaderId, isShow: false });
            if (this.hasRunningTask(BACKGROUND, loaderId)) {
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (_this.hasRunningTask(BACKGROUND, loaderId)) {
                        // still have background tasks
                        _this.showBackground.next({ loaderId: loaderId, isShow: true });
                    }
                }), WAITING_FOR_OVERLAY_DISAPPEAR);
            }
        }
    };
    /**
     * Stop a foreground loading of master loader with specific `taskId`
     * @param taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @returns Object
     */
    /**
     * Stop a foreground loading of master loader with specific `taskId`
     * @param {?=} taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @return {?} Object
     */
    NgxUiLoaderService.prototype.stop = /**
     * Stop a foreground loading of master loader with specific `taskId`
     * @param {?=} taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @return {?} Object
     */
    function (taskId) {
        if (taskId === void 0) { taskId = DEFAULT_FG_TASK_ID; }
        this.stopLoader(this.defaultConfig.masterLoaderId, taskId);
    };
    /**
     * Stop a background loading of loader having `loaderId` with specific `taskId`
     * @param loaderId the loader Id
     * @param taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @returns Object
     */
    /**
     * Stop a background loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @return {?} Object
     */
    NgxUiLoaderService.prototype.stopBackgroundLoader = /**
     * Stop a background loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @return {?} Object
     */
    function (loaderId, taskId) {
        if (taskId === void 0) { taskId = DEFAULT_BG_TASK_ID; }
        if (!this.readyToStop(loaderId, taskId)) {
            return;
        }
        if (!this.hasRunningTask(FOREGROUND, loaderId) && !this.hasRunningTask(BACKGROUND, loaderId)) {
            this.backgroundCloseout(loaderId);
            this.showBackground.next({ loaderId: loaderId, isShow: false });
        }
    };
    /**
     * Stop a background loading of master loader with specific taskId
     * @param taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @returns Object
     */
    /**
     * Stop a background loading of master loader with specific taskId
     * @param {?=} taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @return {?} Object
     */
    NgxUiLoaderService.prototype.stopBackground = /**
     * Stop a background loading of master loader with specific taskId
     * @param {?=} taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @return {?} Object
     */
    function (taskId) {
        if (taskId === void 0) { taskId = DEFAULT_BG_TASK_ID; }
        this.stopBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
    };
    /**
     * Stop all the background and foreground loadings of loader having `loaderId`
     * @param loaderId the loader Id
     */
    /**
     * Stop all the background and foreground loadings of loader having `loaderId`
     * @param {?} loaderId the loader Id
     * @return {?}
     */
    NgxUiLoaderService.prototype.stopAllLoader = /**
     * Stop all the background and foreground loadings of loader having `loaderId`
     * @param {?} loaderId the loader Id
     * @return {?}
     */
    function (loaderId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        if (this.hasRunningTask(FOREGROUND, loaderId)) {
            this.foregroundCloseout(loaderId);
            this.showForeground.next({ loaderId: loaderId, isShow: false });
        }
        else if (this.hasRunningTask(BACKGROUND, loaderId)) {
            this.backgroundCloseout(loaderId);
            this.showBackground.next({ loaderId: loaderId, isShow: false });
        }
        this.clearAllTimers(this.loaders[loaderId].tasks);
        this.loaders[loaderId].tasks = {};
    };
    /**
     * Stop all the background and foreground loadings of master loader
     */
    /**
     * Stop all the background and foreground loadings of master loader
     * @return {?}
     */
    NgxUiLoaderService.prototype.stopAll = /**
     * Stop all the background and foreground loadings of master loader
     * @return {?}
     */
    function () {
        this.stopAllLoader(this.defaultConfig.masterLoaderId);
    };
    /**
     * Create loader data if it does not exist
     * @docs-private
     */
    /**
     * Create loader data if it does not exist
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} isMaster
     * @param {?} isBound
     * @return {?}
     */
    NgxUiLoaderService.prototype.createLoaderData = /**
     * Create loader data if it does not exist
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} isMaster
     * @param {?} isBound
     * @return {?}
     */
    function (loaderId, isMaster, isBound) {
        if (!this.loaders[loaderId]) {
            this.loaders[loaderId] = {
                loaderId: loaderId,
                tasks: {},
                isMaster: isMaster,
                isBound: isBound
            };
        }
    };
    /**
     * Throw error if the loaderId does not exist.
     * @docs-private
     */
    /**
     * Throw error if the loaderId does not exist.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @return {?}
     */
    NgxUiLoaderService.prototype.throwErrorIfLoaderNotExist = /**
     * Throw error if the loaderId does not exist.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @return {?}
     */
    function (loaderId) {
        if (!this.loaders[loaderId]) {
            throw new Error("[ngx-ui-loader] - loaderId \"" + loaderId + "\" does not exist.");
        }
    };
    /**
     * Throw error if the loaderId has already existed.
     * @docs-private
     */
    /**
     * Throw error if the loaderId has already existed.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    NgxUiLoaderService.prototype.throwErrorIfLoaderExists = /**
     * Throw error if the loaderId has already existed.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    function (loaderId, useIsBoundProp) {
        if (this.loaders[loaderId] && (this.loaders[loaderId].isBound && useIsBoundProp)) {
            throw new Error("[ngx-ui-loader] - loaderId \"" + loaderId + "\" is duplicated.");
        }
    };
    /**
     * Throw error if the master loader has already existed.
     * @docs-private
     */
    /**
     * Throw error if the master loader has already existed.
     * \@docs-private
     * @private
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    NgxUiLoaderService.prototype.throwErrorIfMasterLoaderExists = /**
     * Throw error if the master loader has already existed.
     * \@docs-private
     * @private
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    function (useIsBoundProp) {
        if (this.loaders[this.defaultConfig.masterLoaderId] && (this.loaders[this.defaultConfig.masterLoaderId].isBound && useIsBoundProp)) {
            throw new Error("[ngx-ui-loader] - The master loader has already existed. " +
                "The app should have only one master loader and it should be placed in the root app template");
        }
    };
    /**
     * Throw error if the master loader does not exist.
     * @docs-private
     */
    /**
     * Throw error if the master loader does not exist.
     * \@docs-private
     * @private
     * @return {?}
     */
    NgxUiLoaderService.prototype.throwErrorIfMasterLoaderNotExist = /**
     * Throw error if the master loader does not exist.
     * \@docs-private
     * @private
     * @return {?}
     */
    function () {
        if (!this.loaders[this.defaultConfig.masterLoaderId]) {
            throw new Error("[ngx-ui-loader] - The master loader does not exist.");
        }
    };
    /**
     * Manage to close foreground loading
     * @docs-private
     * @param loaderId the loader id
     */
    /**
     * Manage to close foreground loading
     * \@docs-private
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    NgxUiLoaderService.prototype.foregroundCloseout = /**
     * Manage to close foreground loading
     * \@docs-private
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    function (loaderId) {
        var _this = this;
        this.fgClosing.next({ loaderId: loaderId, isShow: true });
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.fgClosing.next({ loaderId: loaderId, isShow: false });
        }), CLOSING_TIME);
    };
    /**
     * Manage to close background loading
     * @docs-private
     * @param loaderId the loader id
     */
    /**
     * Manage to close background loading
     * \@docs-private
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    NgxUiLoaderService.prototype.backgroundCloseout = /**
     * Manage to close background loading
     * \@docs-private
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    function (loaderId) {
        var _this = this;
        this.bgClosing.next({ loaderId: loaderId, isShow: true });
        setTimeout((/**
         * @return {?}
         */
        function () {
            _this.bgClosing.next({ loaderId: loaderId, isShow: false });
        }), CLOSING_TIME);
    };
    /**
     * Clear all timers of the given task
     * @docs-private
     */
    /**
     * Clear all timers of the given task
     * \@docs-private
     * @private
     * @param {?} task
     * @return {?}
     */
    NgxUiLoaderService.prototype.clearTimers = /**
     * Clear all timers of the given task
     * \@docs-private
     * @private
     * @param {?} task
     * @return {?}
     */
    function (task) {
        if (task.delayTimer) {
            clearTimeout(task.delayTimer);
        }
        if (task.maxTimer) {
            clearTimeout(task.maxTimer);
        }
        if (task.minTimer) {
            clearTimeout(task.minTimer);
        }
    };
    /**
     * Clear all timers of the given tasks
     * @docs-private
     */
    /**
     * Clear all timers of the given tasks
     * \@docs-private
     * @private
     * @param {?} tasks
     * @return {?}
     */
    NgxUiLoaderService.prototype.clearAllTimers = /**
     * Clear all timers of the given tasks
     * \@docs-private
     * @private
     * @param {?} tasks
     * @return {?}
     */
    function (tasks) {
        var _this = this;
        Object.keys(tasks).map((/**
         * @param {?} id
         * @return {?}
         */
        function (id) {
            _this.clearTimers(tasks[id]);
        }));
    };
    /**
     * Check whether the specified loader has a running task with the given `taskId`.
     * If no `taskId` specified, it will check whether the loader has any running tasks.
     * For internal use only.
     * @docs-private
     * @param isForeground foreground task or background task
     * @param loaderId the loader Id
     * @param taskId the optional task Id
     * @returns boolean
     */
    /**
     * Check whether the specified loader has a running task with the given `taskId`.
     * If no `taskId` specified, it will check whether the loader has any running tasks.
     * For internal use only.
     * \@docs-private
     * @param {?} isForeground foreground task or background task
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id
     * @return {?} boolean
     */
    NgxUiLoaderService.prototype.hasRunningTask = /**
     * Check whether the specified loader has a running task with the given `taskId`.
     * If no `taskId` specified, it will check whether the loader has any running tasks.
     * For internal use only.
     * \@docs-private
     * @param {?} isForeground foreground task or background task
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id
     * @return {?} boolean
     */
    function (isForeground, loaderId, taskId) {
        if (this.loaders[loaderId]) {
            /** @type {?} */
            var tasks_1 = this.loaders[loaderId].tasks;
            if (taskId) {
                return tasks_1[taskId] ? (tasks_1[taskId].startAt ? true : false) : false;
            }
            return Object.keys(tasks_1).some((/**
             * @param {?} id
             * @return {?}
             */
            function (id) { return !!tasks_1[id].startAt && tasks_1[id].isForeground === isForeground; }));
        }
        return false;
    };
    /**
     * @docs-private
     */
    /**
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} taskId
     * @param {?} isForeground
     * @param {?=} time
     * @return {?}
     */
    NgxUiLoaderService.prototype.readyToStart = /**
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} taskId
     * @param {?} isForeground
     * @param {?=} time
     * @return {?}
     */
    function (loaderId, taskId, isForeground, time) {
        if (time === void 0) { time = DEFAULT_TIME; }
        this.createLoaderData(loaderId, undefined, false);
        /** @type {?} */
        var isOtherRunning = this.hasRunningTask(isForeground, loaderId);
        if (!this.loaders[loaderId].tasks[taskId]) {
            this.loaders[loaderId].tasks[taskId] = {
                taskId: taskId,
                isForeground: isForeground,
                minTime: time.minTime >= MIN_TIME ? time.minTime : this.defaultConfig.minTime,
                maxTime: time.maxTime ? time.maxTime : this.defaultConfig.maxTime,
                delay: time.delay >= MIN_DELAY ? time.delay : this.defaultConfig.delay
            };
        }
        else {
            if (this.loaders[loaderId].tasks[taskId].isForeground !== isForeground) {
                throw new Error("[ngx-ui-loader] - taskId \"" + taskId + "\" is duplicated.");
            }
        }
        if (this.setDelayTimer(this.loaders[loaderId].tasks[taskId], loaderId)) {
            return false;
        }
        this.loaders[loaderId].tasks[taskId] = tslib_1.__assign({}, this.loaders[loaderId].tasks[taskId], { isOtherRunning: isOtherRunning, startAt: Date.now() });
        this.setMaxTimer(this.loaders[loaderId].tasks[taskId], loaderId);
        if (!this.loaders[loaderId].isBound) {
            return false;
        }
        return true;
    };
    /**
     * @docs-private
     */
    /**
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} taskId
     * @return {?}
     */
    NgxUiLoaderService.prototype.readyToStop = /**
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} taskId
     * @return {?}
     */
    function (loaderId, taskId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        /** @type {?} */
        var task = this.loaders[loaderId].tasks[taskId];
        if (!task) {
            return false;
        }
        if (task.isDelayed) {
            this.clearTimers(task);
            delete this.loaders[loaderId].tasks[taskId];
            return false;
        }
        if (this.setMinTimer(task, loaderId)) {
            return false;
        }
        this.clearTimers(task);
        delete this.loaders[loaderId].tasks[taskId];
        return true;
    };
    /**
     * Set delay timer, if `delay` > 0
     * @docs-private
     * @returns boolean
     */
    /**
     * Set delay timer, if `delay` > 0
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    NgxUiLoaderService.prototype.setDelayTimer = /**
     * Set delay timer, if `delay` > 0
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    function (task, loaderId) {
        var _this = this;
        if (task.delay > MIN_DELAY) {
            if (task.isDelayed) {
                return true;
            }
            if (!task.delayTimer) {
                task.isDelayed = true;
                task.delayTimer = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    task.isDelayed = false;
                    if (task.isForeground) {
                        _this.startLoader(loaderId, task.taskId);
                    }
                    else {
                        _this.startBackgroundLoader(loaderId, task.taskId);
                    }
                }), task.delay);
                return true;
            }
        }
        return false;
    };
    /**
     * Set maxTimer if `maxTime` > `minTime`
     * @docs-private
     * @returns boolean
     */
    /**
     * Set maxTimer if `maxTime` > `minTime`
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    NgxUiLoaderService.prototype.setMaxTimer = /**
     * Set maxTimer if `maxTime` > `minTime`
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    function (task, loaderId) {
        var _this = this;
        if (task.maxTime > task.minTime) {
            // restart the task, reset maxTimer
            if (task.maxTimer) {
                clearTimeout(task.maxTimer);
            }
            task.maxTimer = setTimeout((/**
             * @return {?}
             */
            function () {
                if (task.isForeground) {
                    _this.stopLoader(loaderId, task.taskId);
                }
                else {
                    _this.stopBackgroundLoader(loaderId, task.taskId);
                }
            }), task.maxTime);
        }
    };
    /**
     * Set minTimer if `startAt` + `minTime` > `Date.now()`
     * @docs-private
     * @returns boolean
     */
    /**
     * Set minTimer if `startAt` + `minTime` > `Date.now()`
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    NgxUiLoaderService.prototype.setMinTimer = /**
     * Set minTimer if `startAt` + `minTime` > `Date.now()`
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    function (task, loaderId) {
        var _this = this;
        /** @type {?} */
        var now = Date.now();
        if (task.startAt) {
            if (task.startAt + task.minTime > now) {
                task.minTimer = setTimeout((/**
                 * @return {?}
                 */
                function () {
                    if (task.isForeground) {
                        _this.stopLoader(loaderId, task.taskId);
                    }
                    else {
                        _this.stopBackgroundLoader(loaderId, task.taskId);
                    }
                }), task.startAt + task.minTime - now);
                return true;
            }
        }
        return false;
    };
    NgxUiLoaderService.decorators = [
        { type: Injectable, args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NgxUiLoaderService.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_CONFIG_TOKEN,] }] }
    ]; };
    /** @nocollapse */ NgxUiLoaderService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgxUiLoaderService_Factory() { return new NgxUiLoaderService(i0.ɵɵinject(i1.NGX_UI_LOADER_CONFIG_TOKEN, 8)); }, token: NgxUiLoaderService, providedIn: "root" });
    return NgxUiLoaderService;
}());
export { NgxUiLoaderService };
if (false) {
    /**
     * For internal use only.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.backgroundClosing$;
    /**
     * For internal use only.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.foregroundClosing$;
    /**
     * For internal use only.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.showBackground$;
    /**
     * For internal use only.
     * \@docs-private
     * @type {?}
     */
    NgxUiLoaderService.prototype.showForeground$;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.bgClosing;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.defaultConfig;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.fgClosing;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.loaders;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.showBackground;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.showForeground;
    /**
     * @type {?}
     * @private
     */
    NgxUiLoaderService.prototype.config;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL25neC11aS1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLE9BQU8sRUFBRSxNQUFNLEVBQUUsVUFBVSxFQUFFLFFBQVEsRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUM3RCxPQUFPLEVBQUUsZUFBZSxFQUFjLE1BQU0sTUFBTSxDQUFDO0FBRW5ELE9BQU8sRUFDTCxVQUFVLEVBQ1YsWUFBWSxFQUNaLGtCQUFrQixFQUNsQixjQUFjLEVBQ2Qsa0JBQWtCLEVBQ2xCLFlBQVksRUFDWixVQUFVLEVBQ1YsU0FBUyxFQUNULFFBQVEsRUFDUiw2QkFBNkIsRUFDOUIsTUFBTSxvQkFBb0IsQ0FBQztBQUM1QixPQUFPLEVBQUUsMEJBQTBCLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQzs7O0FBSTFFO0lBbUNFOztPQUVHO0lBQ0gsNEJBQW9FLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQzNGLElBQUksQ0FBQyxhQUFhLHdCQUFRLGNBQWMsQ0FBRSxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7YUFDaEM7WUFDRCxJQUFJLENBQUMsYUFBYSx3QkFBUSxJQUFJLENBQUMsYUFBYSxFQUFLLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBRSxRQUFRLEVBQUUsRUFBRSxFQUFFLE1BQU0s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Q0FBQyxNQUFNLENBQUMsQ0FBQztxQkFDeEM7eUJBQU07d0JBQ0wsS0FBSSxDQUFDLG9CQUFvQixDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7cUJBQ2xEO2dCQUNILENBQUMsR0FBRSxJQUFJLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQyxPQUFPLEdBQUcsR0FBRyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7Z0JBMWhCRixVQUFVLFNBQUM7b0JBQ1YsVUFBVSxFQUFFLE1BQU07aUJBQ25COzs7O2dEQW9DYyxRQUFRLFlBQUksTUFBTSxTQUFDLDBCQUEwQjs7OzZCQXpENUQ7Q0E4aUJDLEFBM2hCRCxJQTJoQkM7U0F4aEJZLGtCQUFrQjs7Ozs7OztJQUs3QixnREFBMEM7Ozs7OztJQU0xQyxnREFBMEM7Ozs7OztJQU0xQyw2Q0FBdUM7Ozs7OztJQU12Qyw2Q0FBdUM7Ozs7O0lBRXZDLHVDQUE4Qzs7Ozs7SUFDOUMsMkNBQXlDOzs7OztJQUN6Qyx1Q0FBOEM7Ozs7O0lBQzlDLHFDQUF5Qjs7Ozs7SUFDekIsNENBQW1EOzs7OztJQUNuRCw0Q0FBbUQ7Ozs7O0lBS3ZDLG9DQUFpRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdCwgSW5qZWN0YWJsZSwgT3B0aW9uYWwgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEJlaGF2aW9yU3ViamVjdCwgT2JzZXJ2YWJsZSB9IGZyb20gJ3J4anMnO1xuXG5pbXBvcnQge1xuICBCQUNLR1JPVU5ELFxuICBDTE9TSU5HX1RJTUUsXG4gIERFRkFVTFRfQkdfVEFTS19JRCxcbiAgREVGQVVMVF9DT05GSUcsXG4gIERFRkFVTFRfRkdfVEFTS19JRCxcbiAgREVGQVVMVF9USU1FLFxuICBGT1JFR1JPVU5ELFxuICBNSU5fREVMQVksXG4gIE1JTl9USU1FLFxuICBXQUlUSU5HX0ZPUl9PVkVSTEFZX0RJU0FQUEVBUlxufSBmcm9tICcuLi91dGlscy9jb25zdGFudHMnO1xuaW1wb3J0IHsgTkdYX1VJX0xPQURFUl9DT05GSUdfVE9LRU4gfSBmcm9tICcuL25neC11aS1sb2FkZXItY29uZmlnLnRva2VuJztcbmltcG9ydCB7IE5neFVpTG9hZGVyQ29uZmlnIH0gZnJvbSAnLi4vdXRpbHMvaW50ZXJmYWNlcyc7XG5pbXBvcnQgeyBMb2FkZXJzLCBMb2FkZXIsIFNob3dFdmVudCwgVGFza3MsIFRhc2ssIFRpbWUgfSBmcm9tICcuLi91dGlscy9pbnRlcmZhY2VzJztcblxuQEluamVjdGFibGUoe1xuICBwcm92aWRlZEluOiAncm9vdCdcbn0pXG5leHBvcnQgY2xhc3MgTmd4VWlMb2FkZXJTZXJ2aWNlIHtcbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgYmFja2dyb3VuZENsb3NpbmckOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgZm9yZWdyb3VuZENsb3NpbmckOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2hvd0JhY2tncm91bmQkOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgc2hvd0ZvcmVncm91bmQkOiBPYnNlcnZhYmxlPFNob3dFdmVudD47XG5cbiAgcHJpdmF0ZSBiZ0Nsb3Npbmc6IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+O1xuICBwcml2YXRlIGRlZmF1bHRDb25maWc6IE5neFVpTG9hZGVyQ29uZmlnO1xuICBwcml2YXRlIGZnQ2xvc2luZzogQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD47XG4gIHByaXZhdGUgbG9hZGVyczogTG9hZGVycztcbiAgcHJpdmF0ZSBzaG93QmFja2dyb3VuZDogQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD47XG4gIHByaXZhdGUgc2hvd0ZvcmVncm91bmQ6IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+O1xuXG4gIC8qKlxuICAgKiBDb25zdHJ1Y3RvclxuICAgKi9cbiAgY29uc3RydWN0b3IoQE9wdGlvbmFsKCkgQEluamVjdChOR1hfVUlfTE9BREVSX0NPTkZJR19UT0tFTikgcHJpdmF0ZSBjb25maWc6IE5neFVpTG9hZGVyQ29uZmlnKSB7XG4gICAgdGhpcy5kZWZhdWx0Q29uZmlnID0geyAuLi5ERUZBVUxUX0NPTkZJRyB9O1xuICAgIGlmICh0aGlzLmNvbmZpZykge1xuICAgICAgaWYgKHRoaXMuY29uZmlnLm1pblRpbWUgJiYgdGhpcy5jb25maWcubWluVGltZSA8IE1JTl9USU1FKSB7XG4gICAgICAgIHRoaXMuY29uZmlnLm1pblRpbWUgPSBNSU5fVElNRTtcbiAgICAgIH1cbiAgICAgIHRoaXMuZGVmYXVsdENvbmZpZyA9IHsgLi4udGhpcy5kZWZhdWx0Q29uZmlnLCAuLi50aGlzLmNvbmZpZyB9O1xuICAgIH1cbiAgICB0aGlzLmxvYWRlcnMgPSB7fTtcbiAgICB0aGlzLnNob3dGb3JlZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+KHsgbG9hZGVySWQ6ICcnLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIHRoaXMuc2hvd0ZvcmVncm91bmQkID0gdGhpcy5zaG93Rm9yZWdyb3VuZC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLnNob3dCYWNrZ3JvdW5kID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+KHsgbG9hZGVySWQ6ICcnLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIHRoaXMuc2hvd0JhY2tncm91bmQkID0gdGhpcy5zaG93QmFja2dyb3VuZC5hc09ic2VydmFibGUoKTtcbiAgICB0aGlzLmZnQ2xvc2luZyA9IG5ldyBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50Pih7IGxvYWRlcklkOiAnJywgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB0aGlzLmZvcmVncm91bmRDbG9zaW5nJCA9IHRoaXMuZmdDbG9zaW5nLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuYmdDbG9zaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+KHsgbG9hZGVySWQ6ICcnLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIHRoaXMuYmFja2dyb3VuZENsb3NpbmckID0gdGhpcy5iZ0Nsb3NpbmcuYXNPYnNlcnZhYmxlKCk7XG4gIH1cblxuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBiaW5kTG9hZGVyRGF0YShsb2FkZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbGV0IGlzTWFzdGVyID0gZmFsc2U7XG4gICAgaWYgKGxvYWRlcklkID09PSB0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQpIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcklmTWFzdGVyTG9hZGVyRXhpc3RzKHRydWUpO1xuICAgICAgaXNNYXN0ZXIgPSB0cnVlO1xuICAgIH0gZWxzZSB7XG4gICAgICAvLyBub3QgbWFzdGVyIGxvYWRlclxuICAgICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJFeGlzdHMobG9hZGVySWQsIHRydWUpO1xuICAgIH1cbiAgICBpZiAodGhpcy5sb2FkZXJzW2xvYWRlcklkXSkge1xuICAgICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc0JvdW5kID0gdHJ1ZTtcbiAgICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0uaXNNYXN0ZXIgPSBpc01hc3RlcjtcbiAgICAgIC8vIGVtaXQgc2hvd0V2ZW50IGFmdGVyIGRhdGEgbG9hZGVyIGlzIGJvdW5kXG4gICAgICBpZiAodGhpcy5oYXNSdW5uaW5nVGFzayhGT1JFR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgICAgdGhpcy5zaG93Rm9yZWdyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICh0aGlzLmhhc1J1bm5pbmdUYXNrKEJBQ0tHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgICAgIHRoaXMuc2hvd0JhY2tncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IHRydWUgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5jcmVhdGVMb2FkZXJEYXRhKGxvYWRlcklkLCBpc01hc3RlciwgdHJ1ZSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgdXBkYXRlTG9hZGVySWQobG9hZGVySWQ6IHN0cmluZywgbmV3TG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGhyb3dFcnJvcklmTG9hZGVyTm90RXhpc3QobG9hZGVySWQpO1xuICAgIGlmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmxvYWRlcklkID09PSB0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQpIHtcbiAgICAgIGNvbnNvbGUud2FybihcbiAgICAgICAgYFtuZ3gtdWktbG9hZGVyXSAtIENhbm5vdCBjaGFuZ2UgbG9hZGVySWQgb2YgbWFzdGVyIGxvYWRlci4gVGhlIGN1cnJlbnQgYCArXG4gICAgICAgICAgYG1hc3RlcidzIGxvYWRlcklkIGlzIFwiJHt0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWR9XCIuIElmIHlvdSByZWFsbHkgd2FudCB0byBgICtcbiAgICAgICAgICBgY2hhbmdlIGl0LCBwbGVhc2UgdXNlIE5neFVpTG9hZGVyTW9kdWxlLmZvclJvb3QoKSBtZXRob2QuYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKG5ld0xvYWRlcklkICE9PSBsb2FkZXJJZCkge1xuICAgICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJFeGlzdHMobmV3TG9hZGVySWQsIHRydWUpO1xuICAgICAgdGhpcy5sb2FkZXJzW25ld0xvYWRlcklkXSA9IHtcbiAgICAgICAgbG9hZGVySWQ6IG5ld0xvYWRlcklkLFxuICAgICAgICB0YXNrczogeyAuLi50aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzIH0sXG4gICAgICAgIGlzTWFzdGVyOiBmYWxzZSxcbiAgICAgICAgaXNCb3VuZDogdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc0JvdW5kXG4gICAgICB9O1xuICAgICAgZGVsZXRlIHRoaXMubG9hZGVyc1tsb2FkZXJJZF07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgZGVzdHJveUxvYWRlckRhdGEobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuc3RvcEFsbExvYWRlcihsb2FkZXJJZCk7XG4gICAgZGVsZXRlIHRoaXMubG9hZGVyc1tsb2FkZXJJZF07XG4gIH1cblxuICAvKipcbiAgICogR2V0IGRlZmF1bHQgbG9hZGVyIGNvbmZpZ3VyYXRpb25cbiAgICogQHJldHVybnMgZGVmYXVsdCBjb25maWd1cmF0aW9uIG9iamVjdFxuICAgKi9cbiAgZ2V0RGVmYXVsdENvbmZpZygpOiBOZ3hVaUxvYWRlckNvbmZpZyB7XG4gICAgcmV0dXJuIHsgLi4udGhpcy5kZWZhdWx0Q29uZmlnIH07XG4gIH1cblxuICAvKipcbiAgICogR2V0IGFsbCB0aGUgbG9hZGVyc1xuICAgKi9cbiAgZ2V0TG9hZGVycygpOiBMb2FkZXJzIHtcbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmxvYWRlcnMpKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGF0YSBvZiBhIHNwZWNpZmllZCBsb2FkZXIuIElmIGxvYWRlcklkIGlzIG5vdCBwcm92aWRlZCwgaXQgd2lsbCByZXR1cm4gZGF0YSBvZiBtYXN0ZXIgbG9hZGVyKGlmIGV4aXN0ZWQpXG4gICAqL1xuICBnZXRMb2FkZXIobG9hZGVySWQ/OiBzdHJpbmcpOiBMb2FkZXIge1xuICAgIGlmIChsb2FkZXJJZCkge1xuICAgICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJOb3RFeGlzdChsb2FkZXJJZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMudGhyb3dFcnJvcklmTWFzdGVyTG9hZGVyTm90RXhpc3QoKTtcbiAgICAgIGxvYWRlcklkID0gdGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkO1xuICAgIH1cbiAgICByZXR1cm4gSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0aGlzLmxvYWRlcnNbbG9hZGVySWRdKSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGZvcmVncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3BMb2FkZXIoKSBtZXRob2QuXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgb2YgdGhlIGxvYWRpbmcuIHRhc2tJZCBpcyBzZXQgdG8gJ2ZkLWRlZmF1bHQnIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdGFydExvYWRlcihsb2FkZXJJZDogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfRkdfVEFTS19JRCwgdGltZT86IFRpbWUpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZHlUb1N0YXJ0KGxvYWRlcklkLCB0YXNrSWQsIHRydWUsIHRpbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdLmlzT3RoZXJSdW5uaW5nKSB7XG4gICAgICAvLyBubyBvdGhlciBmb3JlZ3JvdW5kIHRhc2sgcnVubmluZ1xuICAgICAgaWYgKHRoaXMuaGFzUnVubmluZ1Rhc2soQkFDS0dST1VORCwgbG9hZGVySWQpKSB7XG4gICAgICAgIHRoaXMuYmFja2dyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgICB9XG4gICAgICB0aGlzLnNob3dGb3JlZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgZm9yZWdyb3VuZCBsb2FkaW5nIG9mIG1hc3RlciBsb2FkZXIgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3AoKSBtZXRob2QuXG4gICAqIE5PVEU6IFJlYWxseSB0aGlzIGZ1bmN0aW9uIGp1c3Qgd3JhcHMgc3RhcnRMb2FkZXIoKSBmdW5jdGlvblxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIG9mIHRoZSBsb2FkaW5nLiB0YXNrSWQgaXMgc2V0IHRvICdmZC1kZWZhdWx0JyBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RhcnQodGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX0ZHX1RBU0tfSUQsIHRpbWU/OiBUaW1lKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQsIHRhc2tJZCwgdGltZSk7XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGJhY2tncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3BMb2FkZXJCYWNrZ3JvdW5kKCkgbWV0aG9kLlxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIG9mIHRoZSBsb2FkaW5nLiB0YXNrSWQgaXMgc2V0IHRvICdiZy1kZWZhdWx0JyBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKGxvYWRlcklkOiBzdHJpbmcsIHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9CR19UQVNLX0lELCB0aW1lPzogVGltZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkeVRvU3RhcnQobG9hZGVySWQsIHRhc2tJZCwgZmFsc2UsIHRpbWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5oYXNSdW5uaW5nVGFzayhGT1JFR1JPVU5ELCBsb2FkZXJJZCkgJiYgIXRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXS5pc090aGVyUnVubmluZykge1xuICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU3RhcnQgdGhlIGJhY2tncm91bmQgbG9hZGluZyBvZiBtYXN0ZXIgbG9hZGVyIHdpdGggYSBzcGVjaWZpZWQgYHRhc2tJZGAuXG4gICAqIFRoZSBsb2FkaW5nIGlzIG9ubHkgY2xvc2VkIG9mZiB3aGVuIGFsbCB0YXNrSWRzIG9mIHRoYXQgbG9hZGVyIGFyZSBjYWxsZWQgd2l0aCBzdG9wQmFja2dyb3VuZCgpIG1ldGhvZC5cbiAgICogTk9URTogUmVhbGx5IHRoaXMgZnVuY3Rpb24ganVzdCB3cmFwcyBzdGFydEJhY2tncm91bmRMb2FkZXIoKSBmdW5jdGlvblxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIG9mIHRoZSBsb2FkaW5nLiB0YXNrSWQgaXMgc2V0IHRvICdiZy1kZWZhdWx0JyBieSBkZWZhdWx0LlxuICAgKi9cbiAgc3RhcnRCYWNrZ3JvdW5kKHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9CR19UQVNLX0lELCB0aW1lPzogVGltZSk6IHZvaWQge1xuICAgIHRoaXMuc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCwgdGFza0lkLCB0aW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGEgZm9yZWdyb3VuZCBsb2FkaW5nIG9mIGxvYWRlciBoYXZpbmcgYGxvYWRlcklkYCB3aXRoIHNwZWNpZmljIGB0YXNrSWRgXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgdG8gc3RvcC4gSWYgbm90IHByb3ZpZGVkLCAnZmctZGVmYXVsdCcgaXMgdXNlZC5cbiAgICogQHJldHVybnMgT2JqZWN0XG4gICAqL1xuICBzdG9wTG9hZGVyKGxvYWRlcklkOiBzdHJpbmcsIHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9GR19UQVNLX0lEKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWR5VG9TdG9wKGxvYWRlcklkLCB0YXNrSWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5oYXNSdW5uaW5nVGFzayhGT1JFR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgIHRoaXMuZm9yZWdyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgIHRoaXMuc2hvd0ZvcmVncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgICAgaWYgKHRoaXMuaGFzUnVubmluZ1Rhc2soQkFDS0dST1VORCwgbG9hZGVySWQpKSB7XG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIGlmICh0aGlzLmhhc1J1bm5pbmdUYXNrKEJBQ0tHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgICAgICAgLy8gc3RpbGwgaGF2ZSBiYWNrZ3JvdW5kIHRhc2tzXG4gICAgICAgICAgICB0aGlzLnNob3dCYWNrZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgV0FJVElOR19GT1JfT1ZFUkxBWV9ESVNBUFBFQVIpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGEgZm9yZWdyb3VuZCBsb2FkaW5nIG9mIG1hc3RlciBsb2FkZXIgd2l0aCBzcGVjaWZpYyBgdGFza0lkYFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2ZnLWRlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcCh0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfRkdfVEFTS19JRCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQsIHRhc2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhIGJhY2tncm91bmQgbG9hZGluZyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGAgd2l0aCBzcGVjaWZpYyBgdGFza0lkYFxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2JnLWRlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcEJhY2tncm91bmRMb2FkZXIobG9hZGVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX0JHX1RBU0tfSUQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZHlUb1N0b3AobG9hZGVySWQsIHRhc2tJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmhhc1J1bm5pbmdUYXNrKEZPUkVHUk9VTkQsIGxvYWRlcklkKSAmJiAhdGhpcy5oYXNSdW5uaW5nVGFzayhCQUNLR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgIHRoaXMuc2hvd0JhY2tncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGEgYmFja2dyb3VuZCBsb2FkaW5nIG9mIG1hc3RlciBsb2FkZXIgd2l0aCBzcGVjaWZpYyB0YXNrSWRcbiAgICogQHBhcmFtIHRhc2tJZCB0aGUgb3B0aW9uYWwgdGFzayBJZCB0byBzdG9wLiBJZiBub3QgcHJvdmlkZWQsICdiZy1kZWZhdWx0JyBpcyB1c2VkLlxuICAgKiBAcmV0dXJucyBPYmplY3RcbiAgICovXG4gIHN0b3BCYWNrZ3JvdW5kKHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9CR19UQVNLX0lEKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wQmFja2dyb3VuZExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQsIHRhc2tJZCk7XG4gIH1cblxuICAvKipcbiAgICogU3RvcCBhbGwgdGhlIGJhY2tncm91bmQgYW5kIGZvcmVncm91bmQgbG9hZGluZ3Mgb2YgbG9hZGVyIGhhdmluZyBgbG9hZGVySWRgXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqL1xuICBzdG9wQWxsTG9hZGVyKGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlck5vdEV4aXN0KGxvYWRlcklkKTtcbiAgICBpZiAodGhpcy5oYXNSdW5uaW5nVGFzayhGT1JFR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgIHRoaXMuZm9yZWdyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgIHRoaXMuc2hvd0ZvcmVncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIH0gZWxzZSBpZiAodGhpcy5oYXNSdW5uaW5nVGFzayhCQUNLR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgIHRoaXMuYmFja2dyb3VuZENsb3Nlb3V0KGxvYWRlcklkKTtcbiAgICAgIHRoaXMuc2hvd0JhY2tncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIH1cbiAgICB0aGlzLmNsZWFyQWxsVGltZXJzKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3MpO1xuICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3MgPSB7fTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGFsbCB0aGUgYmFja2dyb3VuZCBhbmQgZm9yZWdyb3VuZCBsb2FkaW5ncyBvZiBtYXN0ZXIgbG9hZGVyXG4gICAqL1xuICBzdG9wQWxsKCk6IHZvaWQge1xuICAgIHRoaXMuc3RvcEFsbExvYWRlcih0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQpO1xuICB9XG5cbiAgLyoqXG4gICAqIENyZWF0ZSBsb2FkZXIgZGF0YSBpZiBpdCBkb2VzIG5vdCBleGlzdFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGNyZWF0ZUxvYWRlckRhdGEobG9hZGVySWQ6IHN0cmluZywgaXNNYXN0ZXI6IGJvb2xlYW4sIGlzQm91bmQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubG9hZGVyc1tsb2FkZXJJZF0pIHtcbiAgICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0gPSB7XG4gICAgICAgIGxvYWRlcklkLFxuICAgICAgICB0YXNrczoge30sXG4gICAgICAgIGlzTWFzdGVyLFxuICAgICAgICBpc0JvdW5kXG4gICAgICB9O1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdyBlcnJvciBpZiB0aGUgbG9hZGVySWQgZG9lcyBub3QgZXhpc3QuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgdGhyb3dFcnJvcklmTG9hZGVyTm90RXhpc3QobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICghdGhpcy5sb2FkZXJzW2xvYWRlcklkXSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbbmd4LXVpLWxvYWRlcl0gLSBsb2FkZXJJZCBcIiR7bG9hZGVySWR9XCIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIHRoZSBsb2FkZXJJZCBoYXMgYWxyZWFkeSBleGlzdGVkLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHRocm93RXJyb3JJZkxvYWRlckV4aXN0cyhsb2FkZXJJZDogc3RyaW5nLCB1c2VJc0JvdW5kUHJvcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2FkZXJzW2xvYWRlcklkXSAmJiAodGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc0JvdW5kICYmIHVzZUlzQm91bmRQcm9wKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBbbmd4LXVpLWxvYWRlcl0gLSBsb2FkZXJJZCBcIiR7bG9hZGVySWR9XCIgaXMgZHVwbGljYXRlZC5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgZXJyb3IgaWYgdGhlIG1hc3RlciBsb2FkZXIgaGFzIGFscmVhZHkgZXhpc3RlZC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSB0aHJvd0Vycm9ySWZNYXN0ZXJMb2FkZXJFeGlzdHModXNlSXNCb3VuZFByb3A/OiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHRoaXMubG9hZGVyc1t0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWRdICYmICh0aGlzLmxvYWRlcnNbdGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkXS5pc0JvdW5kICYmIHVzZUlzQm91bmRQcm9wKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgW25neC11aS1sb2FkZXJdIC0gVGhlIG1hc3RlciBsb2FkZXIgaGFzIGFscmVhZHkgZXhpc3RlZC4gYCArXG4gICAgICAgICAgYFRoZSBhcHAgc2hvdWxkIGhhdmUgb25seSBvbmUgbWFzdGVyIGxvYWRlciBhbmQgaXQgc2hvdWxkIGJlIHBsYWNlZCBpbiB0aGUgcm9vdCBhcHAgdGVtcGxhdGVgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdyBlcnJvciBpZiB0aGUgbWFzdGVyIGxvYWRlciBkb2VzIG5vdCBleGlzdC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSB0aHJvd0Vycm9ySWZNYXN0ZXJMb2FkZXJOb3RFeGlzdCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMubG9hZGVyc1t0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtuZ3gtdWktbG9hZGVyXSAtIFRoZSBtYXN0ZXIgbG9hZGVyIGRvZXMgbm90IGV4aXN0LmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBNYW5hZ2UgdG8gY2xvc2UgZm9yZWdyb3VuZCBsb2FkaW5nXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgaWRcbiAgICovXG4gIHByaXZhdGUgZm9yZWdyb3VuZENsb3Nlb3V0KGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB0aGlzLmZnQ2xvc2luZy5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuZmdDbG9zaW5nLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiBmYWxzZSB9KTtcbiAgICB9LCBDTE9TSU5HX1RJTUUpO1xuICB9XG5cbiAgLyoqXG4gICAqIE1hbmFnZSB0byBjbG9zZSBiYWNrZ3JvdW5kIGxvYWRpbmdcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBpZFxuICAgKi9cbiAgcHJpdmF0ZSBiYWNrZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuYmdDbG9zaW5nLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5iZ0Nsb3NpbmcubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIH0sIENMT1NJTkdfVElNRSk7XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIHRpbWVycyBvZiB0aGUgZ2l2ZW4gdGFza1xuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGNsZWFyVGltZXJzKHRhc2s6IFRhc2spOiB2b2lkIHtcbiAgICBpZiAodGFzay5kZWxheVRpbWVyKSB7XG4gICAgICBjbGVhclRpbWVvdXQodGFzay5kZWxheVRpbWVyKTtcbiAgICB9XG4gICAgaWYgKHRhc2subWF4VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0YXNrLm1heFRpbWVyKTtcbiAgICB9XG4gICAgaWYgKHRhc2subWluVGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0YXNrLm1pblRpbWVyKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQ2xlYXIgYWxsIHRpbWVycyBvZiB0aGUgZ2l2ZW4gdGFza3NcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSBjbGVhckFsbFRpbWVycyh0YXNrczogVGFza3MpOiB2b2lkIHtcbiAgICBPYmplY3Qua2V5cyh0YXNrcykubWFwKGlkID0+IHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lcnModGFza3NbaWRdKTtcbiAgICB9KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGVjayB3aGV0aGVyIHRoZSBzcGVjaWZpZWQgbG9hZGVyIGhhcyBhIHJ1bm5pbmcgdGFzayB3aXRoIHRoZSBnaXZlbiBgdGFza0lkYC5cbiAgICogSWYgbm8gYHRhc2tJZGAgc3BlY2lmaWVkLCBpdCB3aWxsIGNoZWNrIHdoZXRoZXIgdGhlIGxvYWRlciBoYXMgYW55IHJ1bm5pbmcgdGFza3MuXG4gICAqIEZvciBpbnRlcm5hbCB1c2Ugb25seS5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiBAcGFyYW0gaXNGb3JlZ3JvdW5kIGZvcmVncm91bmQgdGFzayBvciBiYWNrZ3JvdW5kIHRhc2tcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgSWRcbiAgICogQHBhcmFtIHRhc2tJZCB0aGUgb3B0aW9uYWwgdGFzayBJZFxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBoYXNSdW5uaW5nVGFzayhpc0ZvcmVncm91bmQ6IGJvb2xlYW4sIGxvYWRlcklkOiBzdHJpbmcsIHRhc2tJZD86IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdKSB7XG4gICAgICBjb25zdCB0YXNrczogVGFza3MgPSB0aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzO1xuICAgICAgaWYgKHRhc2tJZCkge1xuICAgICAgICByZXR1cm4gdGFza3NbdGFza0lkXSA/ICh0YXNrc1t0YXNrSWRdLnN0YXJ0QXQgPyB0cnVlIDogZmFsc2UpIDogZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gT2JqZWN0LmtleXModGFza3MpLnNvbWUoaWQgPT4gISF0YXNrc1tpZF0uc3RhcnRBdCAmJiB0YXNrc1tpZF0uaXNGb3JlZ3JvdW5kID09PSBpc0ZvcmVncm91bmQpO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSByZWFkeVRvU3RhcnQobG9hZGVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcsIGlzRm9yZWdyb3VuZDogYm9vbGVhbiwgdGltZTogVGltZSA9IERFRkFVTFRfVElNRSk6IGJvb2xlYW4ge1xuICAgIHRoaXMuY3JlYXRlTG9hZGVyRGF0YShsb2FkZXJJZCwgdW5kZWZpbmVkLCBmYWxzZSk7XG4gICAgY29uc3QgaXNPdGhlclJ1bm5pbmcgPSB0aGlzLmhhc1J1bm5pbmdUYXNrKGlzRm9yZWdyb3VuZCwgbG9hZGVySWQpO1xuICAgIGlmICghdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdKSB7XG4gICAgICB0aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzW3Rhc2tJZF0gPSB7XG4gICAgICAgIHRhc2tJZCxcbiAgICAgICAgaXNGb3JlZ3JvdW5kLFxuICAgICAgICBtaW5UaW1lOiB0aW1lLm1pblRpbWUgPj0gTUlOX1RJTUUgPyB0aW1lLm1pblRpbWUgOiB0aGlzLmRlZmF1bHRDb25maWcubWluVGltZSxcbiAgICAgICAgbWF4VGltZTogdGltZS5tYXhUaW1lID8gdGltZS5tYXhUaW1lIDogdGhpcy5kZWZhdWx0Q29uZmlnLm1heFRpbWUsXG4gICAgICAgIGRlbGF5OiB0aW1lLmRlbGF5ID49IE1JTl9ERUxBWSA/IHRpbWUuZGVsYXkgOiB0aGlzLmRlZmF1bHRDb25maWcuZGVsYXlcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzW3Rhc2tJZF0uaXNGb3JlZ3JvdW5kICE9PSBpc0ZvcmVncm91bmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBbbmd4LXVpLWxvYWRlcl0gLSB0YXNrSWQgXCIke3Rhc2tJZH1cIiBpcyBkdXBsaWNhdGVkLmApO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5zZXREZWxheVRpbWVyKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXSwgbG9hZGVySWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXSA9IHtcbiAgICAgIC4uLnRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXSxcbiAgICAgIGlzT3RoZXJSdW5uaW5nLFxuICAgICAgc3RhcnRBdDogRGF0ZS5ub3coKVxuICAgIH07XG4gICAgdGhpcy5zZXRNYXhUaW1lcih0aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzW3Rhc2tJZF0sIGxvYWRlcklkKTtcbiAgICBpZiAoIXRoaXMubG9hZGVyc1tsb2FkZXJJZF0uaXNCb3VuZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHJlYWR5VG9TdG9wKGxvYWRlcklkOiBzdHJpbmcsIHRhc2tJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJOb3RFeGlzdChsb2FkZXJJZCk7XG4gICAgY29uc3QgdGFzazogVGFzayA9IHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXTtcbiAgICBpZiAoIXRhc2spIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRhc2suaXNEZWxheWVkKSB7XG4gICAgICB0aGlzLmNsZWFyVGltZXJzKHRhc2spO1xuICAgICAgZGVsZXRlIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKHRoaXMuc2V0TWluVGltZXIodGFzaywgbG9hZGVySWQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHRoaXMuY2xlYXJUaW1lcnModGFzayk7XG4gICAgZGVsZXRlIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgZGVsYXkgdGltZXIsIGlmIGBkZWxheWAgPiAwXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgcHJpdmF0ZSBzZXREZWxheVRpbWVyKHRhc2s6IFRhc2ssIGxvYWRlcklkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAodGFzay5kZWxheSA+IE1JTl9ERUxBWSkge1xuICAgICAgaWYgKHRhc2suaXNEZWxheWVkKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgICAgaWYgKCF0YXNrLmRlbGF5VGltZXIpIHtcbiAgICAgICAgdGFzay5pc0RlbGF5ZWQgPSB0cnVlO1xuICAgICAgICB0YXNrLmRlbGF5VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICB0YXNrLmlzRGVsYXllZCA9IGZhbHNlO1xuICAgICAgICAgIGlmICh0YXNrLmlzRm9yZWdyb3VuZCkge1xuICAgICAgICAgICAgdGhpcy5zdGFydExvYWRlcihsb2FkZXJJZCwgdGFzay50YXNrSWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0QmFja2dyb3VuZExvYWRlcihsb2FkZXJJZCwgdGFzay50YXNrSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGFzay5kZWxheSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICAvKipcbiAgICogU2V0IG1heFRpbWVyIGlmIGBtYXhUaW1lYCA+IGBtaW5UaW1lYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHByaXZhdGUgc2V0TWF4VGltZXIodGFzazogVGFzaywgbG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGlmICh0YXNrLm1heFRpbWUgPiB0YXNrLm1pblRpbWUpIHtcbiAgICAgIC8vIHJlc3RhcnQgdGhlIHRhc2ssIHJlc2V0IG1heFRpbWVyXG4gICAgICBpZiAodGFzay5tYXhUaW1lcikge1xuICAgICAgICBjbGVhclRpbWVvdXQodGFzay5tYXhUaW1lcik7XG4gICAgICB9XG4gICAgICB0YXNrLm1heFRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIGlmICh0YXNrLmlzRm9yZWdyb3VuZCkge1xuICAgICAgICAgIHRoaXMuc3RvcExvYWRlcihsb2FkZXJJZCwgdGFzay50YXNrSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRoaXMuc3RvcEJhY2tncm91bmRMb2FkZXIobG9hZGVySWQsIHRhc2sudGFza0lkKTtcbiAgICAgICAgfVxuICAgICAgfSwgdGFzay5tYXhUaW1lKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogU2V0IG1pblRpbWVyIGlmIGBzdGFydEF0YCArIGBtaW5UaW1lYCA+IGBEYXRlLm5vdygpYFxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIHByaXZhdGUgc2V0TWluVGltZXIodGFzazogVGFzaywgbG9hZGVySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgaWYgKHRhc2suc3RhcnRBdCkge1xuICAgICAgaWYgKHRhc2suc3RhcnRBdCArIHRhc2subWluVGltZSA+IG5vdykge1xuICAgICAgICB0YXNrLm1pblRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRhc2suaXNGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BMb2FkZXIobG9hZGVySWQsIHRhc2sudGFza0lkKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5zdG9wQmFja2dyb3VuZExvYWRlcihsb2FkZXJJZCwgdGFzay50YXNrSWQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSwgdGFzay5zdGFydEF0ICsgdGFzay5taW5UaW1lIC0gbm93KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuIl19