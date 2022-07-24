console.log("DOM connector connected!");

const strengthBar = document.getElementById('strengthBar');
const constitutionBar = document.getElementById('constitutionBar');
const dexterityBar = document.getElementById('dexterityBar');
const intelligenceBar = document.getElementById('intelligenceBar');

const strengthBarButton = document.getElementById('strengthBarButton');
const constitutionBarButton = document.getElementById('constitutionBarButton');
const dexterityBarButton = document.getElementById('dexterityBarButton');
const intelligenceBarButton = document.getElementById('intelligenceBarButton');

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

const attackCriticalChance = (raiseCrit) => {
    roll = Math.floor(Math.random() * 100);
    if (roll >= 50) {
        console.log("Crit!");
    }
}

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

const monsterUpgrade = (monsterCurrentHealth, strengthIndex, defaultMonsterHealth) => {
    monsterCurrentHealth = defaultMonsterHealth
    monsterCurrentHealth = Math.trunc(monsterCurrentHealth * strengthIndex * 1.65/2)
    monsterHealth.value = monsterCurrentHealth
    monsterHealth.max = monsterCurrentHealth
    monserLevel.textContent = `Level: ${strengthIndex}`
    return monsterCurrentHealth
}


const playerExperienceToLevel = (playerLevel) => {
    playerCurrentExperienceToLevel = playerLevel * 100 * 1.13
    playerExperience.max = playerCurrentExperienceToLevel
    return playerCurrentExperienceToLevel
}

const playerLevelGain = (playerLevel, playerCurrentExperience, playerExperienceUntillLevel) => {
    if (playerCurrentExperience > playerExperienceUntillLevel) {
        playerLevel++
        experienceOvercap = playerCurrentExperience - playerExperienceUntillLevel
        playerSetExperience(experienceOvercap)
        playerSetLevel(playerLevel)
        let playerNewExperienceToLevel = playerExperienceToLevel(playerLevel)
        return [playerLevel, experienceOvercap, playerNewExperienceToLevel]
    }
}

const playerSetLevel = (playerNewLevel) => {
    playerLevel.value = playerNewLevel
}

const playerSetExperience = (currentExperience) => {
    playerExperience.value = currentExperience
}

const playerSetHealth = (playerNewHealthCap) => {
    playerHealth.max = playerNewHealthCap
}

const playerExperienceGain = (experienceHad, monsterLevel) => {
    experienceGained = Math.trunc(100 * monsterLevel * 1.65/2)
    experienceHad += experienceGained
    playerSetExperience(experienceHad)
    return experienceHad
}

const playerHealthReset = () => {
    playerHealth.value = playerHealth.max
    return playerHealth.max
}

const monsterHealthReset = () => {
    monsterHealth.value = monsterHealth.max
    return monsterHealth.max
}

const addStrength = (currentStrength) => {
    currentStrength++
    strengthBar.value = currentStrength
    return currentStrength
}

const newDamage = (strength, level) => {
    playerMinAttack = level + (strength * 2) + 10
    playerMaxAttack = level + (strength * 3) + 15
    return [playerMinAttack, playerMaxAttack]
}

const addConstitution = (currentConstitution) => {
    currentConstitution++
    constitutionBar.value = currentConstitution
    return currentConstitution
}

const newHealth = (constitution, level) => {
    playerNewHealth = ((level-1) * 25) + ((constitution-1) * 25) + 100
    playerSetHealth(playerNewHealth)
    return playerNewHealth
}

const addDexterity = (currentDexterity) => {
    currentDexterity++
    dexterityBar.value = currentDexterity
    return currentDexterity
}

const addIntelligence = (currentIntelligence) => {
    currentIntelligence++
    intelligenceBar.value = currentIntelligence
    return currentIntelligence
}

const newMana = (intelligence, level) => {
    playerNewMana = (level * 5) + (intelligence * 5) + 10
    return playerNewMana
}


