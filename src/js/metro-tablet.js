/**
 * Forces touch-based media query rules to load on two specific browser situations:
 *
 *    * IE10/11 on Windows 8/8.1 in "Metro Mode"
 *    * Hybrid Machine w/ Mouse & Touch on Microsoft Edge on Windows 10 in "Tablet Mode"
 *    * Android 4.4.4 & Below, iOS 8.3 & Below
 *
 * No other browsers should be affected, unless they are doing user agent spoofing & somehow meet the other qualifications.
 *
 * @see     PolyPointer v2.0 (https://github.com/exactquery/poly-pointer)
 * @author  Aaron M Jones [am@jonesiscoding.com]
 * @licence MIT (https://github.com/exactquery/poly-pointer/blob/master/LICENSE)
 */
( function ( pp, dt, d ) {

  function getScrollbar() {
    var width = null;
    if (d.readyState === 'complete') {
      var sb = d.createElement("div");
      sb.setAttribute("style","width:100px;height:100px;overflow-y:scroll;position:absolute;top:-9999px;-ms-overflow-style:auto;");
      d.body.appendChild(sb);
      width = sb.offsetWidth - sb.clientWidth;
      d.body.removeChild(sb);
    }

    return width;
  }

  if ( dt.preference.metro() || dt.hardware.t && !dt.hardware.pc ) {
    // IE10/11 on Win8/8.1, Android < 5.0, iOS < 9.
    pp.polyfill( { handheld: true } );
  } else if ( ( screen.width === window.innerWidth ) && dt.ua( 'Edge' ) && !dt.hardware.pc && dt.hardware.t ) {
    // MS Edge on Win10 in 'Tablet Mode' (Sadly, measuring scrollbar cannot be done until dom has loaded)
    d.addEventListener( "DOMContentLoaded", function ( event ) {
      if ( getScrollbar() === 0 ) {
        pp.polyfill( { coarse: true } );
      }
    } );
  }
}( polyPointer, window.device, document ) );