# PolyPointer
PolyPointer is a psuedo-polyfill for the [Media Query Level 4](https://www.w3.org/TR/mediaqueries-4/#descdef-media-pointer) *pointer:coarse* feature, written in vanilla javascript.

It was written one evening after work when grew frustrated with not being able to present a touch friendly interface to our clients with touch screen devices without also having hybrid devices like laptops with touch screens using the same interface.  It kind of worked.  Then, I accidentally deleted the CodePen.  After a few choice words, I rewrote it as what you see here.  And it works.

Imagine being able to use an easy little media query like @media screen and (pointer:coarse) to present a touch-friendly interface for your website's tablet and phone tapping visitors. 

Sound good?  Then read on.

## Wait.  You said Psuedo-Polyfill.

You caught that, did you?  Geez, can't pull anything over on you.  So, What the heck is a psuedo-polyfill? 

Due to the way that browser handle unrecognized CSS media query rules, there isn't an efficient way to read such rules in and use them.  The browser cleverly changes your easy  `@media screen and (pointer:coarse)` media query into the not-so-useful `@media not all`.  Bummer.

In this rare case, however, you can have your cake and eat it too!  It's just a simple little alteration of your media query, and the inclusion of this friendly JS.  How simple?  Well, how about this:

    @media handheld, screen and (pointer:coarse), screen and (-moz-touch-enabled) {}
What's that?  You say that the *handheld* media type is deprecated?  Exactly.  And that's why we're using it.  The browsers we would be targeting would be new enough to understand that query, yet old enough to not ignore it.

## Supported Devices & Browsers
Surprisingly, there's only a few situations in which you'd want to bother to polyfill this feature.  Ancient browsers wouldn't be on touch-only devices.  New browsers already support it.  Our targets are in between.

Technically, the polyfill will work on any browser that supports [media queries](https://caniuse.com/#feat=css-mediaqueries), but does not [support media interaction features](https://caniuse.com/#feat=css-media-interaction).  

The real intent, however, is to target the situations below, where it is either obvious that the user does not have a "fine" pointer such as a mouse, or where the user is giving you some indication that they would prefer a touch interface.
 
 - IE10 on Win8, Metro Mode (w/ touchscreen device)
 - IE11 on Win8.1, Metro Mode (w/ touchscreen device)
 - MS Edge on Win10, Tablet Mode (w/ touchscreen device)
 - Android 4.4.4 and Below (not using Chrome)
 - iOS 8.4 and Below

## Show Me the Awesome! Let's Talk Usage.

Check out this [Demo CodePen](https://codepen.io/jonesiscoding/full/qoQbXm/) on one of the devices mentioned above to see it in action!

Using the script is a simple as placing the distribution JS in the `<HEAD>` of your HTML, then writing your CSS rules that are intended for touch devices inside media queries like so:

    @media handheld, screen and (pointer:coarse), screen and (-moz-touch-enabled) {
	    <Your CSS Rules Here>
    }
All of your CSS rules will then be followed by: modern browsers supporting the (almost) standard, all of the supported situations mentioned above, and.. oh, yeah.  Mozilla Firefox.  More on that later.

Of course, you can also mix in any other sort of media query goodness, such as: 

    @media handheld and (max-width: 480px), screen and (pointer:coarse) and (max-width: 480px), screen and (-moz-touch-enabled) and (max-width:480px)

The only thing you can't do is mix other *media query level 4* conditions or feature in with the *handheld* media.

#### Special Case: Mozilla Firefox
Right.  Mozilla Firefox.  You might have noticed the `-moz` prefix on part of the media query above.  Mozilla Firefox does not yet support `(pointer:coarse)` queries, nor does it provide us any way of detecting whether or not the user might be intending to see a touch interface.  If you include the prefixed query, all users on Firefox would end up seeing the effects of your "touch" CSS rules.  Here's the conundrum:

 - **iOS:** Firefox is just Safari in a fancy outfit.  No prefix needed.
 - **Android:** Firefox would need the prefixed bit to see the rules.
 - **Windows:** No "Metro" or "Tablet" version of FF. 

My inclination is to use the prefixed rule and show everyone using Firefox on a touch screen device a touch interface, even if they have a "fine" pointer.  I'd rather give something usable & unneeded than something unusable.

If you'd rather your users on Firefox weren't seeing an interface that you designed for mobile browsers -- just omit the `screen and (-moz-touch-enabled)` portion of the rule and you'll be all set.

## Dependencies
There aren't really any dependencies when using the distribution files.  While the polyfill depends heavily on something testing the browser's capabilities and letting it know when to act,  the files in the *dist* directory have [xqDetect](https://github.com/exactquery/xq-detect) built in to handle those duties.  Nothing else to do. 

If you prefer to work with another detection library such as Modernizr, that's possible too. In that situation, you'll need to be writing your own tests similar to those in *detect-tests.js*, as well as implementing those tests in a similar manner to *metro-tablet.js*.

## Expressing Your Gratitude
 To be honest, someone just mentioning my code to their technically minded peers would be thrilling enough for me that I could possibly get get months of enjoyment out of each mention.  Well, that is, if I knew about it.  So, maybe star the repo.  Or, you could send me a message on Twitter ([@jonesiscoding](https://twitter.com/jonesiscoding)).  

I enjoy coding enough that writing code can be it's own reward, but writing code that no one ever sees or uses is quite boring.  I'll be very glad if this little library gets some use beyond it's original use case for my employer.