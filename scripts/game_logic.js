console.log("Game logic connected!");

const defaultMonsterHealth = 100
const defaultPlayerHealth = 100

let gameMonsterHealth = defaultMonsterHealth;
let gameMonsterMinAttack = 5;
let gameMonsterMaxAttack = 12;
let gameMonsterLevel = 1;

let gamePlayerHealth = defaultPlayerHealth;
let gamePlayerLevel = 1;
let gamePlayerExperience = 0;
let gamePlayerExperienceToLevel = 100;
let gamePlayerMinAttack = 20;
let gamePlayerMaxAttack = 150;

let playerAttackTurn = true;

const gameLogic = () => {
    if (gameMonsterHealth <= 0 && gamePlayerHealth > 0) {
        gamePlayerExperience = playerExperienceGain(gamePlayerExperience, gameMonsterLevel);
        let gamePlayerExperienceLevel = playerLevelGain(gamePlayerLevel, gamePlayerExperience, gamePlayerExperienceToLevel)
        if (gamePlayerExperienceLevel) {
            gamePlayerLevel = gamePlayerExperienceLevel[0]
            gamePlayerExperience = gamePlayerExperienceLevel[1]
            gamePlayerExperienceToLevel = gamePlayerExperienceLevel[2]
        }

        gameMonsterLevel++
        gameMonsterHealth = monsterUpgrade(gameMonsterHealth, gameMonsterLevel, defaultMonsterHealth);
    } else if (gameMonsterHealth > 0 && gamePlayerHealth <= 0){
        monserLevel.textContent = "Player will resurrect in 2m";
        playerAttackTurn = false;
        setTimeout(() => {
            playerAttackTurn = true;
            monserLevel.textContent = `Level: ${gameMonsterLevel}`;
            gamePlayerHealth = playerHealthReset(gamePlayerHealth);
            gameMonsterHealth = monsterHealthReset(gameMonsterHealth)
        }, 1200); 
    }
}

firstAttack.addEventListener('click', (e) => {
    if (playerAttackTurn) {
        gameMonsterHealth = playerAttackMonster(gameMonsterHealth, gamePlayerMinAttack, gamePlayerMaxAttack);
        playerAttackTurn = false;
        gameLogic();        
        setTimeout(() => {
            gamePlayerHealth = monsterAttackPlayer(gamePlayerHealth, gameMonsterMinAttack, gameMonsterMaxAttack);
            playerAttackTurn = true;
            gameLogic();
          }, 1000);  
    };
});
