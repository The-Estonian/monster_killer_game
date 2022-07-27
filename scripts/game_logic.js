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
let playerCriticalChance = 0;
let gamePlayerMana = 10;

let gamePlayerStrength = 1;
let gamePlayerConstitution = 1;
let gamePlayerDexterity = 1;
let gamePlayerIntelligence = 1;

let playerAttackTurn = true;

let fightLog = [];

const PLAYER_NORMAL_ATTACK = '"Normal Attack"';
const PLAYER_CRITICAL_ATTACK = '"Critical Attack"';
const PLAYER_HEAL_SPELL = '"Heal spell"';
const PLAYER_HEALS = 'Player heals with';
const PLAYER_ATTACK = 'Player attacks with';
const MONSTER_ATTACK = 'Monster attacks with';
const MONSTER_NORMAL_ATTACK = '"Normal Attack"';

const writeToFightLog = (attacker, attackType, attackValue, crit = false) => {
  let logEntry = {
    attacker: attacker,
    attackType: attackType,
    attackValue: attackValue,
  };
  fightLog.push(logEntry);
  logTable.innerHTML = '';
  for (let i = 0; i < fightLog.length; i++) {
    let dataCluster = document.createElement('tr');
    let dataClusterAttacker = document.createElement('td');
    dataClusterAttacker.innerHTML = fightLog[i].attacker;
    let dataClusterAttack = document.createElement('td');
    dataClusterAttack.innerHTML = fightLog[i].attackType;
    let dataClusterFor = document.createElement('td');
    dataClusterFor.innerHTML = 'for';
    let dataClusterAttackValue = document.createElement('td');
    dataClusterAttackValue.innerHTML = fightLog[i].attackValue;
    let dataClusterDamage = document.createElement('td');
    if (
      dataClusterAttacker.innerHTML === PLAYER_ATTACK ||
      dataClusterAttacker.innerHTML === MONSTER_ATTACK
    ) {
      dataClusterDamage.innerHTML = 'damage';
    } else if (dataClusterAttacker.innerHTML === PLAYER_HEALS) {
      dataClusterDamage.innerHTML = 'hitpoints';
    }
    dataCluster.appendChild(dataClusterAttacker);
    dataCluster.appendChild(dataClusterAttack);
    dataCluster.appendChild(dataClusterFor);
    dataCluster.appendChild(dataClusterAttackValue);
    dataCluster.appendChild(dataClusterDamage);
    logTable.appendChild(dataCluster);
  }
  logTable.lastChild.scrollIntoView();
};

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
      newHealth(gamePlayerConstitution, gamePlayerLevel);
      newMana(gamePlayerIntelligence, gamePlayerLevel);
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
    playerAttackMonsterValues = playerAttackMonster(
      gameMonsterHealth,
      gamePlayerMinAttack,
      gamePlayerMaxAttack
    );

    gameMonsterHealth = playerAttackMonsterValues[0];
    writeToFightLog(
      PLAYER_ATTACK,
      PLAYER_NORMAL_ATTACK,
      playerAttackMonsterValues[1]
    );
    playerAttackTurn = false;
    gameLogic();
    setTimeout(() => {
      monsterAttackPlayerValues = monsterAttackPlayer(
        gamePlayerHealth,
        gameMonsterMinAttack,
        gameMonsterMaxAttack
      );
      gamePlayerHealth = monsterAttackPlayerValues[0];
      writeToFightLog(
        MONSTER_ATTACK,
        MONSTER_NORMAL_ATTACK,
        monsterAttackPlayerValues[1]
      );
      playerAttackTurn = true;
      gameLogic();
    }, 1000);
  }
});

criticalAttack.addEventListener('click', (e) => {
  let criticalSuccess = false;
  if (playerAttackTurn) {
    playerAttackMonsterValues = playerAttackMonster(
      gameMonsterHealth,
      gamePlayerMinAttack,
      gamePlayerMaxAttack
    );
    if (attackCriticalChance(playerCriticalChance + 20)) {
      playerAttackMonsterValues[0] -= playerAttackMonsterValues[1];
      playerAttackMonsterValues[1] *= 2;
      criticalSuccess = true;
    }
    gameMonsterHealth = playerAttackMonsterValues[0];
    writeToFightLog(
      PLAYER_ATTACK,
      PLAYER_CRITICAL_ATTACK,
      playerAttackMonsterValues[1],
      criticalSuccess
    );
    playerAttackTurn = false;
    gameLogic();
    setTimeout(() => {
      monsterAttackPlayerValues = monsterAttackPlayer(
        gamePlayerHealth,
        gameMonsterMinAttack,
        gameMonsterMaxAttack
      );
      gamePlayerHealth = monsterAttackPlayerValues[0];
      writeToFightLog(
        MONSTER_ATTACK,
        MONSTER_NORMAL_ATTACK,
        monsterAttackPlayerValues[1]
      );
      playerAttackTurn = true;
      gameLogic();
    }, 1000);
  }
});

healSpell.addEventListener('click', (e) => {
  playerHealthHealValue = playerHealSpell(
    gamePlayerHealth,
    gamePlayerIntelligence
  );
  gamePlayerHealth = playerHealthHealValue[0];
  writeToFightLog(PLAYER_HEALS, PLAYER_HEAL_SPELL, playerHealthHealValue[1]);
  playerAttackTurn = false;
  gameLogic();
  setTimeout(() => {
    monsterAttackPlayerValues = monsterAttackPlayer(
      gamePlayerHealth,
      gameMonsterMinAttack,
      gameMonsterMaxAttack
    );
    gamePlayerHealth = monsterAttackPlayerValues[0];
    writeToFightLog(
      MONSTER_ATTACK,
      MONSTER_NORMAL_ATTACK,
      monsterAttackPlayerValues[1]
    );
    playerAttackTurn = true;
    gameLogic();
  }, 1000);
});

strengthBarButton.addEventListener('click', (e) => {
  gamePlayerStrength = addStrength(gamePlayerStrength);
  let newDamageVariables = newDamage(gamePlayerStrength, gamePlayerLevel);
  gamePlayerMinAttack = newDamageVariables[0];
  gamePlayerMaxAttack = newDamageVariables[1];
});

constitutionBarButton.addEventListener('click', (e) => {
  gamePlayerConstitution = addConstitution(gamePlayerConstitution);
  gamePlayerHealth = newHealth(gamePlayerConstitution, gamePlayerLevel);
});

dexterityBarButton.addEventListener('click', (e) => {
  gamePlayerDexterity = addDexterity(gamePlayerDexterity);
  playerCriticalChance = newCritRate(gamePlayerDexterity, gamePlayerLevel);
});

intelligenceBarButton.addEventListener('click', (e) => {
  gamePlayerIntelligence = addIntelligence(gamePlayerIntelligence);
  gamePlayerMana = newMana(gamePlayerIntelligence, gamePlayerLevel);
});
