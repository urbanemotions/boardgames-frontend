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
        // console.log("this")
        const id = event.target.dataset.boardgameId
        getOneBoardGame(id)
        // return fetch(baseURL + `/${id}`)
        //     .then(res => res.json())
            .then(boardgame => {
                const boardGameShow = `<div>
                    <img alt = "board game image" src="${boardgame.image_url}" />
                    <h1>${boardgame.name}</h1>
                    <h1>${boardgame.theme}</h1>
                    <h1>${boardgame.duration}</h1>
                    <h1>${boardgame.num_of_players}</h1>
                    <h1>${boardgame.age_requirements}</h1>
                    <p>${boardgame.description}</p>                
                </div>`
                showBGPanel.innerHTML = boardGameShow
            })
       }

    // couldnt get it to work so cant break up to smaller methods 
    // fetch one board game by id
    function getOneBoardGame(id) {
        return fetch(baseURL + `/${id}`)
            .then(res => res.json())
    }

    getAllBoardGames() 

});