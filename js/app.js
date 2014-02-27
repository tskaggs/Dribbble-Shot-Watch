$( document ).ready(function() {
  function shot_get(username) {
    $.ajax({
      type: "GET",
      url: "http://api.dribbble.com/players/"+ username +"/shots",
      crossDomain:true,
      cache:false,
      async:false,
      success: function(msg){
          var url            = msg.shots[0].url;
          var comments_count = msg.shots[0].comments_count;
          var likes_count    = msg.shots[0].likes_count;
          var rebounds_count = msg.shots[0].rebounds_count;
          var views_count    = msg.shots[0].views_count;
          var title          = msg.shots[0].title; image_400_url
          var image_400_url  = msg.shots[0].image_400_url;

          $('.shot').attr('src' , image_400_url);
          $('.comments_count span').text(comments_count);
          $('.likes_count span').text(likes_count);
          $('.rebounds_count span').text(rebounds_count);
          $('.views_count span').text(views_count);

          $('.shot_input p').css('color','#8A8A8A');
          $('.shot_input p').text('Add your Dribbble username to start!');

          $('.title').text(title);
          $('a.shot_link').attr('href', url);
          $('.shot_input').hide();
          $('.shot_link').css('display', 'inline-block');

     }, 
     error: function(jxhr){
        $('.shot_input').show();
        $('.shot_input p').css('color','#FF8989');
        $('.shot_input p').text('Sorry something went wrong. Try Again!');
        localStorage.removeItem('dribbble');
     }
    });
  }
  
  $('.big_card').hover(function() {
    $('.big_card .shot_hover').fadeToggle('faster');
  });

  if (localStorage.getItem('dribbble')) {
    $('.shot_input').hide();
    username = localStorage.getItem('dribbble');
    shot_get(username);
  } else {
    $('.shot_input p').css('color','#8A8A8A');
    $('.shot_input p').text('Add your Dribbble username to start!');
    $('.shot_input').show();
  }

  $('.shot_input a').click(function() {
    var username = $('.shot_input div').text();
    shot_get(username);
    localStorage.setItem('dribbble', username);
  });

});