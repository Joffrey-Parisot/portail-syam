$(document).foundation();

$('.realm__slider--left').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    autoplay: true,
    fade: true,
    arrows: false,
    pauseOnHover: false
});

$('.realm__slider--right').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    autoplay: true,
    fade: true,
    arrows: false,
    pauseOnHover: false
});

$('.realm__link').on('click', function(e){
    e.preventDefault();

    /*$('body').addClass('view-realm');

    var target = $(this).attr('href');
    console.log(target);

    $(target).addClass('realm__content--show');*/
});


(function() {

    var bodyEl = document.body,
        docElem = window.document.documentElement,
        support = { transitions: Modernizr.csstransitions },
        // transition end event name
        transEndEventNames = { 'WebkitTransition': 'webkitTransitionEnd', 'MozTransition': 'transitionend', 'OTransition': 'oTransitionEnd', 'msTransition': 'MSTransitionEnd', 'transition': 'transitionend' },
        transEndEventName = transEndEventNames[ Modernizr.prefixed( 'transition' ) ],
        onEndTransition = function( el, callback ) {
            var onEndCallbackFn = function( ev ) {
                if( support.transitions ) {
                    if( ev.target != this ) return;
                    this.removeEventListener( transEndEventName, onEndCallbackFn );
                }
                if( callback && typeof callback === 'function' ) { callback.call(this); }
            };
            if( support.transitions ) {
                el.addEventListener( transEndEventName, onEndCallbackFn );
            }
            else {
                onEndCallbackFn();
            }
        },
        mainEl = document.getElementById('main'),
        infobarEl = document.getElementById('infobar'),
        sidebarEl = document.getElementById('sidebar'),
        realmLeftEl = document.getElementById('realm-left'),
        realmRightEl = document.getElementById('realm-right'),
        realmLinks = document.querySelectorAll('.realm__link'),
        realmContentLeftEl = document.getElementById('realm-content-left'),
        realmContentRightEl = document.getElementById('realm-content-right'),
        closeCtrl = document.querySelector('.close-button'),
        current = -1,
        lockScroll = false, xscroll, yscroll,
        isAnimating = false,
        menuCtrl = document.getElementById('menu-toggle'),
        menuCloseCtrl = document.querySelector('.close-button');


    /**
     * gets the viewport width and height
     * based on http://responsejs.com/labs/dimensions/
     */
    function getViewport( axis ) {
        var client, inner;
        if( axis === 'x' ) {
            client = docElem['clientWidth'];
            inner = window['innerWidth'];
        }
        else if( axis === 'y' ) {
            client = docElem['clientHeight'];
            inner = window['innerHeight'];
        }

        return client < inner ? inner : client;
    }

    function scrollX() { return window.pageXOffset || docElem.scrollLeft; }
    function scrollY() { return window.pageYOffset || docElem.scrollTop; }

    function init() {
        initEvents();
    }

    function initEvents() {
        [].slice.call(realmLinks).forEach(function(item, pos) {
            // grid item click event
            item.addEventListener('click', function(ev) {
                ev.preventDefault();
                if(isAnimating || current === pos) {
                    return false;
                }
                isAnimating = true;
                // index of current item
                current = pos;

                /*
                // simulate loading time..
                classie.add(item, 'grid__item--loading');
                setTimeout(function() {
                    classie.add(item, 'grid__item--animate');
                    // reveal/load content after the last element animates out (todo: wait for the last transition to finish)
                    setTimeout(function() { loadContent(item); }, 500);
                }, 1000);
                */
                loadContent(item);
            });
        });

        /*closeCtrl.addEventListener('click', function() {
            // hide content
            hideContent();
        });

        // keyboard esc - hide content
        document.addEventListener('keydown', function(ev) {
            if(!isAnimating && current !== -1) {
                var keyCode = ev.keyCode || ev.which;
                if( keyCode === 27 ) {
                    ev.preventDefault();
                    if ("activeElement" in document)
                        document.activeElement.blur();
                    hideContent();
                }
            }
        } );

        // hamburger menu button (mobile) and close cross
        menuCtrl.addEventListener('click', function() {
            if( !classie.has(sidebarEl, 'sidebar--open') ) {
                classie.add(sidebarEl, 'sidebar--open');
            }
        });

        menuCloseCtrl.addEventListener('click', function() {
            if( classie.has(sidebarEl, 'sidebar--open') ) {
                classie.remove(sidebarEl, 'sidebar--open');
            }
        });*/
    }

    function loadContent(item){
        console.log(item);

        // add expanding element/placeholder
        var dummy = document.createElement('div');
        dummy.className = 'placeholder';

        // set width/heigth and position
        dummy.style.width = item.parentNode.offsetWidth + 'px';
        dummy.style.height = item.parentNode.offsetHeight + 'px';
        dummy.style.transform = 'translate3d(' + (item.parentNode.offsetLeft + (item.parentNode.offsetWidth / 4)) + 'px, ' + (item.parentNode.offsetHeight / 4) + 'px, 0px) scale3d(0.5, 0.5, 1)';

        console.log(dummy);

        // add transition class
        dummy.classList.add('placeholder--trans-in');

        // insert it after all the main items
        mainEl.appendChild(dummy);

        // body overlay
        bodyEl.classList.add('view-realm');

        setTimeout(function() {
            // expands the placeholder
            dummy.style.transform = 'translate3d(0px, 0px, 0px)';
            // disallow scroll
            window.addEventListener('scroll', noscroll);
        }, 25);

        /*onEndTransition(dummy, function() {
            // add transition class
            classie.remove(dummy, 'placeholder--trans-in');
            classie.add(dummy, 'placeholder--trans-out');
            // position the content container
            contentItemsContainer.style.top = scrollY() + 'px';
            // show the main content container
            classie.add(contentItemsContainer, 'content--show');
            // show content item:
            classie.add(contentItems[current], 'content__item--show');
            // show close control
            classie.add(closeCtrl, 'close-button--show');
            // sets overflow hidden to the body and allows the switch to the content scroll
            classie.addClass(bodyEl, 'noscroll');

            isAnimating = false;
        });*/
    }

    function noscroll() {
        if(!lockScroll) {
            lockScroll = true;
            xscroll = scrollX();
            yscroll = scrollY();
        }
        window.scrollTo(xscroll, yscroll);
    }

    init();

})();