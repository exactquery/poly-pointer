/**
 * Full test for IE10/11 on Win8/8.1 in Metro Mode.  User Agent + Touch + NO ActiveX = Metro
 */
window.device.addPreference.metro = function () {
  function hasActiveX() {
    try {
      return !!new ActiveXObject( "htmlfile" );
    } catch ( e ) {
      return false;
    }
  }

  return true === ( window.device.ua( 'Trident\/[6|7]' ) && window.device.hardware.t && !hasActiveX() );
};