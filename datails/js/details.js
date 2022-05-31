function Move(a, b) {
  a.on('mouseenter', function () {
    b.stop().fadeIn()
  })
  a.on('mouseleave', function () {
    b.stop().fadeOut()
  })
} // 封装移入移出函数
Move($('.connect'), $('.fixed-right-img'))
Move($('.app'), $('.fixed-right-img1'))
Move($('.newman'), $('.fixed-right-img2'))
Move($('.focus'), $('.fixed-right-img3'))

// 浏览器滚动距离大于10 显示回到顶部按钮 点击回到顶部
$(window).on('scroll', function () {
  if ($(window).scrollTop() > 10) {
    $('.return-top').stop().slideDown('fast')
  } else {
    $('.return-top').stop().slideUp('fast')
  }
})
$('.return-top').on('click', function () {
  $('html').stop().animate({
    scrollTop: 0
  }, 200, 'linear')
})
Move($('.banner-left-one'), $('.banner-left-box'))
Move($('.banner-left-two'), $('.banner-left-box1'))
$('.focus1').on('click', function () {
  $('.fixed-right-img4').stop().fadeIn()
})
$('.focus1').on('mouseleave', function () {
  $('.fixed-right-img4').stop().fadeOut()
})
let search= document.querySelector('.sear')
let searindex=0
let sarr=['手机','电脑','台灯','小米平板','超声波清洗器','扫地机器人']
setInterval(() => {
  search.placeholder=sarr[searindex]
  searindex++
  if(searindex==sarr.length){
    searindex=0
  }
}, 3000);
//点击添加购物车 发送Ajax请求
$('.add-cart').click(function(){
  $.ajax({
    url:'http://localhost:8080/interface/add.php',
    type:'post',
    data:{
      id:$('#hide').text().trim(),
      name:$('.name').text().trim(),
      num:$('.num').val().trim(),
      price:$('.main-money').text().trim().substring(1),
      img:$('.img').attr('src').trim()
    },
    success:function(res){
      console.log(res)
    },
    dataType:"json"
  })
})