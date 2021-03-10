const baseURL = "http://localhost:3000/api/v1/boardgames"
const reviewURL = "http://localhost:3000/api/v1/reviews"

document.addEventListener("DOMContentLoaded", function() {
    
    // variables 
    // index.html-body-div sections
    const listPanel = document.querySelector("#bg-list")
    const showBGPanel = document.querySelector("#show-bg-panel")
    const showRPanel = document.querySelector("#r-list")
    const reviewForm = document.querySelector(".review-form")

    // functions 
    // fetch all board games
    function getAllBoardGames() {
        fetch(baseURL)
        .then(res => res.json())
        .then(boardgames => listOfBoardGames(boardgames))
        // not sure if i can do this 1*
        // .then(reviews => listOfReviews(reviews))
    }

    // create li for each board game
    function listOfBoardGames(boardgames) {
        boardgames.forEach(boardgame => boardgameLi(boardgame))
    }
    // not sure if i can do this 1*
    // function listOfReviews(reviews) {
    //     reviews.forEach(review => boardgameLi(boardgame))
    // }

    function boardgameLi(boardgame) {
        const li = document.createElement('li')
        li.dataset.boardgameId = boardgame.id
        li.textContent = boardgame.name
        li.addEventListener('click', showBoardGame)
        // li.addEventListener('click', showReview)
        // i need this click to open board games and the relevant reviews
        // li.addEventListener('click', () => {    
        //     showBoardGame;
        //     showReview;
        // });
        listPanel.appendChild(li)
    }

    // click
    // gets the selected board game and display it in the showBGPanel
    // no need for button as no changes can be made to the board game 
    function showBoardGame(event) {
        const id = event.target.dataset.boardgameId
        getOneBoardGame(id)
            .then(boardgame => {
                const boardGameShow = `<div>
                    <img alt = "board game image" src="${boardgame.image_url}" />
                    <h1>${boardgame.name}</h1>
                    <h2>Type: ${boardgame.theme}</h2>
                    <h2>Playing Time: ${boardgame.duration}</h2>
                    <h2>Number Of Players: ${boardgame.num_of_players}</h2>
                    <h2>Age Requirements: ${boardgame.age_requirements}</h2>
                    <p>Description: ${boardgame.description}</p>   
                </div>`
                showBGPanel.innerHTML = boardGameShow
            })
            // promise errors !!!!!!!
            // .then(review => {
            //     const reviewShow = `<div>
            //         <p>Review: ${review.content}</p>               
            //         </div>`
            //         showRPanel.innerHTML = boardGameShow
            // }) 
            // <p>Reviews: ${boardgame.reviews.content}</p> 
    }

    // fetch one board game by id
    function getOneBoardGame(id) {
        return fetch(baseURL + `/${id}`)
            .then(res => res.json())
    }

    // showRPanel.addEventListener('submit', event => {
    //     event.preventDefault()
    //     let review = event.target.reviews
    //     fetch(baseURL, {
    //         method: 'GET',
    //         headers: {
    //             "Content-Type": "application/json",
    //             "Accept": "application/json"
    //         }, 
    //         body: JSON.stringify({
    //             reviews
    //         })
    //     })
    //     .then(res => res.json())
    //     .then(reviews => listOfReviews(reviews))
    // })

    // function showReview(event) {
    //     const id = event.target.dataset.reviewId
    //     getReview(id)
    //         .then(review => {
    //             const reviewShow = `<div>
    //                 <p>Review: ${review.content}</p>               
    //             </div>`
    //             showRPanel.innerHTML = reviewShow
    //         })
    // }

    // function getReview() {
    //     return fetch(reviewURL + `/${id}`)
    //         .then(res => res.json())
    // }

    reviewForm.addEventListener('submit', event => {
        event.preventDefault()
        let review = event.target.reviews.content
        console.dir(event.target.children[0].content);
        const newReview = {
            reviews: reviewForm.reviews.content
        }
        fetch(baseURL, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }, 
            body: JSON.stringify(newReview)
        })
        .then(res => res.json())
        .then(boardgames => {
            const reviews = document.querySelectorAll(reviews)
            listOfBoardGames(boardgames) 
        })
    })

    function updateReview(event) {
        event.preventDefault()
        const id = event.target.dataset.id
        getOneBoardGame(id) 
        .then(boardgame => {
            const reviewSection = `<div> 
                <p>Reviews: ${boardgame.reviews.content}</p>
            </div>`
            showRPanel.innerHTML = reviewSection  
        })
    }

    getAllBoardGames() 

});