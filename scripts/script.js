const SCROLL_BUTTON_THRESHOLD = 100;
const SCROLL_TIME_MS = 1500;
const FOX_NEXT_TOP_RIGHT = [0,60,0,60];
const FOX_NEXT_NEXT_BOTTOM_LEFT = [0,50,25,55];

$(document).ready(function(){
    /* SCROLL UP BUTTON */
    $(window).scroll(function(){
        $("#compact-navbar").slideUp();
        const up = $("#up");
        const scrollTop = $(window).scrollTop();
        const scrollBottom = $(document).height() - $(window).height() - scrollTop;
        if (scrollTop > SCROLL_BUTTON_THRESHOLD && scrollBottom > SCROLL_BUTTON_THRESHOLD) {
            up.fadeIn();
        } else {
            up.fadeOut();
        }
    })
    $("#up").click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, SCROLL_TIME_MS, 'easeOutCubic');
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
        }, SCROLL_TIME_MS, 'easeOutCubic');
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

    function randomNumber(lo,hi) {
        return (Math.floor(Math.random() * (hi-lo+1)) + lo).toString() ;
    }

    function randomCSSTopRight(topRight,topOffset,rightOffset) {
        const top = randomNumber(topRight[0], topRight[1]) + "%";
        const right = randomNumber(topRight[2], topRight[3]) + "%";
        return [
            {
                top: top,
                right: right
            },
            {
                top: "calc(" + top + " + " + topOffset + "px)",
                right: "calc(" + right + " + " + rightOffset + "px)"
            }
        ];
    }

    function randomCSSBottomLeft(bottomLeft,bottomOffset,leftOffset) {
        const bottom = randomNumber(bottomLeft[0], bottomLeft[1]) + "%";
        const left = randomNumber(bottomLeft[2], bottomLeft[3]) + "%";
        return [
            {
                bottom: bottom,
                left: left
            },
            {
                bottom: "calc(" + bottom + " + " + bottomOffset + "px)",
                left: "calc(" + left + " + " + leftOffset + "px)"
            }
        ];
    }


    /* FOX HUNT */
    $("#fox-start").one('click', function(){
        const foxNextPositions = randomCSSTopRight(FOX_NEXT_TOP_RIGHT,0,30);
        $("#fox-start-speak").slideDown(null, function() {
            $(this).delay(9000).fadeOut();
            $("#fox-start").delay(10000).fadeOut();
            $("#fox-next").css(foxNextPositions[0]).delay(11000).fadeIn();
        });

        const foxNextNextPositions = randomCSSBottomLeft(FOX_NEXT_NEXT_BOTTOM_LEFT,30,0);
        $("#fox-next").one('click', function(){
            $("#fox-next-speak").css(foxNextPositions[1]).slideDown(null, function() {
                $(this).delay(9000).fadeOut();
                $("#fox-next").delay(10000).fadeOut();
                $("#fox-next-next").css(foxNextNextPositions[0]).delay(11000).fadeIn();
            });

            $("#fox-next-next").one('click', function(){
                $("#fox-next-next-speak").css(foxNextNextPositions[1]).slideDown(null, function() {
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
                    $("#fox-hard-hint").delay(11000).fadeIn();
                });
            });
        });
    });
 });