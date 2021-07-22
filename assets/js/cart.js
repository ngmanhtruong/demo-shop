var productCart = [];
var storedData = [];
var cartData = [];
productCart = JSON.parse(localStorage["cartData"]);



function displayCartItems(arr){
    let output = '';
    let index = 0;
    var productCnt = 0;
    let howMany = 0;
    let sumMoney = 0; //sum , not include shipping fee.
    let totalPrice = 0; //final
    for (product of arr){
        output += 
        `<li class = "list-group-item">
            <div class = "img">
                <a onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">   
                    <img src="${product.image}" alt="${product.title}">
                </a>
            </div>
            <div class = "description">
                <div class = "title">
                    <p><span id = "howMuch"><strong>${product.qty}</strong></span>x   <span id= "productTitle">${product.title}</span></p>
                </div>
                <div class = "price">
                    <p>&dollar;${product.price}</p>
                </div>
            </div>
            <div class = "delete-item">
                <div class = "img">
                    <a onClick = "deleteCartProduct(${index++})">
                        <img src="assets/images/trash.svg" alt="delete">
                    </a>
                </div>
            </div>
        </li>`;
        productCnt+= product.qty;
        howMany+=1;
        sumMoney += product.price * product.qty;
        totalPrice = parseFloat(sumMoney);
    }
    let output2 = `                                        
    <div class = "info d-flex flex-wrap">
        <div class = "col left text-start">
            <p>Total Items:</p>
            <p>Total Shipping:</p>
            <p class = "total">Total</p>
        </div>
        <div class = "col right text-end">
            <p id = "totalProducts">${productCnt}</p>
            <select id = "totalShipping" onchange="shippingFunction()">
                <option value = "0">SHIPPING METHOD</option>
                <option value = "1">BASIC SHIPPING: &dollar;5</option>
                <option value = "2">FAST SHIPPING: &dollar;7.99</option>
            </select>
            <p class = "total" id = "totalPrice" data-value="${totalPrice.toFixed(2)}">&dollar;${totalPrice.toFixed(2)}</p>
        </div>
    </div>
    <div class = "checkout">
        <button class="btn btn-outline-success" onClick = "moveToCheckout()">CHECK OUT</button>
    </div>`;

    document.querySelector('ul#cartList').innerHTML = output;
    document.querySelector('#sumAndTaxes').innerHTML = "&dollar;" + output2;
}


function addToCart(getId){
    let isTheSame = false;
    for (let cart of productCart){
        if (cart.id == getId){
            cart.qty += 1;
            isTheSame = true;
            break;
        } else{
            isTheSame = false;
        }
    }
    for (product of products){
        if (product.id == getId && isTheSame == false){
            let qty = 1;
            product.qty = qty;
            productCart.push(product);
        }
    }
    var cartData = productCart;
    localStorage["cartData"] = JSON.stringify(cartData);

    storedData = JSON.parse(localStorage["cartData"]);
    displayCartItems(storedData);
}
function shippingFunction(){
    var ship = document.querySelector("#totalShipping").value;
    if (ship == 1){
        let x = document.querySelector('p#totalPrice');
        let xvalue = x.dataset.value;
        document.querySelector('p#totalPrice').innerHTML = "&dollar;" + (parseFloat(xvalue) + 5).toFixed(2);
    }
    if (ship == 2){
        let x = document.querySelector('p#totalPrice');
        let xvalue = x.dataset.value;
        document.querySelector('p#totalPrice').innerHTML = "&dollar;" + (parseFloat(xvalue) + 7.99).toFixed(2);
    }
}

function deleteCartProduct(getIndex){
    if (confirm("Are you sure?")){
        productCart.splice(getIndex, 1);
        cartData = productCart;
        localStorage["cartData"] = JSON.stringify(cartData);
        storedData = JSON.parse(localStorage["cartData"]);
        displayCartItems(storedData);
    }
}

$(".go-to-cart").click(function(){
    if ($('#cartDisplay').hasClass('enabled')){
        $('#cartDisplay').removeClass('enabled');
    }
    else{
        $('#cartDisplay').addClass('enabled');
    }
});
$("#cartDisplay").click(function(e){
    e.stopPropagation();
});
$(".go-to-cart").hover(
    function() {
        $('#cartDisplay').addClass('enabled');
    }, function() {
        $('#cartDisplay').removeClass('enabled');
    }
);
$("#cartDisplay").hover(
    function() {
        $('#cartDisplay').addClass('enabled');
    }, function() {
        $('#cartDisplay').removeClass('enabled');
    }
);

function moveToCheckout(){
    if(confirm('Proceed to check out?')) window.open('../cart.html'); return false;
}

//LOAD CART ON RELOAD
$(document).ready(function() {
    displayCartItems(productCart);
});