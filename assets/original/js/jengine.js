
function getClientHeight()
{
  return document.documentElement.clientHeight;
}
function getClientWidth()
{
  return document.documentElement.clientWidth;
}

$(document).ready(function(){ 

    $("#about_trigger").click(function() { 

        $("#about_trigger").hide();
     
        $("#about_content").fadeIn();
        return false;

      })
    $("a#about_trigger_hide").click(function() { 

          $("#about_content").fadeOut();
          $("#about_trigger").show();
          return false;
      
    })


    var cl_wi = getClientWidth();

    var wow = new WOW(
      {
        boxClass:     'wow',      /* animated element css class (default is wow)*/
        animateClass: 'animated', /* animation css class (default is animated)*/
        offset:       0,          /* distance to the element when triggering the animation (default is 0)*/
        mobile:       true,       /* trigger animations on mobile devices (default is true)*/
        live:         true,       /* act on asynchronously loaded content (default is true)*/
        callback:     function(box) {
          /* the callback is fired every time an animation is started*/
          /* the argument that is passed in is the DOM node being animated*/
        },
        scrollContainer: null /* optional scroll container selector, otherwise use window*/
      }
    );
    wow.init();
   


    $(".m_menu_btn").click(function(){
        if ($(".m_menu").css("display") == 'none') 
        {
            $(".m_menu").slideToggle(150);
            $(".m_menu_btn").attr("src","/new.cbmo-site/assets/original/img/burger.svg");
        }
        else 
        {
            $(".m_menu").slideToggle(300)
            $(".m_menu_btn").attr("src","/new.cbmo-site/assets/original/img/burger.svg");
        }
    })

    $(".mmenu_href").click(function(){
        $(".mmenu_sub").slideToggle(150);
    })


   
  
    



    $('.select').on('click', '.select__head', function () {
        if ($(this).hasClass('open')) {
            $(this).removeClass('open');
            $(this).next().fadeOut();
        } else {
            $('.select__head').removeClass('open');
            $('.select__list').fadeOut();
            $(this).addClass('open');
            $(this).next().fadeIn();
        }
    });



    $('.modal-call').click(function(){
        //$( '#'+$(this).data( 'target' ) ).removeClass('hidden');
        $( '#'+$(this).data( 'target' ) ).fadeIn(200);
        return false;
    });

    $('.modal-close').click(function(){
        //$(this).parent().parent().addClass('hidden');
        $(this).parent().parent().fadeOut(200);
    });

    $('.select').on('click', '.select__item', function () {
        $('.select__head').removeClass('open');
        $(this).parent().fadeOut();
        $(this).parent().prev().html($(this).html());
        $(this).parent().prev().prev().val($(this).html());
    });

    $(document).click(function (e) {
        if (!$(e.target).closest('.select').length) {
            $('.select__head').removeClass('open');
            $('.select__list').fadeOut();
        }
    });
    

    $("a[href^='#']").click(function(){
        var _href = $(this).attr("href"); 
        _href = _href.replace('/', '');
        $("html, body").animate({scrollTop:0},300);
        return false;
    });

    $("a[href^='/#']").click(function(){
        var _href = $(this).attr("href"); 
        _href = _href.replace('/', '');
        $("html, body").animate({scrollTop:0},300);
        return false;
    });

   


   
    var lastScrollTop = 0;
    $(window).scroll(function(){
        if($(this).scrollTop() > 0){
            $("header").addClass('hfixed');
            $("body").css("padding", $("header").outerHeight() + "px 0 0 0");
        }
        else{
            $("header").removeClass('hfixed')
            $("body").css("padding","0");
        }
   

        var st = $(this).scrollTop();
        if (st > lastScrollTop && st > 100){ // downscroll code
            if  (Math.ceil(st) == $(document).height() - $(window).height()) 
            {
                $("header").stop();
                //setTimeout(function(){ $("header").animate({marginTop:"0"}, 100);}, 100);
            }
            else
            {
                if ($("header").css("margin-top") == "0px")
                {
                    $("header").stop();
                    //setTimeout(function(){ $("header").animate({marginTop:"-90px"}, 100);}, 100);
                }
            }
        }
        else  // upscroll code
        {
            $("header").stop();
            //setTimeout(function(){ $("header").animate({marginTop:"0"}, 100);}, 100);
        }
        lastScrollTop = st;  
    });

    




    $(".totop").click(function(){
        $("html, body").animate({scrollTop:0},300);
    });

    $(window).scroll(function(){
        if($(window).scrollTop() > 200){
            $('.totop').removeClass('hidden');
        }
        else{
            $('.totop').addClass('hidden');
        }        
    });

        
        


});
