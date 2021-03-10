const baseURL = "http://localhost:3000/api/v1/boardgames"

document.addEventListener("DOMContentLoaded", function() {
    
    // variables 
    // index.html-body-div sections
    const listPanel = document.querySelector("#bg-list")
    const showBGPanel = document.querySelector("#show-bg-panel")
    const showRPanel = document.querySelector("#r-list")

    // event listeners - 
    // showBGPanel.addEventListener('click', handle) ???i dont think i need this???

    // functions 
    // fetch all board games
    function getAllBoardGames() {
        fetch(baseURL)
        .then(res => res.json())
        .then(boardgames => listOfBoardGames(boardgames))
    }

    // create li for each board game
    function listOfBoardGames(boardgames) {
        boardgames.forEach(boardgame => boardgameLi(boardgame))
    }

    function boardgameLi(boardgame) {
        const li = document.createElement('li')
        li.dataset.boardgameId = boardgame.id
        li.textContent = boardgame.name
        li.addEventListener('click', showBoardGame)
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
       }

    // fetch one board game by id
    function getOneBoardGame(id) {
        return fetch(baseURL + `/${id}`)
            .then(res => res.json())
    }











    getAllBoardGames() 

});