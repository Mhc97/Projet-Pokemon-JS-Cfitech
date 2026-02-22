// les varaiables importante

let playerPokemon = null;
let enemyPokemon = null;
let gameActive = false;

// la liste des pokemon

let pkmList = [
// Dracaufeu

   ['Dracaufeu', './assets/image/800px-Dracaufeu-RFVF.png', 360, [
 ['Lance-flammes', 'feu', 95, 0.90],
 ['Vol', 'vol', 90, 0.95],
 ['Danse-flamme', 'feu', 85, 0.88],
 ['Griffe-acier', 'acier', 75, 0.92]
 ]],

//  Tortank

 
    ['Tortank', './assets/image/800px-Méga-Tortank-XY.png', 350,[
        ['Surf', 'eau', 90, 0.95],
        ['Hydrocanon', 'eau', 110, 0.80],
        ['Morsure', 'eau', 75, 0.95],
        ['Protection', 'normal', 0, 1.00]
    ]
 ],

// Racaillou

    ['Racaillou', './assets/image/Geodude.png', 320, [
        ['Jet-Pierres', 'roche', 75, 0.90],
        ['Séisme', 'sol', 100, 1.00],
        ['Roulade', 'roche', 85, 0.90],
        ['Boul\'Armure', 'normal', 0, 1.00]
    ]]


];

function selectPokemon(index){
// Récupérer les données du Pokémon choisi
    const pkmData = pkmList[index];
// construction du premier joueur
playerPokemon = {
    name: pkmData[0],
    sprite: pkmData[1],
    maxHP: pkmData[2],
    hp: pkmData[2],
    moves: pkmData[3],

};

// choisir un enemie aléatoire

const randomIndex = Math.floor(Math.random() * pkmList.length);
const enemyData = pkmList[randomIndex];

enemyPokemon = {
    name: enemyData[0],
    sprite: enemyData[1],
    maxHP: enemyData[2],
    hp: enemyData[2],
    moves: enemyData[3],

};

// mettre à jour l'affichage pokemon 

document.getElementById('player-sprite').src = playerPokemon.sprite;
document.getElementById('enemy-sprite').src = enemyPokemon.sprite;

document.getElementById('player-name').textContent = playerPokemon.name;
document.getElementById('enemy-name').textContent = enemyPokemon.name;

document.getElementById('player-hp-text').textContent = 
`${playerPokemon.hp} / ${playerPokemon.maxHP}`;
document.getElementById('enemy-hp-text').textContent = 
`${enemyPokemon.hp} / ${enemyPokemon.maxHP}`;

// activer le jeu Poke-blood

gameActive = true;

// mettre à jours les barres de vie

    updateHPBars();
    updateAttackButtons();

    
// console.log(document.getElementById('enemy-hp-text'));

}

// pour les attaques

function attack(moveIndex, attacker, defender){
    // 1.Récupérer les données de l'attaque
    const move = attacker.moves[moveIndex];
    const moveName = move[0];
    const baseDamage = move[2];
    const accuracy = move[3];

    // 2.vérifier si l'attaque touche
    if (Math.random() > accuracy){
        showMessage(`${attacker.name} utilise ${moveName}... mais rate!`);
        return; // on arrête ici
        
    }

    // 3.Variation aléatoire des dégâts (+0 à +10)
    const variation = Math.floor(Math.random() *11); 
    const totalDamage = baseDamage + variation;

    // 4.Afficher le message de réussite
    showMessage(`${attacker.name} utilise ${moveName} et inflige ${totalDamage} dégats !`);

    // 5. Infliger les dégâts
    defender.hp -= totalDamage;
    if (defender.hp <0) defender.hp = 0;

    // 6.Mettre à jour l'affichage
    
    updateHPBars();

    //7. Vériier si le défenseur est k.0. (optionnel pour l'instant)
    if (defender.hp <= 0){
        showMessage(`${defender.name} est K.O. !`);
    }

}

// afficher message

function showMessage(text){
    const msgBox = document.getElementById('message-text');
        if (msgBox){
            msgBox.textContent = text;
        }else {
            console.log("Message :", text);
        }
}

function updateHPBars(){
    // player
    const playerPercent = playerPokemon.hp / playerPokemon.maxHP;
    const playerBar = document.getEelemntById('player-hp-bar');
    const playerText = document.getElementById('player-hp-text');

    playerBar.style.width = Math.floor(playerPercent * 280) + 'px';
    playerText.textContent = `${playerPokemon.hp} / ${playerPokemon.maxHP}`;

    if (playerPercent > 0.5) {
        playerBar.className = 'hp-bar green';
    }else if (playerPercent > 0.25) {
        playerBar.className = 'hp-bar orange';
    }else {
        playerBar.className = 'hp-bar red';
    }

    // Ennemi

    const enemyPercent = enemyPokemon.hp / enemyPokemon.maxHP;
    const enemyBar = document.getElementById('enemy-hp-bar');
    const enemyText = document.getElementById('enemy-hp-text');

    enemyBar.style.width = Math.floor(enemyPercent * 280) + 'px';
    enemyText.textContent = `${enemyPokemon.hp} / ${enemyPokemon.maxHP}`;

    if (enemyPercent > 0.5) {
        enemyBar.className = 'hp-bar green';
    }else if (enemyPercent > 0.25) {
        enemyBar.className = 'hp-bar orange';
    }else {
        enemyBar.className = 'hp-bar red';
    }
}







