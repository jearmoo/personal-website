$(document).ready(function(){

    /* SCROLL UP BUTTON */
    $(window).scroll(function(){
        $("#compact-navbar").slideUp();
        const up = $("#up");
        const scrollTop = $(window).scrollTop();
        const scrollBottom = $(document).height() - $(window).height() - scrollTop;
        if (scrollTop > 50 && scrollBottom > 50) {
            up.fadeIn();
        } else {
            up.fadeOut();
        }
    })
    $("#up").click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 1500, 'easeOutCubic');
    })

    /* RESPONSIVE NAVBAR MENU ICON */
    $("#navbar-menu-icon").click(function(){
        const cn = $("#compact-navbar");
        if (cn.is(":visible")) {
            cn.slideUp();
        } else {
            cn.slideDown();
        }
    })

    /* NAVBAR LINKS */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        const top = $(document).height() -
            (Math.max($(document).height() - $($(this).attr('href')).offset().top, $(window).height()));

        $('html, body').animate({
            scrollTop: top
        }, 1500, 'easeOutCubic');
    });

    /* PROJECTS PICKER */
    $("#projects-picker").imagepicker({
        changed: function(select, newValues) {
            const selectedValue = newValues[0];
            const activeClass = "project-active";
            $("." + activeClass).removeClass(activeClass);
            $("#" + selectedValue).css({
                "animation-name": "fade-in",
                "animation-duration": "1s"
            }).addClass(activeClass);
        }
    });

    /* FOX HUNT */
    $("#fox-start").one('click', function(){
        $("#fox-start-speak").slideDown(null, function() {
            $(this).delay(9000).fadeOut();
            $("#fox-start").delay(10000).fadeOut();
            $("#fox-next").delay(11000).fadeIn();
        });

        $("#fox-next").one('click', function(){
            $("#fox-next-speak").slideDown(null, function() {
                $(this).delay(9000).fadeOut();
                $("#fox-next").delay(10000).fadeOut();
                $("#fox-next-next").delay(11000).fadeIn();
            });


            $("#fox-next-next").one('click', function(){
                $("#fox-next-next-speak").slideDown(null, function() {
                    $(this).delay(9000).fadeOut();
                    $("#fox-next-next").delay(10000).fadeOut();
                    setTimeout(function(){
                        var egg = new Egg();
                        egg.addCode("up,up,down,down,left,right,left,right,b,a", function() {
                            $('#fox-hard-container').fadeIn(null, function() {
                                $(this).delay(5000).fadeOut();
                            }).css('display', 'flex');
                        });
                        egg.listen();
                    }, 11000)
                });
            });
        });
    });
 });