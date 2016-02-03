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

    var target = $(this).attr('href').split('#')[1];
    console.log(target);

    $('.' + target).addClass('realm__content--show');
});