console.log("Game logic connected!");

let defaultMonsterHealth = 100;
let defaultPlayerHealth = 100;

let gameMonsterHealth = defaultMonsterHealth;
let gameMonsterMinAttack = 5;
let gameMonsterMaxAttack = 12;
let gameMonsterLevel = 1

let gamePlayerHealth = defaultPlayerHealth * 10;
let gamePlayerExperience = 0;
let gamePlayerLevel = 1;
let gamePlayerMinAttack = 10;
let gamePlayerMaxAttack = 20;

let playerAttackTurn = true

firstAttack.addEventListener('click', (e) => {
    if (playerAttackTurn) {
        gameMonsterHealth = playerAttackMonster(gameMonsterHealth, gamePlayerMinAttack, gamePlayerMaxAttack);
        playerAttackTurn = false;
        if (winnerCheck(gameMonsterHealth, gamePlayerHealth)) {
            gameMonsterLevel++;
            gameMonsterHealth = monsterReset(gameMonsterHealth, gameMonsterLevel, defaultMonsterHealth);
        };
        
        setTimeout(() => {
            gamePlayerHealth = monsterAttackPlayer(gamePlayerHealth, gameMonsterMinAttack, gameMonsterMaxAttack)
            playerAttackTurn = true
            winnerCheck(gameMonsterHealth, gamePlayerHealth)
          }, 1000);
        console.log(gameMonsterHealth);
    }
    
});
