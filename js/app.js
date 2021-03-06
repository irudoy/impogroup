
$(window).scrollTop($(window).scrollTop()+1);

var myMap;
ymaps.ready(function() {
    myMap = new ymaps.Map('map', {
        center: [43.127907, 131.953703],
        zoom: 16,
        controls: []
    });
    myPlacemark = new ymaps.Placemark([43.127907, 131.953703], {
        balloonContentHeader: "ООО «Импо Групп»",
        balloonContentBody: "690087, Приморский Край,<br>г. Владивосток, ул. Сабанеева 24В",
        balloonContentFooter: "тел. - (423) 2-99-40-36",
        hintContent: "ООО «Импо Групп»"
    }, {
        preset: 'islands#dotIcon',
        iconColor: '#F94823'
    });
    myMap.geoObjects.add(myPlacemark);
    myMap.behaviors.disable('scrollZoom')
});

$.modal.defaults = {
  overlay: "#000",        // Overlay color
  opacity: 0.75,          // Overlay opacity
  zIndex: 100,              // Overlay z-index.
  escapeClose: true,      // Allows the user to close the modal by pressing `ESC`
  clickClose: true,       // Allows the user to close the modal by clicking the overlay
  closeText: '',     // Text content for the close <a> tag.
  closeClass: '',         // Add additional class(es) to the close <a> tag.
  showClose: true,        // Shows a (X) icon/link in the top-right corner
  modalClass: "modal",    // CSS class added to the element being displayed in the modal.
  spinnerHtml: null,      // HTML appended to the default spinner during AJAX requests.
  showSpinner: true,      // Enable/disable the default spinner during AJAX requests.
  fadeDuration: null,     // Number of milliseconds the fade transition takes (null means no transition)
  fadeDelay: 1.0          // Point during the overlay's fade-in that the modal begins to fade in (.5 = 50%, 1.5 = 150%, etc.)
};

(function(){

    $('#mainMenu li').eq(0).addClass('active');

    $('.section-content').flexVerticalCenter({ cssAttribute: 'padding-top', verticalOffset: -30 });

    if (!Modernizr.touch) {
        $('.main').fullpage({
            verticalCentered: false,
            resize : false,
            anchors:['company', 'services', 'transport', 'news', 'partners', 'contacts'],
            scrollingSpeed: 700,
            easing: 'easeInOutQuad',
            menu: '#mainMenu',
            navigation: true,
            navigationPosition: 'right',
            slidesNavigation: true,
            slidesNavPosition: 'bottom',
            scrollOverflow: false,
            keyboardScrolling: true,
            touchSensitivity: 15,
            animateAnchor: true,

            //events
            onLeave: function(index, nextIndex, direction){},
            afterLoad: function(anchorLink, index){},
            afterRender: function(){},
            afterResize: function(){},
            afterSlideLoad: function(anchorLink, index, slideAnchor, slideIndex){},
            onSlideLeave: function(anchorLink, index, slideIndex, direction){}
        });
    }

    var easing = "easeInOutSine";
     $('.slider__controls a').on( 'click', function( event ) {
         //debugger;
         var $this = $(this);
         var $inner = $this.parent().parent().find('.slider__items');
         var slidesCount = parseInt($inner.attr('data-slides'));
         var maxCount = $inner.find('.slider__item').length - slidesCount;
         if ($inner.attr('data-count') == undefined)
             $inner.attr('data-count', 0);
         var count = parseInt($inner.attr('data-count'));
         var marg = parseInt($inner.css('margin-left'));
         var width = parseInt($inner.find('.slider__item').css('width'))+20;

         event.preventDefault();
         if ($inner.is(':animated')) {return;}
            
         if ( $this.hasClass("prev") ) {
             if (count <= 0) {
                 return;
             } else {
                 marg = marg+width;
                 count -= 1;
             }
         } else if (count < maxCount) {
             marg = marg-width;
             count += 1;
         }

         $inner.animate({
             marginLeft: marg+'px'
         }, {
           duration: 500,
           easing: easing
         });

         $inner.attr('data-count', count);
            
     });

})();

/////////////////////////
//  BROWSER DETECTION  //
/////////////////////////

var BrowserDetect = 
{
    init: function () 
    {
        this.browser = this.searchString(this.dataBrowser) || "Other";
        this.version = this.searchVersion(navigator.userAgent) ||       this.searchVersion(navigator.appVersion) || "Unknown";
    },

    searchString: function (data) 
    {
        for (var i=0 ; i < data.length ; i++)   
        {
            var dataString = data[i].string;
            this.versionSearchString = data[i].subString;

            if (dataString.indexOf(data[i].subString) != -1)
            {
                return data[i].identity;
            }
        }
    },

    searchVersion: function (dataString) 
    {
        var index = dataString.indexOf(this.versionSearchString);
        if (index == -1) return;
        return parseFloat(dataString.substring(index+this.versionSearchString.length+1));
    },

    dataBrowser: 
    [
        { string: navigator.userAgent, subString: "Chrome",  identity: "Chrome" },
        { string: navigator.userAgent, subString: "MSIE",    identity: "Explorer" },
        { string: navigator.userAgent, subString: "Firefox", identity: "Firefox" },
        { string: navigator.userAgent, subString: "Safari",  identity: "Safari" },
        { string: navigator.userAgent, subString: "Opera",   identity: "Opera" }
    ]

};

BrowserDetect.init();