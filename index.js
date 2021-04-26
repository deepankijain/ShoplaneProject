$(document).ready(function () {
  $('.carousel').slick({
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    infinite: true,
    speed: 1000,
    fade: true,
    cssEase: 'linear',
  })

  function renderProductCard(product) {
    var productCard = document.createElement('a')
    productCard.className = 'product-card'
    productCard.href = '/details.html?product-id=' + product.id

    var productPreviewImage = document.createElement('img')
    productPreviewImage.classList.add('product-image')
    productPreviewImage.alt = 'Product Preview' + product.name
    productPreviewImage.src = product.preview

    productCard.appendChild(productPreviewImage)

    var productDetails = document.createElement('div')
    productDetails.className = 'product-details'

    var productName = document.createElement('h4')
    productName.innerHTML = product.name

    var productBrand = document.createElement('h5')
    productBrand.innerHTML = product.brand

    var productPrice = document.createElement('p')
    productPrice.innerHTML = 'Rs ' + product.price

    productDetails.appendChild(productName)
    productDetails.appendChild(productBrand)
    productDetails.appendChild(productPrice)

    // productCard.appendChild(productLink)
    productCard.appendChild(productDetails)
    return productCard
  }

  $.get(
    'https://5d76bf96515d1a0014085cf9.mockapi.io/product',

    function (products) {
      products.forEach(function (product) {
        if (product.isAccessory === true) {
          $('#accessory-grid').append(renderProductCard(product))
        } else {
          $('#clothing-grid').append(renderProductCard(product))
        }
      })
    },
  )
})
