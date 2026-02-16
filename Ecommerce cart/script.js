const productsContainer = document.getElementById("products");
const categoriesContainer = document.getElementById("categories");
const cartItems = document.getElementById("cartItems");
const totalDisplay = document.getElementById("total");

let cart = [];

/* PRODUCTS DATA */

const products = [
  {id:1,name:"Laptop",price:50000,category:"Electronics",img:"https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400"},
  {id:2,name:"Smartphone",price:20000,category:"Electronics",img:"https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400"},
  {id:3,name:"Headphones",price:3000,category:"Electronics",img:"https://images.unsplash.com/photo-1518441902112-3c7d7f1bce60?w=400"},
  {id:4,name:"Shoes",price:2500,category:"Fashion",img:"https://images.unsplash.com/photo-1528701800489-20be3c4aee33?w=400"},
  {id:5,name:"T-Shirt",price:800,category:"Fashion",img:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400"},
  {id:6,name:"Watch",price:4000,category:"Fashion",img:"https://images.unsplash.com/photo-1519741497674-611481863552?w=400"},
  {id:7,name:"Sofa",price:15000,category:"Home",img:"https://images.unsplash.com/photo-1505691938895-1758d7feb511?w=400"},
  {id:8,name:"Chair",price:3500,category:"Home",img:"https://images.unsplash.com/photo-1503602642458-232111445657?w=400"},
  {id:9,name:"Lamp",price:1200,category:"Home",img:"https://images.unsplash.com/photo-1507477338202-487281e6c27e?w=400"},
  {id:10,name:"Table",price:2000,category:"Furniture",img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400"},
  {id:11,name:"tv",price:1200,category:"Application",img:"https://images.unsplash.com/photo-1507477338202-487281e6c27e?w=400"},
  {id:12,name:"Desk",price:3000,category:"Furniture",img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400"},
  {id:13,name:"Bookshelf",price:2500,category:"Furniture",img:"https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=400"},
  
];

/* SHOW CATEGORIES */

const categories = ["All", ...new Set(products.map(p=>p.category))];

categories.forEach(cat=>{
  const li = document.createElement("li");
  li.innerText = cat;
  li.addEventListener("click",()=>filterProducts(cat));
  categoriesContainer.appendChild(li);
});

/* SHOW PRODUCTS */

function displayProducts(list){
  productsContainer.innerHTML = "";

  list.forEach(product=>{
    const div = document.createElement("div");
    div.classList.add("product");

    div.innerHTML = `
      <img src="${product.img}">
      <h3>${product.name}</h3>
      <p>₹ ${product.price}</p>
      <button>Add</button>
    `;

    div.querySelector("button").addEventListener("click",()=>{
      addToCart(product);
    });

    productsContainer.appendChild(div);
  });
}

/* FILTER */

function filterProducts(category){
  if(category === "All"){
    displayProducts(products);
  } else {
    const filtered = products.filter(p=>p.category === category);
    displayProducts(filtered);
  }
}

/* CART */

function addToCart(product){
  const item = cart.find(p=>p.id===product.id);

  if(item){
    item.quantity++;
  } else {
    cart.push({...product,quantity:1});
  }

  updateCart();
}

function updateCart(){
  cartItems.innerHTML="";
  let total=0;

  cart.forEach(item=>{
    total += item.price * item.quantity;

    const li=document.createElement("li");
    li.innerHTML = `
      ${item.name} x${item.quantity}
      <span>₹ ${item.price * item.quantity}</span>
    `;
    cartItems.appendChild(li);
  });

  totalDisplay.innerText = total;
}

/* INITIAL LOAD */
displayProducts(products);
