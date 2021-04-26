$(function () {
  var productList =
    localStorage.getItem('product-list') === null
      ? []
      : JSON.parse(localStorage.getItem('product-list'))
  console.log(productList.length)
  if (productList.length === 0) {
    $('#checkout-section').remove()
    var emptyCartImage = document.createElement('img')
    emptyCartImage.src = './assests/shopping-cart.png'
    var emptyCartHeading = document.createElement('h1')
    emptyCartHeading.innerHTML = 'Your Cart is Empty!!!'
    var para = document.createElement('p')
    para.innerHTML = 'ADD Items to it!'
    var shopNowButton = document.createElement('a')
    shopNowButton.className = 'shop-now-btn'
    shopNowButton.href = './index.html'
    shopNowButton.innerText = 'Shop Now'
    $('#empty-cart-section')
      .append(emptyCartImage)
      .append(emptyCartHeading)
      .append(para)
      .append(shopNowButton)
  } else {
    $('#empty-cart-section').remove()
  }
  var mainHeading = document.createElement('h1')
  mainHeading.id = 'main-heading'
  mainHeading.innerHTML = 'Checkout'

  var contentWrapper = document.createElement('div')
  contentWrapper.id = 'content-wrapper'

  var itemsListCard = document.createElement('div')
  itemsListCard.id = 'items-list-card'

  var totalCountHeading = document.createElement('h3')
  totalCountHeading.className = 'section-heading'
  var headingText = document.createTextNode('Total Items: ')
  var totalCountSpan = document.createElement('span')
  totalCountSpan.innerHTML = 0

  totalCountHeading.appendChild(headingText)
  totalCountHeading.appendChild(totalCountSpan)

  itemsListCard.appendChild(totalCountHeading)

  var totalCost = 0
  for (var i = 0; i < productList.length; i++) {
    itemsListCard.appendChild(renderItemCard(productList[i]))
    totalCost =
      totalCost +
      parseInt(productList[i].count) * parseInt(productList[i].price)
  }
  if (productList.length > 0) {
    totalCountSpan.innerHTML = productList.length
  } else {
    totalCountSpan.innerHTML = 0
  }

  //Checkout details card
  var checkoutDetailsCard = document.createElement('div')
  checkoutDetailsCard.id = 'checkout-details-card'

  var heading = document.createElement('h3')
  heading.className = 'section-heading'
  heading.innerHTML = 'Total Amount'

  var totalAmount = document.createElement('p')
  var amountText = document.createTextNode('Amount: Rs ')
  var totalAmountSpan = document.createElement('span')
  totalAmountSpan.innerHTML = productList.length > 0 ? totalCost : 0

  totalAmount.appendChild(amountText)
  totalAmount.appendChild(totalAmountSpan)
  checkoutDetailsCard.appendChild(heading)
  checkoutDetailsCard.appendChild(totalAmount)
  checkoutDetailsCard.appendChild(placeOrderButton(productList, totalCost))

  contentWrapper.appendChild(itemsListCard)
  contentWrapper.appendChild(checkoutDetailsCard)
  $('#checkout-section').append(mainHeading).append(contentWrapper)
})
function renderItemCard(product) {
  var itemCard = document.createElement('div')
  itemCard.className = 'item-card'
  var itemImage = document.createElement('img')
  itemImage.src = product.preview

  var details = document.createElement('div')
  details.className = 'details'
  var productName = document.createElement('h3')
  productName.innerHTML = product.name
  var productCount = document.createElement('p')
  productCount.innerText = 'X' + product.count
  var productTotalAmount = document.createElement('p')
  productTotalAmount.innerText =
    'Amount: Rs ' + parseInt(product.count) * parseInt(product.price)

  details.appendChild(productName)
  details.appendChild(productCount)
  details.appendChild(productTotalAmount)

  itemCard.appendChild(itemImage)
  itemCard.appendChild(details)

  return itemCard
}
function placeOrderButton(products, totalAmount) {
  var placeOrderBtn = document.createElement('button')
  placeOrderBtn.innerText = 'Place Order'

  placeOrderBtn.onclick = function () {
    var orderArr = []
    products.forEach((product) => {
      var productObj = {
        id: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        preview: product.preview,
        isAccessory: product.isAccessory,
      }
      orderArr.push(productObj)
    })
    var orderObj = {
      totalAmount: totalAmount,
      allProducts: orderArr,
    }

    $.post(
      'https://608151d273292b0017cdd45e.mockapi.io/order',
      orderObj,
      function (res) {
        console.log(res)
        alert('Order placed successfully!!!')
        localStorage.removeItem('product-list')
        localStorage.setItem('cart-count', 0)
        location.assign('./thankyou.html')
      },
    )
  }

  return placeOrderBtn
}
