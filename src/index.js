const baseURL = "http://localhost:3000/api/v1/boardgames"
const reviewURL = "http://localhost:3000/api/v1/reviews"
const userURL = "http://localhost:3000/api/v1/users"

// global variables 
let boardgame_id = 0
let currentUser = {}
let review_id = 0

document.addEventListener("DOMContentLoaded", function() {
    
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
            // console.log(boardgame.reviews)
        })
    }

    function boardgameLi(boardgame) {
        const li = document.createElement('li')
        li.dataset.boardgameId = boardgame.id
        li.textContent = boardgame.name
        li.addEventListener('click', ()=> {showBoardGame(boardgame)})
        listPanel.appendChild(li)
    }

    // click
    // gets the selected board game and display it in the showBGPanel
    // no need for button as no changes can be made to the board game
    function showBoardGame(boardgame) {
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
            // reviewDelete(review)
            let reviewBG = document.createElement('li')
            reviewBG.innerText = `${review.user.name}: ${review.content}` 
            // review_id = review.id
            // ul.dataset.reviewId = review.id
            const button = document.createElement('button')
            // button.textContent = "UPDATE"
            // button.addEventListener('click', ()=> {updateReview(review)})
            button.textContent = "Delete"
            button.addEventListener('click', ()=> {
                deleteReview(review.id)
                button.parentElement.remove()
            })
            ul.appendChild(reviewBG)
            reviewBG.appendChild(button)
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
            console.log(review)
            const ul = document.querySelector("#review-list")
            let reviewBG = document.createElement('li')
            reviewBG.innerText = `${review.user.name}: ${review.content}` 
            const btn = document.createElement('button')
            btn.textContent = "Delete"
            btn.setAttribute('review-id', review.id)
            btn.addEventListener('click', ()=> {
                deleteReview(review.id)
                btn.parentElement.remove()
            })
            ul.appendChild(reviewBG)
            reviewBG.appendChild(btn)
        })
    })

    // function reviewDelete(review) {
    //     let ul = document.createElement('ul')
    //     ul.id = "review-list"
    //     let reviewBG = document.createElement('li')
    //     reviewBG.innerText = `${review.user.name}: ${review.content}` 
    //     const button = document.createElement('button')
    //     button.textContent = "Delete"
    //     button.setAttribute('review-id', review.id)
    //     button.addEventListener('click', ()=> {
    //         deleteReview(review.id)
    //         button.parentElement.remove()
    //     })
    //     ul.appendChild(reviewBG)
    //     ul.appendChild(button)
    // }

// update not working 
    function updateReview(review) {
        // event.preventDefault()
        // const id = event.target.dataset.id
        // const updateButton = document.createElement('button')
        // updateButton.textContent = "UPDATE"
        // ul.appendChild(reviewBG)
        let updateReview = {
            review: review_id,
            boardgameId: boardgame_id, 
            userId: currentUser.id
        }  
        fetch(reviewURL + `/${id}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(updateReview)
        })
        .then(res => res.json())
        .then(review => {
            const ul = document.querySelector("#review-list")
        })
    }

// delete review instead of update review 
    function deleteReview(review_id) {
        fetch(`${reviewURL}/${review_id}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
    }

    getAllBoardGames() 
});

         //     li.dataset.reviewId = review.id
        // console.log(review_id)

        // .then(review => {
        //     let dReview = document.getElementById(review_id)
        //     dReview.parentElement.remove();
        // })
        // .then(()=> {
        //     let dReview = document.querySelector(`[review-id='${review_id}']`)
        //     console.log(dReview)
        //     dReview.parentElement.remove()
        // })






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
    