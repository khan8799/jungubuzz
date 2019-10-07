/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { POSITION, PB_DIRECTION, SPINNER } from './enums';
/**
 * The default value of foreground task id
 * @type {?}
 */
export var DEFAULT_FG_TASK_ID = 'fg-default';
/**
 * The default value of background task id
 * @type {?}
 */
export var DEFAULT_BG_TASK_ID = 'bg-default';
/**
 * The default value of loader id
 * @type {?}
 */
export var DEFAULT_MASTER_LOADER_ID = 'master';
/** @type {?} */
export var DEFAULT_TIME = {};
/** @type {?} */
export var MIN_DELAY = 0;
/** @type {?} */
export var MIN_TIME = 300;
/** @type {?} */
export var CLOSING_TIME = 1001;
/** @type {?} */
export var BACKGROUND = false;
/** @type {?} */
export var FOREGROUND = true;
/** @type {?} */
export var WAITING_FOR_OVERLAY_DISAPPEAR = 500;
/**
 * Http loader taskId
 * @type {?}
 */
export var HTTP_LOADER_TASK_ID = '$_http-loader';
/**
 * Router loader taskId
 * @type {?}
 */
export var ROUTER_LOADER_TASK_ID = '$_router_loader';
/**
 * The configuration of spinners
 * @type {?}
 */
export var SPINNER_CONFIG = {
    'ball-scale-multiple': {
        divs: 3,
        class: 'sk-ball-scale-multiple'
    },
    'ball-spin': {
        divs: 8,
        class: 'sk-ball-spin'
    },
    'ball-spin-clockwise': {
        divs: 8,
        class: 'sk-ball-spin-clockwise'
    },
    'ball-spin-clockwise-fade-rotating': {
        divs: 8,
        class: 'sk-ball-spin-clockwise-fade-rotating'
    },
    'ball-spin-fade-rotating': {
        divs: 8,
        class: 'sk-ball-spin-fade-rotating'
    },
    'chasing-dots': {
        divs: 2,
        class: 'sk-chasing-dots'
    },
    circle: {
        divs: 12,
        class: 'sk-circle'
    },
    'cube-grid': {
        divs: 9,
        class: 'sk-cube-grid'
    },
    'double-bounce': {
        divs: 2,
        class: 'sk-double-bounce'
    },
    'fading-circle': {
        divs: 12,
        class: 'sk-fading-circle'
    },
    'folding-cube': {
        divs: 4,
        class: 'sk-folding-cube'
    },
    pulse: {
        divs: 1,
        class: 'sk-pulse'
    },
    'rectangle-bounce': {
        divs: 5,
        class: 'sk-rectangle-bounce'
    },
    'rectangle-bounce-party': {
        divs: 5,
        class: 'sk-rectangle-bounce-party'
    },
    'rectangle-bounce-pulse-out': {
        divs: 5,
        class: 'sk-rectangle-bounce-pulse-out'
    },
    'rectangle-bounce-pulse-out-rapid': {
        divs: 5,
        class: 'sk-rectangle-bounce-pulse-out-rapid'
    },
    'rotating-plane': {
        divs: 1,
        class: 'sk-rotating-plane'
    },
    'square-jelly-box': {
        divs: 2,
        class: 'sk-square-jelly-box'
    },
    'square-loader': {
        divs: 1,
        class: 'sk-square-loader'
    },
    'three-bounce': {
        divs: 3,
        class: 'sk-three-bounce'
    },
    'three-strings': {
        divs: 3,
        class: 'sk-three-strings'
    },
    'wandering-cubes': {
        divs: 2,
        class: 'sk-wandering-cubes'
    }
};
/**
 * The default configuration of ngx-ui-loader
 * @type {?}
 */
export var DEFAULT_CONFIG = {
    bgsColor: '#00ACC1',
    bgsOpacity: 0.5,
    bgsPosition: POSITION.bottomRight,
    bgsSize: 60,
    bgsType: SPINNER.ballSpinClockwise,
    blur: 5,
    delay: 0,
    fgsColor: '#00ACC1',
    fgsPosition: POSITION.centerCenter,
    fgsSize: 60,
    fgsType: SPINNER.ballSpinClockwise,
    gap: 24,
    logoPosition: POSITION.centerCenter,
    logoSize: 120,
    logoUrl: '',
    masterLoaderId: DEFAULT_MASTER_LOADER_ID,
    overlayBorderRadius: '0',
    overlayColor: 'rgba(40, 40, 40, 0.8)',
    pbColor: '#00ACC1',
    pbDirection: PB_DIRECTION.leftToRight,
    pbThickness: 3,
    hasProgressBar: true,
    text: '',
    textColor: '#FFFFFF',
    textPosition: POSITION.centerCenter,
    maxTime: -1,
    minTime: 500
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uc3RhbnRzLmpzIiwic291cmNlUm9vdCI6Im5nOi8vbmd4LXVpLWxvYWRlci8iLCJzb3VyY2VzIjpbImxpYi91dGlscy9jb25zdGFudHMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUNBLE9BQU8sRUFBRSxRQUFRLEVBQUUsWUFBWSxFQUFFLE9BQU8sRUFBRSxNQUFNLFNBQVMsQ0FBQzs7Ozs7QUFLMUQsTUFBTSxLQUFPLGtCQUFrQixHQUFHLFlBQVk7Ozs7O0FBSzlDLE1BQU0sS0FBTyxrQkFBa0IsR0FBRyxZQUFZOzs7OztBQUs5QyxNQUFNLEtBQU8sd0JBQXdCLEdBQUcsUUFBUTs7QUFFaEQsTUFBTSxLQUFPLFlBQVksR0FBUyxFQUFFOztBQUVwQyxNQUFNLEtBQU8sU0FBUyxHQUFHLENBQUM7O0FBRTFCLE1BQU0sS0FBTyxRQUFRLEdBQUcsR0FBRzs7QUFFM0IsTUFBTSxLQUFPLFlBQVksR0FBRyxJQUFJOztBQUVoQyxNQUFNLEtBQU8sVUFBVSxHQUFHLEtBQUs7O0FBRS9CLE1BQU0sS0FBTyxVQUFVLEdBQUcsSUFBSTs7QUFFOUIsTUFBTSxLQUFPLDZCQUE2QixHQUFHLEdBQUc7Ozs7O0FBS2hELE1BQU0sS0FBTyxtQkFBbUIsR0FBRyxlQUFlOzs7OztBQUtsRCxNQUFNLEtBQU8scUJBQXFCLEdBQUcsaUJBQWlCOzs7OztBQUt0RCxNQUFNLEtBQU8sY0FBYyxHQUFHO0lBQzVCLHFCQUFxQixFQUFFO1FBQ3JCLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLHdCQUF3QjtLQUNoQztJQUNELFdBQVcsRUFBRTtRQUNYLElBQUksRUFBRSxDQUFDO1FBQ1AsS0FBSyxFQUFFLGNBQWM7S0FDdEI7SUFDRCxxQkFBcUIsRUFBRTtRQUNyQixJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSx3QkFBd0I7S0FDaEM7SUFDRCxtQ0FBbUMsRUFBRTtRQUNuQyxJQUFJLEVBQUUsQ0FBQztRQUNQLEtBQUssRUFBRSxzQ0FBc0M7S0FDOUM7SUFD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Q0FBQztJQUNYLE9BQU8sRUFBRSxHQUFHO0NBQ2IiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBOZ3hVaUxvYWRlckNvbmZpZywgVGltZSB9IGZyb20gJy4uL3V0aWxzL2ludGVyZmFjZXMnO1xuaW1wb3J0IHsgUE9TSVRJT04sIFBCX0RJUkVDVElPTiwgU1BJTk5FUiB9IGZyb20gJy4vZW51bXMnO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIGZvcmVncm91bmQgdGFzayBpZFxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9GR19UQVNLX0lEID0gJ2ZnLWRlZmF1bHQnO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIGJhY2tncm91bmQgdGFzayBpZFxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9CR19UQVNLX0lEID0gJ2JnLWRlZmF1bHQnO1xuXG4vKipcbiAqIFRoZSBkZWZhdWx0IHZhbHVlIG9mIGxvYWRlciBpZFxuICovXG5leHBvcnQgY29uc3QgREVGQVVMVF9NQVNURVJfTE9BREVSX0lEID0gJ21hc3Rlcic7XG5cbmV4cG9ydCBjb25zdCBERUZBVUxUX1RJTUU6IFRpbWUgPSB7fTtcblxuZXhwb3J0IGNvbnN0IE1JTl9ERUxBWSA9IDA7XG5cbmV4cG9ydCBjb25zdCBNSU5fVElNRSA9IDMwMDtcblxuZXhwb3J0IGNvbnN0IENMT1NJTkdfVElNRSA9IDEwMDE7XG5cbmV4cG9ydCBjb25zdCBCQUNLR1JPVU5EID0gZmFsc2U7XG5cbmV4cG9ydCBjb25zdCBGT1JFR1JPVU5EID0gdHJ1ZTtcblxuZXhwb3J0IGNvbnN0IFdBSVRJTkdfRk9SX09WRVJMQVlfRElTQVBQRUFSID0gNTAwO1xuXG4vKipcbiAqIEh0dHAgbG9hZGVyIHRhc2tJZFxuICovXG5leHBvcnQgY29uc3QgSFRUUF9MT0FERVJfVEFTS19JRCA9ICckX2h0dHAtbG9hZGVyJztcblxuLyoqXG4gKiBSb3V0ZXIgbG9hZGVyIHRhc2tJZFxuICovXG5leHBvcnQgY29uc3QgUk9VVEVSX0xPQURFUl9UQVNLX0lEID0gJyRfcm91dGVyX2xvYWRlcic7XG5cbi8qKlxuICogVGhlIGNvbmZpZ3VyYXRpb24gb2Ygc3Bpbm5lcnNcbiAqL1xuZXhwb3J0IGNvbnN0IFNQSU5ORVJfQ09ORklHID0ge1xuICAnYmFsbC1zY2FsZS1tdWx0aXBsZSc6IHtcbiAgICBkaXZzOiAzLFxuICAgIGNsYXNzOiAnc2stYmFsbC1zY2FsZS1tdWx0aXBsZSdcbiAgfSxcbiAgJ2JhbGwtc3Bpbic6IHtcbiAgICBkaXZzOiA4LFxuICAgIGNsYXNzOiAnc2stYmFsbC1zcGluJ1xuICB9LFxuICAnYmFsbC1zcGluLWNsb2Nrd2lzZSc6IHtcbiAgICBkaXZzOiA4LFxuICAgIGNsYXNzOiAnc2stYmFsbC1zcGluLWNsb2Nrd2lzZSdcbiAgfSxcbiAgJ2JhbGwtc3Bpbi1jbG9ja3dpc2UtZmFkZS1yb3RhdGluZyc6IHtcbiAgICBkaXZzOiA4LFxuICAgIGNsYXNzOiAnc2stYmFsbC1zcGluLWNsb2Nrd2lzZS1mYWRlLXJvdGF0aW5nJ1xuICB9LFxuICAnYmFsbC1zcGluLWZhZGUtcm90YXRpbmcnOiB7XG4gICAgZGl2czogOCxcbiAgICBjbGFzczogJ3NrLWJhbGwtc3Bpbi1mYWRlLXJvdGF0aW5nJ1xuICB9LFxuICAnY2hhc2luZy1kb3RzJzoge1xuICAgIGRpdnM6IDIsXG4gICAgY2xhc3M6ICdzay1jaGFzaW5nLWRvdHMnXG4gIH0sXG4gIGNpcmNsZToge1xuICAgIGRpdnM6IDEyLFxuICAgIGNsYXNzOiAnc2stY2lyY2xlJ1xuICB9LFxuICAnY3ViZS1ncmlkJzoge1xuICAgIGRpdnM6IDksXG4gICAgY2xhc3M6ICdzay1jdWJlLWdyaWQnXG4gIH0sXG4gICdkb3VibGUtYm91bmNlJzoge1xuICAgIGRpdnM6IDIsXG4gICAgY2xhc3M6ICdzay1kb3VibGUtYm91bmNlJ1xuICB9LFxuICAnZmFkaW5nLWNpcmNsZSc6IHtcbiAgICBkaXZzOiAxMixcbiAgICBjbGFzczogJ3NrLWZhZGluZy1jaXJjbGUnXG4gIH0sXG4gICdmb2xkaW5nLWN1YmUnOiB7XG4gICAgZGl2czogNCxcbiAgICBjbGFzczogJ3NrLWZvbGRpbmctY3ViZSdcbiAgfSxcbiAgcHVsc2U6IHtcbiAgICBkaXZzOiAxLFxuICAgIGNsYXNzOiAnc2stcHVsc2UnXG4gIH0sXG4gICdyZWN0YW5nbGUtYm91bmNlJzoge1xuICAgIGRpdnM6IDUsXG4gICAgY2xhc3M6ICdzay1yZWN0YW5nbGUtYm91bmNlJ1xuICB9LFxuICAncmVjdGFuZ2xlLWJvdW5jZS1wYXJ0eSc6IHtcbiAgICBkaXZzOiA1LFxuICAgIGNsYXNzOiAnc2stcmVjdGFuZ2xlLWJvdW5jZS1wYXJ0eSdcbiAgfSxcbiAgJ3JlY3RhbmdsZS1ib3VuY2UtcHVsc2Utb3V0Jzoge1xuICAgIGRpdnM6IDUsXG4gICAgY2xhc3M6ICdzay1yZWN0YW5nbGUtYm91bmNlLXB1bHNlLW91dCdcbiAgfSxcbiAgJ3JlY3RhbmdsZS1ib3VuY2UtcHVsc2Utb3V0LXJhcGlkJzoge1xuICAgIGRpdnM6IDUsXG4gICAgY2xhc3M6ICdzay1yZWN0YW5nbGUtYm91bmNlLXB1bHNlLW91dC1yYXBpZCdcbiAgfSxcbiAgJ3JvdGF0aW5nLXBsYW5lJzoge1xuICAgIGRpdnM6IDEsXG4gICAgY2xhc3M6ICdzay1yb3RhdGluZy1wbGFuZSdcbiAgfSxcbiAgJ3NxdWFyZS1qZWxseS1ib3gnOiB7XG4gICAgZGl2czogMixcbiAgICBjbGFzczogJ3NrLXNxdWFyZS1qZWxseS1ib3gnXG4gIH0sXG4gICdzcXVhcmUtbG9hZGVyJzoge1xuICAgIGRpdnM6IDEsXG4gICAgY2xhc3M6ICdzay1zcXVhcmUtbG9hZGVyJ1xuICB9LFxuICAndGhyZWUtYm91bmNlJzoge1xuICAgIGRpdnM6IDMsXG4gICAgY2xhc3M6ICdzay10aHJlZS1ib3VuY2UnXG4gIH0sXG4gICd0aHJlZS1zdHJpbmdzJzoge1xuICAgIGRpdnM6IDMsXG4gICAgY2xhc3M6ICdzay10aHJlZS1zdHJpbmdzJ1xuICB9LFxuICAnd2FuZGVyaW5nLWN1YmVzJzoge1xuICAgIGRpdnM6IDIsXG4gICAgY2xhc3M6ICdzay13YW5kZXJpbmctY3ViZXMnXG4gIH1cbn07XG5cbi8qKlxuICogVGhlIGRlZmF1bHQgY29uZmlndXJhdGlvbiBvZiBuZ3gtdWktbG9hZGVyXG4gKi9cbmV4cG9ydCBjb25zdCBERUZBVUxUX0NPTkZJRzogTmd4VWlMb2FkZXJDb25maWcgPSB7XG4gIGJnc0NvbG9yOiAnIzAwQUNDMScsXG4gIGJnc09wYWNpdHk6IDAuNSxcbiAgYmdzUG9zaXRpb246IFBPU0lUSU9OLmJvdHRvbVJpZ2h0LFxuICBiZ3NTaXplOiA2MCxcbiAgYmdzVHlwZTogU1BJTk5FUi5iYWxsU3BpbkNsb2Nrd2lzZSxcbiAgYmx1cjogNSxcbiAgZGVsYXk6IDAsXG4gIGZnc0NvbG9yOiAnIzAwQUNDMScsXG4gIGZnc1Bvc2l0aW9uOiBQT1NJVElPTi5jZW50ZXJDZW50ZXIsXG4gIGZnc1NpemU6IDYwLFxuICBmZ3NUeXBlOiBTUElOTkVSLmJhbGxTcGluQ2xvY2t3aXNlLFxuICBnYXA6IDI0LFxuICBsb2dvUG9zaXRpb246IFBPU0lUSU9OLmNlbnRlckNlbnRlcixcbiAgbG9nb1NpemU6IDEyMCxcbiAgbG9nb1VybDogJycsXG4gIG1hc3RlckxvYWRlcklkOiBERUZBVUxUX01BU1RFUl9MT0FERVJfSUQsXG4gIG92ZXJsYXlCb3JkZXJSYWRpdXM6ICcwJyxcbiAgb3ZlcmxheUNvbG9yOiAncmdiYSg0MCwgNDAsIDQwLCAwLjgpJyxcbiAgcGJDb2xvcjogJyMwMEFDQzEnLFxuICBwYkRpcmVjdGlvbjogUEJfRElSRUNUSU9OLmxlZnRUb1JpZ2h0LFxuICBwYlRoaWNrbmVzczogMyxcbiAgaGFzUHJvZ3Jlc3NCYXI6IHRydWUsXG4gIHRleHQ6ICcnLFxuICB0ZXh0Q29sb3I6ICcjRkZGRkZGJyxcbiAgdGV4dFBvc2l0aW9uOiBQT1NJVElPTi5jZW50ZXJDZW50ZXIsXG4gIG1heFRpbWU6IC0xLFxuICBtaW5UaW1lOiA1MDBcbn07XG4iXX0=