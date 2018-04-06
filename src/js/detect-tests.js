/**
 * Adds 'activex' test to detection script.  Use with 'detect.activex()'.  Will return FALSE if
 * the browser is not capable of ActiveX.  Intended for aiding tests for IE10/11 in 'Metro Mode'.
 *
 * From PolyPointer v1.0 (https://github.com/exactquery/poly-pointer)
 * @author  Aaron M Jones [am@jonesiscoding.com]
 * @licence MIT (https://github.com/exactquery/poly-pointer/blob/master/LICENSE)
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
 *
 * From PolyPointer v1.0 (https://github.com/exactquery/poly-pointer)
 * @author  Aaron M Jones [am@jonesiscoding.com]
 * @licence MIT (https://github.com/exactquery/poly-pointer/blob/master/LICENSE)
 */
detect.add( 'metro', function () {
  return true === ( detect.ua( 'Trident\/[6|7]' ) && detect.touch() && !detect.activex() );
} );