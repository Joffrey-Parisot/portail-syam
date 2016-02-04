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

    $('body').addClass('view-realm');

    var target = $(this).attr('href');
    console.log(target);

    $(target).addClass('realm__content--show');
});


var bodyEl = document.body,
    docElem = window.document.documentElement,
    realmLeft = document.getElementById('realm--left'),
    realmRight = document.getElementById('realm--right');

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

function loadContent(item){
    // add expanding element/placeholder
    var dummy = document.createElement('div');
    dummy.className = 'placeholder';

    // set the width/heigth and position
    dummy.style.transform = 'translate3d(' + (item.offsetLeft - 5) + 'px, ' + (item.offsetTop - 5) + 'px, 0px) scale3d(' + item.offsetWidth/(realmLeft.offsetWidth + realmRight.offsetWidth) + ',' + item.offsetHeight/getViewport('y') + ',1)';

    // add transition class
    $('.placeholder').addClass('placeholder--trans-in');

    // insert it after all the grid items
    document.getElementById('main').appendChild(dummy);
}