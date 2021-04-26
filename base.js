$(document).ready(function () {
  var totalCount =
    localStorage.getItem('cart-count') === null
      ? 0
      : localStorage.getItem('cart-count')
  $('#cart-counter').text(totalCount)

  $('#bars-icon').click(function (e) {
    $(this).toggleClass('fa-bars')
    $(this).toggleClass('fa-times bigger')
    $('.menu-items-wrapper').toggleClass('sidebar-in')
  })
})
