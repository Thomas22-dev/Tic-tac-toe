//définition des variables
const joueurs = document.querySelectorAll('.players')
const cases = document.querySelectorAll('th')
const resetIcon = document.querySelector('.reset img')
const jetest = document.querySelector('.screen')
let tour = 0
let player = 'X'
let grid = []


//Reset de l'application
resetIcon.addEventListener('click', () => {
    document.location.reload();
})

//Affichage des joueurs
joueurs[1].classList.add('inactive')

// Création du tableau qui contient toute les infos
class Places {
    constructor(index, check, html, whoplay) {
        this.index = index;
        this.check = check;
        this.html = html;
        this.whoplay = whoplay;
    }
}

for (let k = 0; k < cases.length; k++) {
    let kase = cases[k]
    let create = new Places(k, 0, kase, undefined)
    grid.push(create)
}


// fonction qui check l'élément cliquer
let checkit = function(target) {
    if (target.check == 0) {
        let span = document.createElement('span')
        span.className = 'reaveal'
        span.innerHTML = player
        target.html.appendChild(span)
        tour++
        target.check = 1
        target.whoplay = player
        target.html.removeEventListener('click', () => {})
        target.html.style.cursor = "default"
    }
}

// Ajout du listener
for (let i = 0; i < grid.length; i++) {
    let place = grid[i].html
    place.addEventListener('click', () => {
        if (tour%2 == 0) {
            player = 'X'
            joueurs[1].classList.remove('inactive')
            joueurs[0].classList.add('inactive')
            checkit(grid[i])
            verification()
        } else {
            player = 'O'
            joueurs[0].classList.remove('inactive')
            joueurs[1].classList.add('inactive')
            checkit(grid[i])
            verification()
        }
    })
}


// SYSTEME DE VERIFICATION

let columnVerif = () => {
    let index = 0
    let v = 0
    for (let p = 0; p < 3; p++) {
        //verif d'une colone
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

    //Début
    for (let p = 0; p < 3; p++) {

        //verif d'une ligne
        for (let o = 0; o < 3; o++) {
            if (grid[index].whoplay === player) {
                v++
            }
            index += 1
        }
        //fin

        if (v === 3) {
            break;
        } else {
            v = 0
        }
    }
    //fin
    
    if (v === 3) {
        return true
    } else {
        return false
    }
}

let diagonalVerif = () => {
    let index = 0
    let v = 0

    //Début
    for (let p = 0; p < 2; p++) {

        if (p === 0) {
            //verif d'une diagonale
            for (let o = 0; o < 3; o++) {
                if (grid[index].whoplay === player) {
                    v++
                }
                index += 4
            }
        //fin
        }

        if (p === 1) {
            index = 2
            //verif d'une diagonale
            for (let o = 0; o < 3; o++) {
                if (grid[index].whoplay === player) {
                    v++
                }
                index += 2
            }
        //fin
        }

        if (v === 3) {
            break;
        } else {
            v = 0
        }
    }
    //fin
    
    if (v === 3) {
        return true
    } else {
        return false
    }
}

let verification = () => {
    //affichage du message après verification
    if (columnVerif() || rowVerif() || diagonalVerif()) {
        document.querySelector('.success').style.display = 'flex'
        document.querySelector('.success').textContent = "Les " + player + " ont gagné"
        resetIcon.classList.add('end-game-reset');
    }
}
