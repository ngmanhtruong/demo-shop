let fullProductUrl = 'https://fakestoreapi.com/products';
//CREATE PRODUCTS ARRAY
var products = [];
var filteredProduct = [];
var displayItems = [];

var clothesIsTrue, menClothesIsTrue, womenClothesIsTrue, electronicsIsTrue, jewelryIsTrue;


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
    //$(".loader-wrapper").fadeOut("slow");
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
                    <img src="${item.image}" alt="${item.title}">
                </div>
                <div class = "product-description d-flex">
                    <h3 class = "product-title overlock">${item.title}</h3>
                    <div class = "product-price-and-discount">
                        <span class = "price">${item.price} USD</span>
                    </div>
                </div>
            </div>
            <div class = "item-hover">
                <span class = "overlock" data-id = "${item.id}">ADD TO CART</span>
            </div>
        </div>`;
    }
    document.querySelector("#displayProducts").innerHTML = output;
}

function displayProducts(arr){
    var displayItems = [];
    let itemsCount = 1;
    for (product of arr){
        if(itemsCount < 9){
            itemsCount++;
            displayItems.push(product);
        }
    }
    display(displayItems);
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
    let re = /(clothing)/;
    for (product of arr){
        if(re.test(product.category)){
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
}
function displayMenClothing(arr){
    filteredProduct = [];
    let re = /(^men)/;
    for (product of arr){
        if(re.test(product.category)){
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
}

function displayWomenClothing(arr){
    filteredProduct = [];
    let re = /(^women)/;
    for (product of arr){
        if(re.test(product.category)){
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
}

function displayElectronics(arr){
    filteredProduct = [];
    let re = /(electronics)/;
    for (product of arr){
        if(re.test(product.category)){
            filteredProduct.push(product);
        }
    }
    displayProducts(filteredProduct);
    //display(filteredProduct);
}

function displayJewelry(arr){
    filteredProduct = [];
    let itemsCount = 1;
    let re = /(jewel)/;
    for (product of arr){
        if(re.test(product.category)){
            if(itemsCount < 9){
                itemsCount++;
                filteredProduct.push(product);
            }
        }
    }
    display(filteredProduct);
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

//CONTROLS PAGINATION
// aTagClothes = document.querySelectorAll('ul.pagination li a.page-link');
// aTagClothes.forEach(function(event){
//     event.addEventListener('click', function(){
//         document.querySelectorAll('ul.pagination li a.page-link').forEach(element => {
//             element.classList.remove('active');
//         });
//         if(!event.classList.contains('previous') || !event.classList.contains('next')){
//             if (whichPageIsIt == 1){
//                 document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
//                 document.querySelector('ul.pagination li a#firstSection').classList.add('active');
//                 document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
//             } 
//             if(whichPageIsIt == 2){
//                 document.querySelector('ul.pagination li a#secondSection').classList.add('active');
//                 document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
//                 document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
//             }  
//             if(whichPageIsIt == 3){
//                 document.querySelector('ul.pagination li a#thirdSection').classList.add('active');
//                 document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
//                 document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
//             }  
//         }
//     });
// });




//PAGINATION FOR DISPLAY PRODUCT
$('#firstSection').on('click', function(){
    displayProducts(filteredProduct);
    whichPageIsIt = 1;
    document.querySelector('ul.pagination li a#firstSection').classList.add('active');
    document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
    document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
});

$('#secondSection').on('click',function(){
    displayProductsPage2(filteredProduct);
    whichPageIsIt = 2;
    document.querySelector('ul.pagination li a#secondSection').classList.add('active');
    document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
    document.querySelector('ul.pagination li a#thirdSection').classList.remove('active');
});

$('#thirdSection').on('click', function(){
    displayProductsPage3(filteredProduct);
    whichPageIsIt = 3;
    document.querySelector('ul.pagination li a#thirdSection').classList.add('active');
    document.querySelector('ul.pagination li a#secondSection').classList.remove('active');
    document.querySelector('ul.pagination li a#firstSection').classList.remove('active');
});



$('#clothesPrevios').on('click', function(){
    if(whichPageIsIt == 2){
        displayProducts(filteredProduct);
    } else if (whichPageIsIt == 3){
        displayProductsPage2(filteredProduct);  
    } else{
        displayProductsPage3(filteredProduct);
    }
})

$('#clothesNext').on('click', function(){
    if(whichPageIsIt == 1){
        displayProductsPage2(filteredProduct);
    } else if(whichPageIsIt == 2){
        displayProductsPage3(filteredProduct);
    } else{
        displayProducts(filteredProduct);
    }
})