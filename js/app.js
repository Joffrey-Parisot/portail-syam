$(document).foundation();

$('.realm__slider--left').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    autoplay: false,
    fade: true,
    arrows: false,
    pauseOnHover: false
});

$('.realm__slider--right').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: 'progressive',
    autoplay: false,
    fade: true,
    arrows: false,
    pauseOnHover: false
});