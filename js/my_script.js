/* pixel threshold before scroll up button is shown */
const SCROLL_BUTTON_THRESHOLD = 100;

/* time to smooth scroll to a location on the page */
const SCROLL_TIME_MS = 1500;

/* percent ranges for positions of hidden foxes */
const FOX_NEXT_TOP_RIGHT = [0,60,0,60];
const FOX_NEXT_NEXT_BOTTOM_LEFT = [0,50,25,55];
const FOX_NEXT_SPEECH_OFFSET = [0,30];
const FOX_NEXT_NEXT_SPEECH_OFFSET = [30,0];

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

    /* RESPONSIVE NAVBAR MENU ICON SHOW AND HIDE */
    $("#navbar-menu-icon").click(function(){
        const cn = $("#compact-navbar");
        if (cn.is(":visible")) {
            cn.slideUp();
        } else {
            cn.slideDown();
        }
    })

    /* NAVBAR LINKS SMOOTH SCROLLING */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        const top = $(document).height() -
            (Math.max($(document).height() - $($(this).attr('href')).offset().top, $(window).height()));

        $('html, body').animate({
            scrollTop: top
        }, SCROLL_TIME_MS, 'easeOutCubic');
    });

    /* PROJECTS PICKER FADER */
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
    function randInt(lo,hi) {
        return (Math.floor(Math.random() * (hi-lo+1)) + lo).toString() ;
    }

    /* generate css for random position for a fox and its speech bubble */
    function randomPosCSS(ranges, firstName, secondName, offset) {
        const first = randInt(ranges[0], ranges[1]) + "%";
        const second = randInt(ranges[2], ranges[3]) + "%";
        return [
            {
                [firstName]: first,
                [secondName]: second
            },
            {
                [firstName]: "calc(" + first + " + " + offset[0] + "px)",
                [secondName]: "calc(" + second + " + " + offset[1] + "px)"
            }
        ];
    }

    $("#fox-start").one('click', function(){
        const foxNextPositions = randomPosCSS(FOX_NEXT_TOP_RIGHT,'top','right',FOX_NEXT_SPEECH_OFFSET);
        $("#fox-start-speak").slideDown(null, function() {
            $(this).delay(9000).fadeOut();
            $("#fox-start").delay(10000).fadeOut();
            $("#fox-next").css(foxNextPositions[0]).delay(11000).fadeIn();
        });

        const foxNextNextPositions = randomPosCSS(FOX_NEXT_NEXT_BOTTOM_LEFT,'bottom','left',FOX_NEXT_NEXT_SPEECH_OFFSET);
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
