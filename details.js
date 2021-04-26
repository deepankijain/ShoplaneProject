$(document).ready(function () {
  var currentProductId = location.search.split('=')[1]
  $.get(
    'https://5d76bf96515d1a0014085cf9.mockapi.io/product/' + currentProductId,
    function (data) {
      renderDetails(data)
    },
  )

  function renderDetails(product) {
    var leftColumn = document.createElement('div')
    leftColumn.id = 'left-column'

    var productImage = document.createElement('img')
    productImage.id = 'product-image'
    productImage.src = product.preview
    productImage.alt = product.name

    leftColumn.appendChild(productImage)
    var rightColumn = document.createElement('div')
    rightColumn.id = 'product-details'

    var productName = document.createElement('h1')
    productName.innerHTML = product.name

    var productBrand = document.createElement('h3')
    productBrand.innerHTML = product.brand

    var productPrice = document.createElement('h4')
    productPrice.className = 'section-heading'
    var priceText = document.createTextNode('Price: Rs ')
    var priceSpan = document.createElement('p')
    priceSpan.id = 'product-price'
    priceSpan.innerHTML = product.price

    productPrice.appendChild(priceText)
    productPrice.appendChild(priceSpan)

    var headingDesc = document.createElement('h4')
    headingDesc.className = 'section-heading'
    headingDesc.innerHTML = 'Description'

    var productDesc = document.createElement('p')
    productDesc.id = 'product-desc'
    productDesc.innerHTML = product.description

    var headingProductPreview = document.createElement('h4')
    headingProductPreview.className = 'section-heading'
    headingProductPreview.innerHTML = 'Product Preview'

    var previewImagesWrapper = document.createElement('div')
    previewImagesWrapper.id = 'preview-images-wrapper'

    product.photos.forEach(function (url, index) {
      var previewImage = document.createElement('img')
      previewImage.className = 'preview-image'
      previewImage.src = url
      if (index === 0) {
        previewImage.classList.add('active')
      }
      previewImagesWrapper.appendChild(previewImage)
      previewImage.onclick = function (e) {
        $('.preview-image').removeClass('active')
        $(this).addClass('active')
        $('#product-image').attr('src', url)
      }
    })

    rightColumn.appendChild(productName)
    rightColumn.appendChild(productBrand)
    rightColumn.appendChild(productPrice)
    rightColumn.appendChild(headingDesc)
    rightColumn.appendChild(productDesc)
    rightColumn.appendChild(headingProductPreview)
    rightColumn.appendChild(previewImagesWrapper)
    rightColumn.appendChild(renderAddToCartBtn(product))

    $('#product-wrapper').append(leftColumn).append(rightColumn)
  }

  function renderAddToCartBtn(product) {
    var btn = document.createElement('button')
    btn.id = 'btn-add-to-cart'
    btn.innerHTML = 'Add to Cart'
    btn.onclick = function (e) {
      var productList =
        localStorage.getItem('product-list') === null
          ? []
          : JSON.parse(localStorage.getItem('product-list'))
      if (productList.length > 0) {
        var isPresent = false
        for (var i = 0; i < productList.length; i++) {
          if (parseInt(productList[i].id) === parseInt(product.id)) {
            productList[i].count = parseInt(productList[i].count) + 1
            isPresent = true
          }
        }
        if (!isPresent) {
          product.count = 1
          productList.push(product)
        }
      } else {
        product.count = 1
        productList.push(product)
      }
      localStorage.setItem('product-list', JSON.stringify(productList))
      var totalCount = 0
      for (var i = 0; i < productList.length; i++) {
        totalCount += parseInt(productList[i].count)
      }

      localStorage.setItem('cart-count', totalCount)
      $('#cart-counter').text(totalCount)
    }
    return btn
  }
})
