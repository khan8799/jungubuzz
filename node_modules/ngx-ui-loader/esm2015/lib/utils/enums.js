/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
const SPINNER = {
    ballScaleMultiple: 'ball-scale-multiple',
    ballSpin: 'ball-spin',
    ballSpinClockwise: 'ball-spin-clockwise',
    ballSpinClockwiseFadeRotating: 'ball-spin-clockwise-fade-rotating',
    ballSpinFadeRotating: 'ball-spin-fade-rotating',
    chasingDots: 'chasing-dots',
    circle: 'circle',
    cubeGrid: 'cube-grid',
    doubleBounce: 'double-bounce',
    fadingCircle: 'fading-circle',
    foldingCube: 'folding-cube',
    pulse: 'pulse',
    rectangleBounce: 'rectangle-bounce',
    rectangleBounceParty: 'rectangle-bounce-party',
    rectangleBouncePulseOut: 'rectangle-bounce-pulse-out',
    rectangleBouncePulseOutRapid: 'rectangle-bounce-pulse-out-rapid',
    rotatingPlane: 'rotating-plane',
    squareJellyBox: 'square-jelly-box',
    squareLoader: 'square-loader',
    threeBounce: 'three-bounce',
    threeStrings: 'three-strings',
    wanderingCubes: 'wandering-cubes',
};
export { SPINNER };
/** @enum {string} */
const POSITION = {
    bottomCenter: 'bottom-center',
    bottomLeft: 'bottom-left',
    bottomRight: 'bottom-right',
    centerCenter: 'center-center',
    centerLeft: 'center-left',
    centerRight: 'center-right',
    topCenter: 'top-center',
    topLeft: 'top-left',
    topRight: 'top-right',
};
export { POSITION };
/** @enum {string} */
const PB_DIRECTION = {
    leftToRight: 'ltr',
    rightToLeft: 'rtl',
};
export { PB_DIRECTION };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW51bXMuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9uZ3gtdWktbG9hZGVyLyIsInNvdXJjZXMiOlsibGliL3V0aWxzL2VudW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztJQUlFLG1CQUFvQixxQkFBcUI7SUFDekMsVUFBVyxXQUFXO0lBQ3RCLG1CQUFvQixxQkFBcUI7SUFDekMsK0JBQWdDLG1DQUFtQztJQUNuRSxzQkFBdUIseUJBQXlCO0lBQ2hELGFBQWMsY0FBYztJQUM1QixRQUFTLFFBQVE7SUFDakIsVUFBVyxXQUFXO0lBQ3RCLGNBQWUsZUFBZTtJQUM5QixjQUFlLGVBQWU7SUFDOUIsYUFBYyxjQUFjO0lBQzVCLE9BQVEsT0FBTztJQUNmLGlCQUFrQixrQkFBa0I7SUFDcEMsc0JBQXVCLHdCQUF3QjtJQUMvQyx5QkFBMEIsNEJBQTRCO0lBQ3RELDhCQUErQixrQ0FBa0M7SUFDakUsZUFBZ0IsZ0JBQWdCO0lBQ2hDLGdCQUFpQixrQkFBa0I7SUFDbkMsY0FBZSxlQUFlO0lBQzlCLGFBQWMsY0FBYztJQUM1QixjQUFlLGVBQWU7SUFDOUIsZ0JBQWlCLGlCQUFpQjs7Ozs7SUFPbEMsY0FBZSxlQUFlO0lBQzlCLFlBQWEsYUFBYTtJQUMxQixhQUFjLGNBQWM7SUFDNUIsY0FBZSxlQUFlO0lBQzlCLFlBQWEsYUFBYTtJQUMxQixhQUFjLGNBQWM7SUFDNUIsV0FBWSxZQUFZO0lBQ3hCLFNBQVUsVUFBVTtJQUNwQixVQUFXLFdBQVc7Ozs7O0lBT3RCLGFBQWMsS0FBSztJQUNuQixhQUFjLEtBQUsiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEF2YWlsYWJsZSBzcGlubmVyIHR5cGVzXG4gKi9cbmV4cG9ydCBlbnVtIFNQSU5ORVIge1xuICBiYWxsU2NhbGVNdWx0aXBsZSA9ICdiYWxsLXNjYWxlLW11bHRpcGxlJyxcbiAgYmFsbFNwaW4gPSAnYmFsbC1zcGluJyxcbiAgYmFsbFNwaW5DbG9ja3dpc2UgPSAnYmFsbC1zcGluLWNsb2Nrd2lzZScsXG4gIGJhbGxTcGluQ2xvY2t3aXNlRmFkZVJvdGF0aW5nID0gJ2JhbGwtc3Bpbi1jbG9ja3dpc2UtZmFkZS1yb3RhdGluZycsXG4gIGJhbGxTcGluRmFkZVJvdGF0aW5nID0gJ2JhbGwtc3Bpbi1mYWRlLXJvdGF0aW5nJyxcbiAgY2hhc2luZ0RvdHMgPSAnY2hhc2luZy1kb3RzJyxcbiAgY2lyY2xlID0gJ2NpcmNsZScsXG4gIGN1YmVHcmlkID0gJ2N1YmUtZ3JpZCcsXG4gIGRvdWJsZUJvdW5jZSA9ICdkb3VibGUtYm91bmNlJyxcbiAgZmFkaW5nQ2lyY2xlID0gJ2ZhZGluZy1jaXJjbGUnLFxuICBmb2xkaW5nQ3ViZSA9ICdmb2xkaW5nLWN1YmUnLFxuICBwdWxzZSA9ICdwdWxzZScsXG4gIHJlY3RhbmdsZUJvdW5jZSA9ICdyZWN0YW5nbGUtYm91bmNlJyxcbiAgcmVjdGFuZ2xlQm91bmNlUGFydHkgPSAncmVjdGFuZ2xlLWJvdW5jZS1wYXJ0eScsXG4gIHJlY3RhbmdsZUJvdW5jZVB1bHNlT3V0ID0gJ3JlY3RhbmdsZS1ib3VuY2UtcHVsc2Utb3V0JyxcbiAgcmVjdGFuZ2xlQm91bmNlUHVsc2VPdXRSYXBpZCA9ICdyZWN0YW5nbGUtYm91bmNlLXB1bHNlLW91dC1yYXBpZCcsXG4gIHJvdGF0aW5nUGxhbmUgPSAncm90YXRpbmctcGxhbmUnLFxuICBzcXVhcmVKZWxseUJveCA9ICdzcXVhcmUtamVsbHktYm94JyxcbiAgc3F1YXJlTG9hZGVyID0gJ3NxdWFyZS1sb2FkZXInLFxuICB0aHJlZUJvdW5jZSA9ICd0aHJlZS1ib3VuY2UnLFxuICB0aHJlZVN0cmluZ3MgPSAndGhyZWUtc3RyaW5ncycsXG4gIHdhbmRlcmluZ0N1YmVzID0gJ3dhbmRlcmluZy1jdWJlcydcbn1cblxuLyoqXG4gKiBBdmFpbGFibGUgcG9zdGlvbnNcbiAqL1xuZXhwb3J0IGVudW0gUE9TSVRJT04ge1xuICBib3R0b21DZW50ZXIgPSAnYm90dG9tLWNlbnRlcicsXG4gIGJvdHRvbUxlZnQgPSAnYm90dG9tLWxlZnQnLFxuICBib3R0b21SaWdodCA9ICdib3R0b20tcmlnaHQnLFxuICBjZW50ZXJDZW50ZXIgPSAnY2VudGVyLWNlbnRlcicsXG4gIGNlbnRlckxlZnQgPSAnY2VudGVyLWxlZnQnLFxuICBjZW50ZXJSaWdodCA9ICdjZW50ZXItcmlnaHQnLFxuICB0b3BDZW50ZXIgPSAndG9wLWNlbnRlcicsXG4gIHRvcExlZnQgPSAndG9wLWxlZnQnLFxuICB0b3BSaWdodCA9ICd0b3AtcmlnaHQnXG59XG5cbi8qKlxuICogUHJvZ3Jlc3MgYmFyIGRpcmVjdGlvbnNcbiAqL1xuZXhwb3J0IGVudW0gUEJfRElSRUNUSU9OIHtcbiAgbGVmdFRvUmlnaHQgPSAnbHRyJyxcbiAgcmlnaHRUb0xlZnQgPSAncnRsJ1xufVxuIl19