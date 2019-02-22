;
(function($) {
    var _clsMenu = 'menu__item--current';

    $(document).on('click', '[data-lightbox]', lity);

    $(document).ready(function() {


        var cloneRows = 1,
            containerMul = $('.container.multiple');
        containerMulH = 0, headerH = $('.header'), _section = $('.section');
  
        $('.cintillo').slick({
            dots: false,
            infinite: true,
            speed: 500,
            arrows: false,
            fade: true,
            cssEase: 'linear',
            customPaging: function() {
                return false;
            }
        });
        $('.video-list').slick({
            slidesToShow: 3,
            slidesToScroll: 3,
            dots: true,
            centerMode: true,
            focusOnSelect: true,
            infinite: true,
            arrows: false,
            customPaging: function(slider, i) {
                var thumb = $(slider.$slides[i]).data();
                return '<a href="javascript:;" class="trans-3"></a>';
            },
            responsive: [{
                    breakpoint: 995,
                    settings: {
                        slidesToShow: 2,
                        slidesToScroll: 2
                    }
                }, {
                    breakpoint: 700,
                    settings: {
                        slidesToShow: 1,
                        slidesToScroll: 1,

                    }
                },

            ]
        });
        $(window).on('scroll', function() {

            if ($(this).scrollTop() > _section.height()) {
                headerH.addClass('sticky');
                return false;
            }
            headerH.removeClass('sticky');
            return false;
        });




        $(document).on('click', function(event) {

            var clickover = $(event.target);
            var _opened = $(".navbar-collapse").hasClass("show");

            if (_opened === true && !clickover.hasClass("navbar-toggler")) {
                $(".navbar-collapse").collapse("hide");;
            }
        });



        $(document).on("scroll", onScroll);

        //smoothscroll
        $('.header .navbar .navbar-nav li a').on('click', function(e) {


            if ($(this.hash).length == 0) {
                if (!$('body').hasClass('home')) {
                    return true;
                }
            }

            e.preventDefault();




            $(document).off("scroll");

            $('a').parent().each(function() {
                $(this).removeClass(_clsMenu);
            })
            $(this).parent().addClass(_clsMenu);

            var target = this.hash,
                menu = target;
            $target = $(target);

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top - 100
            }, 500, 'swing', function() {
                //window.location.hash = target;
                $(document).on("scroll", onScroll);
            });
        });
    });

    function onScroll(event) {
        var scrollPos = $(document).scrollTop(),
            menua = $('.header .navbar .navbar-nav li a');

        menua.each(function() {
            var currLink = $(this),
                refElement = $(currLink.attr("href").substring(currLink.attr("href").indexOf('#'))),
                _parent = $(this).parent();
            if (refElement.length != 0) {
                if (refElement.position().top - 100 <= scrollPos && (refElement.position().top - 100) + refElement.height() > scrollPos) {
                    menua.parent().removeClass(_clsMenu);
                    _parent.addClass(_clsMenu);
                } else {
                    _parent.removeClass(_clsMenu);
                }
            }
        });
    }



    if (window.location.hash) scroll(0, 0);
    setTimeout(function() {
        scroll(0, 0);
    }, 1);

    $(function() {



        if (window.location.hash) {


            $('html, body').animate({
                scrollTop: $(window.location.hash).offset().top + 100 + 'px'
            }, 1000, 'swing');
        }




    });
})(jQuery);
new WOW({
    offset: 200,
}).init();