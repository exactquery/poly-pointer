/**
 * Forces touch-based media query rules to load on two specific browser situations:
 *
 *    * IE10/11 on Windows 8/8.1 in "Metro Mode"
 *    * Hybrid Machine w/ Mouse & Touch on Microsoft Edge on Windows 10 in "Tablet Mode"
 *
 * No other browsers should be affected, unless they are doing user agent spoofing & somehow meet the other qualifications.
 *
 * From PolyPointer v1.0 (https://github.com/exactquery/poly-pointer)
 * @author  Aaron M Jones [am@jonesiscoding.com]
 * @licence MIT (https://github.com/exactquery/poly-pointer/blob/master/LICENSE)
 */
( function ( pp, dt, d ) {
  // Metro Mode on Win8 (IE10/11, Touch, No ActiveX)
  var isMetro = dt.metro();
  // Tablet Mode on Win10 (Not Metro, Screen Size = Window Size, MS Edge, Hybrid Machine, Touch Screen (scrollbar test later)
  var isEdgeHybrid = !isMetro && (screen.width === window.innerWidth) && dt.ua( 'Edge' ) && !dt.mq( '(pointer:coarse)' ) && dt.touch();

  if ( isMetro ) {
    // We can just load the polyfill immediately.
    pp.polyfill({ handheld: true });
  } else if ( isEdgeHybrid ) {
    // We still need to measure the width of the scrollbar, which sadly cannot be done until the dom has loaded.
    d.addEventListener( "DOMContentLoaded", function ( event ) {
      if ( dt.scrollbar() === 0 ) {
        pp.polyfill({coarse: true});
      }
    } );
  }
}( polyPointer, detect, document ) );