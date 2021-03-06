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
    shortenProductTitles(products);
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
//SHORTEN PRODUCT TITLE NAMES
function shortenProductTitles(arr){
    let re1 = /(Fjallraven)/;
    let re2 = /(Mens Casual Premium)/;
    let re3 = /(John Hardy Women's)/;
    let re4 = /(Pierced Owl Rose)/;
    let re5 = /(WD 2TB Elements)/;
    let re6 = /(SSD PLUS 1TB)/;
    let re7 = /(Silicon Power 256GB SSD)/;
    let re8 = /(WD 4TB Gaming Drive Works with Playstation 4 Portable External Hard Drive)/;
    let re9 = /(IPS Ultra-Thin)/;
    let re10 = /(BIYLACLESEN Women's 3-in-1 Snowboard Jacket Winter Coats)/;
    let re11 = /(Lock and Love Women's Removable Hooded Faux Leather Moto Biker Jacket)/;
    let re12 = /(Rain Jacket Women Windbreaker Striped Climbing Raincoats)/;
    let re13 = /(MBJ Women's Solid Short Sleeve Boat Neck V)/;
    let re14 = /(DANVOUY Womens T Shirt Casual Cotton Short)/;
    let re15 = /(Opna Women's Short Sleeve Moisture)/;
    let re16 = /(144Hz Curved Gaming Monitor)/;
    for (product of arr){
        if(re1.test(product.title)){
            product.title = "Foldsack No.1 Backpack";
        }
        if(re2.test(product.title)){
            product.title = "Mens Casual Premium Fit";
        }
        if(re3.test(product.title)){
            product.title = "Gold & Silver Dragon Bracelet";
        }
        if(re4.test(product.title)){
            product.title = "Stainless Steel Double";
        }
        if(re5.test(product.title)){
            product.title = "WD 2TB HDD - USB3.0";
        }
        if(re6.test(product.title)){
            product.title = "SSD 1TB - SATA 3";
        }
        if(re7.test(product.title)){
            product.title = "SSD 256GB - SATA 3";
        }
        if(re8.test(product.title)){
            product.title = "WD 4TB Work for PS4";
        }
        if(re9.test(product.title)){
            product.title = "Monitor Acer 21.5 FullHD";
        }
        if(re10.test(product.title)){
            product.title = "Snowboard Jacket Coats";
        }
        if(re11.test(product.title)){
            product.title = "Moto Biker Jacket";
        }
        if(re12.test(product.title)){
            product.title = "Women Climbing Raincoats";
        }
        if(re13.test(product.title)){
            product.title = "Short Sleeve Boat Neck";
        }
        if(re14.test(product.title)){
            product.title = "T Shirt Cotton Short";
        }
        if(re15.test(product.title)){
            product.title = "Short Sleeve Moisture";
        }
        if(re16.test(product.title)){
            product.title = "Samsung 144Hz Curved Monitor";
        }
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
    //S???p x???p m???ng products gi???m d???n theo gi?? s???n ph???m
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
//X??? l?? s??? ki??n click tr??n checkbox button sort
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

//TAO LIST TRA VE KET QUA CHO SEARCH
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
//CLEARLIST WHEN NO RESULT
function clearList(){
    while(list.firstChild){
        list.removeChild(list.firstChild);
    }
}

//TRA VE NO RESULT FOUND KHI KHONG CO KET QUA
function setNoResults(){
    let item = document.createElement('li');
    item.classList.add('list-group-item');
    let text = document.createTextNode("No Results Found!");
    item.appendChild(text);
    list.appendChild(item);
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
const searchInput = document.querySelector('#searchForProducts');
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

//CLICK ON CHECKOUT MOVE TO CART PAGE
function moveToCheckout(){
    if(confirm('Proceed to check out?')) window.open('../cart.html'); return false;
}
