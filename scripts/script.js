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
            $("#" + selectedValue).addClass(activeClass);
        }
    });

    /* EGG */
    var egg = new Egg();
    egg.addCode("up,up,down,down,left,right,left,right,b,a", function() {
        jQuery('#egg').fadeIn(null, function() {
            $(this).delay(5000).fadeOut();
          }).css('display', 'flex');
    });
    egg.listen();
 });