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

 [
    ['Tortank', './assets/image/800px-Méga-Tortank-XY.png', 350,[
        ['Surf', 'eau', 90, 0.95],
        ['Hydrocanon', 'eau', 110, 0.80],
        ['Morsure', 'eau', 75, 0.95],
        ['Protection', 'normal', 0, 1.00]
    ]
 ]],

// Racaillou
[
    ['Racaillou', './assets/image/Geodude.png', 320, [
        ['Jet-Pierres', 'roche', 75, 0.90],
        ['Séisme', 'sol', 100, 1.00],
        ['Roulade', 'roche', 85, 0.90],
        ['Boul\'Armure', 'normal', 0, 1.00]
    ]]
]

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








