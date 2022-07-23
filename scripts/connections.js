console.log("DOM connector connected!");

const strengthBar = document.getElementById('strengthBar');
const constitutionBar = document.getElementById('constitutionBar');
const dexterityBar = document.getElementById('dexterityBar');
const intelligenceBar = document.getElementById('intelligenceBar');

const playerHealth = document.getElementById('playerHealth');
const playerLevel = document.getElementById('playerLevel');
const playerExperience = document.getElementById('playerExperience');
const playerMana = document.getElementById('playerMana');

const monsterHealth = document.getElementById('monsterHealth');
const monserName = document.getElementById('monserName');
const monserLevel = document.getElementById('monserLevel');

const firstAttack = document.getElementById('firstAttack');
const secondAttack = document.getElementById('secondAttack');
const firstSpell = document.getElementById('firstSpell');
const secondSpell = document.getElementById('secondSpell');

const randomiseAttack = (minAttack, maxAttack) => {
    let attackValue = Math.floor(Math.random() * (maxAttack - minAttack)) + minAttack
    return attackValue
};

const playerAttackMonster = (monsterCurrentHealth, minPlayerAttack, maxPlayerAttack) => {
    monsterCurrentHealth -= randomiseAttack(minPlayerAttack, maxPlayerAttack)
    monsterHealth.value = monsterCurrentHealth
    return monsterCurrentHealth
}

const monsterAttackPlayer = (playerCurrentHealth, minMonsterAttack, maxMonsterAttack) => {
    playerCurrentHealth -= randomiseAttack(minMonsterAttack, maxMonsterAttack)
    playerHealth.value = playerCurrentHealth
    return playerCurrentHealth
}

const winnerCheck = (monsterCurrentHealth, playerCurrentHealth) => {
    if (monsterCurrentHealth <= 0 && playerCurrentHealth > 0) {
        return true
    } else if (monsterCurrentHealth > 0 && playerCurrentHealth <= 0){
        return false
    } else if (monsterCurrentHealth <= 0 && playerCurrentHealth <= 0){
        return false
    }
}

const monsterReset = (monsterCurrentHealth, strengthIndex, defaultMonsterHealth) => {
    monsterCurrentHealth = defaultMonsterHealth
    monsterCurrentHealth = Math.trunc(monsterCurrentHealth * strengthIndex * 1.65/2)
    monsterHealth.value = monsterCurrentHealth
    monsterHealth.max = monsterCurrentHealth
    monserLevel.textContent = `Level: ${strengthIndex}`
    return monsterCurrentHealth
}
