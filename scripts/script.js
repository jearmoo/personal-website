$(document).ready(function(){

    // jQuery methods go here...
    $("#navbar-menu-icon").click(function(){
        $("#compact-navbar").toggle();
    })

    $('a[href*="#"]').on('click', function (e) {
        e.preventDefault();

        const top = $(document).height() -
            (Math.max($(document).height() - $($(this).attr('href')).offset().top, $(window).height()));
    
        $('html, body').animate({
            scrollTop: top
        }, 500, 'swing');
    });
 });