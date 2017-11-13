$('.owl-carousel').owlCarousel({
    loop: true,
    items: 2,
    // nav: true,
    responsive:{
        320:{
            items:1
        },
        600:{
            items: 1
        },
        1000:{
            items: 2
        }
    }
});


$(document).ready(function () {
    $(".header--btn").hover(function(){
        $(this).addClass('animated ' + $(this).attr('action'));
    });
    $(".header--btn").bind("animationend webkitAnimationEnd oAnimationEnd MSAnimationEnd",function(){
        $(this).removeClass('animated ' + $(this).attr('action'));
    });

    $('.4target-logo').click(function () {
        window.location = '/';
    });
});
