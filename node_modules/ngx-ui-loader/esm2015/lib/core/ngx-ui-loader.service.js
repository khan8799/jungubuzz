/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Inject, Injectable, Optional } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BACKGROUND, CLOSING_TIME, DEFAULT_BG_TASK_ID, DEFAULT_CONFIG, DEFAULT_FG_TASK_ID, DEFAULT_TIME, FOREGROUND, MIN_DELAY, MIN_TIME, WAITING_FOR_OVERLAY_DISAPPEAR } from '../utils/constants';
import { NGX_UI_LOADER_CONFIG_TOKEN } from './ngx-ui-loader-config.token';
import * as i0 from "@angular/core";
import * as i1 from "./ngx-ui-loader-config.token";
export class NgxUiLoaderService {
    /**
     * Constructor
     * @param {?} config
     */
    constructor(config) {
        this.config = config;
        this.defaultConfig = Object.assign({}, DEFAULT_CONFIG);
        if (this.config) {
            if (this.config.minTime && this.config.minTime < MIN_TIME) {
                this.config.minTime = MIN_TIME;
            }
            this.defaultConfig = Object.assign({}, this.defaultConfig, this.config);
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
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    bindLoaderData(loaderId) {
        /** @type {?} */
        let isMaster = false;
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
                this.showForeground.next({ loaderId, isShow: true });
            }
            else {
                if (this.hasRunningTask(BACKGROUND, loaderId)) {
                    this.showBackground.next({ loaderId, isShow: true });
                }
            }
        }
        else {
            this.createLoaderData(loaderId, isMaster, true);
        }
    }
    /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @param {?} newLoaderId
     * @return {?}
     */
    updateLoaderId(loaderId, newLoaderId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        if (this.loaders[loaderId].loaderId === this.defaultConfig.masterLoaderId) {
            console.warn(`[ngx-ui-loader] - Cannot change loaderId of master loader. The current ` +
                `master's loaderId is "${this.defaultConfig.masterLoaderId}". If you really want to ` +
                `change it, please use NgxUiLoaderModule.forRoot() method.`);
            return;
        }
        if (newLoaderId !== loaderId) {
            this.throwErrorIfLoaderExists(newLoaderId, true);
            this.loaders[newLoaderId] = {
                loaderId: newLoaderId,
                tasks: Object.assign({}, this.loaders[loaderId].tasks),
                isMaster: false,
                isBound: this.loaders[loaderId].isBound
            };
            delete this.loaders[loaderId];
        }
    }
    /**
     * For internal use only.
     * \@docs-private
     * @param {?} loaderId
     * @return {?}
     */
    destroyLoaderData(loaderId) {
        this.stopAllLoader(loaderId);
        delete this.loaders[loaderId];
    }
    /**
     * Get default loader configuration
     * @return {?} default configuration object
     */
    getDefaultConfig() {
        return Object.assign({}, this.defaultConfig);
    }
    /**
     * Get all the loaders
     * @return {?}
     */
    getLoaders() {
        return JSON.parse(JSON.stringify(this.loaders));
    }
    /**
     * Get data of a specified loader. If loaderId is not provided, it will return data of master loader(if existed)
     * @param {?=} loaderId
     * @return {?}
     */
    getLoader(loaderId) {
        if (loaderId) {
            this.throwErrorIfLoaderNotExist(loaderId);
        }
        else {
            this.throwErrorIfMasterLoaderNotExist();
            loaderId = this.defaultConfig.masterLoaderId;
        }
        return JSON.parse(JSON.stringify(this.loaders[loaderId]));
    }
    /**
     * Start the foreground loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoader() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     * @param {?=} time
     * @return {?}
     */
    startLoader(loaderId, taskId = DEFAULT_FG_TASK_ID, time) {
        if (!this.readyToStart(loaderId, taskId, true, time)) {
            return;
        }
        if (!this.loaders[loaderId].tasks[taskId].isOtherRunning) {
            // no other foreground task running
            if (this.hasRunningTask(BACKGROUND, loaderId)) {
                this.backgroundCloseout(loaderId);
                this.showBackground.next({ loaderId, isShow: false });
            }
            this.showForeground.next({ loaderId, isShow: true });
        }
    }
    /**
     * Start the foreground loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stop() method.
     * NOTE: Really this function just wraps startLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'fd-default' by default.
     * @param {?=} time
     * @return {?}
     */
    start(taskId = DEFAULT_FG_TASK_ID, time) {
        this.startLoader(this.defaultConfig.masterLoaderId, taskId, time);
    }
    /**
     * Start the background loading of loader having `loaderId` with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopLoaderBackground() method.
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     * @param {?=} time
     * @return {?}
     */
    startBackgroundLoader(loaderId, taskId = DEFAULT_BG_TASK_ID, time) {
        if (!this.readyToStart(loaderId, taskId, false, time)) {
            return;
        }
        if (!this.hasRunningTask(FOREGROUND, loaderId) && !this.loaders[loaderId].tasks[taskId].isOtherRunning) {
            this.showBackground.next({ loaderId, isShow: true });
        }
    }
    /**
     * Start the background loading of master loader with a specified `taskId`.
     * The loading is only closed off when all taskIds of that loader are called with stopBackground() method.
     * NOTE: Really this function just wraps startBackgroundLoader() function
     * @param {?=} taskId the optional task Id of the loading. taskId is set to 'bg-default' by default.
     * @param {?=} time
     * @return {?}
     */
    startBackground(taskId = DEFAULT_BG_TASK_ID, time) {
        this.startBackgroundLoader(this.defaultConfig.masterLoaderId, taskId, time);
    }
    /**
     * Stop a foreground loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @return {?} Object
     */
    stopLoader(loaderId, taskId = DEFAULT_FG_TASK_ID) {
        if (!this.readyToStop(loaderId, taskId)) {
            return;
        }
        if (!this.hasRunningTask(FOREGROUND, loaderId)) {
            this.foregroundCloseout(loaderId);
            this.showForeground.next({ loaderId, isShow: false });
            if (this.hasRunningTask(BACKGROUND, loaderId)) {
                setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (this.hasRunningTask(BACKGROUND, loaderId)) {
                        // still have background tasks
                        this.showBackground.next({ loaderId, isShow: true });
                    }
                }), WAITING_FOR_OVERLAY_DISAPPEAR);
            }
        }
    }
    /**
     * Stop a foreground loading of master loader with specific `taskId`
     * @param {?=} taskId the optional task Id to stop. If not provided, 'fg-default' is used.
     * @return {?} Object
     */
    stop(taskId = DEFAULT_FG_TASK_ID) {
        this.stopLoader(this.defaultConfig.masterLoaderId, taskId);
    }
    /**
     * Stop a background loading of loader having `loaderId` with specific `taskId`
     * @param {?} loaderId the loader Id
     * @param {?=} taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @return {?} Object
     */
    stopBackgroundLoader(loaderId, taskId = DEFAULT_BG_TASK_ID) {
        if (!this.readyToStop(loaderId, taskId)) {
            return;
        }
        if (!this.hasRunningTask(FOREGROUND, loaderId) && !this.hasRunningTask(BACKGROUND, loaderId)) {
            this.backgroundCloseout(loaderId);
            this.showBackground.next({ loaderId, isShow: false });
        }
    }
    /**
     * Stop a background loading of master loader with specific taskId
     * @param {?=} taskId the optional task Id to stop. If not provided, 'bg-default' is used.
     * @return {?} Object
     */
    stopBackground(taskId = DEFAULT_BG_TASK_ID) {
        this.stopBackgroundLoader(this.defaultConfig.masterLoaderId, taskId);
    }
    /**
     * Stop all the background and foreground loadings of loader having `loaderId`
     * @param {?} loaderId the loader Id
     * @return {?}
     */
    stopAllLoader(loaderId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        if (this.hasRunningTask(FOREGROUND, loaderId)) {
            this.foregroundCloseout(loaderId);
            this.showForeground.next({ loaderId, isShow: false });
        }
        else if (this.hasRunningTask(BACKGROUND, loaderId)) {
            this.backgroundCloseout(loaderId);
            this.showBackground.next({ loaderId, isShow: false });
        }
        this.clearAllTimers(this.loaders[loaderId].tasks);
        this.loaders[loaderId].tasks = {};
    }
    /**
     * Stop all the background and foreground loadings of master loader
     * @return {?}
     */
    stopAll() {
        this.stopAllLoader(this.defaultConfig.masterLoaderId);
    }
    /**
     * Create loader data if it does not exist
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} isMaster
     * @param {?} isBound
     * @return {?}
     */
    createLoaderData(loaderId, isMaster, isBound) {
        if (!this.loaders[loaderId]) {
            this.loaders[loaderId] = {
                loaderId,
                tasks: {},
                isMaster,
                isBound
            };
        }
    }
    /**
     * Throw error if the loaderId does not exist.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @return {?}
     */
    throwErrorIfLoaderNotExist(loaderId) {
        if (!this.loaders[loaderId]) {
            throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" does not exist.`);
        }
    }
    /**
     * Throw error if the loaderId has already existed.
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    throwErrorIfLoaderExists(loaderId, useIsBoundProp) {
        if (this.loaders[loaderId] && (this.loaders[loaderId].isBound && useIsBoundProp)) {
            throw new Error(`[ngx-ui-loader] - loaderId "${loaderId}" is duplicated.`);
        }
    }
    /**
     * Throw error if the master loader has already existed.
     * \@docs-private
     * @private
     * @param {?=} useIsBoundProp
     * @return {?}
     */
    throwErrorIfMasterLoaderExists(useIsBoundProp) {
        if (this.loaders[this.defaultConfig.masterLoaderId] && (this.loaders[this.defaultConfig.masterLoaderId].isBound && useIsBoundProp)) {
            throw new Error(`[ngx-ui-loader] - The master loader has already existed. ` +
                `The app should have only one master loader and it should be placed in the root app template`);
        }
    }
    /**
     * Throw error if the master loader does not exist.
     * \@docs-private
     * @private
     * @return {?}
     */
    throwErrorIfMasterLoaderNotExist() {
        if (!this.loaders[this.defaultConfig.masterLoaderId]) {
            throw new Error(`[ngx-ui-loader] - The master loader does not exist.`);
        }
    }
    /**
     * Manage to close foreground loading
     * \@docs-private
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    foregroundCloseout(loaderId) {
        this.fgClosing.next({ loaderId, isShow: true });
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.fgClosing.next({ loaderId, isShow: false });
        }), CLOSING_TIME);
    }
    /**
     * Manage to close background loading
     * \@docs-private
     * @private
     * @param {?} loaderId the loader id
     * @return {?}
     */
    backgroundCloseout(loaderId) {
        this.bgClosing.next({ loaderId, isShow: true });
        setTimeout((/**
         * @return {?}
         */
        () => {
            this.bgClosing.next({ loaderId, isShow: false });
        }), CLOSING_TIME);
    }
    /**
     * Clear all timers of the given task
     * \@docs-private
     * @private
     * @param {?} task
     * @return {?}
     */
    clearTimers(task) {
        if (task.delayTimer) {
            clearTimeout(task.delayTimer);
        }
        if (task.maxTimer) {
            clearTimeout(task.maxTimer);
        }
        if (task.minTimer) {
            clearTimeout(task.minTimer);
        }
    }
    /**
     * Clear all timers of the given tasks
     * \@docs-private
     * @private
     * @param {?} tasks
     * @return {?}
     */
    clearAllTimers(tasks) {
        Object.keys(tasks).map((/**
         * @param {?} id
         * @return {?}
         */
        id => {
            this.clearTimers(tasks[id]);
        }));
    }
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
    hasRunningTask(isForeground, loaderId, taskId) {
        if (this.loaders[loaderId]) {
            /** @type {?} */
            const tasks = this.loaders[loaderId].tasks;
            if (taskId) {
                return tasks[taskId] ? (tasks[taskId].startAt ? true : false) : false;
            }
            return Object.keys(tasks).some((/**
             * @param {?} id
             * @return {?}
             */
            id => !!tasks[id].startAt && tasks[id].isForeground === isForeground));
        }
        return false;
    }
    /**
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} taskId
     * @param {?} isForeground
     * @param {?=} time
     * @return {?}
     */
    readyToStart(loaderId, taskId, isForeground, time = DEFAULT_TIME) {
        this.createLoaderData(loaderId, undefined, false);
        /** @type {?} */
        const isOtherRunning = this.hasRunningTask(isForeground, loaderId);
        if (!this.loaders[loaderId].tasks[taskId]) {
            this.loaders[loaderId].tasks[taskId] = {
                taskId,
                isForeground,
                minTime: time.minTime >= MIN_TIME ? time.minTime : this.defaultConfig.minTime,
                maxTime: time.maxTime ? time.maxTime : this.defaultConfig.maxTime,
                delay: time.delay >= MIN_DELAY ? time.delay : this.defaultConfig.delay
            };
        }
        else {
            if (this.loaders[loaderId].tasks[taskId].isForeground !== isForeground) {
                throw new Error(`[ngx-ui-loader] - taskId "${taskId}" is duplicated.`);
            }
        }
        if (this.setDelayTimer(this.loaders[loaderId].tasks[taskId], loaderId)) {
            return false;
        }
        this.loaders[loaderId].tasks[taskId] = Object.assign({}, this.loaders[loaderId].tasks[taskId], { isOtherRunning, startAt: Date.now() });
        this.setMaxTimer(this.loaders[loaderId].tasks[taskId], loaderId);
        if (!this.loaders[loaderId].isBound) {
            return false;
        }
        return true;
    }
    /**
     * \@docs-private
     * @private
     * @param {?} loaderId
     * @param {?} taskId
     * @return {?}
     */
    readyToStop(loaderId, taskId) {
        this.throwErrorIfLoaderNotExist(loaderId);
        /** @type {?} */
        const task = this.loaders[loaderId].tasks[taskId];
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
    }
    /**
     * Set delay timer, if `delay` > 0
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    setDelayTimer(task, loaderId) {
        if (task.delay > MIN_DELAY) {
            if (task.isDelayed) {
                return true;
            }
            if (!task.delayTimer) {
                task.isDelayed = true;
                task.delayTimer = setTimeout((/**
                 * @return {?}
                 */
                () => {
                    task.isDelayed = false;
                    if (task.isForeground) {
                        this.startLoader(loaderId, task.taskId);
                    }
                    else {
                        this.startBackgroundLoader(loaderId, task.taskId);
                    }
                }), task.delay);
                return true;
            }
        }
        return false;
    }
    /**
     * Set maxTimer if `maxTime` > `minTime`
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    setMaxTimer(task, loaderId) {
        if (task.maxTime > task.minTime) {
            // restart the task, reset maxTimer
            if (task.maxTimer) {
                clearTimeout(task.maxTimer);
            }
            task.maxTimer = setTimeout((/**
             * @return {?}
             */
            () => {
                if (task.isForeground) {
                    this.stopLoader(loaderId, task.taskId);
                }
                else {
                    this.stopBackgroundLoader(loaderId, task.taskId);
                }
            }), task.maxTime);
        }
    }
    /**
     * Set minTimer if `startAt` + `minTime` > `Date.now()`
     * \@docs-private
     * @private
     * @param {?} task
     * @param {?} loaderId
     * @return {?} boolean
     */
    setMinTimer(task, loaderId) {
        /** @type {?} */
        const now = Date.now();
        if (task.startAt) {
            if (task.startAt + task.minTime > now) {
                task.minTimer = setTimeout((/**
                 * @return {?}
                 */
                () => {
                    if (task.isForeground) {
                        this.stopLoader(loaderId, task.taskId);
                    }
                    else {
                        this.stopBackgroundLoader(loaderId, task.taskId);
                    }
                }), task.startAt + task.minTime - now);
                return true;
            }
        }
        return false;
    }
}
NgxUiLoaderService.decorators = [
    { type: Injectable, args: [{
                providedIn: 'root'
            },] }
];
/** @nocollapse */
NgxUiLoaderService.ctorParameters = () => [
    { type: undefined, decorators: [{ type: Optional }, { type: Inject, args: [NGX_UI_LOADER_CONFIG_TOKEN,] }] }
];
/** @nocollapse */ NgxUiLoaderService.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function NgxUiLoaderService_Factory() { return new NgxUiLoaderService(i0.ɵɵinject(i1.NGX_UI_LOADER_CONFIG_TOKEN, 8)); }, token: NgxUiLoaderService, providedIn: "root" });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibmd4LXVpLWxvYWRlci5zZXJ2aWNlLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi9jb3JlL25neC11aS1sb2FkZXIuc2VydmljZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFFLE1BQU0sRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQzdELE9BQU8sRUFBRSxlQUFlLEVBQWMsTUFBTSxNQUFNLENBQUM7QUFFbkQsT0FBTyxFQUNMLFVBQVUsRUFDVixZQUFZLEVBQ1osa0JBQWtCLEVBQ2xCLGNBQWMsRUFDZCxrQkFBa0IsRUFDbEIsWUFBWSxFQUNaLFVBQVUsRUFDVixTQUFTLEVBQ1QsUUFBUSxFQUNSLDZCQUE2QixFQUM5QixNQUFNLG9CQUFvQixDQUFDO0FBQzVCLE9BQU8sRUFBRSwwQkFBMEIsRUFBRSxNQUFNLDhCQUE4QixDQUFDOzs7QUFPMUUsTUFBTSxPQUFPLGtCQUFrQjs7Ozs7SUFtQzdCLFlBQW9FLE1BQXlCO1FBQXpCLFdBQU0sR0FBTixNQUFNLENBQW1CO1FBQzNGLElBQUksQ0FBQyxhQUFhLHFCQUFRLGNBQWMsQ0FBRSxDQUFDO1FBQzNDLElBQUksSUFBSSxDQUFDLE1BQU0sRUFBRTtZQUNmLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxFQUFFO2dCQUN6RCxJQUFJLENBQUMsTUFBTSxDQUFDLE9BQU8sR0FBRyxRQUFRLENBQUM7YUFDaEM7WUFDRCxJQUFJLENBQUMsYUFBYSxxQkFBUSxJQUFJLENBQUMsYUFBYSxFQUFLLElBQUksQ0FBQyxNQUFNLENBQUUsQ0FBQztTQUNoRTtRQUNELElBQUksQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO1FBQ2xCLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxlQUFlLENBQVksRUFBRSxRQUFRLEVBQUUsRUFBRSxF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RyxDQUFDLENBQUM7Z0JBQ3RDLE9BQU8sSUFBSSxDQUFDO2FBQ2I7U0FDRjtRQUNELE9BQU8sS0FBSyxDQUFDO0lBQ2YsQ0FBQzs7O1lBMWhCRixVQUFVLFNBQUM7Z0JBQ1YsVUFBVSxFQUFFLE1BQU07YUFDbkI7Ozs7NENBb0NjLFFBQVEsWUFBSSxNQUFNLFNBQUMsMEJBQTBCOzs7Ozs7Ozs7SUE5QjFELGdEQUEwQzs7Ozs7O0lBTTFDLGdEQUEwQzs7Ozs7O0lBTTFDLDZDQUF1Qzs7Ozs7O0lBTXZDLDZDQUF1Qzs7Ozs7SUFFdkMsdUNBQThDOzs7OztJQUM5QywyQ0FBeUM7Ozs7O0lBQ3pDLHVDQUE4Qzs7Ozs7SUFDOUMscUNBQXlCOzs7OztJQUN6Qiw0Q0FBbUQ7Ozs7O0lBQ25ELDRDQUFtRDs7Ozs7SUFLdkMsb0NBQWlGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0LCBJbmplY3RhYmxlLCBPcHRpb25hbCB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgQmVoYXZpb3JTdWJqZWN0LCBPYnNlcnZhYmxlIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7XG4gIEJBQ0tHUk9VTkQsXG4gIENMT1NJTkdfVElNRSxcbiAgREVGQVVMVF9CR19UQVNLX0lELFxuICBERUZBVUxUX0NPTkZJRyxcbiAgREVGQVVMVF9GR19UQVNLX0lELFxuICBERUZBVUxUX1RJTUUsXG4gIEZPUkVHUk9VTkQsXG4gIE1JTl9ERUxBWSxcbiAgTUlOX1RJTUUsXG4gIFdBSVRJTkdfRk9SX09WRVJMQVlfRElTQVBQRUFSXG59IGZyb20gJy4uL3V0aWxzL2NvbnN0YW50cyc7XG5pbXBvcnQgeyBOR1hfVUlfTE9BREVSX0NPTkZJR19UT0tFTiB9IGZyb20gJy4vbmd4LXVpLWxvYWRlci1jb25maWcudG9rZW4nO1xuaW1wb3J0IHsgTmd4VWlMb2FkZXJDb25maWcgfSBmcm9tICcuLi91dGlscy9pbnRlcmZhY2VzJztcbmltcG9ydCB7IExvYWRlcnMsIExvYWRlciwgU2hvd0V2ZW50LCBUYXNrcywgVGFzaywgVGltZSB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuXG5ASW5qZWN0YWJsZSh7XG4gIHByb3ZpZGVkSW46ICdyb290J1xufSlcbmV4cG9ydCBjbGFzcyBOZ3hVaUxvYWRlclNlcnZpY2Uge1xuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBiYWNrZ3JvdW5kQ2xvc2luZyQ6IE9ic2VydmFibGU8U2hvd0V2ZW50PjtcblxuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBmb3JlZ3JvdW5kQ2xvc2luZyQ6IE9ic2VydmFibGU8U2hvd0V2ZW50PjtcblxuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBzaG93QmFja2dyb3VuZCQ6IE9ic2VydmFibGU8U2hvd0V2ZW50PjtcblxuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBzaG93Rm9yZWdyb3VuZCQ6IE9ic2VydmFibGU8U2hvd0V2ZW50PjtcblxuICBwcml2YXRlIGJnQ2xvc2luZzogQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD47XG4gIHByaXZhdGUgZGVmYXVsdENvbmZpZzogTmd4VWlMb2FkZXJDb25maWc7XG4gIHByaXZhdGUgZmdDbG9zaW5nOiBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50PjtcbiAgcHJpdmF0ZSBsb2FkZXJzOiBMb2FkZXJzO1xuICBwcml2YXRlIHNob3dCYWNrZ3JvdW5kOiBCZWhhdmlvclN1YmplY3Q8U2hvd0V2ZW50PjtcbiAgcHJpdmF0ZSBzaG93Rm9yZWdyb3VuZDogQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD47XG5cbiAgLyoqXG4gICAqIENvbnN0cnVjdG9yXG4gICAqL1xuICBjb25zdHJ1Y3RvcihAT3B0aW9uYWwoKSBASW5qZWN0KE5HWF9VSV9MT0FERVJfQ09ORklHX1RPS0VOKSBwcml2YXRlIGNvbmZpZzogTmd4VWlMb2FkZXJDb25maWcpIHtcbiAgICB0aGlzLmRlZmF1bHRDb25maWcgPSB7IC4uLkRFRkFVTFRfQ09ORklHIH07XG4gICAgaWYgKHRoaXMuY29uZmlnKSB7XG4gICAgICBpZiAodGhpcy5jb25maWcubWluVGltZSAmJiB0aGlzLmNvbmZpZy5taW5UaW1lIDwgTUlOX1RJTUUpIHtcbiAgICAgICAgdGhpcy5jb25maWcubWluVGltZSA9IE1JTl9USU1FO1xuICAgICAgfVxuICAgICAgdGhpcy5kZWZhdWx0Q29uZmlnID0geyAuLi50aGlzLmRlZmF1bHRDb25maWcsIC4uLnRoaXMuY29uZmlnIH07XG4gICAgfVxuICAgIHRoaXMubG9hZGVycyA9IHt9O1xuICAgIHRoaXMuc2hvd0ZvcmVncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD4oeyBsb2FkZXJJZDogJycsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgdGhpcy5zaG93Rm9yZWdyb3VuZCQgPSB0aGlzLnNob3dGb3JlZ3JvdW5kLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuc2hvd0JhY2tncm91bmQgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD4oeyBsb2FkZXJJZDogJycsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgdGhpcy5zaG93QmFja2dyb3VuZCQgPSB0aGlzLnNob3dCYWNrZ3JvdW5kLmFzT2JzZXJ2YWJsZSgpO1xuICAgIHRoaXMuZmdDbG9zaW5nID0gbmV3IEJlaGF2aW9yU3ViamVjdDxTaG93RXZlbnQ+KHsgbG9hZGVySWQ6ICcnLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIHRoaXMuZm9yZWdyb3VuZENsb3NpbmckID0gdGhpcy5mZ0Nsb3NpbmcuYXNPYnNlcnZhYmxlKCk7XG4gICAgdGhpcy5iZ0Nsb3NpbmcgPSBuZXcgQmVoYXZpb3JTdWJqZWN0PFNob3dFdmVudD4oeyBsb2FkZXJJZDogJycsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgdGhpcy5iYWNrZ3JvdW5kQ2xvc2luZyQgPSB0aGlzLmJnQ2xvc2luZy5hc09ic2VydmFibGUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBGb3IgaW50ZXJuYWwgdXNlIG9ubHkuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIGJpbmRMb2FkZXJEYXRhKGxvYWRlcklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBsZXQgaXNNYXN0ZXIgPSBmYWxzZTtcbiAgICBpZiAobG9hZGVySWQgPT09IHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCkge1xuICAgICAgdGhpcy50aHJvd0Vycm9ySWZNYXN0ZXJMb2FkZXJFeGlzdHModHJ1ZSk7XG4gICAgICBpc01hc3RlciA9IHRydWU7XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIG5vdCBtYXN0ZXIgbG9hZGVyXG4gICAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlckV4aXN0cyhsb2FkZXJJZCwgdHJ1ZSk7XG4gICAgfVxuICAgIGlmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdKSB7XG4gICAgICB0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmlzQm91bmQgPSB0cnVlO1xuICAgICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc01hc3RlciA9IGlzTWFzdGVyO1xuICAgICAgLy8gZW1pdCBzaG93RXZlbnQgYWZ0ZXIgZGF0YSBsb2FkZXIgaXMgYm91bmRcbiAgICAgIGlmICh0aGlzLmhhc1J1bm5pbmdUYXNrKEZPUkVHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgICB0aGlzLnNob3dGb3JlZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKHRoaXMuaGFzUnVubmluZ1Rhc2soQkFDS0dST1VORCwgbG9hZGVySWQpKSB7XG4gICAgICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogdHJ1ZSB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLmNyZWF0ZUxvYWRlckRhdGEobG9hZGVySWQsIGlzTWFzdGVyLCB0cnVlKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICB1cGRhdGVMb2FkZXJJZChsb2FkZXJJZDogc3RyaW5nLCBuZXdMb2FkZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy50aHJvd0Vycm9ySWZMb2FkZXJOb3RFeGlzdChsb2FkZXJJZCk7XG4gICAgaWYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0ubG9hZGVySWQgPT09IHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCkge1xuICAgICAgY29uc29sZS53YXJuKFxuICAgICAgICBgW25neC11aS1sb2FkZXJdIC0gQ2Fubm90IGNoYW5nZSBsb2FkZXJJZCBvZiBtYXN0ZXIgbG9hZGVyLiBUaGUgY3VycmVudCBgICtcbiAgICAgICAgICBgbWFzdGVyJ3MgbG9hZGVySWQgaXMgXCIke3RoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZH1cIi4gSWYgeW91IHJlYWxseSB3YW50IHRvIGAgK1xuICAgICAgICAgIGBjaGFuZ2UgaXQsIHBsZWFzZSB1c2UgTmd4VWlMb2FkZXJNb2R1bGUuZm9yUm9vdCgpIG1ldGhvZC5gXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobmV3TG9hZGVySWQgIT09IGxvYWRlcklkKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlckV4aXN0cyhuZXdMb2FkZXJJZCwgdHJ1ZSk7XG4gICAgICB0aGlzLmxvYWRlcnNbbmV3TG9hZGVySWRdID0ge1xuICAgICAgICBsb2FkZXJJZDogbmV3TG9hZGVySWQsXG4gICAgICAgIHRhc2tzOiB7IC4uLnRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3MgfSxcbiAgICAgICAgaXNNYXN0ZXI6IGZhbHNlLFxuICAgICAgICBpc0JvdW5kOiB0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmlzQm91bmRcbiAgICAgIH07XG4gICAgICBkZWxldGUgdGhpcy5sb2FkZXJzW2xvYWRlcklkXTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBkZXN0cm95TG9hZGVyRGF0YShsb2FkZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wQWxsTG9hZGVyKGxvYWRlcklkKTtcbiAgICBkZWxldGUgdGhpcy5sb2FkZXJzW2xvYWRlcklkXTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgZGVmYXVsdCBsb2FkZXIgY29uZmlndXJhdGlvblxuICAgKiBAcmV0dXJucyBkZWZhdWx0IGNvbmZpZ3VyYXRpb24gb2JqZWN0XG4gICAqL1xuICBnZXREZWZhdWx0Q29uZmlnKCk6IE5neFVpTG9hZGVyQ29uZmlnIHtcbiAgICByZXR1cm4geyAuLi50aGlzLmRlZmF1bHRDb25maWcgfTtcbiAgfVxuXG4gIC8qKlxuICAgKiBHZXQgYWxsIHRoZSBsb2FkZXJzXG4gICAqL1xuICBnZXRMb2FkZXJzKCk6IExvYWRlcnMge1xuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubG9hZGVycykpO1xuICB9XG5cbiAgLyoqXG4gICAqIEdldCBkYXRhIG9mIGEgc3BlY2lmaWVkIGxvYWRlci4gSWYgbG9hZGVySWQgaXMgbm90IHByb3ZpZGVkLCBpdCB3aWxsIHJldHVybiBkYXRhIG9mIG1hc3RlciBsb2FkZXIoaWYgZXhpc3RlZClcbiAgICovXG4gIGdldExvYWRlcihsb2FkZXJJZD86IHN0cmluZyk6IExvYWRlciB7XG4gICAgaWYgKGxvYWRlcklkKSB7XG4gICAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlck5vdEV4aXN0KGxvYWRlcklkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy50aHJvd0Vycm9ySWZNYXN0ZXJMb2FkZXJOb3RFeGlzdCgpO1xuICAgICAgbG9hZGVySWQgPSB0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWQ7XG4gICAgfVxuICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHRoaXMubG9hZGVyc1tsb2FkZXJJZF0pKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgZm9yZWdyb3VuZCBsb2FkaW5nIG9mIGxvYWRlciBoYXZpbmcgYGxvYWRlcklkYCB3aXRoIGEgc3BlY2lmaWVkIGB0YXNrSWRgLlxuICAgKiBUaGUgbG9hZGluZyBpcyBvbmx5IGNsb3NlZCBvZmYgd2hlbiBhbGwgdGFza0lkcyBvZiB0aGF0IGxvYWRlciBhcmUgY2FsbGVkIHdpdGggc3RvcExvYWRlcigpIG1ldGhvZC5cbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgSWRcbiAgICogQHBhcmFtIHRhc2tJZCB0aGUgb3B0aW9uYWwgdGFzayBJZCBvZiB0aGUgbG9hZGluZy4gdGFza0lkIGlzIHNldCB0byAnZmQtZGVmYXVsdCcgYnkgZGVmYXVsdC5cbiAgICovXG4gIHN0YXJ0TG9hZGVyKGxvYWRlcklkOiBzdHJpbmcsIHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9GR19UQVNLX0lELCB0aW1lPzogVGltZSk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkeVRvU3RhcnQobG9hZGVySWQsIHRhc2tJZCwgdHJ1ZSwgdGltZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzW3Rhc2tJZF0uaXNPdGhlclJ1bm5pbmcpIHtcbiAgICAgIC8vIG5vIG90aGVyIGZvcmVncm91bmQgdGFzayBydW5uaW5nXG4gICAgICBpZiAodGhpcy5oYXNSdW5uaW5nVGFzayhCQUNLR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgICB0aGlzLnNob3dCYWNrZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiBmYWxzZSB9KTtcbiAgICAgIH1cbiAgICAgIHRoaXMuc2hvd0ZvcmVncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0YXJ0IHRoZSBmb3JlZ3JvdW5kIGxvYWRpbmcgb2YgbWFzdGVyIGxvYWRlciB3aXRoIGEgc3BlY2lmaWVkIGB0YXNrSWRgLlxuICAgKiBUaGUgbG9hZGluZyBpcyBvbmx5IGNsb3NlZCBvZmYgd2hlbiBhbGwgdGFza0lkcyBvZiB0aGF0IGxvYWRlciBhcmUgY2FsbGVkIHdpdGggc3RvcCgpIG1ldGhvZC5cbiAgICogTk9URTogUmVhbGx5IHRoaXMgZnVuY3Rpb24ganVzdCB3cmFwcyBzdGFydExvYWRlcigpIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgb2YgdGhlIGxvYWRpbmcuIHRhc2tJZCBpcyBzZXQgdG8gJ2ZkLWRlZmF1bHQnIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdGFydCh0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfRkdfVEFTS19JRCwgdGltZT86IFRpbWUpOiB2b2lkIHtcbiAgICB0aGlzLnN0YXJ0TG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCwgdGFza0lkLCB0aW1lKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgYmFja2dyb3VuZCBsb2FkaW5nIG9mIGxvYWRlciBoYXZpbmcgYGxvYWRlcklkYCB3aXRoIGEgc3BlY2lmaWVkIGB0YXNrSWRgLlxuICAgKiBUaGUgbG9hZGluZyBpcyBvbmx5IGNsb3NlZCBvZmYgd2hlbiBhbGwgdGFza0lkcyBvZiB0aGF0IGxvYWRlciBhcmUgY2FsbGVkIHdpdGggc3RvcExvYWRlckJhY2tncm91bmQoKSBtZXRob2QuXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgb2YgdGhlIGxvYWRpbmcuIHRhc2tJZCBpcyBzZXQgdG8gJ2JnLWRlZmF1bHQnIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdGFydEJhY2tncm91bmRMb2FkZXIobG9hZGVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX0JHX1RBU0tfSUQsIHRpbWU/OiBUaW1lKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLnJlYWR5VG9TdGFydChsb2FkZXJJZCwgdGFza0lkLCBmYWxzZSwgdGltZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmhhc1J1bm5pbmdUYXNrKEZPUkVHUk9VTkQsIGxvYWRlcklkKSAmJiAhdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdLmlzT3RoZXJSdW5uaW5nKSB7XG4gICAgICB0aGlzLnNob3dCYWNrZ3JvdW5kLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTdGFydCB0aGUgYmFja2dyb3VuZCBsb2FkaW5nIG9mIG1hc3RlciBsb2FkZXIgd2l0aCBhIHNwZWNpZmllZCBgdGFza0lkYC5cbiAgICogVGhlIGxvYWRpbmcgaXMgb25seSBjbG9zZWQgb2ZmIHdoZW4gYWxsIHRhc2tJZHMgb2YgdGhhdCBsb2FkZXIgYXJlIGNhbGxlZCB3aXRoIHN0b3BCYWNrZ3JvdW5kKCkgbWV0aG9kLlxuICAgKiBOT1RFOiBSZWFsbHkgdGhpcyBmdW5jdGlvbiBqdXN0IHdyYXBzIHN0YXJ0QmFja2dyb3VuZExvYWRlcigpIGZ1bmN0aW9uXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgb2YgdGhlIGxvYWRpbmcuIHRhc2tJZCBpcyBzZXQgdG8gJ2JnLWRlZmF1bHQnIGJ5IGRlZmF1bHQuXG4gICAqL1xuICBzdGFydEJhY2tncm91bmQodGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX0JHX1RBU0tfSUQsIHRpbWU/OiBUaW1lKTogdm9pZCB7XG4gICAgdGhpcy5zdGFydEJhY2tncm91bmRMb2FkZXIodGhpcy5kZWZhdWx0Q29uZmlnLm1hc3RlckxvYWRlcklkLCB0YXNrSWQsIHRpbWUpO1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYSBmb3JlZ3JvdW5kIGxvYWRpbmcgb2YgbG9hZGVyIGhhdmluZyBgbG9hZGVySWRgIHdpdGggc3BlY2lmaWMgYHRhc2tJZGBcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgSWRcbiAgICogQHBhcmFtIHRhc2tJZCB0aGUgb3B0aW9uYWwgdGFzayBJZCB0byBzdG9wLiBJZiBub3QgcHJvdmlkZWQsICdmZy1kZWZhdWx0JyBpcyB1c2VkLlxuICAgKiBAcmV0dXJucyBPYmplY3RcbiAgICovXG4gIHN0b3BMb2FkZXIobG9hZGVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX0ZHX1RBU0tfSUQpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucmVhZHlUb1N0b3AobG9hZGVySWQsIHRhc2tJZCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKCF0aGlzLmhhc1J1bm5pbmdUYXNrKEZPUkVHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgdGhpcy5mb3JlZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgdGhpcy5zaG93Rm9yZWdyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgICBpZiAodGhpcy5oYXNSdW5uaW5nVGFzayhCQUNLR1JPVU5ELCBsb2FkZXJJZCkpIHtcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgICAgaWYgKHRoaXMuaGFzUnVubmluZ1Rhc2soQkFDS0dST1VORCwgbG9hZGVySWQpKSB7XG4gICAgICAgICAgICAvLyBzdGlsbCBoYXZlIGJhY2tncm91bmQgdGFza3NcbiAgICAgICAgICAgIHRoaXMuc2hvd0JhY2tncm91bmQubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IHRydWUgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCBXQUlUSU5HX0ZPUl9PVkVSTEFZX0RJU0FQUEVBUik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYSBmb3JlZ3JvdW5kIGxvYWRpbmcgb2YgbWFzdGVyIGxvYWRlciB3aXRoIHNwZWNpZmljIGB0YXNrSWRgXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgdG8gc3RvcC4gSWYgbm90IHByb3ZpZGVkLCAnZmctZGVmYXVsdCcgaXMgdXNlZC5cbiAgICogQHJldHVybnMgT2JqZWN0XG4gICAqL1xuICBzdG9wKHRhc2tJZDogc3RyaW5nID0gREVGQVVMVF9GR19UQVNLX0lEKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCwgdGFza0lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGEgYmFja2dyb3VuZCBsb2FkaW5nIG9mIGxvYWRlciBoYXZpbmcgYGxvYWRlcklkYCB3aXRoIHNwZWNpZmljIGB0YXNrSWRgXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIElkXG4gICAqIEBwYXJhbSB0YXNrSWQgdGhlIG9wdGlvbmFsIHRhc2sgSWQgdG8gc3RvcC4gSWYgbm90IHByb3ZpZGVkLCAnYmctZGVmYXVsdCcgaXMgdXNlZC5cbiAgICogQHJldHVybnMgT2JqZWN0XG4gICAqL1xuICBzdG9wQmFja2dyb3VuZExvYWRlcihsb2FkZXJJZDogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZyA9IERFRkFVTFRfQkdfVEFTS19JRCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5yZWFkeVRvU3RvcChsb2FkZXJJZCwgdGFza0lkKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIXRoaXMuaGFzUnVubmluZ1Rhc2soRk9SRUdST1VORCwgbG9hZGVySWQpICYmICF0aGlzLmhhc1J1bm5pbmdUYXNrKEJBQ0tHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYSBiYWNrZ3JvdW5kIGxvYWRpbmcgb2YgbWFzdGVyIGxvYWRlciB3aXRoIHNwZWNpZmljIHRhc2tJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkIHRvIHN0b3AuIElmIG5vdCBwcm92aWRlZCwgJ2JnLWRlZmF1bHQnIGlzIHVzZWQuXG4gICAqIEByZXR1cm5zIE9iamVjdFxuICAgKi9cbiAgc3RvcEJhY2tncm91bmQodGFza0lkOiBzdHJpbmcgPSBERUZBVUxUX0JHX1RBU0tfSUQpOiB2b2lkIHtcbiAgICB0aGlzLnN0b3BCYWNrZ3JvdW5kTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCwgdGFza0lkKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTdG9wIGFsbCB0aGUgYmFja2dyb3VuZCBhbmQgZm9yZWdyb3VuZCBsb2FkaW5ncyBvZiBsb2FkZXIgaGF2aW5nIGBsb2FkZXJJZGBcbiAgICogQHBhcmFtIGxvYWRlcklkIHRoZSBsb2FkZXIgSWRcbiAgICovXG4gIHN0b3BBbGxMb2FkZXIobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudGhyb3dFcnJvcklmTG9hZGVyTm90RXhpc3QobG9hZGVySWQpO1xuICAgIGlmICh0aGlzLmhhc1J1bm5pbmdUYXNrKEZPUkVHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgdGhpcy5mb3JlZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgdGhpcy5zaG93Rm9yZWdyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmhhc1J1bm5pbmdUYXNrKEJBQ0tHUk9VTkQsIGxvYWRlcklkKSkge1xuICAgICAgdGhpcy5iYWNrZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQpO1xuICAgICAgdGhpcy5zaG93QmFja2dyb3VuZC5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgfVxuICAgIHRoaXMuY2xlYXJBbGxUaW1lcnModGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrcyk7XG4gICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrcyA9IHt9O1xuICB9XG5cbiAgLyoqXG4gICAqIFN0b3AgYWxsIHRoZSBiYWNrZ3JvdW5kIGFuZCBmb3JlZ3JvdW5kIGxvYWRpbmdzIG9mIG1hc3RlciBsb2FkZXJcbiAgICovXG4gIHN0b3BBbGwoKTogdm9pZCB7XG4gICAgdGhpcy5zdG9wQWxsTG9hZGVyKHRoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZCk7XG4gIH1cblxuICAvKipcbiAgICogQ3JlYXRlIGxvYWRlciBkYXRhIGlmIGl0IGRvZXMgbm90IGV4aXN0XG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgY3JlYXRlTG9hZGVyRGF0YShsb2FkZXJJZDogc3RyaW5nLCBpc01hc3RlcjogYm9vbGVhbiwgaXNCb3VuZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICghdGhpcy5sb2FkZXJzW2xvYWRlcklkXSkge1xuICAgICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXSA9IHtcbiAgICAgICAgbG9hZGVySWQsXG4gICAgICAgIHRhc2tzOiB7fSxcbiAgICAgICAgaXNNYXN0ZXIsXG4gICAgICAgIGlzQm91bmRcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIHRoZSBsb2FkZXJJZCBkb2VzIG5vdCBleGlzdC5cbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKi9cbiAgcHJpdmF0ZSB0aHJvd0Vycm9ySWZMb2FkZXJOb3RFeGlzdChsb2FkZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmxvYWRlcnNbbG9hZGVySWRdKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtuZ3gtdWktbG9hZGVyXSAtIGxvYWRlcklkIFwiJHtsb2FkZXJJZH1cIiBkb2VzIG5vdCBleGlzdC5gKTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogVGhyb3cgZXJyb3IgaWYgdGhlIGxvYWRlcklkIGhhcyBhbHJlYWR5IGV4aXN0ZWQuXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgdGhyb3dFcnJvcklmTG9hZGVyRXhpc3RzKGxvYWRlcklkOiBzdHJpbmcsIHVzZUlzQm91bmRQcm9wPzogYm9vbGVhbik6IHZvaWQge1xuICAgIGlmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdICYmICh0aGlzLmxvYWRlcnNbbG9hZGVySWRdLmlzQm91bmQgJiYgdXNlSXNCb3VuZFByb3ApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYFtuZ3gtdWktbG9hZGVyXSAtIGxvYWRlcklkIFwiJHtsb2FkZXJJZH1cIiBpcyBkdXBsaWNhdGVkLmApO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBUaHJvdyBlcnJvciBpZiB0aGUgbWFzdGVyIGxvYWRlciBoYXMgYWxyZWFkeSBleGlzdGVkLlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHRocm93RXJyb3JJZk1hc3RlckxvYWRlckV4aXN0cyh1c2VJc0JvdW5kUHJvcD86IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBpZiAodGhpcy5sb2FkZXJzW3RoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZF0gJiYgKHRoaXMubG9hZGVyc1t0aGlzLmRlZmF1bHRDb25maWcubWFzdGVyTG9hZGVySWRdLmlzQm91bmQgJiYgdXNlSXNCb3VuZFByb3ApKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBbbmd4LXVpLWxvYWRlcl0gLSBUaGUgbWFzdGVyIGxvYWRlciBoYXMgYWxyZWFkeSBleGlzdGVkLiBgICtcbiAgICAgICAgICBgVGhlIGFwcCBzaG91bGQgaGF2ZSBvbmx5IG9uZSBtYXN0ZXIgbG9hZGVyIGFuZCBpdCBzaG91bGQgYmUgcGxhY2VkIGluIHRoZSByb290IGFwcCB0ZW1wbGF0ZWBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIFRocm93IGVycm9yIGlmIHRoZSBtYXN0ZXIgbG9hZGVyIGRvZXMgbm90IGV4aXN0LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHRocm93RXJyb3JJZk1hc3RlckxvYWRlck5vdEV4aXN0KCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5sb2FkZXJzW3RoaXMuZGVmYXVsdENvbmZpZy5tYXN0ZXJMb2FkZXJJZF0pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgW25neC11aS1sb2FkZXJdIC0gVGhlIG1hc3RlciBsb2FkZXIgZG9lcyBub3QgZXhpc3QuYCk7XG4gICAgfVxuICB9XG5cbiAgLyoqXG4gICAqIE1hbmFnZSB0byBjbG9zZSBmb3JlZ3JvdW5kIGxvYWRpbmdcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBpZFxuICAgKi9cbiAgcHJpdmF0ZSBmb3JlZ3JvdW5kQ2xvc2VvdXQobG9hZGVySWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZmdDbG9zaW5nLm5leHQoeyBsb2FkZXJJZCwgaXNTaG93OiB0cnVlIH0pO1xuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5mZ0Nsb3NpbmcubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IGZhbHNlIH0pO1xuICAgIH0sIENMT1NJTkdfVElNRSk7XG4gIH1cblxuICAvKipcbiAgICogTWFuYWdlIHRvIGNsb3NlIGJhY2tncm91bmQgbG9hZGluZ1xuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqIEBwYXJhbSBsb2FkZXJJZCB0aGUgbG9hZGVyIGlkXG4gICAqL1xuICBwcml2YXRlIGJhY2tncm91bmRDbG9zZW91dChsb2FkZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5iZ0Nsb3NpbmcubmV4dCh7IGxvYWRlcklkLCBpc1Nob3c6IHRydWUgfSk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLmJnQ2xvc2luZy5uZXh0KHsgbG9hZGVySWQsIGlzU2hvdzogZmFsc2UgfSk7XG4gICAgfSwgQ0xPU0lOR19USU1FKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgdGltZXJzIG9mIHRoZSBnaXZlbiB0YXNrXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgY2xlYXJUaW1lcnModGFzazogVGFzayk6IHZvaWQge1xuICAgIGlmICh0YXNrLmRlbGF5VGltZXIpIHtcbiAgICAgIGNsZWFyVGltZW91dCh0YXNrLmRlbGF5VGltZXIpO1xuICAgIH1cbiAgICBpZiAodGFzay5tYXhUaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRhc2subWF4VGltZXIpO1xuICAgIH1cbiAgICBpZiAodGFzay5taW5UaW1lcikge1xuICAgICAgY2xlYXJUaW1lb3V0KHRhc2subWluVGltZXIpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBDbGVhciBhbGwgdGltZXJzIG9mIHRoZSBnaXZlbiB0YXNrc1xuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIGNsZWFyQWxsVGltZXJzKHRhc2tzOiBUYXNrcyk6IHZvaWQge1xuICAgIE9iamVjdC5rZXlzKHRhc2tzKS5tYXAoaWQgPT4ge1xuICAgICAgdGhpcy5jbGVhclRpbWVycyh0YXNrc1tpZF0pO1xuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIENoZWNrIHdoZXRoZXIgdGhlIHNwZWNpZmllZCBsb2FkZXIgaGFzIGEgcnVubmluZyB0YXNrIHdpdGggdGhlIGdpdmVuIGB0YXNrSWRgLlxuICAgKiBJZiBubyBgdGFza0lkYCBzcGVjaWZpZWQsIGl0IHdpbGwgY2hlY2sgd2hldGhlciB0aGUgbG9hZGVyIGhhcyBhbnkgcnVubmluZyB0YXNrcy5cbiAgICogRm9yIGludGVybmFsIHVzZSBvbmx5LlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqIEBwYXJhbSBpc0ZvcmVncm91bmQgZm9yZWdyb3VuZCB0YXNrIG9yIGJhY2tncm91bmQgdGFza1xuICAgKiBAcGFyYW0gbG9hZGVySWQgdGhlIGxvYWRlciBJZFxuICAgKiBAcGFyYW0gdGFza0lkIHRoZSBvcHRpb25hbCB0YXNrIElkXG4gICAqIEByZXR1cm5zIGJvb2xlYW5cbiAgICovXG4gIGhhc1J1bm5pbmdUYXNrKGlzRm9yZWdyb3VuZDogYm9vbGVhbiwgbG9hZGVySWQ6IHN0cmluZywgdGFza0lkPzogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0pIHtcbiAgICAgIGNvbnN0IHRhc2tzOiBUYXNrcyA9IHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3M7XG4gICAgICBpZiAodGFza0lkKSB7XG4gICAgICAgIHJldHVybiB0YXNrc1t0YXNrSWRdID8gKHRhc2tzW3Rhc2tJZF0uc3RhcnRBdCA/IHRydWUgOiBmYWxzZSkgOiBmYWxzZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyh0YXNrcykuc29tZShpZCA9PiAhIXRhc2tzW2lkXS5zdGFydEF0ICYmIHRhc2tzW2lkXS5pc0ZvcmVncm91bmQgPT09IGlzRm9yZWdyb3VuZCk7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBAZG9jcy1wcml2YXRlXG4gICAqL1xuICBwcml2YXRlIHJlYWR5VG9TdGFydChsb2FkZXJJZDogc3RyaW5nLCB0YXNrSWQ6IHN0cmluZywgaXNGb3JlZ3JvdW5kOiBib29sZWFuLCB0aW1lOiBUaW1lID0gREVGQVVMVF9USU1FKTogYm9vbGVhbiB7XG4gICAgdGhpcy5jcmVhdGVMb2FkZXJEYXRhKGxvYWRlcklkLCB1bmRlZmluZWQsIGZhbHNlKTtcbiAgICBjb25zdCBpc090aGVyUnVubmluZyA9IHRoaXMuaGFzUnVubmluZ1Rhc2soaXNGb3JlZ3JvdW5kLCBsb2FkZXJJZCk7XG4gICAgaWYgKCF0aGlzLmxvYWRlcnNbbG9hZGVySWRdLnRhc2tzW3Rhc2tJZF0pIHtcbiAgICAgIHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXSA9IHtcbiAgICAgICAgdGFza0lkLFxuICAgICAgICBpc0ZvcmVncm91bmQsXG4gICAgICAgIG1pblRpbWU6IHRpbWUubWluVGltZSA+PSBNSU5fVElNRSA/IHRpbWUubWluVGltZSA6IHRoaXMuZGVmYXVsdENvbmZpZy5taW5UaW1lLFxuICAgICAgICBtYXhUaW1lOiB0aW1lLm1heFRpbWUgPyB0aW1lLm1heFRpbWUgOiB0aGlzLmRlZmF1bHRDb25maWcubWF4VGltZSxcbiAgICAgICAgZGVsYXk6IHRpbWUuZGVsYXkgPj0gTUlOX0RFTEFZID8gdGltZS5kZWxheSA6IHRoaXMuZGVmYXVsdENvbmZpZy5kZWxheVxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXS5pc0ZvcmVncm91bmQgIT09IGlzRm9yZWdyb3VuZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFtuZ3gtdWktbG9hZGVyXSAtIHRhc2tJZCBcIiR7dGFza0lkfVwiIGlzIGR1cGxpY2F0ZWQuYCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnNldERlbGF5VGltZXIodGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdLCBsb2FkZXJJZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdID0ge1xuICAgICAgLi4udGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdLFxuICAgICAgaXNPdGhlclJ1bm5pbmcsXG4gICAgICBzdGFydEF0OiBEYXRlLm5vdygpXG4gICAgfTtcbiAgICB0aGlzLnNldE1heFRpbWVyKHRoaXMubG9hZGVyc1tsb2FkZXJJZF0udGFza3NbdGFza0lkXSwgbG9hZGVySWQpO1xuICAgIGlmICghdGhpcy5sb2FkZXJzW2xvYWRlcklkXS5pc0JvdW5kKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICovXG4gIHByaXZhdGUgcmVhZHlUb1N0b3AobG9hZGVySWQ6IHN0cmluZywgdGFza0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICB0aGlzLnRocm93RXJyb3JJZkxvYWRlck5vdEV4aXN0KGxvYWRlcklkKTtcbiAgICBjb25zdCB0YXNrOiBUYXNrID0gdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdO1xuICAgIGlmICghdGFzaykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGFzay5pc0RlbGF5ZWQpIHtcbiAgICAgIHRoaXMuY2xlYXJUaW1lcnModGFzayk7XG4gICAgICBkZWxldGUgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zZXRNaW5UaW1lcih0YXNrLCBsb2FkZXJJZCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgdGhpcy5jbGVhclRpbWVycyh0YXNrKTtcbiAgICBkZWxldGUgdGhpcy5sb2FkZXJzW2xvYWRlcklkXS50YXNrc1t0YXNrSWRdO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLyoqXG4gICAqIFNldCBkZWxheSB0aW1lciwgaWYgYGRlbGF5YCA+IDBcbiAgICogQGRvY3MtcHJpdmF0ZVxuICAgKiBAcmV0dXJucyBib29sZWFuXG4gICAqL1xuICBwcml2YXRlIHNldERlbGF5VGltZXIodGFzazogVGFzaywgbG9hZGVySWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICh0YXNrLmRlbGF5ID4gTUlOX0RFTEFZKSB7XG4gICAgICBpZiAodGFzay5pc0RlbGF5ZWQpIHtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgICBpZiAoIXRhc2suZGVsYXlUaW1lcikge1xuICAgICAgICB0YXNrLmlzRGVsYXllZCA9IHRydWU7XG4gICAgICAgIHRhc2suZGVsYXlUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRhc2suaXNEZWxheWVkID0gZmFsc2U7XG4gICAgICAgICAgaWYgKHRhc2suaXNGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgICB0aGlzLnN0YXJ0TG9hZGVyKGxvYWRlcklkLCB0YXNrLnRhc2tJZCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHRoaXMuc3RhcnRCYWNrZ3JvdW5kTG9hZGVyKGxvYWRlcklkLCB0YXNrLnRhc2tJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0YXNrLmRlbGF5KTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbWF4VGltZXIgaWYgYG1heFRpbWVgID4gYG1pblRpbWVgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRNYXhUaW1lcih0YXNrOiBUYXNrLCBsb2FkZXJJZDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKHRhc2subWF4VGltZSA+IHRhc2subWluVGltZSkge1xuICAgICAgLy8gcmVzdGFydCB0aGUgdGFzaywgcmVzZXQgbWF4VGltZXJcbiAgICAgIGlmICh0YXNrLm1heFRpbWVyKSB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0YXNrLm1heFRpbWVyKTtcbiAgICAgIH1cbiAgICAgIHRhc2subWF4VGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgaWYgKHRhc2suaXNGb3JlZ3JvdW5kKSB7XG4gICAgICAgICAgdGhpcy5zdG9wTG9hZGVyKGxvYWRlcklkLCB0YXNrLnRhc2tJZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5zdG9wQmFja2dyb3VuZExvYWRlcihsb2FkZXJJZCwgdGFzay50YXNrSWQpO1xuICAgICAgICB9XG4gICAgICB9LCB0YXNrLm1heFRpbWUpO1xuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBTZXQgbWluVGltZXIgaWYgYHN0YXJ0QXRgICsgYG1pblRpbWVgID4gYERhdGUubm93KClgXG4gICAqIEBkb2NzLXByaXZhdGVcbiAgICogQHJldHVybnMgYm9vbGVhblxuICAgKi9cbiAgcHJpdmF0ZSBzZXRNaW5UaW1lcih0YXNrOiBUYXNrLCBsb2FkZXJJZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBpZiAodGFzay5zdGFydEF0KSB7XG4gICAgICBpZiAodGFzay5zdGFydEF0ICsgdGFzay5taW5UaW1lID4gbm93KSB7XG4gICAgICAgIHRhc2subWluVGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICBpZiAodGFzay5pc0ZvcmVncm91bmQpIHtcbiAgICAgICAgICAgIHRoaXMuc3RvcExvYWRlcihsb2FkZXJJZCwgdGFzay50YXNrSWQpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB0aGlzLnN0b3BCYWNrZ3JvdW5kTG9hZGVyKGxvYWRlcklkLCB0YXNrLnRhc2tJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9LCB0YXNrLnN0YXJ0QXQgKyB0YXNrLm1pblRpbWUgLSBub3cpO1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG4iXX0=