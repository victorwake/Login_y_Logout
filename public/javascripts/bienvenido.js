$(document).ready(function(){
	var tl = new TimelineLite()
	,inter = 30
  ,speed = 1
  ,$text = $('.text');
  function animInfinite(){
    $('.text').each(function(index,val) {
      index = index + 1;
      TweenMax.fromTo(
        $(this), speed, {autoAlpha:0},{autoAlpha:0+(0.01*index),delay:0.1*index});
     });
    TweenMax.to(
      $('.text:nth-child(30)'), speed,{autoAlpha:1.5,delay:3.5}
    );
  }
  $('.typer input').keyup(function() {
    //Stop Everything First
    TweenMax.killAll(false, true, false);
    TweenMax.set($text, {autoAlpha:0});
    $text.text(this.value);
     animInfinite();
  });
  animInfinite();
});