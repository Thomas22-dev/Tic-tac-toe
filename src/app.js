//Constants
const players = document.querySelectorAll('.players')
const cells = document.querySelectorAll('th')
const resetIcon = document.querySelector('.reset img')
let turn = 0
let player = 'X'
let grid = []


//Reset app
resetIcon.addEventListener('click', () => {
    document.location.reload();
})

//Player display
players[1].classList.add('inactive')

//Table containing information about cells
class Places {
    constructor(index, check, html, whoplay) {
        this.index = index;
        this.check = check;
        this.html = html;
        this.whoplay = whoplay;
    }
}

for (let k = 0; k < cells.length; k++) {
    let cell = cells[k]
    let create = new Places(k, 0, cell, undefined)
    grid.push(create)
}


//Function that checks the element clicked
let checkit = (target) => {
    if (target.check == 0) {
        let span = document.createElement('span')
        span.className = 'reveal'
        span.innerHTML = player
        target.html.appendChild(span)
        turn++
        target.check = 1
        target.whoplay = player
        target.html.removeEventListener('click', () => {})
        target.html.style.cursor = "default"
    }
}

//Add listener
for (let i = 0; i < grid.length; i++) {
    let place = grid[i].html
    place.addEventListener('click', () => {
        if (turn%2 == 0) {
            player = 'X'
            players[1].classList.remove('inactive')
            players[0].classList.add('inactive')
            checkit(grid[i])
            verification()
        } else {
            player = 'O'
            players[0].classList.remove('inactive')
            players[1].classList.add('inactive')
            checkit(grid[i])
            verification()
        }
    })
}


//VERIFICATION SYSTEM

let columnVerif = () => {
    let index = 0
    let v = 0
    for (let p = 0; p < 3; p++) {
        //Verification of a column
        for (let o = 0; o < 3; o++) {
            if (grid[index].whoplay === player) {
                v++
            }
            index += 3
        }
        if (v === 3) {
            break;
        } else {
            v = 0
        }
        index -= 8
    }
    
    if (v === 3) {
        return true
    } else {
        return false
    }
}

let rowVerif = () => {
    let index = 0
    let v = 0

    for (let p = 0; p < 3; p++) {

        //Verification of a line
        for (let o = 0; o < 3; o++) {
            if (grid[index].whoplay === player) {
                v++
            }
            index += 1
        }

        if (v === 3) {
            break;
        } else {
            v = 0
        }
    }
    
    if (v === 3) {
        return true
    } else {
        return false
    }
}

let diagonalVerif = () => {
    let index = 0
    let v = 0

    for (let p = 0; p < 2; p++) {

        if (p === 0) {
            //Verification of a diagonal
            for (let o = 0; o < 3; o++) {
                if (grid[index].whoplay === player) {
                    v++
                }
                index += 4
            }
        }

        if (p === 1) {
            index = 2
            //Verification of a diagonal
            for (let o = 0; o < 3; o++) {
                if (grid[index].whoplay === player) {
                    v++
                }
                index += 2
            }
        }

        if (v === 3) {
            break;
        } else {
            v = 0
        }
    }
    
    if (v === 3) {
        return true
    } else {
        return false
    }
}

let verification = () => {
    //Display the message after verification
    if (columnVerif() || rowVerif() || diagonalVerif()) {
        document.querySelector('.success').style.display = 'flex'
        document.querySelector('.success').textContent = `${player} Winner!`
        resetIcon.classList.add('end-game-reset');
    }
}
