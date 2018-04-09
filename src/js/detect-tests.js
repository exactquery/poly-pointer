/**
 * Adds 'activex' test to detection script.  Use with 'detect.activex()'.  Will return FALSE if
 * the browser is not capable of ActiveX.  Intended for aiding tests for IE10/11 in 'Metro Mode'.
 */
detect.add('activex', function() {
  try {
    return !!new ActiveXObject("htmlfile");
  } catch (e) {
    return false;
  }
});

/**
 * Full test for IE10/11 on Win8/8.1 in Metro Mode.  User Agent + Touch + NO ActiveX = Metro
 */
detect.add( 'metro', function () {
  return true === ( detect.ua( 'Trident\/[6|7]' ) && detect.touch() && !detect.activex() );
} );

/**
 * Detects legacy touch devices that do not have pointer:coarse support.
 */
detect.add( 'legacy', function () {
  var dt = detect;

  return true === ( !( dt.mq( '(pointer:coarse)' ) || dt.mq( '(-moz-touch-enabled)' ) )
          && dt.touch() && ( dt.android || dt.ios ) );
} );