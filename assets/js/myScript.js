let fullProductUrl = 'https://fakestoreapi.com/products';
//CREATE PRODUCTS ARRAY
var products = [];

//FECTCH FROM FAKEAPISTORE
fetch(fullProductUrl,{})
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        initData(data);
        products = data;
        console.log(products);
    })
    .catch(err => console.log(err));


//KHOI TAO DATA CHO MANG PRODUCT VA LOAD CAC SAN PHAM MAC DINH TREN PAGE
function initData(data){
    productArr = data;
    products = productArr;

    //show products by default
    trendingProducts(productArr);
    displayClothes(productArr);
    displayElectronics(productArr);
    displayJewelry(productArr);



    //LOADING ABOVE THIS LINE
    $(".loader-wrapper").fadeOut("slow");
}


//RANDOM INTERGER TO MAKE DISCOUNT PERCENT
function getRndInteger() {
    let min = 1;
    let max = 10;
    let discount = (Math.floor(Math.random() * (max - min + 1)) + min)*10;
    if (discount == 10 || discount == 20 || discount == 30 || discount == 40){
        return discount;
    } else{
        return getRndInteger();
    }
}

function trendingProducts(arr){
    let output = '';
    let count = 1;
    let discount = getRndInteger();
    let re = /(^1|^3|^4|7|13|15|17|20)(?!\d)/;
    let re2 = /(Foldsack No. 1 Backpack)/;
    for (product of arr){
        if(re.test(product.id)){
            let price = (product.price - product.price*discount/100).toFixed(2);
            output += `
            <div class = "item item${count++}">
                <div class = "item-width">
                    <div class = "img">
                        <a class = "img-click" onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                    </div>
                    <div class = "product-description d-flex">
                        <h3 class = "product-title overlock">${product.title}</h3>
                        <div class = "product-price-and-discount">
                            <span class = "regular-price">&dollar;${product.price}</span>
                            <span class = "discount-percentage">${discount} %</span>
                            <span class = "price">${price} USD</span>
                        </div>
                    </div>
                </div>
                <div class = "item-hover">
                    <span class = "overlock" data-id = "${product.id}" onClick = "addToCart(${product.id})">ADD TO CART</span>
                </div>
            </div>`;
        }
    }
    document.querySelector("#trendingProducts").innerHTML = output;
}


function displayBestSellers(arr){
    let output = '';
    let count = 1;
    let discount = getRndInteger();
    let re = /(^3|^4|15|17)(?!\d)/;
    for (product of arr){
        if(re.test(product.id)){
            let price = (product.price - product.price*discount/100).toFixed(2);
            output += `
            <div class = "item item${count++}">
                <div class = "item-width">
                    <div class = "img">
                        <a class = "img-click" onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                    </div>
                    <div class = "product-description d-flex">
                        <h3 class = "product-title overlock">${product.title}</h3>
                        <div class = "product-price-and-discount crimson">
                            <span class = "regular-price">&dollar;${product.price}</span>
                            <span class = "discount-percentage">${discount}%</span>
                            <span class = "price">${price} USD</span>
                        </div>
                    </div>
                </div>
                <div class = "item-hover">
                    <span class = "overlock" data-id = "${product.id}" onClick = "addToCart(${product.id})">ADD TO CART</span>
                </div>
            </div>`;
        }
    }
    document.querySelector("#trendingProducts").innerHTML = output;
}

//CREATE A VALUE TO KNOW IF IT IS PAGE 1 or 2
var whichPageIsIt = 1; //DEFAULT BY 1

function displayClothes(arr){
    let output = '';
    let count = 1;
    let clothesCount = 1;
    whichPageIsIt = 1; //PAGE 1
    let re = /(clothing)/;
    let re2 = /(Removable)/;
    let re3 = /(3-in-1)/;
    let discount = getRndInteger();
    for (product of arr){
        if(re.test(product.category) && product.id != 1 && clothesCount < 6){
            if(re2.test(product.title)){
                product.title = "Removable Hooded Faux Leather";
            }
            if(re3.test(product.title)){
                product.title = "Snowboard Jacket Winter Coats";
            }
            let price = (product.price - product.price*discount/100).toFixed(2);
            clothesCount++;
            output += `
            <div class = "item item${count++}">
                <div class = "item-width">
                    <div class = "img">
                        <a class = "img-click" onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                    </div>
                    <div class = "product-description d-flex">
                        <h3 class = "product-title overlock">${product.title}</h3>
                        <div class = "product-price-and-discount crimson">
                            <span class = "regular-price">&dollar;${product.price}</span>
                            <span class = "discount-percentage">${discount}%</span>
                            <span class = "price">${price} USD</span>
                        </div>
                    </div>
                </div>
                <div class = "item-hover">
                    <span class = "overlock" data-id = "${product.id}" onClick = "addToCart(${product.id})">ADD TO CART</span>
                </div>
            </div>`;
        }
    }
    document.querySelector("#clothesSection").innerHTML = output;
    document.querySelector("#clothesSection").style.justifyContent = 'space-between';
}


function displayClothesPage2(arr){
    let output = '';
    let count = 1;
    let clothesCount = 1;
    whichPageIsIt = 2; //PAGE 2
    let re = /(clothing)/;
    let re4 = /(Windbreaker Striped)/;
    let re5 = /(Solid Short Sleeve)/;
    let re6 = /(Moisture)/;
    let re7 = /(Womens T Shirt Casual)/;
    let discount = getRndInteger();
    for (product of arr){
        if(re.test(product.category) && product.id != 1){
            if(re4.test(product.title)){
                product.title = "Climbing Raincoats";
            }
            if(re5.test(product.title)){
                product.title = "Solid Short Sleeve";
            }
            if(re6.test(product.title)){
                product.title = "Short Sleeve Moisture";
            }
            if(re7.test(product.title)){
                product.title = "Casual Cotton Short";
            }
            let price = (product.price - product.price*discount/100).toFixed(2);
            clothesCount++;
            if(clothesCount > 6){
                output += `
                <div class = "item item${count++}">
                    <div class = "item-width">
                        <div class = "img">
                            <a class = "img-click" onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                                <img src="${product.image}" alt="${product.title}">
                            </a>
                        </div>
                        <div class = "product-description d-flex">
                            <h3 class = "product-title overlock">${product.title}</h3>
                            <div class = "product-price-and-discount crimson">
                                <span class = "regular-price">&dollar;${product.price}</span>
                                <span class = "discount-percentage">${discount}%</span>
                                <span class = "price">${price} USD</span>
                            </div>
                        </div>
                    </div>
                    <div class = "item-hover">
                        <span class = "overlock" data-id = "${product.id}" onClick = "addToCart(${product.id})">ADD TO CART</span>
                    </div>
                </div>`;
            }
        }
    }
    document.querySelector("#clothesSection").innerHTML = output;
    document.querySelector("#clothesSection").style.justifyContent = 'space-evenly';
}


function displayElectronics(arr){
    let output = '';
    let count = 1;

    whichPageIsIt = 1; //PAGE 1
    let re = /(electronics)/;
    let re2 = /(Curved Gaming Monitor)/;
    let re3 = /(Gaming Drive)/;
    let re4 = /(Cache Performance Boost)/;
    for (product of arr){
        if(re.test(product.category)){
            if(re2.test(product.title)){
                product.title = "Samsung 49-Inch CHG90 144Hz Curved Gaming Monitor";
            }
            if(re3.test(product.title)){
                product.title = "WD 4TB Gaming Drive Works with Playstation 4 Portable";
            }
            if(re4.test(product.title)){
                product.title = "Silicon Power 256GB SSD 3D NAND A55 SLC Cache";
            }
            output += `
            <div class = "item item${count++}">
                <div class = "item-width">
                    <div class = "img">
                        <a class = "img-click" onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <img src="${product.image}" alt="${product.title}">
                        </a>
                    </div>
                    <div class = "product-description d-flex">
                        <h3 class = "product-title overlock">${product.title}</h3>
                        <div class = "product-price-and-discount crimson">
                            <span class = "price">&dollar;${product.price}</span>
                        </div>
                    </div>
                </div>
                <div class = "item-hover">
                    <span class = "overlock" data-id = "${product.id}" onClick = "addToCart(${product.id})">ADD TO CART</span>
                </div>
            </div>`;

        }
    }
    document.querySelector("#electronicsSection").innerHTML = output;
}

function displayJewelry(arr){
    let output = '';
    let count = 1;
    let re = /(jewelery)/;
    let re2 = /(Chain Bracelet)/;
    let re3 = /(Rose Gold Plated Stainless Steel Double)/;
    for (product of arr){
        if (re.test(product.category)){
            if (re2.test(product.title)){
                product.title = "Gold & Silver Dragon Station Chain Bracelet";
            }
            if (re3.test(product.title)){
                product.title = "Rose Gold Plated Stainless Steel Double";
            }
            output += `                    
            <div class = "item item${count++}">
                <div class = "item-width">
                    <div class = "product-description">
                        <h3 class = "product-title overlock">${product.title}</h3>
                    </div>
                    <div class = "img">
                        <a class = "img-click" onClick = "productClicked(${product.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                            <img src="${product.image}" alt="${product.title}" class = "main-img">
                        </a>
                        <div class = "item-hover" data-id = "${product.id}">
                            <img src="" alt="">
                        </div>
                    </div>
                </div>
            </div>`;
        }
    }
    document.querySelector("#jewelrySection").innerHTML = output;
}

aButtonArr = document.querySelectorAll('ul.trending-tabs li a');
aButtonArr.forEach(function(event){
    event.addEventListener('click', function(){
        document.querySelectorAll('ul.trending-tabs li a').forEach(element => {
            element.classList.remove('active');
        });
        event.classList.add('active');
    }); 
});

aTagClothes = document.querySelectorAll('ul.pagination li a.page-link');
aTagClothes.forEach(function(event){
    event.addEventListener('click', function(){
        document.querySelectorAll('ul.pagination li a.page-link').forEach(element => {
            element.classList.remove('active');
        });
        if(!event.classList.contains('previous') || !event.classList.contains('next')){
            if (whichPageIsIt == 1){
                document.querySelector('ul.pagination li a#secondSection').classList.add('active');
                document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
            } 
            if(whichPageIsIt == 2){
                document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
                document.querySelector('ul.pagination li a#firstSection').classList.add('active');
            }  
        }
    });
});

//FUNCTION for BEST SELLERS AND TRENDING PRODUCTS ON CLICK
let dpTrending = document.querySelector('#displayFeaturedProducts');
dpTrending.addEventListener('click', function(){
    trendingProducts(productArr);
});

let dpBestSellers = document.querySelector('#displayBestSellers');
dpBestSellers.addEventListener('click', function(){
    displayBestSellers(productArr);
});

//PAGINATION FOR CLOTHES SECTION
$('#secondSection').on('click',function(){
    displayClothesPage2(products);
});

$('#firstSection').on('click', function(){
    displayClothes(products);
});

$('#clothesPrevios').on('click', function(){
    if(whichPageIsIt == 2){
        displayClothes(products);
    } else{
        displayClothesPage2(products);
    }
})
$('#clothesNext').on('click', function(){
    if(whichPageIsIt == 1){
        displayClothesPage2(products);
    } else{
        displayClothes(products);
    }
})

// $('#clothes').click(function(e) {
//     e.preventDefault();
//     window.open('../product-display.html');

// });


//SHOW PRODUCT
var myModal = new bootstrap.Modal(document.querySelector('#staticBackdrop'));

function productClicked(id){
    outputPhoto = '';
    outputDescription = '';
    for (product of products){
        if(product.id == id){
            outputPhoto = `<img src="${product.image}" alet = "${product.title}">`;
            outputDescription = `<h2 id = "modalProductTitle">${product.title}</h2>
            <h4 id = "modalProductCategory">${product.category}</h4>
            <h1 id = "modalProductPrice">&dollar; ${product.price}</h1>
            <p id = "modalProductDescription">${product.description}</p>
            <button onClick = "addToCart(${product.id})" data-id = "${id}">Add to Cart</button>
            <button id = "proceedCheckout" class = "btn2" onClick = "moveToCheckout()">Proceed to Checkout</button>`;
        }
    }
    document.querySelector('#modalPhoto').innerHTML = outputPhoto;
    document.querySelector('#modalDescription').innerHTML = outputDescription;
}

//CATEGORY DROP DOWN ON CLICK
$("#clothes").click(function() {
    $('html,body').animate({
        scrollTop: $("#clothesParallex").offset().top, duration: 1000
    });
});

$("#electronics").click(function() {
    $('html,body').animate({
        scrollTop: $("#electronicsParallex").offset().top, duration: 1500
    });
});

$("#jewelry").click(function() {
    $('html,body').animate({
        scrollTop: $(".jewelry-banner").offset().top, duration: 2000
    });
});

//MOVE TO CHECKOUT
function moveToCheckout(){
    if(confirm('Proceed to check out?')) window.open('../cart.html'); return false;
}

//LOAD CART ON RELOAD
$(document).ready(function() {
    displayCartItems(productCart);
});

//PERFORM SEARCH
//TAO LIST TRA VE KET QUA CHO SEARCH 
const mainList = document.querySelector('#mainList');

//FUNCTION TAO LIST BANG UL LI
function setList(arr){
    clearList();//CLEAR LIST FIRST

    for (let product of arr){
        let item = document.createElement('li');
        let a = document.createElement('a');
        item.classList.add('list-group-item');
        let text = document.createTextNode(product.title);
        let att = document.createAttribute("onClick");
        att.value = "productClicked("+ product.id +")";
        let att2 = document.createAttribute('data-bs-toggle');
        att2.value = "modal";
        let att3 = document.createAttribute('data-bs-target');
        att3.value = "#staticBackdrop";
        a.appendChild(text);
        a.setAttributeNode(att);
        a.setAttributeNode(att2);
        a.setAttributeNode(att3);
        item.appendChild(a);
        mainList.appendChild(item);
    }
    if (arr.length === 0){
        setNoResults();
    }
}

//CLEARLIST WHEN NO RESULT
function clearList(){
    while(mainList.firstChild){
        mainList.removeChild(mainList.firstChild);
    }
}

//TRA VE NO RESULT FOUND KHI KHONG CO KET QUA
function setNoResults(){
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    let text = document.createTextNode("No Results Found!");
    item.appendChild(text);
    mainList.appendChild(item);
}

//TIM KIEM DUA TREN MUC DO LIEN QUAN
function getRelevancy(value, searchTerm){
    if (value === searchTerm){
        return 2;
    } else if (value.startsWith(searchTerm)){
        return 1;
    } else if (value.includes(searchTerm)){
        return 0;
    }
}

//DOC DU LIEU NGUOI DUNG NHAP VAO
const searchInput = document.querySelector('#searchProducts');
searchInput.addEventListener('input', (event)=>{
    let value = event.target.value;
    if (value && value.trim().length > 0){ //trim() dung de bo di khoang trang
        value = value.trim().toLowerCase();
        setList(products.filter(product =>{
            return product.title.toLowerCase().includes(value);
        }).sort((productA, productB)=>{
            return getRelevancy(productB.title, value) - getRelevancy(productA.title, value);
        }));

    } else {
        clearList();
    }
})

//SEARCH
let searchPerform = document.querySelector('#search-addon-btn');
searchPerform.addEventListener('click', function(e){
    filteredProduct = [];
    let value = document.querySelector('#searchForProducts').value;
    filter = value.toLowerCase();
    for (let product of products){
        productUpperCase = product.title.toLowerCase();
        if(productUpperCase.includes(filter)){
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
});



//hover on search
$(".search-icon").click(function(e){
    if ($('#mainSearchDisplay').hasClass('enabled')){
        $('#mainSearchDisplay').removeClass('enabled');
    }
    else{
        $('#mainSearchDisplay').addClass('enabled');
    }
});
$("#mainSearchDisplay").click(function(e){
    e.stopPropagation();
});
$(".search-icon").hover(
    function() {
        $('#mainSearchDisplay').addClass('enabled');
    }, function() {
        $('#mainSearchDisplay').removeClass('enabled');
    }
);

$("#mainSearchDisplay").hover(
    function() {
        $('#mainSearchDisplay').addClass('enabled');
    }, function() {
        $('#mainSearchDisplay').removeClass('enabled');
    }
);

