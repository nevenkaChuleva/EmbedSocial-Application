// Getting divs from html
let loadMore = document.getElementById("load_more");
let insideContainer = document.getElementsByClassName("insideContainer");

let output = "";

// Fetching data from JSON
fetch("./assets/data.json")
.then(response => response.json())
.then(data => {
   for(let item of data){
    // Dynamically creating the cards

    output += `
        <div class="cards" >
            <img class="profile_image" src=${item.profile_image}></img>
            <h2 class="name"> ${item.name} </h2>
            <p class="date"> ${item.date} </p>
            <img class="image" src=${item.image}></img>
            <p class="caption"> ${item.caption} </p>
            <p class="likes"> ${item.likes} </p>
            <img class="hearts"  src="./assets/heart.svg">
            <img class="logo"  src="./assets/instagram-logo.svg">
            <hr class="line" />
        </div>

        <div class="popup" style="display: none;">
            <div class="popup_card" style="display: none;">
            <img class="popup_profile_image" src=${item.profile_image}></img>
            <h2 class="popup_name"> ${item.name} </h2>
            <p class="popup_date"> ${item.date} </p>
            <a href="${item.source_link}"> <img class="popup_image" src=${item.image}></img></a>
            <p class="popup_caption"> ${item.caption} </p>
            <p class="popup_likes"> ${item.likes} </p>
            <img class="popup_hearts"  src="./assets/heart.svg">
            <img class="popup_logo"  src="./assets/instagram-logo.svg">
            <hr class="popup_line" />
            </div>
        </div>
    `;
   }
   // Adding them to the container
   document.querySelector(".insideContainer").innerHTML = output;

   let posts = [...document.getElementsByClassName("cards")];

   // Showing the first four cards 
    for(let i = 0; i < 4; i++){
        posts[i].style.display = "inline-block";
    }


    // Select a card
    for(let i = 0; i < posts.length; i++){
        let  cards = document.querySelectorAll('.cards');
        let bg = document.querySelectorAll('.popup');
        let  card = document.querySelectorAll('.popup_card');
      
        // Open a pop up for it
        cards[i].addEventListener('click', (event) => {
            let target = event.target;
            bg[i].style.display = "block";
            card[i].style.display = 'block';

            // Close popup
            window.onclick = function(event) {
                if (event.target == bg[i]) {
                    bg[i].style.display = "none"
                }
            }
        })
    }


    let isHeartClicked = false;
    let isLikesIncremented = false;
    let popupHearts;

    // Toggle between liking and unliking, also increments the likes number
    for(let i = 0; i < posts.length; i++){
        popupHearts = document.querySelectorAll('.popup_hearts');

        popupHearts[i].addEventListener('click', (event) => {        
            // When you click on the heart, it finds the parent div so we can get the likes amount
            // and print them using innerHTML 
            let target = event.target;
            let parent = target.parentNode.childNodes[11].innerHTML;
            let heartInPopUp = target.parentNode.childNodes[13];

            if(target.className == 'popup_hearts'){
                isHeartClicked == true ?  heartInPopUp.style.backgroundColor = 'transparent'  : heartInPopUp.style.backgroundColor = 'red' ;
                isLikesIncremented == true ? target.parentNode.childNodes[11].innerHTML = --parent : ++target.parentNode.childNodes[11].innerHTML

                isHeartClicked = !isHeartClicked;
                isLikesIncremented = !isLikesIncremented;
            } 
        });
    }

})

// Loading four more cards 
let currentCards = 4;
loadMore.onclick = () =>{
    const elementList = [...document.querySelectorAll('.cards')];
    for (let i = currentCards; i < currentCards + 4; i++) {
        if(currentCards >= elementList.length){
            loadMore.style.display = 'none';
        }
        elementList[i].style.display = 'block';
    }
   
    currentCards += 4;
}


