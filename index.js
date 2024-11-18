const state = {
  items: [],
  cart: [],

  allItems: [
    { id: "001-beetroot", name: "beetroot", price: 0.35 },
    { id: "002-carrot", name: "carrot", price: 0.35 },
    { id: "003-apple", name: "apple", price: 0.35 },
    { id: "004-apricot", name: "apricot", price: 0.35 },
    { id: "005-avocado", name: "avocado", price: 0.35 },
    { id: "006-bananas", name: "bananas", price: 0.35 },
    { id: "007-bell-pepper", name: "bell pepper", price: 0.35 },
    { id: "008-berry", name: "berry", price: 0.35 },
    { id: "009-blueberry", name: "blueberry", price: 0.35 },
    { id: "010-eggplant", name: "eggplant", price: 0.35 }
  ],

  fruits: [
    { id: "003-apple", name: "apple", price: 0.35 },
    { id: "004-apricot", name: "apricot", price: 0.35 },
    { id: "006-bananas", name: "bananas", price: 0.35 }
  ],

  vegitables: [
    { id: "001-beetroot", name: "beetroot", price: 0.35 },
    { id: "002-carrot", name: "carrot", price: 0.35 },
    { id: "005-avocado", name: "avocado", price: 0.35 },
    { id: "007-bell-pepper", name: "bell pepper", price: 0.35 },
    { id: "010-eggplant", name: "eggplant", price: 0.35 }
  ],

  berries: [
    { id: "008-berry", name: "berry", price: 0.35 },
    { id: "009-blueberry", name: "blueberry", price: 0.35 }
  ]
};

// Function to add item to cart
function addToCart(index) {
  
  //new item
  const newItem = state.items[index];

  //check if item already exists
  const existingItemIndex = state.cart.findIndex(item => item.id === newItem.id);

  if (existingItemIndex !== -1)
  { //increase quantity if item is already in cart
    state.cart[existingItemIndex].quantity++;
  } else
  { //otherwise add to cart with quantity = 1
    newItem.quantity = 1;
    state.cart.push(newItem);
  }

  renderCart() //update cart
}

//function to increase quantity
function increaseQuantity(item) {
  item.quantity++;
  renderCart(); //update cart
}

//function to decrease quantity
function decreaseQuantity(item) {
  const itemIndex = state.cart.indexOf(item);
  if (itemIndex !== -1) //check if item exists in cart
  {
    if (item.quantity === 1)
      {
        state.cart.splice(itemIndex, 1);
      } else 
      {
        item.quantity--;
      }
  }

  renderCart(); //update cart
}

function updateDisplayedItems(newItems) {
  state.items = newItems;

  //clear the current store item list
  const itemList = document.querySelector(".item-list.store--item-list");

    //create new sortbutton if does'nt exists
    let sortButton = document.querySelector("#sortButton");
    if (!sortButton) {
      sortButton = document.createElement("button");
      sortButton.id = "sortButton";
      sortButton.textContent = "Sort";

      sortButton.addEventListener("click", () => {
        state.items.sort((a, b) => a.name.localeCompare(b.name));
        updateDisplayedItems(state.items);
      });
  
      itemList.parentNode.insertBefore(sortButton, itemList);
  }

  //clear existing items
  itemList.innerHTML = "";

  //loop through the itemsList
  for (let i = 0; i < state.items.length; i++)
  {
    //create new item
    const storeItem = document.createElement("li");

    //create div for store item icon
    const storeItemDiv = document.createElement("div");
    storeItemDiv.classList.add("store--item-icon")

    //create img element for the icon
    const storeItemImg = document.createElement("img");
    storeItemImg.src = "assets/icons/" + state.items[i].id + ".svg";
    storeItemImg.alt = state.items[i].name; //loop

    //append the img element to div
    storeItemDiv.appendChild(storeItemImg);

    //create button
    const addButton = document.createElement("button");
    addButton.textContent = "Add to cart";

    // Add event listener to "Add to cart" button
    addButton.addEventListener("click", () => {
      addToCart(i);
    });

    //append icon div and button to item
    storeItem.appendChild(storeItemDiv);
    storeItem.appendChild(addButton);

    //append the list item to the item list
    itemList.appendChild(storeItem);
  }
}

//add eventlisteners for all buttons
document.querySelector("header button:nth-of-type(1)").addEventListener("click", 
  () =>  {updateDisplayedItems(state.allItems); });

document.querySelector("header button:nth-of-type(2)").addEventListener("click", 
  () =>  {updateDisplayedItems(state.fruits); });

document.querySelector("header button:nth-of-type(3)").addEventListener("click", 
  () =>  {updateDisplayedItems(state.vegitables); });

document.querySelector("header button:nth-of-type(4)").addEventListener("click", 
  () =>  {updateDisplayedItems(state.berries); });

//have all items displayed as default
updateDisplayedItems(state.allItems);

//function to render cart
function renderCart() {

  // Find the cart item list
  const cartItemList = document.querySelector(".item-list.cart--item-list");
  
  // Clear the existing content of the cart
  cartItemList.innerHTML = "";

  // Loop through the items in the cart
  state.cart.forEach(item => {

    // Create a new list item for the cart item
    const cartItem = document.createElement("li");

    // Create img element for the item icon
    const cartItemImg = document.createElement("img");
    cartItemImg.classList.add("cart--item-icon");
    cartItemImg.src = "assets/icons/" + item.id + ".svg";
    cartItemImg.alt = item.name;

    // Create p element for the item name
    const cartItemName = document.createElement("p");
    cartItemName.textContent = item.name;

    // Create button for decreasing quantity
    const decreaseButton = document.createElement("button");
    decreaseButton.classList.add("quantity-btn", "remove-btn", "center");
    decreaseButton.textContent = "-";
    decreaseButton.addEventListener("click", () => decreaseQuantity(item));

    // Create span element for the item quantity
    const cartItemQuantity = document.createElement("span");
    cartItemQuantity.classList.add("quantity-text", "center");
    cartItemQuantity.textContent = item.quantity;

    // Create button for increasing quantity
    const increaseButton = document.createElement("button");
    increaseButton.classList.add("quantity-btn", "add-btn", "center");
    increaseButton.textContent = "+";
    increaseButton.addEventListener("click", () => increaseQuantity(item));

    // Append all elements to the cart item
    cartItem.appendChild(cartItemImg);
    cartItem.appendChild(cartItemName);
    cartItem.appendChild(decreaseButton);
    cartItem.appendChild(cartItemQuantity);
    cartItem.appendChild(increaseButton);

    // Append the cart item to the cart item list
    cartItemList.appendChild(cartItem);
  });

  //find the totalElement
  const totalElement = document.querySelector(".total-number");
  
  //calculate the total price outside the loop:
  //defaultprice of 0, otherwise loop through the cart and calculate
  let totalPrice = 0;
  state.cart.forEach(item => {
    totalPrice += item.price * parseFloat(item.quantity);
  })
  totalElement.textContent = "£" + totalPrice.toFixed(2);
}
