score = 0;
cross = true;

audio = new Audio('music.mp3')
audiogo = new Audio('gameOver.mp3')

setTimeout(() => {
    audio.play();
}, 1000)
document.addEventListener('keydown', (e) => {
    console.log("Key code is: ", e.code);

    if (e.code === "ArrowUp") { // Use `e.code` for the key's name
        const dino = document.querySelector('.dino'); // Fixed typo in class name
        dino.classList.add('animateDino');

        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700); // Animation duration
    } 
    if(e.code === "ArrowLeft") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX - 112 + "px";
    }   
    if(e.code === "ArrowRight") {
        dino = document.querySelector('.dino');
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = dinoX + 112 + "px";
    }   

});

setInterval(() => {
    dino = document.querySelector('.dino');
    gameOver = document.querySelector('.gameOver');
    obstacle = document.querySelector('.obstacle');

    dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('top'));
    
    ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

    offsetX = Math.abs(dx - ox);
    offsetY = Math.abs(dy - oy);
    
    if(offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = "Game Over!! - reload to Play Again";
        obstacle.classList.remove('obstacleAni');
        audiogo.play();
        setTimeout(() => {
            audiogo.pause();
            audio.pause();
        }, 1000);
    } else if(offsetX < 142 && cross) {
        score += 1;
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
        }, 500)
    }
}, 10);


function updateScore(score) {
    scoreCount.innerHTML = "Your Score: " + score;
}