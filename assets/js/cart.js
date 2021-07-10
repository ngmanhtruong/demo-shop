var productCart = new Array();

function displayCartItems(arr){
    let output = '';
    let index = 0;
    let productCnt = 0;
    let howMany = 0;
    let sumMoney = 0;
    let totalPrice = 0;
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
                    <p><span id = "howMuch">${product.qty}</span>x <span id= "productTitle">${product.title}</span></p>
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
        totalPrice = parseFloat(sumMoney);// 5 is shipping
    }
    let output2 = `                                        
    <div class = "info d-flex flex-wrap">
        <div class = "col left text-start">
            <p>Total Products:</p>
            <p>Total Shipping:</p>
            <p class = "total">Total</p>
        </div>
        <div class = "col right text-end">
            <p id = "totalProducts">${howMany}</p>
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
    displayCartItems(productCart);
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
        displayCartItems(productCart);
    }
}

$("#cartContainer").hover(
    function() {
        $('#cartDisplay').addClass('enabled');
    }, function() {
        setTimeout(2000, function(){
            $('#cartDisplay').removeClass('enabled');
        });
    }
);

$("#cartDisplay").hover(
    function() {
      $('#cartDisplay').addClass('enabled');
    }, function() {
        setTimeout(function(){
            $('#cartDisplay').removeClass('enabled');
        },500);
    }
);


function moveToCheckout(){
    if(confirm('Proceed to check out?')) window.open('../cart.html'); return false;
}