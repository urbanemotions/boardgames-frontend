const baseURL = "http://localhost:3000/api/v1/boardgames"
// const reviewURL = "http://localhost:3000/api/v1/reviews"

document.addEventListener("DOMContentLoaded", function() {
    
    // variables 
    // index.html-body-div sections
    const listPanel = document.querySelector("#bg-list")
    const showBGPanel = document.querySelector("#show-bg-panel")
    // dont think i need this, took out r-lst in html file
    // const showRPanel = document.querySelector("#r-list")
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
        boardgames.forEach(boardgame => {
            boardgameLi(boardgame)
            console.log(boardgame.reviews)
        })
    }

    // create li for each review
    function listOfReviews(reviews) {
        reviews.forEach(review => reviewLi(boardgame))
        // console.log(review:, content);
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
    // this works but trying another way -----
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

    function showBoardGame(boardgame, event) {
        // keeps adding to the page!!!!!! need to fix
        // const id = event.target.dataset.boardgameId
        // getOneBoardGame(id)
        //     .then(boardgame => {
        let div = document.createElement('div')
        let ul = document.createElement('ul')
        // ul.dataset.boardgameId = boardgame.id
        let boardGameImage = document.createElement('img')
        boardGameImage.src = `${boardgame.image_url}`
        let name = document.createElement('li')
        name.textContent = `Name: ${boardgame.name}`
        let theme = document.createElement('li')
        theme.textContent = `Type: ${boardgame.theme}`
        let duration = document.createElement('li')
        duration.textContent = `Playing Time: ${boardgame.duration}`
        let playernum = document.createElement('li')
        playernum.textContent = `Number of Players: ${boardgame.num_of_players}`
        let age = document.createElement('li')
        age.textContent = `Age Requirements: ${boardgame.age_requirements}`
        let description = document.createElement('li')
        description.textContent = `Description: ${boardgame.description}`
        // couldnt get this to display the review heading 
        // let reviewHeading = document.createElement('li')
        // reviewHeading.textContent = `Reviews:`


        boardgame.reviews.forEach(review => {
            let reviewBG = document.createElement('li')
            reviewBG.innerText = `${review.content}` 
            ul.appendChild(reviewBG)
            // let reviewButton = document.createElement('button')
            // reviewButton.textContent = "SUBMIT"
        })
        
        div.append(boardGameImage, name, theme, duration, playernum, age, description, ul)
        showBGPanel.appendChild(div)
    }

    // fetch one board game by id
    function getOneBoardGame(id) {
        return fetch(baseURL + `/${id}`)
            .then(res => res.json())
    }
 
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


            // promise errors !!!!!!!
            // .then(review => {
            //     const reviewShow = `<div>
            //         <p>Review: ${review.content}</p>               
            //         </div>`
            //         showRPanel.innerHTML = boardGameShow
            // }) 
            //  


    // function showBoardGame(event) {
    //             const div = document.createElement('div')
    //             const li = document.createElement('li')
    //             // li.dataset.boardgameId = boardgame.id
    //             const img = document.createElement('img')
    //             img.src = boardgame.image_url
    //             const name = document.createElement('li')
    //             name.innerText = boardgame.name
    //             const theme = document.createElement('li')
    //             theme.innerText = boardgame.theme
    //             const duration = document.createElement('li')
    //             duration.innerText = boardgame.duration
    //             const playernum = document.createElement('li')
    //             playernum.innerText = boardgame.num_of_players
    //             const age = document.createElement('li')
    //             age.innerText = boardgame.age_requirements
    //             const description = document.createElement('li')
    //             description.innerText = boardgame.description
    //             const review = document.createElement('li')
    //             const reviewButton = document.createElement('button')
    //             reviewButton.innerText = "SUBMIT"
    //             div.append(img, name, theme, duration, playernum, age, description, review, reviewButton)
    //             showBGPanel.appendChild(div)
    // }


        // function showBoardGame(event) {
    //     let div = document.createElement('div')
    //     let li = document.createElement('li')
    //     // li.dataset.boardgameId = boardgame.id
    //     let boardGameImage = document.createElement('img')
    //     boardGameImage.src = boardgame.image_url
    //     let name = document.createElement('li')
    //     name.textContent = boardgame.name
    //     let theme = document.createElement('li')
    //     theme.textContent = boardgame.theme
    //     let duration = document.createElement('li')
    //     duration.textContent = boardgame.duration
    //     let playernum = document.createElement('li')
    //     playernum.textContent = boardgame.num_of_players
    //     let age = document.createElement('li')
    //     age.textContent = boardgame.age_requirements
    //     let description = document.createElement('li')
    //     description.textContent = boardgame.description
    //     let review = document.createElement('li')
    //     let reviewButton = document.createElement('button')
    //     reviewButton.textContent = "SUBMIT"
    //     div.append(img, name, theme, duration, playernum, age, description, review, reviewButton)
    //     showBGPanel.appendChild(div)
    // }


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

    // showRPanel.addEventListener('submit', event => {
    //     
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

    // function getReview() {
    //     return fetch(reviewURL + `/${id}`)
    //         .then(res => res.json())
    // }