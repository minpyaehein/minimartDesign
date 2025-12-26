
let shoppingCart = document.querySelector('.cart');
            
document.querySelector('#cart-btn').onclick = () =>{
    shoppingCart.classList.toggle('active');
}

let pf = document.querySelector('.profile');

document.querySelector('#pf').onclick = () =>{
    pf.classList.toggle('active');
}

if(document.readyState == 'loading'){
    document.addEventListener("DOMContentLoaded", ready);
} else {
    ready();
}

function ready(){
    var removeCartButtons = document.getElementsByClassName('cart-remove')
    for(var i=0;i<removeCartButtons.length; i++){
        var button = removeCartButtons[i]
        button.addEventListener('click',removeCartItem)
    }
    var quantityInputs = document.getElementsByClassName('cart-quantity')
    for(var i=0; i<quantityInputs.length; i++){
        var input = quantityInputs[i]
        input.addEventListener('change',quantityChanged);
    }

    var addCart = document.getElementsByClassName("add")
    for (var i =0; i < addCart.length; i++){
        var button = addCart[i];
        button.addEventListener("click", addCartClicked);
    }
}

function removeCartItem(event){
    var buttonClicked = event.target;
    buttonClicked.parentElement.remove()
    updatetotal();
}

function quantityChanged(event){
    var input = event.target;
    if(isNaN(input.value) || input.value<=0){
        input.value = 1;
    }  
    updatetotal();
}

function addCartClicked(event){
    var button = event.target
    var shopProducts = button.parentElement
    var title = shopProducts.getElementsByClassName("pn")[0].innerText;
    var price = shopProducts.getElementsByClassName("pr")[0].innerText;
    var productImg = shopProducts.getElementsByClassName("product-img")[0].src;
    addProductToCart(title, price, productImg);
    updatetotal();
}

function addProductToCart(title, price, productImg){
    var cartShopBox = document.createElement('div')
    cartShopBox.classList.add("bbox")
    var cartItems = document.getElementsByClassName("ca")[0]
    var cartItemsNames = cartItems.getElementsByClassName("cart-title")
    for (var i=0; i<cartItemsNames.length;i++) {
        if( cartItemsNames[i].innerText == title){
             return;
        }
  }
    
var cartBoxContent = `
                    <i class="fa-solid fa-trash cart-remove"></i>
                    <img src="${productImg}" />
                    <div class="content">
                        <h3 class="cart-title">${title}</h3>
                        <span class="price">${price}</span>
                        <span class="quantity">Qty : </span><input type="number" value="1" class="cart-quantity"/>
                    </div>`;

cartShopBox.innerHTML = cartBoxContent;
cartItems.append(cartShopBox);
cartShopBox.getElementsByClassName("cart-remove")[0].addEventListener("click", removeCartItem);
cartShopBox.getElementsByClassName("cart-quantity")[0].addEventListener("change", quantityChanged);
}


function updatetotal(){
    var cartContent = document.getElementsByClassName('cart')[0]
    var cartBoxes = cartContent.getElementsByClassName('bbox')
    var total = 0;
    var fs=0;
    for (var i=0; i<cartBoxes.length; i++){
        var cartBox = cartBoxes[i]
        var priceElement = cartBox.getElementsByClassName("price")[0]
        var quantityElement = cartBox.getElementsByClassName("cart-quantity")[0]
        var price = parseFloat(priceElement.innerText.replace("Ks", ""));
        var quantity = parseFloat(quantityElement.value);
        total = total +(price * quantity);
        fs = total - (total*0.3);

    }
        if(quantityElement == 0) total =0;
        document.getElementsByClassName("total-price")[0].innerText = "Ks " + fs;    
}


var swiper = new Swiper(".box", {
    slidesPerView: 3,
    spaceBetween: 30,
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });

  function buy(){
    window.alert("Successful!!!");
  }