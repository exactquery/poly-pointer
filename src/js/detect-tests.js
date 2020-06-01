/**
 * Full test for IE10/11 on Win8/8.1 in Metro Mode.  User Agent + Touch + NO ActiveX = Metro
 */
window.device.addPreference.mm = function () {
  function hasActiveX() {
    try {
      return !!new ActiveXObject( "htmlfile" );
    } catch ( e ) {
      return false;
    }
  }

  return true === ( window.device.ua( 'Trident\/[6|7]' ) && window.device.hardware.t && !hasActiveX() );
};

window.device.addHardware.lt = function() {
  return true === ( window.device.ua( '(Android|iPhone|iPad|iPod touch|Windows Phone)' ) && window.device.hardware.t && !window.device.hardware.pc );
}