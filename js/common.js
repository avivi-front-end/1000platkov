'use strict';
if (!window.console) window.console = {};
if (!window.console.memory) window.console.memory = function () {
};
if (!window.console.debug) window.console.debug = function () {
};
if (!window.console.error) window.console.error = function () {
};
if (!window.console.info) window.console.info = function () {
};
if (!window.console.log) window.console.log = function () {
};

// sticky footer
//-----------------------------------------------------------------------------
if (!Modernizr.flexbox) {
    (function () {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            noFlexboxStickyFooter = function () {
                $pageBody.height('auto');
                if ($pageBody.height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageBody.height($(window).height() - $('#header').outerHeight() - $('#footer').outerHeight());
                } else {
                    $pageWrapper.height('auto');
                }
            };
        $(window).on('load resize', noFlexboxStickyFooter);
    })();
}
if (ieDetector.ieVersion == 10 || ieDetector.ieVersion == 11) {
    (function () {
        var
            $pageWrapper = $('#page-wrapper'),
            $pageBody = $('#page-body'),
            ieFlexboxFix = function () {
                if ($pageBody.addClass('flex-none').height() + $('#header').outerHeight() + $('#footer').outerHeight() < $(window).height()) {
                    $pageWrapper.height($(window).height());
                    $pageBody.removeClass('flex-none');
                } else {
                    $pageWrapper.height('auto');
                }
            };
        ieFlexboxFix();
        $(window).on('load resize', ieFlexboxFix);
        svg4everybody();
    })();
}

$(function () {

    // placeholder
    //-----------------------------------------------------------------------------
    $('input[placeholder], textarea[placeholder]').placeholder();

    //mobile sub menuFn
    $('.js-show-mobile-sub-menu').on('click', function (e) {
        e.preventDefault();
        $(this).next('.mobile-menu__down-menu').slideToggle();
        $(this).toggleClass('active');
    });

    $('.js-height').matchHeight();

    $('.js-scroll-up').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: 0
        }, 1200);
    });

    $('.stores__map__btn').click(function (e) {
        e.preventDefault();
        var mapAdress = $(this).parents('.stores__map__item').find('.stores__subtitle').text();
        $('#adress-on-map').show().text(mapAdress);
    });

    $( ".item-block__order" ).hover(
        function() {
            $( this ).parents('.item-block__img-block').children('.item-block__order-ico').addClass('order-invert');
        }, function() {
            $( this ).parents('.item-block__img-block').children('.item-block__order-ico').removeClass('order-invert');
        }
    );


    $('.js-catalog-slider').slick({
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

    $('.js-catalog-arrows').on('click', function (e) {
        e.preventDefault();
        $('.js-catalog-slider').slick($(this).attr('data-slider'));
    });

    $('.js-show-options').on('click', function (e) {
        e.preventDefault();
        $(this).closest('.catalog-sidebar__item-wrapper').toggleClass('active');
    });


    $('.js-show-all-options').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        if ($this.hasClass('active')) {
            $this.closest('.catalog-sidebar__item-wrapper-inner').find('.hidden').hide();
            $this.text('Показать все размеры');
        } else {
            $this.closest('.catalog-sidebar__item-wrapper-inner').find('.hidden').css('display', 'block');
            $this.text('Только популярные');
        }
        $this.toggleClass('active');

    });

    if ($(window).outerWidth() < 767) {
            $('.pop-up-wrapper').css('top',$('.header__top').outerHeight());
    }

    if ($(window).outerWidth() < 543) {

        $('.shop-slider').slick({
            dots: false,
            infinite: true,
            arrows: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 543,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });

        $('.shop-slider-2').slick({
            dots: false,
            infinite: true,
            arrows: false,
            speed: 300,
            slidesToShow: 1,
            slidesToScroll: 1,
            responsive: [
                {
                    breakpoint: 543,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1
                    }
                }
                // You can unslick at a given breakpoint now by adding:
                // settings: "unslick"
                // instead of a settings object
            ]
        });
    }

    $('.js-shop-arrows').on('click', function(e) {
        e.preventDefault();
        $('.shop-slider').slick($(this).attr('data-slider'));
    });

    $('.js-shop-arrows-2').on('click', function(e) {
        e.preventDefault();
        $('.shop-slider-2').slick($(this).attr('data-slider'));
    });

    $('.js-reset-section').on('click', function (e) {
        e.preventDefault();
        var $this = $(this);
        $this.closest('.catalog-sidebar__item-wrapper').find('input').val('');
        $this.closest('.catalog-sidebar__item-wrapper').find('input[type="checkbox"]').prop("checked", false);
    });

    $('.js-purschases-link').click(function () {
        $('.purchases__link__text').hide();
        $(this).next('.purchases__link__text').toggle();
    });

    $('.js-show-sidebar').on('click', function (e) {
        e.preventDefault();

        if ($(window).outerWidth() < 767) {

            if ($('.catalog-sidebar__main-wrapper').hasClass('active')) {
                $('.catalog-sidebar__main-wrapper-inner').toggleClass('active');
                setTimeout(function () {
                    $('.catalog-sidebar__main-wrapper').toggleClass('active');
                }, 500)
            } else {

                $('.catalog-sidebar__main-wrapper,.catalog-sidebar__main-wrapper-inner').toggleClass('active');
            }
        }
    });

    $('.item-block__input').on('keyup keypress', function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
        } else {
            var letters = '1234567890';
            return (letters.indexOf(String.fromCharCode(e.which)) != -1);
        }
    });

    $('.js-like').click(function () {
        if ( !$(this).hasClass('active') ) {
            $(this).append('<span class="like__info">добавлено в избранное</span>');

            var that = $(this);
            setTimeout(function(){
                that.find('.like__info').remove();
            }, 2500);

        } else {
            $(this).find('.like__info').remove();
        }
        $(this).toggleClass('active');

    });

    $('.js-return-form').on('submit',function () {
        return validateForm.form();
    });

    var validateForm = $('.js-return-form').validate({
        rules: {
            check: {
                required: true
            },
        },
        submitHandler: function(form, event) {
            event.preventDefault();

            closePop();

            setTimeout(function () {
                var popUpTarget = '#pop-return-success';
                showPop(popUpTarget);
                setTimeout(function () {
                    closePop();
                }, 3000)
            }, 1000);
        }
    });

    $('.pop-up__callback-form').on('submit',function () {
        return validateFormCall.form();
    });

    var validateFormCall = $('.pop-up__callback-form').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();

            closePop();

            setTimeout(function () {
                var popUpTarget = '#callback-success';
                showPop(popUpTarget);
                setTimeout(function () {
                    closePop();
                }, 4000)
            }, 1000);
        }
    });

    $('.js-del-order').click(function () {
        $(this).parents('.history__item').remove();
        var popUpTarget = '#pop-cancel';
        showPop(popUpTarget);
        setTimeout(function () {
            closePop();
        }, 2000)
    });

    $('.js-play-video').click(function () {
        $('.overlay').show();
        $('.video-popup').show();
    });

    $('.js-video-overlay, .js-close-video-popup').click(function () {
        $('.overlay').hide();
        $('.video-popup').hide();
    });

    $('.js-edit-form-email').click(function () {
        var thisInput = $(this).parents('.register__wrap-input').children('.profile__input');
        thisInput.addClass('active-input').removeAttr('disabled','disabled').val('').attr('placeholder','Введите новый адрес');
        $(this).hide();
        $(this).parents('.register__wrap-input').children('.profile__form__submit').show();
        $(this).parents('.register__wrap-input').children('.profile__form__info').hide();
        $(this).parents('.register__wrap-input').children('.profile__form__info-show').css('display','block');
        $(this).parents('.requisites__label').children('.requisites__form__title').text('Смена адреса электронной почты (логина)');
    });

    $('.purchases__textarea, #pur__adress').autoResize();


    $('.js-profile-form-email').validate({
        rules: {
            profile__email: {
                required: true
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $('.profile__input__email').removeClass('active-input').attr('disabled','disabled');
        }
    });

    $('.js-edit-form-tel').click(function () {
        var thisInput = $(this).parents('.register__wrap-input').children('.profile__input');
        thisInput.val('');
        thisInput.addClass('active-input').removeAttr('disabled','disabled').val('').attr('placeholder','+7 (___) __ __');
        $(this).hide();
        $(this).parents('.register__wrap-input').children('.profile__form__submit').show();
        $(this).parents('.register__wrap-input').children('.profile__form__info').hide();
        $(this).parents('.register__wrap-input').children('.profile__form__info-show').css('display','block');
    });

    // var telStr = $('#profile__tel').val();
    // var telResult = telStr.match(/.*\d/);
    //
    //
    // if (telResult[0].length == 18) {
    //     console.log('true')
    // } else {
    //     console.log('false')
    // }


    $('.js-profile-form-tel').validate({
        rules: {
            profile__tel: {
                required: true
            }
        },
        messages: {
            profile__tel: {
                required: 'Ошибка в номере телефона'
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $('.profile__input__tel').removeClass('active-input').attr('disabled','disabled');
        }
    });

    $('.js-pass-recovery-validate').validate({
        rules: {
            recovery__current: {
                required: true
            },
            recovery__new: {
                required: true
            },
            recovery__new__try: {
                required: true
            },
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $('.js-edit-form').hide();
            $('.purchases__success__block').show();
        }
    });

    $('.js-adress-del').click(function () {
       $(this).parents('.adress__item').remove();
    });

    $('.js-add-adress-form').click(function () {
        $('.js-adress-form').show();
        $(this).hide();
    });


    $('.js-index-subscribe__form').validate({
        rules: {
            email: {
                required: true
            }
        }
    });

    $('.js-stores-form').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true
            }
        }
    });

    $('.catalog-sidebar__check-item-input').change(function () {

        var i = 0;

        $('.catalog-sidebar__check-item-input').each(function () {
            if ($(this).prop('checked')) i++;
        });

        if (i > 1) {
            $('.opt-list__head').fadeIn(300);
        } else {
            $('.opt-list__head').hide();
        }

    });

    var widthLine, beforeLine, posBlock, katBlock;
    beforeLine = $('.header__category-wrap__before');
    widthLine = $('.header__main-category.active').outerWidth();
    posBlock = $('.header__main-category.active').position();
    beforeLine.css('width',widthLine + "px");
    // beforeLine.css('transform', 'translateX(' + posBlock.left + ')px');


    $('.header__main-category').hover(
        function () {
            $('.header__main-category').removeClass('active');
            $(this).addClass('active');
            widthLine = $('.header__main-category.active').outerWidth();
            beforeLine.css('width',widthLine + "px");
            posBlock = $('.header__main-category.active').position();
            beforeLine.css('transform', 'translateX(' + (posBlock.left-15) + 'px)');

            katBlock = $('.header__main-category.active').data('cat');

            var idKat;
            idKat = "#" + katBlock;

            $('.header__menu').removeClass('active-kat');
            $(idKat).addClass('active-kat');

        },
        function () {

        }
    );



    $('.js-stores-form-noreg').validate({
        rules: {
            name: {
                required: true
            },
            phone: {
                required: true
            },
            email: {
                required: true
            },
            stores__house: {
                required: true
            },
            stores__select: {
                required: true
            },
            stores__street: {
                required: true
            }
        }
    });

    $('.js-register-form').validate({
        rules: {
            email: {
                required: true
            },
            pass: {
                required: true
            },
            r_pass: {
                required: true
            }
        }
    });

    $('.js-purchases-form').validate({
        rules: {
            name: {
                required: true
            },
            last: {
                required: true
            },
            ot: {
                required: true
            },
            pass1: {
                required: true
            },
            pass2: {
                required: true
            },
            vidan: {
                required: true
            },
            tel: {
                required: true
            },
            mail: {
                required: true
            },
            adress: {
                required: true
            }
        },
        submitHandler: function(form, event) {
            event.preventDefault();
            $('.purchases__fine-submit').hide();
            $('.purchases__success').show();
            $(form).ajaxSubmit();
        }
    });

    $('.js-password-recovery').validate({
        rules: {
            pass_recovery: {
                required: true
            }
        }
    });

    $('.js-contacts-form').validate({
        rules: {
            phone: {
                required: true
            },
            email: {
                required: true
            },
            textarea: {
                required: true
            }
        }
    });

    $('.js-register-partner-form').validate({
        rules: {
            email: {
                required: true
            },
            pass: {
                required: true
            },
            r_pass: {
                required: true
            },
            cont__face: {
                required: true
            },
            org_name: {
                required: true
            },
            tel: {
                required: true
            },
            yur__adres: {
                required: true
            }
        }
    });

    $('.js-promocode-form').validate({
        rules: {
            promo: {
                required: true
            }
        }
    });

    $('.js-profile-form-pass').validate({
        rules: {
            profile__pass: {
                required: true
            }
        }
    });

    $(".js-adress-form").submit(function(e) {
        e.preventDefault();
    }).validate({
        rules: {
            stores__select: {
                required: true
            },
            stores__street: {
                required: true
            }
        },
        submitHandler: function(form) {
            $('.js-add-adress-form').show();
            $('.js-adress-form').hide();

            var townArr =  $('.js-adress-form').serializeArray();


            $('body').append('<div class="adr hidden-block"></div>');

            $('.adress__item.hidden-block').clone().appendTo('.adr.hidden-block');

            $('.adr.hidden-block').find('.adress__item').removeClass('hidden-block');
            $('.adr.hidden-block').find('.adress__text').html('');
            $('.adr.hidden-block').find('.adress__text').html(''+townArr[0].value+', ул. '+townArr[1].value+' '+townArr[2].value+', квартра '+townArr[3].value+', подъезд '+townArr[4].value+', этаж '+townArr[5].value+'');
            $('.adr.hidden-block .adress__item').appendTo('.adress__block');

            $('body .adr.hidden-block').remove();

            return false;
    }
});


    // edit adress form
    $('.js-adress-edit').click(function () {
        var adressItem = $(this).parents('.adress__item');
        adressItem.find('.adress__text, .adress__btns, .adress__radio').hide();
        $('.adress_edit-form').find('.adress__select').styler('destroy');
        $('.adress_edit-form').clone().appendTo(adressItem);
        adressItem.find('.adress_edit-form').removeClass('hidden-block');
        adressItem.find('.adress__new-adress').show();
        adressItem.find('.adress__select').styler();
    });

    $('.pop-up__treatment__form').find('.cart-reg__item__quantity__input').change(function () {
        $(this).parents('.pop-up__treatment__form').find('.pop-up__treatment__edit').show();
    });


    $('.checked').prop('checked',true);

    $(".js-subs-check").change(function() {
        if($(this).is(":checked")) {
            $('.subs__radio').show();
        } else {
            $('.subs__radio').hide();
        }
    });

    if ($('window').width() <= 543) {
        $('.actions__item').css('height', $('.actions__item').width())
    } else {
        return false
    }

    $('.action__sort__item').click(function () {
        $('.action__sort__item').removeClass('action__sort__active');
        $(this).addClass('action__sort__active');
    });

    $('.action__on-page__item').click(function () {
        $('.action__on-page__item').removeClass('action__on-page__active');
        $(this).addClass('action__on-page__active');
    });

    $('.nav-new__link').click(function () {
        $('.nav-new__link').removeClass('nav-new__active');
        $(this).addClass('nav-new__active');
    });

    $('.nav-category__link').click(function () {
        $('.nav-category__link').removeClass('nav-category__active');
        $(this).addClass('nav-category__active');
    });

    $('.pagination__item').click(function () {
        $('.pagination__item').removeClass('pagination__active');
        $(this).addClass('pagination__active');
    });

    $('.about__menu__item').click(function () {
        $('.about__menu__item').removeClass('about__menu__active');
        $(this).addClass('about__menu__active');
    });

    $('.sidebar__menu__item').click(function () {
        $('.sidebar__menu__item').removeClass('sidebar__menu__active');
        $(this).addClass('sidebar__menu__active');
    });

    $("a.scrollto").click(function () {
        var elementClick = $(this).attr("href")
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated),body:not(:animated)").animate({
            scrollTop: destination
        }, 800);
        return false;
    });

    var current = 1;
    $('.js-feedback-next').on('click', function (e) {
        e.preventDefault();
        current++;
        showSlides(current);
    });

    $('.js-feedback-prev').on('click', function (e) {
        e.preventDefault();
        current--;
        showSlides(current);
    });

    function showSlides(current) {
        $('.about-reviews__main').removeClass('small central').eq(current).addClass('central');
        $('.about-reviews__main').eq(current + 1).addClass('small');
        $('.about-reviews__main').eq(current - 1).addClass('small');

        if (current == 1) {
            $('.js-feedback-prev').hide()
        } else if (current == $('.about-reviews__main').length - 1) {
            $('.js-feedback-next').hide()
        } else {
            $('.js-feedback-prev').show();
            $('.js-feedback-next').show()
        }
    }

    $(".fancybox").fancybox();

    $('.unreg-wrapper__close').click(function (e) {
        e.preventDefault();
       $(this).parents('.unreg-wrapper').css('opacity','0');
    });

    $('.js-sidebar-humb').click(function () {
        $('.icon-ico_humb').toggle();
        $('.icon-ico_humb-close').toggle();
        $('.js-sidebar-slide').slideToggle(300);
        $('.js-sidebar-overlay').toggle();
    });

    $('.js-sidebar-overlay').click(function () {
        $('.icon-ico_humb').toggle();
        $('.icon-ico_humb-close').toggle();
        $('.js-sidebar-slide').slideToggle(300);
        $('.js-sidebar-overlay').toggle();
    });

    $('.js-faq-item').click(function () {

        if ($(this).hasClass('active')) {
            $('.js-faq-item').removeClass('active');
            $(this).children('.faq__answer').hide();
            $('.faq__symbol').text('+')
        } else {
            $('.faq__symbol').text('+');
            $('.js-faq-item').removeClass('active');
            $('.faq__answer').hide();
            $(this).children('.faq__answer').show();
            $(this).addClass('active');
            $(this).children('.faq__symbol').text('-')
        }
    });


    $('.js-mas-wrap').masonry({
        itemSelector: '.js-mas-item'
    });

    $('.js-delivery-tab').click(function () {
        $('.js-delivery-tab').removeClass('delivery__tabs__active');
        $(this).addClass('delivery__tabs__active');
        $('.delivery__tab').removeClass('active');
        var deliveryTab;
        deliveryTab = "." + $(this).attr('data-tab');
        $(deliveryTab).addClass('active');
    });


    $('.js-delivery-tab1').click(function () {
        $('.delivery__tab').removeClass('active');
        $('.delivery__tab1').addClass('active');
    });

    $('.js-delivery-tab2').click(function () {
        $('.delivery__tab').removeClass('active');
        $('.delivery__tab2').addClass('active');
    });

    $('.js-delivery-tab3').click(function () {
        $('.delivery__tab').removeClass('active');
        $('.delivery__tab3').addClass('active');
    });

    $('.search__link').click(function () {
        $('.search__link').removeClass('active');
        $(this).addClass('active');
    });

    var showMap;
    showMap = true;
    $('.delivery__tabs__btn[data-tab="delivery-tab2"]').click(function () {
        if (showMap == true) {
            $('head').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJN5Z0_SNN--bAKm1Yv1c20uNRVilevp0&callback=initMap"></script>');
        }
        showMap = false;
    });
    $('.js-map-show').click(function () {
        if (showMap == true) {
            $('head').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJN5Z0_SNN--bAKm1Yv1c20uNRVilevp0&callback=initMap"></script>');
        }
        showMap = false;
    });
    $('.delivery__map-block__item').click(function () {
        if (showMap == true) {
            $('head').append('<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyDJN5Z0_SNN--bAKm1Yv1c20uNRVilevp0&callback=initMap"></script>');
            $('.contacts__map').show();
        }
        showMap = false;
    });


    $('.delivery__map__tab').click(function () {
        $('.delivery__map__tab').removeClass('active');
        $('.js-map-tab').click(function () {
            $('.js-map-tab').removeClass('active');
            $(this).addClass('active');
            $('.delivery__map__info').removeClass('active');
            var mapTab;
            mapTab = "." + $(this).attr('data-tab');
            $(mapTab).addClass('active');
            setTimeout(function () {
                initMap()
            }, 10);
        });
    });

    $('.delivery__map-block__item').click(function () {
        $('.delivery__map-block__item').removeClass('active');
        $(this).addClass('active');

        var mapInfo = $('.map-info-wrap');

        $(this).after($(mapInfo));

        setTimeout(function () {
            initMap()
        }, 10);
    });

    $('.js-pass-input').click(function () {
        if ($(this).hasClass('active')) {
            $(this).parents('.register__wrap-input').children('input').attr('type','password');
            $(this).removeClass('active');
            $(this).children('.icon-ico-pass-false').hide();
            $(this).children('.icon-ico-pass-true').show();

        } else {
            $(this).parents('.register__wrap-input').children('input').attr('type','text');
            $(this).addClass('active');
            $(this).children('.icon-ico-pass-false').show();
            $(this).children('.icon-ico-pass-true').hide();
        }
    });

    $('.cart-reg__item__close').click(function () {
        $('.close-info').hide();
        $(this).children('.close-info').show();
    });

    // HEADER SEARCH
    var
    headerSearch = $('.js-header-search'),
    searchWrap = $('.header__search-wrap'),
    searchInput = $('.header__search-input'),
    searchBlock = $('.header__search-block'),
    searchSubmit = $('.header__search-submit');

    headerSearch.focus(function () {
        searchWrap.addClass('search-width');
        searchInput.addClass('search-focus');
        searchBlock.show();
        searchSubmit.css('transform','translateX(15px)');
    });

    headerSearch.focusout(function () {
        searchWrap.removeClass('search-width');
        searchInput.removeClass('search-focus');
        searchBlock.hide();
        searchSubmit.css('transform','translateX(0)');
    });

    $('.js-stores-delivery').change(function() {
        if($(this).is(":checked")) {
            $('.stores__item__block').hide();
            $(this).parent('.register__subscribe').next('.stores__item__block').show();
        }
    });

    $('.js-go-metro').click(function (e) {
        e.preventDefault();
        $('.adress__metro select').styler('destroy');
        $('.no-register__small-input').remove();
        $(this).parents('.no-register__street').hide();
        $('.adress__metro').css('display','inline-block');
        $('.adress__metro select').styler({
            selectSearch: true,
            selectSearchLimit: 10
        });
    });

    $('.js-map-item').click(function() {
        $('.stores__map__item').removeClass('active');
        $(this).addClass('active');
        setTimeout(function () {
            initMap()
        }, 10);
    });

    $('.js-register-close').click(function () {
        $('.no-register__login').hide();
    });

    $('.catalog-main__per-page-link').click(function () {
       $('.catalog-main__per-page-link').removeClass('active');
       $(this).addClass('active');
    });

});


//responsive dropdown

    var menu = (function () {
        //cache DOM
        var $menuBtn = $('.js-show-menu');
        var $menuWrapper = $('.mobile-menu-wrapper');
        var $menu = $('.mobile-menu');
        var $html = $('html');
        var $pageWrapper = $('.page-wrapper');

        //bind events
        $menuBtn.on('click', function (e) {
            e.preventDefault();
            var $this = $(this);
            if ($this.hasClass('active')) {
                $this.removeClass('active');
                $menu.removeClass('active');
                $('.header__main').css('opacity','1');
                setTimeout(function () {
                    $html.removeClass('hidden');
                    $menuWrapper.removeClass('hidden');
                    $pageWrapper.removeClass('hidden');

                    $menu.hide()
                }, 500);

            } else {

                $html.addClass('hidden');
                $menuWrapper.addClass('hidden');
                $pageWrapper.addClass('hidden');
                $this.addClass('active');
                $('.header__main').css('opacity','0');
                $menu.show();

                setTimeout(function () {
                    $menu.addClass('active');
                }, 10);
            }
        })
    })();

    $('.item-block__form').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });

    $('.js-discounts-block').matchHeight({
        byRow: true,
        property: 'height',
        target: null,
        remove: false
    });



    $("#contacts__phone, #stores__phone, #profile__tel, #pur__tel, .js-phone-mask").mask("+7 (999) 999 99 99");


    $(".js-promo-input").mask("9999  9999999");

    $('.js-cart-select, .js-delivery-select').styler({
        selectSearch: true,
        selectSearchLimit: 10
    });

    $('.js-cart-quantity').styler();

    $('.js-cart-quantity, .js-inn, .js-ogrn, .js-count').on('keyup keypress', function (e) {
        if (e.keyCode == 8 || e.keyCode == 46) {
        } else {
            var letters = '1234567890';
            return (letters.indexOf(String.fromCharCode(e.which)) != -1);
        }
    });

    $(".js-inn").mask("999999999");

    $(".js-ogrn").mask("9999999999999");

    $(".js-count").mask("99999999999999999999");


    function initMap() {

        //АКТИВНАЯ ТОЧКА

        var positionActive = $('.delivery__map-block__item.active, .stores__map__item.active');
        var positionLat = parseFloat(positionActive.attr('data-lat'));
        var positionLng = parseFloat(positionActive.attr('data-lng'));


        // ТОЧКА НАЧАЛА МАРШРУТА
        var startPosition = $('.js-map-tab.active');
        var getStartLat = parseFloat(startPosition.attr('data-lat'));
        var getStartLng = parseFloat(startPosition.attr('data-lng'));

        var start = {lat: getStartLat, lng: getStartLng};
        var finish = {lat: positionLat, lng: positionLng};


        // console.log(positionLat + " " + positionLng + " координаты активной точки");
        // console.log(getStartLat + " " + getStartLng + " координаты точки начала маршрута");

        var map;
        var mapCenter = {
            lat: 55.753338,
            lng: 37.610503
        };

        var myLatlng = new google.maps.LatLng(positionLat, positionLng);
        map = new google.maps.Map(document.getElementById('map'), {
            center: mapCenter,
            zoom: 10,
            scrollwheel: false
        });

        // МАРКЕР

        var image = 'img/sprites/place.png';
        var posPlace = new google.maps.Marker({

            position: myLatlng,
            map: map,
            icon: image
        });
        posPlace.setMap(map);


        // СТИЛИ КАРТЫ
        var styles = [{
            "elementType": "geometry",
            "stylers": [{
                "color": "#f5f5f5"
            }]
        },
            {
                "elementType": "labels.icon",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "elementType": "labels.text.stroke",
                "stylers": [{
                    "color": "#f5f5f5"
                }]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#bdbdbd"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#eeeeee"
                }]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "road",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#ffffff"
                }]
            },
            {
                "featureType": "road.arterial",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#757575"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#dadada"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.fill",
                "stylers": [{
                    "color": "#ffffff"
                },
                    {
                        "weight": 3
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry.stroke",
                "stylers": [{
                    "visibility": "off"
                }]
            },
            {
                "featureType": "road.highway",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#616161"
                }]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            },
            {
                "featureType": "transit.line",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#e5e5e5"
                }]
            },
            {
                "featureType": "transit.station",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#eeeeee"
                }]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [{
                    "color": "#c9c9c9"
                }]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [{
                    "color": "#9e9e9e"
                }]
            }
        ];

        map.setOptions({
            styles: styles
        });


        // МАРШРУТ

        var directionsDisplay = new google.maps.DirectionsRenderer({
            map: map
        });


        var travelMode = $('.js-map-tab.active').attr('data-travel');

        if (travelMode == undefined) {
            var travelMode = "TRANSIT"
        }


        var request = {
            destination: finish,
            origin: start,
            travelMode: travelMode
        };
        // console.log(travelMode + ' способ передвижения');

        var directionsService = new google.maps.DirectionsService();
        directionsService.route(request, function (response, status) {
            if (status == 'OK') {
                directionsDisplay.setDirections(response);
            }
        });
    }
