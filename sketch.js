new Q5();
new Canvas();
world.gravity.y = 10;




function saveGame() {
let data = {
        money: money,
        moneyGain: moneyGain,
        moneyNeeded: moneyNeeded
    };
    localStorage.setItem('circleClickerSave', JSON.stringify(data));
    console.log('Game Saved');
}

function loadGame() {
    let saved = localStorage.getItem('circleClickerSave');
    if (saved) {
        let data = JSON.parse(saved);
        money = data.money ?? money;
        moneyGain = data.moneyGain ?? moneyGain;
        moneyNeeded = data.moneyNeeded ?? moneyNeeded;
        console.log('Game Loaded');
    }
}




let spawner, circlesGroup, player;
let mode = 'circle_spawning';

let moneyGain = 1;
let money = 0;
let upgrade = 1;
let moneyNeeded = 400;
let max_money = 100000;

function setup() {

    // Try loading game on start
    loadGame();
    // Groups
    circlesGroup = new Group();
    circlesGroup.diameter = 100;
    circlesGroup.color = 'red';
    circlesGroup.collider = 'static';
    circles_group.stroke = 'black';
    
    // Spawner
    spawner = new Sprite();
    spawner.height = height / 1.75;
    spawner.width = width / 1.75;
    spawner.y = height / 2;
    spawner.color = 'white';
    spawner.collider = 'static';
    
    // Player
    player = new Sprite();
    player.diameter = 20;
    player.color = 'red';
    player.overlaps(circlesGroup, collect);
}

function draw() {
    clear();
    background('gray');
    setInterval(saveGame, 5000);
    player.layer = 1000;
    player.x = mouseX;
    player.y = mouseY;
    
    if (mode === 'circle_spawning') {
        circleSpawning();
    }
    
    displayUI();


}

function circleSpawning() {
    if (circlesGroup.length <= 65) {
        let circle = new circlesGroup.Sprite();
        circle.x = random((width / 2) - (width / 4), (width / 2) + (width / 4));
        circle.y = random((height / 2) - (height / 4), (height / 2) + (height / 4));
    }
}

function collect(player, circle) {
    if (mode === 'circle_spawning') {
        circle.remove();
        money += moneyGain;
    }
}

function displayUI() {
    fill(255);
    noStroke();
    textSize(30);
    textAlign(LEFT);
    text("Money: " + round(money), 20, 50);
}
