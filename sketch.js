let spawner, circlesGroup, player;



function setup() {

    //  --  Canvas  -- \\
    createCanvas(1250, 500);
    world.gravity.y = 10;
    
    
    
    //   --   Groups   --   \\
    
    //  --  Circle Group  -- \\
    circlesGroup = new Group();
    circlesGroup.diameter = 100; 
    circlesGroup.color = 'red';
    circlesGroup.collider = 'static';
    
    
    
    //   -- Sprites --   \\
    
    //  --  Circle Spawner  --  \\
    spawner = new Sprite();
    spawner.height = height / 1.75;
    spawner.width = width / 1.75;
    spawner.y = height / 2;
    spawner.color = 'white';
    spawner.collider = 'static';
    
    
    //  --  Player  --  \\
    player = new Sprite();
    player.diameter = 20;
    player.color = 'red';
    player.overlaps(circlesGroup, collect);
}

var moneyGain = 1;
var money = 0;
var upgrade = 1;
var moneyNeeded = 400;
var test = 0.5;
var max_money = 100000;

function draw() {
    
    clear();
    background('gray');
    player.layer = 1000;

    circle_spawning()
    
}




function collect(player, circle) {
    if (mode == 'circle_spawning'){
        circle.remove();
        money += 1;
    }
};

//  --  SPAWN  --  \\

   //  circle  \\  
function circle_spawning() {
    
    background('gray');
    
    if (circlesGroup.length <= 65) { 
        circle = new circlesGroup.Sprite();
        circle.x = random((width / 2) - (width / 4),(width / 2) + (width / 4));
        circle.y = random((height / 2) - (height / 4),(height / 2) + (height / 4));
    }
    
    textSize(50);
    text("Money: " +round(money), 20, 60);
}
