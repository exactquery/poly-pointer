/**
 * Provides a psuedo-polyfill for CSS media rules for touch screens.  Intended for allowing browsers that can
 * process media queries but not Media Query Level 4 rules to load the same rules as a browser that can process these
 * rules.
 *
 * To use, your media query rules must contain one of these conditions:
 *
 *    * @media handheld             USE THIS FOR OLDER BROWSERS
 *    * @media (pointer:coarse)     USE THIS TO FORCE POINTER:COARSE for NEWER BROWSERS
 *
 * These conditions may be mixed with other conditions, however when using the 'handheld' version, you may not join with
 * any Media Query Level 4 rules.
 *
 * IE - @media handheld, screen and (pointer:coarse) works.  @media handheld and (pointer:coarse) does not work.
 *
 * From PolyPointer v1.0.2 (https://github.com/exactquery/poly-pointer)
 * @author  Aaron M Jones [am@jonesiscoding.com]
 * @licence MIT (https://github.com/exactquery/poly-pointer/blob/master/LICENSE
 * @type {{function}}
 */
var polyPointer = function ( d ) {

  /**
   * Returns an object with the applicable rules, each as an array in their own key.
   *
   * @param {boolean} coarse
   * @param {boolean} handheld
   * @returns {{handheld: [CSSRule], coarse: [CSSRule]}}
   */
  function _getSpecialRules( coarse, handheld ) {
    var coarseRules = [];
    var handheldRules = [];
    var sheets = ( coarse || handheld ) ? d.styleSheets : [];

    for ( var i = 0; i < sheets.length; i++ ) {
      var rules = sheets[ i ].cssRules || sheets[ i ].rules;
      for ( var n = 0; n < rules.length; n++ ) {
        var rule = rules[ n ];
        if ( rule.type === CSSRule.MEDIA_RULE ) {
          if ( handheld && _inObj( rule.media, /handheld/i ) && _inObj( rule.media, /(not all|\(pointer:\s?coarse\))/i ) ) {
            handheldRules.push( rule );
          }

          if ( coarse && _inObj( rule.media, /\(pointer:\s?coarse\)/i ) ) {
            coarseRules.push( rule );
          }
        }
      }
    }

    return { handheld: handheldRules, coarse: coarseRules };
  }

  /**
   *
   * @param {object} obj
   * @param {object} rx
   * @returns {boolean}
   * @private
   */
  function _inObj( obj, rx ) {
    for ( var x = 0; x < obj.length; x++ ) {
      if ( rx.test( obj[ x ] ) ) {
        return true;
      }
    }

    return false;
  }

  /**
   * Changes the document's stylesheet rules to allow rules of the given type to load without matching the qualifications.
   *
   * @param {object}  options   An object with two possible keys: coarse & handheld.  Values are boolean.
   */
  function polyfill( options ) {
    var coarse = options.coarse || false;
    var handheld = options.handheld || false;

    var rules = _getSpecialRules(coarse, handheld);
    var sheets = d.getElementsByTagName( "link" );

    // Polyfill Rules
    for ( var i = 0; i < rules.handheld.length; i++ ) {
      rules.handheld[ i ].media.mediaText = rules.handheld[ i ].media.mediaText.replace( 'handheld', 'screen' );
    }

    for ( var h = 0; h < rules.coarse.length; h++ ) {
      rules.coarse[ h ].media.mediaText = rules.coarse[ h ].media.mediaText.replace( /\s?(and)?\s?\(pointer:\s?coarse\)/g, '' );
    }

    // Polyfill Sheets
    for ( var n = 0; n < sheets.length; n++ ) {
      if ( sheets[ n ].media === "(pointer: coarse)" ) {
        sheets[ n ].media = "screen";
      }
    }
  }

  return { polyfill: polyfill };
}( document );