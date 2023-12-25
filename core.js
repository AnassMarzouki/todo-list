import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js"
import { getDatabase, ref, push, onValue, remove } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js"

const appSettings = {
    databaseURL: "https://playground-4eb77-default-rtdb.europe-west1.firebasedatabase.app/"
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")
const shoppingList = document.getElementById("shopping-list")

//read data from database
onValue(itemsInDB, function(snapshots){
    

    if (snapshots.exists()) {

    
        let itemsArray = Object.entries(snapshots.val()) //itemsArray = values on array
        clearItemsList()

        console.log('itemsArray= '+ itemsArray)

        for (let i=0; i<itemsArray.length ; i++){
            
            let currentItem = itemsArray[i] // retireve elements from array (keys + values)
            let currentItemID = currentItem[0] // retrieve keys
            let currentItemValue = currentItem[1] // retireve values
            
            ShowItems(currentItem)

        }
    } else {
        shoppingList.innerHTML = "No items here .. yet !"
    }
})

console.log(app)

let addToCart = document.getElementById("add-to-cart-btn")
let inputFieldValue = document.getElementById("input-field")

addToCart.addEventListener("click", function (){
    let inputValue = inputFieldValue.value

    ShowItems(inputValue)
    

    push(itemsInDB, inputValue)

    clearField ()
})

function clearField () {
    inputFieldValue.value=""
}

function ShowItems (item){
    let itemID = item[0]
    let itemValue = item[1]
    //shoppingList.innerHTML += `<li>${itemValue}</li>`
    

    let newItem = document.createElement("li") //create <li></li>
    newItem.textContent = itemValue // insert itemValue in <li>
    shoppingList.append(newItem) // append <li>itemvalue</li> in <ul></ul>

    
    // remove items by double click
    newItem.addEventListener("dblclick", function(){
        console.log('double click is ok')
        let itemLocationOnDB = ref(database, `items/${itemID}`)
        remove(itemLocationOnDB)
        })

    }
function clearItemsList (){
    shoppingList.innerHTML = ""
}
