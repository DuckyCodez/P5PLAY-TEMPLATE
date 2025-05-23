new Q5();
new Canvas();
world.gravity.y = 0;




function saveGame() {
    let data = {
        money: money,
        moneyGain: moneyGain,
        upgrade: upgrade,
        multiplier: multiplier
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
        upgrade = data.upgrade ?? upgrade;
        multiplier = data.multiplier ?? multiplier;
        console.log('Game Loaded');
    }
}

//  -  Prestige  -  \\
// In Order: Title, Desc, Upgrade Type (Not Here), Starting, Ending, Price Multiplication, Upgrade Type Gained
var prestige_upgrades = {
    
    // Prestige Rate \\
    10 : ["Prestige Rate V1", "1% More Prestige Evertime it is Bought", 0, 10, 400, 2.25, 0.01],
    11 : ["Prestige Rate V2", "5% More Prestige Evertime it is Bought", 0, 5, 800, 3, 0.05],
    
    // Auto Collect \\
    20 : ["Auto Collect Time V1", "Lowers time of auto collection", 0, 10, 600, 2.25, 5],
    21 : ["Auto Collect Time V2", "Buff to the time of auto collection", 0, 5, 2400, 2.5, 10],
    22 : ["Auto Collect Time V3", "Masive Buff to the time of auto collection", 0, 2, 3200, 3, 25],

}

//  -  Circle Upgrades  -  \\
var circle_upgrade = {
    // Red Upgrades \\
    1:[800 , 0.5 , '#ff4343'], 2:[1400 , 0.25 , '#ff7373'], 3:[2000 , 0.25 , '#ff9b9b'],
    
    // Orange Upgrades \\
    4:[2400 , 0.25 , '#ff8e00'], 5 : [3200 , 0.25 , '#ffac44'], 6:[5400 , 0.5 , '#ffc47a'], 7:[10000 , 1 , '#ffd39c'],
    
    // Yellow Upgrades \\
    8:[15000, 1, '#fff004'], 9:[25000, 1, '#fff448'], 10:[32000, 1, '#fff774'], 11: [40000, 1.5, '#fffaa5'],
    
    // Light Blue Upgrades \\
    12 : [50000, 1.5, '#00c9ff'], 13 : [70000, 1.5, '#40d7ff'], 14 : [85000, 1.5, '#72e2ff'], 15 : [100000, 2, '#b7f0ff']
    
    // Blue Upgrades \\
}



var prestige = {"prestige_points" : 0,"prestige_total" : 0, "prestige_rate" : 0.3, "min_money" : 2500} // First is Points, The Second is the Conversion rate
var moneyGain = 1; // Money Gain Per
var money = 0; // Total Money
var upgrade = 1; // Current Upgrade
var mode = 'circle_spawning'; // Which Area the Player Spawns
var max_money = 750000; // Max Cash
var multiplier = 1; // Contains Money Multiplier
var auto = false;
var auto_time = 10; // Time for Auto Collect

function setup() {

    // Try loading game on start
    loadGame();
    // Groups
    circlesGroup = new Group();
    circlesGroup.diameter = 100;
    circlesGroup.color = '#FF9696';
    circlesGroup.stroke = '#154360';
    circlesGroup.collider = 'static';

    
    //  -  Prestige Group  -  \\
    prestige_group = new Group;
    prestige_group.collider = 'static';
    prestige_group.diameter = 75;
    prestige_group.stroke = '#154360';
    prestige_group.color = '#ff0000';
    prestige_group.visible = false;
    
    
    
    //   -- Sprites --   \\
    
    
    //. -  Button. -  \\
    
    prestige_button = new Sprite();
    prestige_button.height = 250;
    prestige_button.width = 150;
    prestige_button.x = 1150;
    prestige_button.y = height / 2;
    prestige_button.color = '#1b4f72';
    prestige_button.stroke = '#154360';
    prestige_button.collider = 'static';
    prestige_button.visible = false;
    
    
    //  -  All Upgrades  -  \\
    for (let i = 0; i < 7; i++) {
        for (let k = 0; k < 3; k++) {
            prestige_upgrade = new prestige_group.Sprite();
            prestige_upgrade.x = 325 + i*100;
            prestige_upgrade.y = 100 + k*100;
            prestige_upgrade.upgradeType = parseInt(String(k) + String(i), 10)
        }
    }


    // Player
    player = new Sprite();
    player.diameter = 20;
    player.color = 'red';
    player.overlaps(circlesGroup, collect);
}

function update() {
    clear();

    background('white');

    setInterval(saveGame, 5000);
    player.layer = 1000;
    player.x = mouseX;
    player.y = mouseY;

    //   Prestige   \\
    if (kb.pressed('p') && mode != 'prestige') {
        //spawner.visible = false;
        mode = 'prestige';
    }
    
    //  Circle Area  \\
    if (kb.pressed('t') && mode != 'circle_spawning') {
        //spawner.visible = true;
        mode = 'circle_spawning';
    }




    //  -  Looped Functions  -  \\

    //  Circle Area  \\
    
    //   Prestige   \\
    if (mode == 'prestige') {
        prestige();
    }

    if (mode == 'circle_spawning') {
        circleSpawning();
    }
}

function circleSpawning() {
    //prestige_button.visible = false;
    //circles_group.visible = true;
    //prestige_group.visible = false;

    background('gray');
    displayUI();
    textAlign(CENTER, CENTER);

    if (circlesGroup.length <= 65) {
        strokeWeight(1);
        let circle = new circlesGroup.Sprite();
        circle.x = random((width / 2) - (width / 4), (width / 2) + (width / 4));
        circle.y = random((height / 2) - (height / 4), (height / 2) + (height / 4));
    }
    
        
    //  -  Upgrades for Circles  -  \\
    if (upgrade <= Object.keys(circle_upgrade).length-1) {
        textSize(50);
        text("Money Needed (For Upgrades): " + circle_upgrade[upgrade][0], (width / 2), 450);
        
        if (kb.pressed('u') && round(money) >= circle_upgrade[upgrade][0]) {
            money -= circle_upgrade[upgrade][0]; // Gets the cost and subtracks it from the players money
            multiplier += circle_upgrade[upgrade][1]; // Gets the 
            circlesGroup.color = circle_upgrade[upgrade][2];
            upgrade += 1;
        }
    }
}

function prestige() {
    background('blue');
    displayUI();
    circles_group.visible = false;
    prestige_button.visible = true;
    prestige_group.visible = true;
}

function collect(player, circle) {
        circle.remove();
        money += moneyGain * multiplier;
}

function displayUI() {
    fill(255);
    noStroke();
    textSize(30);
    textAlign(LEFT);
    text("Money: " + round(money), 20, 50);
    text("Multiplier: " + multiplier, 20, 100);
}