import { menuArray } from './data.js'

const modal = document.getElementById('modal')
const modalCloseBtn = document.getElementById('modal-close-btn')
const orderItemBtn = document.getElementById('order-item-btn')
const payBtn = document.getElementById('pay-btn')
const yourOrderFeed = document.getElementById('your-order-feed')
const loginForm = document.getElementById('login-form')


let itemOrdersArray = []
let totalPrice = 0

loginForm.addEventListener('submit', function(e){
    e.preventDefault()
    modal.style.display = 'none'
})


payBtn.addEventListener('click', function(){
    yourOrderFeed.innerHTML = `
    <div class="container-final-thanks" >
    <h2 class="finalThanks">Thanks, your order is on its way</h2>
    </div>
    `
   
})

setTimeout(function(){
    payBtn.disabled = false
}, 10000)

modalCloseBtn.addEventListener('click', function(){
    modal.style.display = 'none'
})


document.addEventListener('click', function(e){
    
    if(e.target.dataset.btn === '0'){
        handlePizzaBtn(e.target.dataset.btn)
    }else if(e.target.dataset.btn === '1'){
        handleBurgerBtn(e.target.dataset.btn)
    }else if(e.target.dataset.btn === '2'){
        handleBeerBtn(e.target.dataset.btn)
    }else if (e.target.dataset.btnDelete){
        deleteItem(e.target.dataset.btnDelete)
    }else if (e.target.dataset.completeOrderBtn){
        modal.style.display = 'inline'
    }
    
})

function deleteItem(indexItem){
    let realIndexItem = parseInt(indexItem)
    if(itemOrdersArray.length === 0){
      console.log("Array is empty")
   }else{
     let removedItem = itemOrdersArray.splice(realIndexItem, 1)
     console.log(itemOrdersArray)
     
     totalPrice -= removedItem[0].price
     document.getElementById('totalPrice').innerHTML =
     `<p>Total price: <span>$ ${totalPrice}</span></p>`
     console.log(totalPrice)
    }
    if(itemOrdersArray.length === 0){
        orderItemBtn.disabled = true
    }
  renderOrder()
}
     
     
     
function handlePizzaBtn(pizzaId){
    itemOrdersArray.unshift(menuArray[pizzaId])
    orderItemBtn.disabled = false
    totalPrice += menuArray[pizzaId].price
    document.getElementById('totalPrice').innerHTML =
     `<p>Total price: <span>$ ${totalPrice}</span></p>`
    renderOrder()
   
}

function handleBurgerBtn(burgerId){
    itemOrdersArray.unshift(menuArray[burgerId])
    orderItemBtn.disabled = false
    totalPrice += menuArray[burgerId].price
    document.getElementById('totalPrice').innerHTML =
    `<p>Total price: <span>$ ${totalPrice}</span></p>`
    renderOrder()
   
 
}

function handleBeerBtn(beerId){
    itemOrdersArray.unshift(menuArray[beerId])
    orderItemBtn.disabled = false
        totalPrice += menuArray[beerId].price
        document.getElementById('totalPrice').innerHTML =
        `<p>Total price: <span>$ ${totalPrice}</span></p>`
        renderOrder()
      
}


   function renderOrder(){
    let HtmlString = ``
   
    itemOrdersArray.forEach(function(order, index){
        
             HtmlString += `
                    <div class="your-order-item" id="index" >
                        <h3> ${order.name}</h3>
                        <h3>$${order.price}</h3>
                    
                    <section class="icons-ba">
                        <i class="fa-solid fa-circle-minus red"  data-btn-delete="${index}"></i>
                    </section>
                    </div>
         `
        })
     
    document.getElementById('complete-order').innerHTML = HtmlString

    //return order.id
}

function getFeedHtml(){
    let feedHtml = ``
menuArray.forEach(function(item){

feedHtml += `
        <div class="item">
                <div class="item-inner">
                     <span class="emoji" >${item.emoji}</span>
                    <div class="items-description">
                        <h1 class="itemTitle">${item.name}</h1>
                        <h3 class="ingredients" >${item.ingredients}</h3>
                        <h2>$${item.price}</h2>
                    </div>
                    <section class="icons-bar">
                        <i class="fa-solid fa-circle-plus" data-btn="${item.id}"></i>
                    </section>
                </div> 
                 
        </div>
        
        `
    })
    return feedHtml
}

function render(){
    document.getElementById('item').innerHTML = getFeedHtml()
    
}

render()
