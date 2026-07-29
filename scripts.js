$(function() {
   let header = $('.header-bg');
   let hederHeight = header.height(); // вычисляем высоту шапки
    
   $(window).scroll(function() {
     if($(this).scrollTop() > 1) {
      header.addClass('header-bg_fixed');
      $('body').css({
         'paddingTop': hederHeight+'px' // делаем отступ у body, равный высоте шапки
      });
     } else {
      header.removeClass('header-bg_fixed');
      $('body').css({
       'paddingTop': 0 // удаляю отступ у body, равный высоте шапки
      })
     }
   });
  });