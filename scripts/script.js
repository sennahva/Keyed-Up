const canvasElement = document.querySelector('canvas')
const canvasContext = canvasElement.getContext('2d')

const buttonElement = document.querySelector('button')
const speelopnieuw = document.querySelector('div')

//player
const playerCube = canvasContext
let inAir = 0
let gravity = 0
let playerCords = {
    x: 100, 
    y: 600,
}
const playerSize = {
    width: 32 * 4, 
    height: 32 * 4,
}
let playerSpeed = {
    rechts: 0, 
    links: 0, 
}

// current level
let levelCurrent = 0

// einde spel uitgespeelt
const winTexten = ['You win!', 'Victory!', 'Winner!', 'Gewonnen!']
let randomGetal

//sprite player image
const playerImage = new Image()
playerImage.src = './Assets/characterSprite.png'
let maxFrames = 5
let slowFrame = 0
let jumpKant = 'rechts'
const spriteSize = {
    width: 320, 
    height: 320,
}
let spriteFrame = {
    x: 0,
    y: 2,
}

//platform
const platformCube = canvasContext
const platformImage = new Image()
platformImage.src = './Assets/platformSprite.png'
const platformSize = {
    width: 288, 
    height: 30,
}
const platformCords = {
    x: 1200, 
    y: 700,
}
const platformCords2 = {
    x: 650, 
    y: 550,
}
const platformCords3 = {
    x: 200, 
    y: 400,
}
const platformCords4 = {
    x: 800, 
    y: 250,
}

//deur 
const deur = canvasContext
const deurImage = new Image()
deurImage.src = './Assets/deurSprite.png'
let deurSprite = {
    x: 0, 
    y: 0,
    width: 230, 
    height: 280,
}
let deurMaxFrames = 0   
let deurSize = {
    width: 184, 
    height: 224,
}
let deurCords = {
    x: 700, 
    y: 606, 
}

//background
const backGround = canvasContext
canvasElement.width = 16 * 100
canvasElement.height = 9 * 100

const backgroundImage = new Image()
backgroundImage.src = './Assets/backgroundSprite.png'

// grond
const ground = canvasContext
const groundImage = new Image()
groundImage.src = './Assets/groundSprite.png'
const groundCube = {
    width: 1600, 
    height: 70, 
    x: 0, 
    y: 830,
}
const groundTall = canvasContext
const groundTallImage = new Image()
groundTallImage.src = './Assets/groundTallSprite.png'
let groundTallCube = {
    width: 200, 
    height: 650, 
    x: 1800, 
    y: 250,
}
const groundWide = canvasContext
const groundWideImage = new Image()
groundWideImage.src = './Assets/groundWideSprite.png'
let groundWideCube = {
    width: 300, 
    height: 200, 
    x: 1800, 
    y: 700,
}

// sleutel
const sleutel = canvasContext
sleutelImage = new Image()
sleutelImage.src = './Assets/keySprite.png'
sleutelMaxFrames = 4
let sleutelSprite = {
    x: 0, 
    y: 0, 
    width: 80, 
    height: 80,
}
let sleutelCube = {
    x: 950, 
    y: 150, 
    width: 80, 
    height: 80, 
    pickedUp: 0, 
}

// gameloop / fps
let loop
let fps = 1000/120

// voert functies uit om de 120(fps) seconde, hoeveel frames per seconden 
window.onload = function() {
    loop = setInterval(() => {
        update()
        collisions()
    }, fps)
}

function collisions() {
    
// platform collision
var platforms = [platformCords, platformCords2, platformCords3, platformCords4, groundWideCube];

// Loop door alle platforms en grond
for (var i = 0; i < platforms.length; i++) {
    var platform = platforms[i];
    
    // Controleer de collision met het huidige platform
    if (playerCords.y + playerSize.height <= platform.y + 10 &&
        playerCords.y + playerSize.height >= platform.y - 10 &&
        playerCords.x + playerSize.width >= platform.x &&
        playerCords.x <= platform.x + platformSize.width) {
            gravity = 0;
            break;
    }
}

    // sleutel collision / oppakken
    if (playerCords.y + playerSize.height >= sleutelCube.y && playerCords.y <= sleutelCube.height + sleutelCube.y && playerCords.x + playerSize.width >= sleutelCube.x && playerCords.x <= sleutelCube.x + sleutelCube.width) {
        sleutelCube.pickedUp = 1
        sleutelCube.x = 1800
        deurMaxFrames = 4
        deurSprite.y = 1 
    }

    // deur collision
    if ((playerCords.y + playerSize.height >= deurCords.y && playerCords.y <= deurSize.height + deurCords.y && playerCords.x + playerSize.width >= deurCords.x && playerCords.x <= deurCords.x + deurSize.width) 
        && (sleutelCube.pickedUp == 1)) {
        levelCurrent += 1
        deurSprite.x = 0
        deurSprite.y = 2
        deurMaxFrames = 2
        levelChange()
    }
}

//update die alle assets inlaad en alles animeert + player pysics
function update() {
    backGround.drawImage(backgroundImage, 0, 0)

    // platform 1
    platformCube.drawImage(platformImage, platformCords.x, platformCords.y, platformSize.width, platformSize.height)
    // platform 2
    platformCube.drawImage(platformImage, platformCords2.x, platformCords2.y, platformSize.width, platformSize.height)
    // platform 3
    platformCube.drawImage(platformImage, platformCords3.x, platformCords3.y, platformSize.width, platformSize.height)
    // platform 4
    platformCube.drawImage(platformImage, platformCords4.x, platformCords4.y, platformSize.width, platformSize.height)

    groundTall.drawImage(groundTallImage, groundTallCube.x, groundTallCube.y, groundTallCube.width, groundTallCube.height)
    groundWide.drawImage(groundWideImage, groundWideCube.x, groundWideCube.y, groundWideCube.width, groundWideCube.height)
    ground.drawImage(groundImage, groundCube.x, groundCube.y, groundCube.width, groundCube.height)
    
    // deur en animation
    deur.drawImage(deurImage, deurSprite.x * deurSprite.width, deurSprite.y * deurSprite.height, deurSprite.width, deurSprite.height, deurCords.x, deurCords.y, deurSize.width, deurSize.height)
    if (slowFrame % 10 == 0) {
        if (deurSprite.x < deurMaxFrames) {
            deurSprite.x ++
        } 
    }

    // sleutel en animation
    sleutel.drawImage(sleutelImage, sleutelSprite.x * sleutelSprite.width, sleutelSprite.y * sleutelSprite.height, sleutelSprite.width, sleutelSprite.height, sleutelCube.x, sleutelCube.y, sleutelCube.width, sleutelCube.height)
    if (slowFrame % 10 == 0) {
        if (sleutelSprite.x < sleutelMaxFrames) {
            sleutelSprite.x ++
        } else {
            sleutelSprite.x = 0
        } }

    // player en animation
    playerCube.drawImage(playerImage, spriteFrame.x * spriteSize.width, spriteFrame.y * spriteSize.height, spriteSize.width, spriteSize.height, playerCords.x, playerCords.y, playerSize.width, playerSize.height)
    if (slowFrame % 10 == 0) {
        if (spriteFrame.x < maxFrames) {
            spriteFrame.x ++
        } else {
            spriteFrame.x = 0
        } }
    slowFrame ++

    // gravity als boven onderkant van canvas
    playerCords.y += gravity
    if (playerCords.y + playerSize.height + gravity < canvasElement.height - 70) {        
        if (gravity < 20) {
            gravity += 1
        }
    } else {
        gravity = 0
    }

    // muur links en rechts
    if (playerCords.x < 9) {
        playerSpeed.links = 0
    } 
    if ((playerCords.x + playerSize.width) > 1590) {
        playerSpeed.rechts = 0
    }

    // x positie van de speler update
    playerCords.x += playerSpeed.rechts
    playerCords.x += playerSpeed.links
}

// movement controller
window.addEventListener('keydown', (move) => {
    switch (move.key) {
        case 'd':
            playerSpeed.rechts = 9
            spriteFrame.y = 0
            maxFrames = 9
            jumpKant = 'rechts'
            break
        case 'a': 
            playerSpeed.links = -9
            spriteFrame.y = 1
            maxFrames = 9
            jumpKant = 'links'
            break
        case ' ':
            if (gravity == 0 && inAir == 0) {
                gravity = -23 
                inAir = 1
            }
            // als speler naar rechts springt 
            if (jumpKant == 'rechts') {
                spriteFrame.x = 0 
                spriteFrame.y = 5
                maxFrames = 0
            } // als de speler naar links springt
            if (jumpKant == 'links') {
                spriteFrame.x = 0 
                spriteFrame.y = 7
                maxFrames = 0
            }
            break        
        }
})

// als een toets wordt losgelaten 
window.addEventListener('keyup', (move) => {
    switch (move.key) {
        case 'd':
            playerSpeed.rechts = 0
            spriteFrame.x = 0
            maxFrames = 5
            spriteFrame.y = 2
            break
        case 'a': 
            playerSpeed.links = 0
            spriteFrame.x = 0
            maxFrames = 5
            spriteFrame.y = 3
            break
        case ' ':
            inAir = 0
            if (jumpKant == 'rechts') {
                spriteFrame.x = 0
                maxFrames = 5
                spriteFrame.y = 2
            }
            if (jumpKant == 'links') {
                spriteFrame.x = 0
                maxFrames = 5
                spriteFrame.y = 3
            }
            break   
    }
})

// als je door de deur gaat, laad het volgende level 
function levelChange() {
    if (levelCurrent == 1) {
        playerCords.x = 700
        playerCords.y = 700
        sleutelCube.pickedUp = 0
        platformCords.x = 650
        platformCords.y = 550
        platformCords2.x = 1200
        platformCords2.y = 400
        platformCords3.x = 650
        platformCords3.y = 250
        platformCords4.x = 250
        platformCords4.y = 250
        sleutelCube.x = 350
        sleutelCube.y = 150
        groundWideCube.x = 1200

    } else if (levelCurrent == 2) {
        playerCords.x = 700
        playerCords.y = 700
        sleutelCube.pickedUp = 0    
        platformCords.x = 650
        platformCords.y = 550
        platformCords2.x = 250
        platformCords2.y = 350
        platformCords3.x = 900
        platformCords3.y = 250
        platformCords4.x = 1400
        platformCords4.y = 250
        sleutelCube.x = 1500
        sleutelCube.y = 150
        groundTallCube.x = 1400
        groundWideCube.x = 150

    // als je alle 3 de levels hebt gehaalt
    } else if (levelCurrent == 3) {
        randomGetal = Math.random() * 4;
        randomGetal = Math.floor(randomGetal); 
        document.querySelector('h2').textContent = winTexten[randomGetal]
        speelopnieuw.classList.add("endscreen"); 
        buttonElement.addEventListener("click", reset)
    }
}

// als op speel opnieuw word geklikt
function reset() {
    levelCurrent = 0
    playerCords.x = 100
    playerCords.y = 700
    platformCords.x = 1200
    platformCords.y = 700
    platformCords2.x = 650
    platformCords2.y = 550
    platformCords3.x = 200
    platformCords3.y = 400
    platformCords4.x = 800
    platformCords4.y = 250
    groundTallCube.x = 1800
    groundWideCube.x = 1800
    sleutelCube.pickedUp = 0
    sleutelCube.x = 950
    sleutelCube.y = 150

    speelopnieuw.classList.remove("endscreen"); 
}

// bronnen:
// https://www.youtube.com/watch?v=_MyPLZSGS3s
// https://www.youtube.com/watch?v=CY0HE277IBM
// https://www.youtube.com/watch?v=Lcdc2v-9PjA&t=9605s
// https://www.youtube.com/watch?v=lW6ZtvQVzyg