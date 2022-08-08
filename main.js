//----Shop Page-----
//jquery animation and chained effect for images on shop page
$(".shop").ready(function(){
    $(".img-thumbnail").hover(function(e){
        $(e.target).animate({
            width: "100px",
            height: "100px",
            opacity: 0.5
        });
    });
});


//-----Drop down menu for shop button in nav bar-----
$(function(){
    $('ul.navBar > li').hover(function(){
       $(this).find('ul.pList').show(200);
    }, function(){
         $(this).find('ul.pList').hide(200);
    });
});

/*-----Cart-----
 Reference: https://www.youtube.com/watch?v=B20Getj_Zk4 Telmo Sampaio */

let carts = document.querySelectorAll('.add-cart');
console.log(carts);

let products = [
    {
        name: "Booties",
        tag:'booties',
        price: 100,
        inCart: 0
    },
    {
        name: "Owl",
        tag: 'owl',
        price: 150,
        inCart: 0
    },
    {
        name: "Educational",
        tag: 'educational',
        price: 100,
        inCart: 0
    },
    {
        name: "Baby Blankets",
        tag: 'babyBlankets',
        price: 200,
        inCart: 0
    },
    {
        name: "Bath Toys",
        tag: 'bathToys',
        price: 50,
        inCart: 0
    },
    {
        name: "Crib",
        tag: 'crib',
        price: 1000,
        inCart: 0
    },
]

//-----event listener to add items to cart-----
for (let i = 0; i < carts.length; i++) {
    carts[i].addEventListener('click', ()=>{
        cartNumbers(products[i]);
        totalCost(products[i]);
        alert("Your total is: R" + localStorage.getItem('totalCost'));
    })
}

//function to store cart items in memory-----
function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('.cart span').textContent = productNumbers;
    }
}
function cartNumbers(products) {
    let productNumbers = localStorage.getItem('cartNumbers');
    productNumbers = parseInt(productNumbers);

    if(productNumbers){
        localStorage.setItem('cartNumbers', productNumbers + 1);
        document.querySelector('.cart span').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers', 1);
        document.querySelector('.cart span').textContent = 1;
        
    }
    
    setItems(products);
}

function setItems(products) {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);

    if(cartItems != null) {
        if(cartItems[products.tag] == undefined) {
            cartItems = {
                ...cartItems,
                [products.tag]: products
            }
        }
        cartItems[products.tag].inCart += 1;
    } else {
        products.inCart = 1; 
        cartItems = {
            [products.tag]: products
        }
    }

      localStorage.setItem("productsInCart", JSON.stringify(cartItems));     
}
//-----function to calculate the total of the items in the cart-----
function totalCost(products) {
    let cartCost = localStorage.getItem('totalCost');
    

    if (cartCost != null) {
        cartCost = parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + products.price);

    } else {
        localStorage.setItem("totalCost", products.price);
    }

}



/*Cart Page - this section pulls the information from other pages and 
displays it on the cart page. */
let cartCost = localStorage.getItem('totalCost');
function displayCart() {
    let cartItems = localStorage.getItem("productsInCart");
    cartItems = JSON.parse(cartItems);
    let productContainer = document.querySelector(".products");
    
    
    if(cartItems && productContainer) {
        productContainer.innerHTML = '';
        Object.values(cartItems).map(item => {
            productContainer.innerHTML += `
            <div class="product-title">
                <img src="./images/${item.tag}.jpg">
                <span>${item.name}</span>
                </div>
            <div class="price">R${item.price}</div>
            <div class="quantity">
            <span>${item.inCart}</span>
            </div>
            <div class="total">R${item.inCart * item.price}</div>
            <div class="vat">R${(item.price * 0.15) * item.inCart}<div>
            <br>
            `
        });

        productContainer.innerHTML += `
            <div class="basketTotalContainer">
                <h4 class="basketTotalTitle">Basket Total (incl VAT)</h4>
                <h4 class="basketTotal">R${cartCost}</h4>
            </div>
            `
    }
}

onLoadCartNumbers();
displayCart();

/*-------GIFT VOUCHER FORM-----------
Inspired by https://thewebdev.info/ */
$(".cart").ready(function cartLoad(){
let vForm = document.getElementById("voucher-form");

let voucher = document.createElement("input");
voucher.setAttribute("type", "text");
voucher.setAttribute("placeholder", "Enter Voucher Code");
voucher.className = "vInput";
voucher.id = "voucherInput";

let vButton = document.createElement("button");
vButton.setAttribute("type", "button");
vButton.innerHTML = "Apply Voucher";
vButton.class = "vButton";
vForm.appendChild(voucher);
vForm.appendChild(vButton);
});



//-----------SHIPPING DETAILS-------------
$(".cart").ready(function cartLoad(){
let sForm = document.getElementById("shipping-form");


//shipping form details hidden until delivery is clicked

//Customer Name
let cName = document.createElement("input");
cName.setAttribute("type", "text");
cName.setAttribute("placeholder", "Enter your full name");
cName.class = "sInput";
cName.id = "cName";

//Customer Address line 1
let cAddress1 = document.createElement("input");
cAddress1.setAttribute("type", "text");
cAddress1.setAttribute("placeholder", "Address");
cAddress1.class = "sInput";
cAddress1.id = "cAddress1";

//Customer Address line 2
let cAddress2 = document.createElement("input");
cAddress2.setAttribute("type", "text");
cAddress2.setAttribute("placeholder", "Apartment, suite etc");
cAddress2.class = "sInput";
cAddress2.id = "cAddress2";

//Suburb
let suburb = document.createElement("input");
suburb.setAttribute("type", "text");
suburb.setAttribute("placeholder", "Suburb");
suburb.class = "sInput";
suburb.id = "suburb";

//City
let city = document.createElement("input")
city.setAttribute("type", "text");
city.setAttribute("placeholder", "City")
city.class = "sInput";
city.id = "city";

//Provinces - add shipping cost to cart total based on selection

let addDCost = document.getElementById("sProvince");
addDCost.addEventListener("change", function(e){
    dCost = (e.target.value)
    console.log(dCost)
    cartCost = cartCost + dCost
    return cartCost
   
}, false);




//Postal Code
let pCode = document.createElement("input");
pCode.setAttribute("type", "number");
pCode.setAttribute("placeholder", "Postal Code");
pCode.class = "sInput";
pCode.id = "pCode";

//Append
sForm.appendChild(cName);
sForm.appendChild(cAddress1);
sForm.appendChild(cAddress2);
sForm.appendChild(suburb);
sForm.appendChild(city);
sForm.appendChild(sProvince);
sForm.appendChild(pCode);

// jQuery show/hide function code example

$("#delivery").click(function(){
    $(sForm).show()
});   

//Confirm Order

let cOrder = document.createElement("button");
cOrder.setAttribute("type", "button");
cOrder.innerHTML = "Confirm Order";
cOrder.class = "cOrder";


sForm.appendChild(cOrder);

//when the confirm order button is clicked -  generate unique reference numbers and alert user.
let reference 
            let genReference = () => {
                reference = Math.floor((1 + Math.random()) * 10000);
                return reference
            };

cOrder.onclick = function (){
        genReference();
            alert("Your reference number is: " + reference);
};

});


