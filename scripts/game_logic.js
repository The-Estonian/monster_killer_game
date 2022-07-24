console.log('Game logic connected!');

const defaultMonsterHealth = 100;
const defaultPlayerHealth = 100;

let gameMonsterHealth = defaultMonsterHealth;
let gameMonsterMinAttack = 5;
let gameMonsterMaxAttack = 12;
let gameMonsterLevel = 1;

let gamePlayerHealth = defaultPlayerHealth;
let gamePlayerLevel = 1;
let gamePlayerExperience = 0;
let gamePlayerExperienceToLevel = 100;
let gamePlayerMinAttack = 10;
let gamePlayerMaxAttack = 15;
let gamePlayerMana = 10

let gamePlayerStrength = 1;
let gamePlayerConstitution = 1;
let gamePlayerDexterity = 1;
let gamePlayerIntelligence = 1;

let playerAttackTurn = true;

const gameLogic = () => {
  if (gameMonsterHealth <= 0 && gamePlayerHealth > 0) {
    gamePlayerExperience = playerExperienceGain(
      gamePlayerExperience,
      gameMonsterLevel
    );
    let gamePlayerExperienceLevel = playerLevelGain(
      gamePlayerLevel,
      gamePlayerExperience,
      gamePlayerExperienceToLevel
    );
    if (gamePlayerExperienceLevel) {
      gamePlayerLevel = gamePlayerExperienceLevel[0];
      gamePlayerExperience = gamePlayerExperienceLevel[1];
      gamePlayerExperienceToLevel = gamePlayerExperienceLevel[2];
      newHealth(gamePlayerConstitution, gamePlayerLevel)
    }

    gameMonsterLevel++;
    gameMonsterHealth = monsterUpgrade(
      gameMonsterHealth,
      gameMonsterLevel,
      defaultMonsterHealth
    );
  } else if (gameMonsterHealth > 0 && gamePlayerHealth <= 0) {
    monserLevel.textContent = 'Player will resurrect in 2m';
    playerAttackTurn = false;
    setTimeout(() => {
      playerAttackTurn = true;
      monserLevel.textContent = `Level: ${gameMonsterLevel}`;
      gamePlayerHealth = playerHealthReset(gamePlayerHealth);
      gameMonsterHealth = monsterHealthReset(gameMonsterHealth);
    }, 1200);
  }
};

firstAttack.addEventListener('click', (e) => {
  if (playerAttackTurn) {
    gameMonsterHealth = playerAttackMonster(
      gameMonsterHealth,
      gamePlayerMinAttack,
      gamePlayerMaxAttack
    );
    playerAttackTurn = false;
    gameLogic();
    setTimeout(() => {
      gamePlayerHealth = monsterAttackPlayer(
        gamePlayerHealth,
        gameMonsterMinAttack,
        gameMonsterMaxAttack
      );
      playerAttackTurn = true;
      gameLogic();
    }, 1000);
  }
});

strengthBarButton.addEventListener('click', (e) => {
  gamePlayerStrength = addStrength(gamePlayerStrength);
  gamePlayerMinAttack = newDamage(gamePlayerStrength, gamePlayerLevel)[0] 
  gamePlayerMaxAttack = newDamage(gamePlayerStrength, gamePlayerLevel)[1]
});

constitutionBarButton.addEventListener('click', (e) => {
  gamePlayerConstitution = addConstitution(gamePlayerConstitution);
  gamePlayerHealth = newHealth(gamePlayerConstitution, gamePlayerLevel)
  console.log(gamePlayerHealth);
});

dexterityBarButton.addEventListener('click', (e) => {
  gamePlayerDexterity = addDexterity(gamePlayerDexterity);
});

intelligenceBarButton.addEventListener('click', (e) => {
  gamePlayerIntelligence = addIntelligence(gamePlayerIntelligence);
  gamePlayerMana = newMana(gamePlayerIntelligence, gamePlayerLevel)
});
