const baseURL = "http://localhost:3000/api/v1/boardgames"
const reviewURL = "http://localhost:3000/api/v1/reviews"
const userURL = "http://localhost:3000/api/v1/users"
let boardgame_id = 0
let currentUser = {}

document.addEventListener("DOMContentLoaded", function() {
    
    // variables 
    // index.html-body-div sections
    const listPanel = document.querySelector("#bg-list")
    const showBGPanel = document.querySelector("#show-bg-panel")
    const userForm = document.querySelector(".user-form")
    const reviewForm = document.querySelector(".review-form")
   
    // functions 
    // fetch all board games
    function getAllBoardGames() {
        fetch(baseURL)
        .then(res => res.json())
        .then(boardgames => listOfBoardGames(boardgames))
    }

    // create li for each board game
    function listOfBoardGames(boardgames) {
        boardgames.forEach(boardgame => {
            boardgameLi(boardgame)
            console.log(boardgame.reviews)
        })
    }

    function boardgameLi(boardgame) {
        const li = document.createElement('li')
        li.dataset.boardgameId = boardgame.id
        li.textContent = boardgame.name
        li.addEventListener('click', ()=> {showBoardGame(boardgame)})
        listPanel.appendChild(li)
    }

    function reviewLi(review) {
        const li = document.createElement('li')
        li.dataset.reviewId = review.id
        li.textContent = review.content
        li.addEventListener('click', showReview)
        listPanel.appendChild(li)
    }

    // click
    // gets the selected board game and display it in the showBGPanel
    // no need for button as no changes can be made to the board game
    function showBoardGame(boardgame, event) {
        showBGPanel.innerHTML = '';
        boardgame_id = boardgame.id 
        let div = document.createElement('div')
        let ul = document.createElement('ul')
        ul.id = "review-list"
        // dont think i need this?
        // ul.dataset.boardgameId = boardgame.id
        let boardGameImage = document.createElement('img')
        boardGameImage.src = `${boardgame.image_url}`
        let name = document.createElement('h1')
        name.textContent = `Name: ${boardgame.name}`
        let theme = document.createElement('h2')
        theme.textContent = `Type: ${boardgame.theme}`
        let duration = document.createElement('h2')
        duration.textContent = `Playing Time: ${boardgame.duration}`
        let playernum = document.createElement('h2')
        playernum.textContent = `Number of Players: ${boardgame.num_of_players}`
        let age = document.createElement('h2')
        age.textContent = `Age Requirements: ${boardgame.age_requirements}`
        let description = document.createElement('h3')
        description.textContent = `Description: ${boardgame.description}`
        let reviewHeading = document.createElement('h1')
        reviewHeading.textContent = `Reviews: `

        boardgame.reviews.forEach(review => {
            let reviewBG = document.createElement('li')
            reviewBG.innerText = `${review.user.name}: ${review.content}` 
            ul.appendChild(reviewBG)
        })
        div.append(boardGameImage, name, theme, duration, playernum, age, description, reviewHeading, ul)
        showBGPanel.appendChild(div)
    }

    // fetch one board game by id
    function getOneBoardGame(id) {
        return fetch(baseURL + `/${id}`)
            .then(res => res.json())
    }

    // create a user using form
    userForm.addEventListener('submit', event => {
        event.preventDefault()
        let newUser = document.getElementById("u-list").value;   
        fetch(userURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify({
                newUser
            })
        })
        .then(res => res.json())
        .then(user => currentUser = user)
    })

    // create a review using form
    reviewForm.addEventListener('submit', event => {
        event.preventDefault()
        let reviewContent = document.getElementById("r-list").value;
        const newReview = {
            review: reviewContent,
            boardgameId: boardgame_id, 
            userId: currentUser.id
        }   
        fetch(reviewURL, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(
                newReview
            )
        })
        .then(res => res.json())
        .then(review => {
            const ul = document.querySelector("#review-list")
            let reviewBG = document.createElement('li')
            reviewBG.innerText = `${review.user.name}'s - ${review.content}` 
            ul.appendChild(reviewBG)
        })
    })

    function updateReview(event) {
        event.preventDefault()
        const id = event.target.dataset.id
        // getOneBoardGame(id) 
        // .then(boardgame => {
        //     const reviewSection = `<div> 
        //         <p>Reviews: ${boardgame.reviews.content}</p>
        //     </div>`
        //     showRPanel.innerHTML = reviewSection  
        fetch(reviewURL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(updateReview)
        })
        .then(res => res.json())
        .then(boardgames => {
            const reviews = document.querySelectorAll(reviews)
            listOfBoardGames(boardgames) 
        })

            // let updateButton = document.createElement('button')
            // updateButton.textContent = "UPDATE"
        }

    getAllBoardGames() 
});













    // create li for each review
    // function listOfReviews(reviews) {
    //     reviews.forEach(review => reviewLi(boardgame))
    //     // console.log(review:, content);
    // }

            // promise errors !!!!!!!
            // .then(review => {
            //     const reviewShow = `<div>
            //         <p>Review: ${review.content}</p>               
            //         </div>`
            //         showRPanel.innerHTML = boardGameShow
            // }) 
            //  

    // function showReview(event) {
    //     event.preventDefault()
    //     const id = event.target.dataset.boardgameId
    //     getOneBoardGame(id)
    //         .then(boardgame => {
    //             const reviewShow = `<div>
    //                 <p>Review: ${boardgame.review.content}</p>               
    //             </div>`
    //             showRPanel.innerHTML = reviewShow
    //         })
    // }

    
    // function getReview() {
    //     return fetch(reviewURL + `/${id}`)
    //         .then(res => res.json())
    // }

    // this works but trying another way ----- got stuck on reviews 
    // function showBoardGame(event) {
    //     const id = event.target.dataset.boardgameId
    //     getOneBoardGame(id)
    //         .then(boardgame => {
    //             const boardGameShow = `<div>
    //                 <img alt = "board game image" src="${boardgame.image_url}" />
    //                 <h1>${boardgame.name}</h1>
    //                 <h2>Type: ${boardgame.theme}</h2>
    //                 <h2>Playing Time: ${boardgame.duration}</h2>
    //                 <h2>Number Of Players: ${boardgame.num_of_players}</h2>
    //                 <h2>Age Requirements: ${boardgame.age_requirements}</h2>
    //                 <p>Description: ${boardgame.description}</p>   
    //             </div>`
    //             showBGPanel.innerHTML = boardGameShow
    //         })
    // }
