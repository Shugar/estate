$(document).ready(() => {
  $('.suggestions-list').slick({
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 3,
    adaptiveHeight: true,
    responsive: [
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  });

  $('.additional-list').slick({
    dots: true,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    customPaging : function(slider, i) {
        var thumb = $(slider.$slides[i]).find('.title').text();
        return '<div class="custom-dot">'+ thumb + '</div>';
    }
  });
});
