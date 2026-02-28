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

  // Système de types

const typeMultipliers = {
    'feu':{'plante': 2, 'eau': 0.5},
    'eau':{'feu': 2, 'plante': 0.5},
    'plante':{'eau': 2, 'feu': 0.5},
};

function getTypeMultiplier(attackType, defenderType){
    if (typeMultipliers[attackType] && typeMultipliers[attackType][defenderType]){
        return typeMultipliers[attackType][defenderType];
    }
    return 1;
}


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
    const attackType = move[1]
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
   const defenderType = defender.moves[0][1];  // type de la première attaque du défenseur
    const multiplier = getTypeMultiplier(attackType, defenderType);
    const finalDamage = Math.floor(totalDamage * multiplier);

    // 5. Messages d'efficacité
    let message = `${attacker.name} utilise ${moveName} et inflige ${finalDamage} dégâts !`;
    if (multiplier > 1){
    //     showMessage("c'est super efficace !");
    
    message += " c'est super efficace !";
    } else if (multiplier <1 && multiplier > 0){
        // showMessage("ce n'est pas très efficace...")
    message += " ce n'est pas très efficace...";
    } else if (multiplier === 0){
    //     showMessage("cela n'a aucun effet...");
    message += " cela n'a aucun effet...";
    }
    showMessage(message);
    // 6. Message d'attaque (avec les dégâts finaux)
    
    // 7. infliger les dégats (finalDamage)
    defender.hp -= finalDamage;
    if (defender.hp < 0) defender.hp = 0;

    // 8.Mettre à jour l'affichage
    
    updateHPBars();

    //9. Vériier si le défenseur est k.0. (optionnel pour l'instant)

// c'est le tour de l'adversaire
        // si l'attaquant est le joueur, que l'ennemi est vivant et que le joueur aussi
if (attacker === playerPokemon && defender.hp > 0 && playerPokemon.hp > 0){

    disableAttackButtons(true);
    setTimeout(() => {

        const randomMove = Math.floor(Math.random() * 4); 
        attack(randomMove, enemyPokemon, playerPokemon);
        if (playerPokemon.hp > 0 && enemyPokemon.hp > 0){
            disableAttackButtons(false);
        }
    }, 2000);
}

// partie win ou gameover

    if (defender.hp <= 0){
        showMessage(`${defender.name} est K.O`);
        gameActive = false;
        disableAttackButtons(true);
        // disableAttackButtons(true); le bouton recommencer apparait même quand il est en commentaire

        if(defender === playerPokemon){
            showMessage("💀Vous avez perdu...");
        }else{
            showMessage("🏆Victoire!");
        }
    
    // Supprimer l'ancien bouton s'il existe
    const oldBtn = document.getElementById('restart-btn');
    if (oldBtn) oldBtn.remove();
        // créer un bouton recommencer
    const restartBtn = document.createElement('button');
    restartBtn.id = 'restart-btn';
    restartBtn.textContent = '🔄Recommencer';
    restartBtn.style.cssText = 'position: fixed; bottom: 20px; left: 50%; transform: translateX(-50%); padding: 15px 30px; background: #ffd700; border: 2px solid #000; border-radius: 50px; font-weight: bold; cursor: pointer; z-index: 1000;';
    // restartBtn.onclick = () => location.reload();
    restartBtn.onclick = () => window.location.href = 'select.html';//quand j'active les 2 restartBtn.onclick c'est le deuxième qui est fonctionnelle pour résumer le denier domine
    document.body.appendChild(restartBtn);

    return; //Ne pas déclencher le tour ennemi 
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
    const playerBar = document.getElementById('player-hp-bar');
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

// attaquer mon adversaire

function updateAttackButtons(){
    const attacks = playerPokemon.moves;
    for (let i = 0; i < 4; i++){
        const btn = document.getElementById(`attack-${i}`);
        if (attacks[i]){
            btn.textContent = attacks[i][0];
            btn.disabled = false;
            btn.onclick = function(){
                attack(i, playerPokemon, enemyPokemon);
            };
        }else{
            btn.textContent = "---";
            btn.disabled = true;
            btn.onclick = null;
        }
    }

  

}


// pour que mon adversaire riposte

function disableAttackButtons(disabled){
    for (let i = 0; i < 4; i++){
        document.getElementById(`attack-${i}`).disabled = disabled;
    }


}

// créer le choix pokemon 
function choisirPokemon(index){
    localStorage.setItem('choixPokemon', index);// stock l'index (0,1,2)
    window.location.href = 'battle.html'; // redirige vers la page de combat


} 

// pour afficher le pokemon choisi dans l'arene
    window.onload = function(){
        const index = this.localStorage.getItem('choixPokemon');
        if(index !== null){
            selectPokemon(parseInt(index)); // transforme la chaine "0" en nombre 0
            localStorage.removeItem('choixPokemon');// nettoie pour éviter de re-sélectionner au prochain chargement
        }
    }

    // musique optionnel

    //  Créer objet audio

    const monSon = new Audio('assets/musique/Pokemon Battle Theme - Trap Remix.mp3');

    // Jouer le son

    function jouerSon(){
        monSon.play();
    }

    // Mettre en pause

    function pauseSon(){
        monSon.pause();
    }

    









