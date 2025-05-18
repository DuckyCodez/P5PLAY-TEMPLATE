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



let circle_upgrade = {
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
//  --  Varibles  --  \\

//  -  Prestige  -  \\
// In Order: Title, Desc, Upgrade Type (Not Here), Starting, Ending, Price Multiplication, Upgrade Type Gained
var prestige_upgrades = {
    
    // Money Gained \\
    00 : ["Money Gained V1", "+0.1 Money Gained Evertime it is Bought", 0, 15, 250, 1.5, 0.1], 
    01 : ["Money Gained V2", "+0.25 Money Gained Evertime it is Bought", 0, 10, 400, 2, 0.25], 
    02 : ["Money Gained V3", "+0.5 Money Gained Evertime it is Bought", 0, 10, 800, 2, 0.5],
    03 : ["Money Gained V4", "+1 Money Gained Evertime it is Bought", 0, 5, 1200, 2, 1],
    04 : ["Money Gained V5", "+2 Money Gained Evertime it is Bought", 0, 5, 2400, 2.5, 2],
    05 : ["Money Gained V6", "+5 Money Gained Evertime it is Bought", 0, 5, 3200, 3, 5],
    
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
var money_gain = 1; // Money Gain Per
var money = 0; // Total Money
var upgrade = 1; // Current Upgrade
var mode = 'circle_spawning'; // Which Area the Player Spawns
var max_money = 750000; // Max Cash
var multiplier = 1; // Contains Money Multiplier
var auto = false;
var auto_time = 10;



//  --  Setup  --  \\
function setup() {

    //  --  Canvas / Gravity  -- \\
    createCanvas(1250, 500);
    
    
    //img = loadImage('https://codehs.com/uploads/b753217ce0c2ee19390274a05c6e4d27');
    //bg = loadImage('https://codehs.com/uploads/7e1e5eeae19cb63eac0e1321dadb76ad')
    //prestigeIMG = loadImage('https://codehs.com/uploads/bf7b5ebc5fa01a12a9775d601add8c47')
    //img_prestige_button = loadImage('https://codehs.com/uploads/95fc91b0f1f1860ab62d5421dab5a0a8')
    
    //   --   Groups   --   \\
    
    //  -  Circle Group  - \\
    circles_group = new Group();
    circles_group.diameter = 100;
    circles_group.color = 'red';
    circles_group.collider = 'static';
    //circles_group.stroke = 'black';
    
    
    //  -  Prestige Group  -  \\
    prestige_group = new Group;
    prestige_group.collider = 'static';
    prestige_group.diameter = 75;
    //prestige_group.stroke = '#154360';
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
    //prestige_button.stroke = '#154360';
    prestige_button.collider = 'static';
    prestige_button.visible = false;
    
    
    //  -  All Upgrades  -  \\
    for (let i = 0; i < 7; i++) {
        for (let k = 0; k < 3; k++) {
            prestige_upgrade = new prestige_group.Sprite();
            prestige_upgrade.x = 325 + i*100;
            prestige_upgrade.y = 100 + k*100;
            prestige_upgrade.upgradeType = int(str(k) + str(i));
        }
    }
    
    //  -  Player  -  \\
    player = new Sprite();
    player.diameter = 20;
    player.color = 'red';
    player.overlaps(circles_group, collect);
    player.visible = true;
    player.layer = 100000000;
    //noCursor();
}




//  --  Draw  --  \\
function draw() {
    
    //  -  Money Check  -  \\
    if (money >= max_money) {
        money = max_money
    }
    
    //  -  Looped  -  \\
    clear();

    if (!auto || mode != 'circle_spawning') {
        player.x = mouseX;
        player.y = mouseY;
    }
    
    
    //  --  Area  --  \\
    
    //  -  Setups  -  \\
    
    //   Prestige   \\
    if (kb.pressed('p') && mode != 'prestige') {
        //spawner.visible = false;
        circles_group.visible = false;
        prestige_group.visible = true;
        prestige_button.visible = true;
        mode = 'prestige';
    }
    
    //  Circle Area  \\
    if (kb.pressed('t') && mode != 'circle_spawning') {
        //spawner.visible = true;
        prestige_button.visible = false;
        circles_group.visible = true;
        prestige_group.visible = false;
        mode = 'circle_spawning';
    }
    
    
    //  -  Looped Functions  -  \\
    
    //  Circle Area  \\
    if (mode == 'circle_spawning') {
        circle_spawning();
    }
    
    //   Prestige   \\
    if (mode == 'prestige') {
        prestiges();
    }
    
}




//  --  Circle Spawning  --  \\
function circle_spawning() {
    
    //  -  Setup  -  \\
    background('white');
    fill('white');




    
    
    //  -  Text  -  \\
    textAlign(LEFT, LEFT);
    //strokeWeight(0)
    rectMode(CORNER);
    //image(img, 7, (height / 2) - 70, 250, 60)
    
    //image(img, 7, (height / 2), 260, 70);
    //fill('#575757');
    //rect(25, (height / 2) - (110), 215, 83);
    //fill('#646464')
    //rect(20, (height / 2) - (115), 210, 80);
    fill('#B07F4E');
    textSize(50);
    text(money_converter(round(money)), 83, (height / 2) - (40));
    fill('white');
    textAlign(CENTER, CENTER);
    
    
    //  -  Circle Spawn  -  \\
    if (circles_group.length <= 65) { 
        circle = new circles_group.Sprite();
        circle.x = random((width / 2) - (width / 4),(width / 2) + (width / 4));
        circle.y = random((height / 2) - (height / 4),(height / 2) + (height / 4));
    }
    
    
    //  -  Upgrades for Circles  -  \\
    if (upgrade <= Object.keys(circle_upgrade).length-1) {
        textSize(50);
        text("Money Needed (For Upgrades): " + money_converter(circle_upgrade[upgrade][0]), (width / 2), 450);
        
        if (kb.pressing('u') && round(money) >= circle_upgrade[upgrade][0]) {
            money -= circle_upgrade[upgrade][0]; // Gets the cost and subtracks it from the players money
            multiplier += circle_upgrade[upgrade][1]; // Gets the 
            circles_group.color = circle_upgrade[upgrade][2];
            upgrade += 1; 
        }
    }
}




//  --  Prestige  --  \\
function prestiges() {
    
    // - Setup - \\
    background('#21618c'); // Blue Background
    let title = ""; // Blank Title
    let description = ""; // Blank Description
    
    // - Text - \\
    textAlign(LEFT, LEFT);
    //strokeWeight(0)
    rectMode(CORNER)
    textAlign(LEFT, LEFT); // Changes Texts Alignment
    fill("#B07F4E"); // Changes Color for Text / Objects
    textSize(50); // Changes Texts Size
    //image(prestigeIMG, 7, (height / 2) - 70, 250, 60)
    
    text(money_converter(round(prestige['prestige_points'])), 83, (height / 2) - (40));
    textAlign(CENTER, CENTER); // Changes Texts Alignment
    fill("white"); // Changes Color for Text / Objects
    textSize(25);
    //image(img_prestige_button, (width - 175) , (height / 2) - 150, 150,300)
    text('Prestige:',prestige_button.x,prestige_button.y-prestige_button.w)
    textSize(20);

    //  -  Prestige  -  \\
    if (player.overlapping(prestige_button)) {
        
        if (round(money) >= prestige['min_money']) {
            text(money_converter(money * prestige['prestige_rate']),prestige_button.x,prestige_button.y)
        } else {
            text('Money Needed:',prestige_button.x,prestige_button.y-30)
            text('2.5k',prestige_button.x,prestige_button.y)
        }
        prestige_button.color = color(21, 67, 96, 100); // Making it see through
        
        //  - Prestiged - \\
        if (player.overlapping(prestige_button) && mouse.pressed() && round(money) >= prestige['min_money']) {
            prestige['prestige_total'] += money * prestige['prestige_rate'];
            prestige['prestige_points'] += money * prestige['prestige_rate']; // Gets the cost and subtracks it from the players money
            money = 0;
            circles_group.color = 'red';
            multiplier += 1; // Gets the 
            upgrade = 1; 
        }

    } else {
        
        prestige_button.color = '#2874a6'; // Resets Upgrades to Dark Blue
        
    }
    
    
    

    // - All Prestige Upgrades - \\
    for (let prestige_upgrade of prestige_group) {
        
        prestige_upgrade.color = '#1b4f72'; // Resets Upgrades to Dark Blue
        
        // - Upgrade Availible - \\
        if (prestige_upgrades[prestige_upgrade.upgradeType]!=null) {
            
            prestige_upgrade.color = '#2874a6'; // Shows which Prestige Upgrade is Unlocked
            
            // - Overlaping Upgrade - \\
            if (player.overlapping(prestige_upgrade)) {
                
                // Color Change \\
                prestige_upgrade.color = color(21, 67, 96, 100); // Making it see through
                
                //  Title & Description  \\
                title = prestige_upgrades[prestige_upgrade.upgradeType][0]; // Title of the upgrade
                description = prestige_upgrades[prestige_upgrade.upgradeType][1]; // Description of the upgrade
                
                //  Cost Display  \\
                textSize(20);
                text(prestige_upgrades[prestige_upgrade.upgradeType][2] + '/' + prestige_upgrades[prestige_upgrade.upgradeType][3], prestige_upgrade.x, prestige_upgrade.y+50);
                if (prestige_upgrades[prestige_upgrade.upgradeType][2] < prestige_upgrades[prestige_upgrade.upgradeType][3]) {
                    if (prestige_upgrades[prestige_upgrade.upgradeType][2]) {
                        text(money_converter(prestige_upgrades[prestige_upgrade.upgradeType][4] * prestige_upgrades[prestige_upgrade.upgradeType][2] * prestige_upgrades[prestige_upgrade.upgradeType][5]), prestige_upgrade.x, prestige_upgrade.y); // Change to how much the upgrade costs
                
                    } else {
                        text(money_converter(prestige_upgrades[prestige_upgrade.upgradeType][4]* prestige_upgrades[prestige_upgrade.upgradeType][5]), prestige_upgrade.x, prestige_upgrade.y); // Change to how much the upgrade costs
                    }
                } else {
                    text("Max", prestige_upgrade.x, prestige_upgrade.y); // Change to how much the upgrade costs
                }
                
                //  Rectangle Display  \\
                fill('#1b4f72'); // Retangles Color
                //stroke('#154360'); // Retangles Outline
                rectMode(CENTER); // Centers Rectangle
                rect((width / 2), 425, 700, 110); // Creates Rectangle
                
                //  Title & Description Displayed \\
                fill('white'); // Text Color
                textSize(40); // Title Size
                text(title, (width / 2), 425 - 20); // Title Location
                textSize(25); // Description Size
                text(description, (width / 2), 425 + 20); // Description Location
                
                
                // - Mouse Pressed - \\
                if (mouseIsPressed) {
                    
                    //
                    if (prestige_upgrades[prestige_upgrade.upgradeType][2] != 0 && prestige_upgrades[prestige_upgrade.upgradeType][4] * prestige_upgrades[prestige_upgrade.upgradeType][2] * prestige_upgrades[prestige_upgrade.upgradeType][5] <= prestige['prestige_points'] && prestige_upgrades[prestige_upgrade.upgradeType][2] < prestige_upgrades[prestige_upgrade.upgradeType][3]) {
                        
                        //  Prestige Loss \\
                        prestige['prestige_points'] -= prestige_upgrades[prestige_upgrade.upgradeType][4] * prestige_upgrades[prestige_upgrade.upgradeType][2] * prestige_upgrades[prestige_upgrade.upgradeType][5]
                        
                        //   Money Gained   \\
                        if ([00,01,02,03,04,05].includes(prestige_upgrade.upgradeType)) {
                            money_gain += prestige_upgrades[prestige_upgrade.upgradeType][6];
                        } else if ([10].includes(prestige_upgrade.upgradeType)) {
                            prestige['prestige_rate'] += prestige_upgrades[prestige_upgrade.upgradeType][6];
                        } else if ([20,21,22].includes(prestige_upgrade.upgradeType)) {
                            auto_time += prestige_upgrades[prestige_upgrade.upgradeType][6];
                        }
                        
                        //  Changes What Upgrade its On
                        prestige_upgrades[prestige_upgrade.upgradeType][2] += 1;
                        
                    } else if (prestige_upgrades[prestige_upgrade.upgradeType][4] * prestige_upgrades[prestige_upgrade.upgradeType][5] <= prestige['prestige_points'] && prestige_upgrades[prestige_upgrade.upgradeType][2] < prestige_upgrades[prestige_upgrade.upgradeType][3]) {
                        prestige['prestige_points'] -= prestige_upgrades[prestige_upgrade.upgradeType][4] * prestige_upgrades[prestige_upgrade.upgradeType][5]
                                                //   Money Gained   \\
                        if ([00,01,02,03,04,05].includes(prestige_upgrade.upgradeType)) {
                            money_gain += prestige_upgrades[prestige_upgrade.upgradeType][6];
                        } else if ([10].includes(prestige_upgrade.upgradeType)) {
                            prestige['prestige_rate'] += prestige_upgrades[prestige_upgrade.upgradeType][6];
                        } else if ([20,21,22].includes(prestige_upgrade.upgradeType)) {
                            auto_time -= prestige_upgrades[prestige_upgrade.upgradeType][6];
                        }
                        prestige_upgrades[prestige_upgrade.upgradeType][2] += 1;
                    }
                }
            }
        }
    }
}


//  --  Money Converter  --  \\
function money_converter(money) {
    
    //  Billion Conversion  \\
    if (money >= 1000000000) {
        return Math.floor(money / 1000000000) + "b";
        
    //  Million Conversion  \\
    } else if (money >= 1000000) {
        return Math.floor(money / 100000) / 10 + "m";
    
    //  Thousand Conversion  \\
    } else if (money >= 1000) {
        return Math.floor(money / 100) / 10 + "k";
        
    //  Anything Else  \\
    } else {
        return String(money);
    }
}



//  --  Money Collecting  --  \\
function collect(player, circle) {
    if (mode == 'circle_spawning'){
        circle.remove();
        money += money_gain * upgrade;
    }
}
