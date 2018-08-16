$(document).ready(function(){

    /* SCROLL UP BUTTON */
    $(window).scroll(function(){
        $("#compact-navbar").hide();
        const up = $("#up");
        const scrollTop = $(window).scrollTop();
        const scrollBottom = $(document).height() - $(window).height() - scrollTop;
        if (scrollTop > 50 && scrollBottom > 50) {
            up.show();
        } else {
            up.hide();
        }
    })
    $("#up").click(function(){
        $('html, body').animate({
            scrollTop: 0
        }, 500, 'swing');
    })

    /* RESPONSIVE NAVBAR MENU ICON */
    $("#navbar-menu-icon").click(function(){
        const cn = $("#compact-navbar");
        if (cn.is(":visible")) {
            cn.hide();
        } else {
            cn.show();
            cn.delay(10000).hide(1);
        }
    })

    /* NAVBAR LINKS */
    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        const top = $(document).height() -
            (Math.max($(document).height() - $($(this).attr('href')).offset().top, $(window).height()));
    
        $('html, body').animate({
            scrollTop: top
        }, 500, 'swing');
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
 });