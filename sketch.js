new Q5();
new Canvas();
world.gravity.y = 10;



let spawner, circlesGroup, player;
let mode = 'circle_spawning';

let moneyGain = 1;
let money = 0;
let upgrade = 1;
let moneyNeeded = 400;
let max_money = 100000;

function setup() {
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
     try {
      
        clear();
        background('gray');
        player.layer = 1000;
        player.x = mouseX;
        player.y = mouseY;
        
        if (mode === 'circle_spawning') {
            circleSpawning();
        }
        
        displayUI();
    
    
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
    } catch (e) {
    fill('yellow');
    textSize(20);
    text("ERROR: " + e.message, 20, height - 30);
  }
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
