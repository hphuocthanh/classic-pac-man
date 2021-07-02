window.addEventListener('DOMContentLoaded', () => {
    const score_element = document.getElementById("score")
    let score = 0
    const grid_element = document.querySelector(".grid")
    let squares = []
    const width = 28
    const layout = [

    ]
    function createBoard() {

        for (let i = 0; i < width * width; i++) {
            const square = document.createElement("div")
            grid_element.appendChild(square)
            squares.push(square)
        }
    }
    createBoard()
})