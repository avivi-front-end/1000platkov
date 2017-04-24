'use strict';

$(function() {
    $('.js-item-tab').on('click', function(e) {
        e.preventDefault();

        var $this = $(this);
        if ($this.hasClass('active')) {
            return false
        }
        var tabTarget = $this.attr('href');
        $this.closest('.item-tab-wrapper__head').find('.item-tab-wrapper__link').removeClass('active');
        $this.addClass('active');
        $this.closest('.item-tab-wrapper').find('.item-tab-wrapper__item').removeClass('active');
        $this.closest('.item-tab-wrapper').find(tabTarget).addClass('active');

    });

    $('.js-number-input').on('click', function(e) {
        e.preventDefault();
        var $this = $(this);
        var $input = $this.closest('.item-detail__count-wrap').find('.item-detail__count-input');
        var $currentVal = $input.val();

        switch ($this.attr('data-count')) {
            case 'plus':
                $currentVal++;

                break;
            case 'minus':
                if ($currentVal == 1) {
                    return false;
                }
                $currentVal--;
                break;
        }
        $input.val($currentVal)
        setCount($currentVal)
    });

    $('.js-item-favorite').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active');
    });

    $('.js-opt-slider').slick({
        arrows: false
    });

    $('.js-order-num-mask').mask("9999  9999999");
    $('.js-articul-mask').mask("9999  9999999");




    $('.js-opt-arrows').on('click', function(e) {

        e.preventDefault();
        $('.js-opt-slider').slick($(this).attr('data-slider'));
    });

    $('.js-show-sort-drop').on('click', function(e) {
        e.preventDefault();
        $(this).next('.catalog-opt-filter__drop').slideToggle();
    });

    $('.js-input-period').dateRangePicker({
        format: 'DD.MM.YY',
        // autoClose: true,
        separator: ' - ',
        container:'.history-opt__period-item--period'
    });

    $('.js-input-period').bind('datepicker-open',function(){
        $('.js-open-calendar').addClass('active');
    });
    $('.js-input-period').bind('datepicker-close',function(){
        $('.js-open-calendar').removeClass('active');
    });

    // $('.js-open-calendar').on('click',function(e){
    //     e.preventDefault();
    //
    // });



    // $('.js-input-period').datepicker({
    //     numberOfMonths: 2,
    //      rangeSelect: true,
    //     onSelect: function(selectedDate) {
    //         if (!$(this).data().datepicker.first) {
    //             $(this).data().datepicker.inline = true
    //             $(this).data().datepicker.first = selectedDate;
    //         } else {
    //             if (selectedDate > $(this).data().datepicker.first) {
    //                 $(this).val($(this).data().datepicker.first + " - " + selectedDate);
    //             } else {
    //                 $(this).val(selectedDate + " - " + $(this).data().datepicker.first);
    //             }
    //             $(this).data().datepicker.inline = false;
    //         }
    //     },
    //     onClose: function() {
    //         delete $(this).data().datepicker.first;
    //         $(this).data().datepicker.inline = false;
    //     }
    // })


});

var photosDetailPage = (function() {
    var $btn = $('.js-show-big-photo');
    var $photoWrap = $('.item-detail__main-photo-image');

    $btn.on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('active')) {
            return false;
        }

        var $photoTarget = $(this).attr('href');
        $photoWrap.attr('src', $photoTarget);
        $btn.removeClass('active');
        $(this).addClass('active');

    })
})();


var presentSlider = (function() {
    var $btn = $('.js-show-present');
    var $sliderWrap = $('.present-wrap__slider');
    var $slider = $('.js-present-slider');
    var isShow = true;


    $btn.on('click', function(e) {
        e.preventDefault();



        if ($btn.hasClass('active')) {
            $sliderWrap.hide();
        } else {
            $sliderWrap.show();
            if (isShow) {
                $sliderWrap.css('opacity', '0');
                $slider.slick({
                    infinite: true,
                    slidesToShow: 5,
                    arrows: false,
                    responsive: [{
                            breakpoint: 991,
                            settings: {
                                slidesToShow: 4,
                            }
                        },
                        {
                            breakpoint: 767,
                            settings: {
                                slidesToShow: 1,
                            }
                        },
                    ]
                });
                setTimeout(function() {
                    $sliderWrap.css('opacity', '1');
                }, 10);
                $('.js-present-arrows').on('click', function(e) {
                    e.preventDefault();
                    $slider.slick($(this).attr('data-slider'));
                })
                isShow = !isShow;
            }
        }
        $btn.toggleClass('active');
    });
})();

var $btn = $('.js-show-pop-up');
var $html = $('html');
var $wrapper = $('.pop-up-wrapper');
var $overlay = $('.pop-up__overlay');
var $popUp = $('.pop-up')
var $pageWrapper = $('.page-wrapper');
var $close = $('.js-pop-up-close');
var $quickSlider = true;

$btn.on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var popUpTarget = $this.attr('data-pop');
    showPop(popUpTarget);
    if (popUpTarget == '#quick-view' && $quickSlider) {
        quickViewSlider();
        $quickSlider = !$quickSlider;
    }
});

$overlay.on('click', function() {
    closePop();
});

$close.on('click', function(e) {
    e.preventDefault();
    closePop();
});
$('.js-styler').styler();

$('.js-make-order').on('click', function(e) {
    e.preventDefault();
    closePop();
});

function quickViewSlider() {
    $('.js-quick-view-slider').slick({
        infinite: true,
        slidesToShow: 5,
        arrows: false,
        responsive: [{
                breakpoint: 991,
                settings: {
                    slidesToShow: 4,
                }
            },
            {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                }
            },
        ]
    });

    $('.js-quick-view-slider-arrows').on('click', function(e) {
        e.preventDefault();
        $('.js-quick-view-slider').slick($(this).attr('data-slider'));
    });
}

function closePop() {
    $popUp.fadeOut(400).removeClass('active');
    $overlay.fadeOut(400, function() {
        $html.removeClass('hidden');
        $wrapper.removeClass('active');
        $pageWrapper.removeClass('active');
    });
}

function showPop(popUpTarget) {
    $(popUpTarget).attr('style', '');
    $('.pop-up.active').fadeOut();
    $html.addClass('hidden');
    $wrapper.addClass('active');
    $pageWrapper.addClass('active');
    $overlay.fadeIn();
    $(popUpTarget).fadeIn().addClass('active');
    if (($(popUpTarget).outerHeight() >= ($(window).outerHeight() - 30)) && (popUpTarget != '#quick-view')) {
        $(popUpTarget).css({
            'top': '30px',
            'left': '50%',
            'transform': 'translate(-50%,0)',
            'margin-bottom': '30px',
        });
    }
}



var dropDown = (function() {
    var $btn = $('.js-drop-down');

    $btn.on('mouseover', function() {
        var $this = $(this);
        var dropWrapper = $this.find('.header__sub-menu-wrapper');
        var $leftHelper = dropWrapper.find('.header__sub-menu-left');
        var $rightHelper = dropWrapper.find('.header__sub-menu-right');

        var helperWidth = ($(window).outerWidth() - dropWrapper.outerWidth()) / 2;
        $leftHelper.css({
            'width': helperWidth
        })

        $rightHelper.css({
            'width': helperWidth
        });
        // dropWrapper.show();
    });

    // $btn.on('mouseleave', function() {
    //     setTimeout(function() {
    //         console.log('check');
    //         if ($('.header__sub-menu-wrapper:hover').length != 0) {
    //             console.log('yeas');
    //         } else {
    //             console.log('no');
    //             $('.header__sub-menu-wrapper').hide();
    //         }
    //     }, 500)
    // })
})();

var categoryOpt = (function() {
    var $checkboxHead = $('.js-opt-category');
    var $table = $('.opt-list__table tbody');
    var $count = $('.js-count-opt');
    var $countBtns = $('.js-number-input');

    $checkboxHead.on('change', function() {
        var $this = $(this);
        var state = $this.prop('checked');
        $table.find('.catalog-sidebar__check-item-input').prop('checked', state)
    });
})();

var addReturnArt = (function() {
    var $btn = $('.js-add-return');
    $btn.on('click', function(e) {
        e.preventDefault();
        $(this).closest('.col-md-6').find('.pop-up__form-group').append('<input type="text" name="art" placeholder="____ _______" class=" js-articul-mask pop-up__input pop-up__input--art">');
        $('.js-articul-mask').mask("9999  9999999");
    })

})();

function setCount($tempValue) {
    $('.opt-list__table tbody').find('tr').each(function() {
        var $this = $(this);
        if ($this.find('.catalog-sidebar__check-item-input').prop('checked')) {
            $this.find('.item-detail__count-input').val($tempValue);
        }
    });
}
