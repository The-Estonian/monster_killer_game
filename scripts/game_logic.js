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
let gamePlayerMinAttack = 20;
let gamePlayerMaxAttack = 20;

let playerAttackTurn = true

const gameLogic = () => {
    if (winnerCheck(gameMonsterHealth, gamePlayerHealth)) {
        gameMonsterLevel++;
        gamePlayerExperience += gameMonsterLevel*1.1 + 50;
        gamePlayerExperienceToLevel = 100 * gamePlayerLevel
        gameMonsterHealth = monsterReset(gameMonsterHealth, gameMonsterLevel, defaultMonsterHealth);
        gamePlayerLevel = playerLevelGained(gamePlayerExperience, gamePlayerExperienceToLevel, gamePlayerLevel);
    }
}

firstAttack.addEventListener('click', (e) => {
    if (playerAttackTurn) {
        gameMonsterHealth = playerAttackMonster(gameMonsterHealth, gamePlayerMinAttack, gamePlayerMaxAttack);
        playerAttackTurn = false;
        gameLogic()            
        setTimeout(() => {
            gamePlayerHealth = monsterAttackPlayer(gamePlayerHealth, gameMonsterMinAttack, gameMonsterMaxAttack)
            playerAttackTurn = true
          }, 1000);    
        };
});
