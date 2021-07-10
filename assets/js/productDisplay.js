let fullProductUrl = 'https://fakestoreapi.com/products';
//CREATE PRODUCTS ARRAY
var products = [];
var filteredProduct = [];
var displayItems = [];

//Create value for event on index page
var clothesIsTrue, menClothesIsTrue, womenClothesIsTrue, electronicsIsTrue, jewelryIsTrue, productAnounce;


//FECTCH FROM FAKEAPISTORE
fetch(fullProductUrl,{})
    .then(function(response){
        return response.json();
    })
    .then (function(data){
        initData(data);
    })
    .catch(err => console.log(err));

function initData(data){
    products = data;
    console.log(products);
    filteredProduct = products;
    //show products by default
    displayProducts(products);


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

function display(arr){
    let output = '';
    let count = 1;
    for (item of arr){
        output += `
        <div class = "item item${count++}">
            <div class = "item-width">
                <div class = "img">
                    <a class = "img-click" onClick = "productClicked(${item.id})" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                        <img src="${item.image}" alt="${item.title}">
                    </a>
                </div>
                <div class = "product-description d-flex">
                    <h3 class = "product-title overlock">${item.title}</h3>
                    <div class = "product-price-and-discount">
                        <span class = "price">&dollar; ${item.price}</span>
                    </div>
                </div>
            </div>
            <div class = "item-hover">
                <span class = "overlock" data-id = "${item.id}" onClick = "addToCart(${item.id})">ADD TO CART</span>
            </div>
        </div>`;
    }
    document.querySelector("#displayProducts").innerHTML = output;
}

function displayProducts(arr){
    var displayItems = [];
    let itemsCount = 1;
    productAnounce = 0;
    for (product of arr){
        productAnounce++;
        if(itemsCount < 9){
            itemsCount++;
            displayItems.push(product);
        }
    }
    display(displayItems);
    $('#productAnounce').html(productAnounce);
}

function displayProductsPage2(arr){
    var displayItems = [];
    let itemsCount = 1;
    for (product of arr){
        itemsCount++;
        if(itemsCount > 9 && itemsCount < 18){
            displayItems.push(product);
        }
    }
    display(displayItems);
}
//FUNCTION FOR PAGE 3
function displayProductsPage3(arr){
    displayItems = [];
    let itemsCount = 1;
    for (product of arr){
        itemsCount++;
        if(itemsCount > 17){
            displayItems.push(product);
        }
    }
    display(displayItems);
}

function displayClothes(arr){
    filteredProduct = [];
    productAnounce = 0;
    let re = /(clothing)/;
    for (product of arr){
        if(re.test(product.category)){
            productAnounce++;
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
}
function displayMenClothing(arr){
    filteredProduct = [];
    productAnounce = 0;
    let re = /(^men)/;
    for (product of arr){
        if(re.test(product.category)){
            productAnounce++;
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
}

function displayWomenClothing(arr){
    filteredProduct = [];
    productAnounce = 0;
    let re = /(^women)/;
    for (product of arr){
        if(re.test(product.category)){
            productAnounce++;
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
}

function displayElectronics(arr){
    filteredProduct = [];
    productAnounce = 0;
    let re = /(electronics)/;
    for (product of arr){
        if(re.test(product.category)){
            productAnounce++;
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
    //display(filteredProduct);
    $('#productAnounce').html(productAnounce);
}

function displayJewelry(arr){
    filteredProduct = [];
    let re = /(jewel)/;
    productAnounce = 0;
    for (product of arr){
        if(re.test(product.category)){
            productAnounce++;
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
}

function displayAllProducts(arr){
    productAnounce = 0;
    filteredProduct = [];
    for (product of arr){
        productAnounce++;
        filteredProduct.push(product);
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
}

$('#displayClothes').click(function(e){
    e.preventDefault();
    displayClothes(products);
});
$('#displayMenClothing').click(function(e){
    e.preventDefault();
    displayMenClothing(products);
});
$('#displayWomenClothing').click(function(e){
    e.preventDefault();
    displayWomenClothing(products);
});

$('#displayElectronics').click(function(e){
    e.preventDefault();
    displayElectronics(products);
});

$('#displayJewelry').click(function(e){
    e.preventDefault();
    displayJewelry(products);
});

$('#displayAllProducts').click(function(e){
    e.preventDefault();
    displayAllProducts(products);
});


/*Sort theo gia hoac theo ten
*
*
*/
function priceSort(sortBy){
    if (sortBy == 1)
        filteredProduct.sort((a, b) => {
            return a.price - b.price;
    });
    //Sắp xếp mảng products giảm dần theo giá sản phẩm
    if (sortBy == 2)
        filteredProduct.sort((a, b) => b.price - a.price);
    
};

function nameSort(sortBy){
    //Title ascending
    if (sortBy == 1)
        filteredProduct.sort((a,b) => a.title.localeCompare(b.title));

    //Title descending
    if (sortBy == 2)
        filteredProduct.sort((a, b) =>{
            return b.title.localeCompare(a.title);
        });
}
//Xử lý sự kiên click trên checkbox button sort
document.querySelectorAll('input.sort').forEach(function (element) {
    element.addEventListener('click', ()=>{
        priceSort(element.value);
        let temp = filteredProduct;
        displayProducts(temp);
        //Update pagination
        document.querySelector('ul.pagination li a#firstSection').classList.add('active');
        document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
        document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');

    });
});
$('#priceAsc').change( function(){
    $('#priceDes').prop('checked', false);
})
$('#priceDes').change( function(){
    $('#priceAsc').prop('checked', false);
});

document.querySelector('select[name="filterByName"]').addEventListener('change', function(){
    nameSort(this.value);
    let temp = filteredProduct;
    displayProducts(temp);

    //Update pagination
    document.querySelector('ul.pagination li a#firstSection').classList.add('active');
    document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
    document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
});

function filterProduct(arr, filterBy){
    if (filterBy == 0){
        arr = arr;
    }
    if (filterBy == 1){
        arr = arr.filter((product) => {
            return product.price <= 10;
        })
    }
    if (filterBy == 2){
        arr = arr.filter((product) => {
            return (product.price >= 10 && product.price <= 50);
        })
    }
    if (filterBy == 3){
        arr = arr.filter((product) => {
            return (product.price >= 50 && product.price <= 100);
        })
    }
    if (filterBy == 4){
        arr = arr.filter((product) => {
            return (product.price >= 100 && product.price <= 200);
        })
    }
    if (filterBy == 5){
        arr = arr.filter((product) => {
            return product.price >= 200;
        })
    }
    return arr;
};

document.querySelector('select[name="filter"]').addEventListener('change', function(){
    let temp = filterProduct(filteredProduct, this.value);
    displayProducts(temp);
});




//SET VALUE TO PRODUCTS PAGINATION
var whichPageIsIt = 1;


//CONTROL HIGHLIGHT OF category-highlight filter
aTagHighlight = document.querySelectorAll('a.categoryHighlights');
aTagHighlight.forEach(function(event){
    event.addEventListener('click', function(){
        document.querySelectorAll('a.categoryHighlights').forEach(function(e){
            e.classList.remove('highlighted');
        });
        event.classList.add('highlighted');
    });
});

//PAGINATION FOR DISPLAY PRODUCT
$('#firstSection').on('click', firstSectionFunction = function(){
    displayProducts(filteredProduct);
    whichPageIsIt = 1;
    document.querySelector('ul.pagination li a#firstSection').classList.add('active');
    document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
    document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
});

$('#secondSection').on('click',secondSectionFunction = function(){
    displayProductsPage2(filteredProduct);
    whichPageIsIt = 2;
    document.querySelector('ul.pagination li a#secondSection').classList.add('active');
    document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
    document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
});

$('#thirdSection').on('click', thirdSectionFunction = function(){
    displayProductsPage3(filteredProduct);
    whichPageIsIt = 3;
    document.querySelector('ul.pagination li a#thirdSection').classList.add('active');
    document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
    document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
});

$('#clothesPrevios').on('click', function(){
    if(whichPageIsIt == 2){
        displayProducts(filteredProduct);
        firstSectionFunction();
    } else if (whichPageIsIt == 3){
        displayProductsPage2(filteredProduct);
        secondSectionFunction();  
    } else{
        displayProductsPage3(filteredProduct);
        thirdSectionFunction();
    }
})

$('#clothesNext').on('click', function(){
    if(whichPageIsIt == 1){
        displayProductsPage2(filteredProduct);
        secondSectionFunction();
    } else if(whichPageIsIt == 2){
        displayProductsPage3(filteredProduct);
        thirdSectionFunction();
    } else{
        displayProducts(filteredProduct);
        firstSectionFunction();
    }
})

//DISPLAY MODAL PRODUCT
function productClicked(id){
    outputPhoto = '';
    outputDescription = '';
    for (product of filteredProduct){
        if(product.id == id){
            outputPhoto = `<img src="${product.image}" alet = "${product.title}">`;
            outputDescription = `<h2 id = "modalProductTitle">${product.title}</h2>
            <h4 id = "modalProductCategory">${product.category}</h4>
            <h1 id = "modalProductPrice">&dollar; ${product.price}</h1>
            <p id = "modalProductDescription">${product.description}</p>
            <button id = "addToCart" onClick = "addToCart(${product.id})" data-id = "${id}">Add to Cart</button>
            <button id = "proceedCheckout" class = "btn2" onClick = "moveToCheckout()">Proceed to Checkout</button>`;
        }
    }
    document.querySelector('#modalPhoto').innerHTML = outputPhoto;
    document.querySelector('#modalDescription').innerHTML = outputDescription;
}


let searchPerform = document.querySelector('#search-addon');
searchPerform.addEventListener('click', function(e){
    filteredProduct = [];
    productAnounce = 0;
    let value = document.querySelector('#searchForProducts').value;
    filter = value.toLowerCase();
    for (let product of products){
        productUpperCase = product.title.toLowerCase();
        if(productUpperCase.includes(filter)){
            filteredProduct.push(product);
            productAnounce++;
        }
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
});

function searchItemClicked(id){
    filteredProduct = [];
    productAnounce = 0;
    for (let product of products){
        if (product.id == id){
            filteredProduct.push(product);
            productAnounce++;
        }
    }
    displayProducts(filteredProduct);
    $('#productAnounce').html(productAnounce);
}


const list = document.querySelector('#list');

function setList(arr){
    clearList();
    for (let product of arr){
        let item = document.createElement('li');
        item.classList.add('list-group-item');
        let text = document.createTextNode(product.title);
        let att = document.createAttribute("onClick");
        att.value = "searchItemClicked("+ product.id +")";
        item.appendChild(text);
        item.setAttributeNode(att);
        list.appendChild(item);
    }
    if (arr.length === 0){
        setNoResults();
    }
}

function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

function setNoResults(){
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    let text = document.createTextNode("No Results Found!");
    item.appendChild(text);
    list.appendChild(item);
}

function getRelevancy(value, searchTerm){
    if (value === searchTerm){
        return 2;
    } else if (value.startsWith(searchTerm)){
        return 1;
    } else if (value.includes(searchTerm)){
        return 0;
    }
}

const searchInput = document.querySelector('#searchForProducts');
searchInput.addEventListener('input', (event)=>{
    let value = event.target.value;
    if (value && value.trim().length > 0){
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

//CLICK ON CHECKOUT MOVE TO CART PAGE
function moveToCheckout(){
    if(confirm('Proceed to check out?')) window.open('../cart.html'); return false;
}

$(document).ready(function() {
    displayCartItems(productCart);
});