//Create variables here
var dog, happyDog, database, foodS, foodStock;
var dogImg, happyDogImg, foodObj;
var feeddog, addfood;
var fedTime, lastFed;
var gameState, readState;
var bedroomImg, gardenImg, washroomImg, livingroomImg;

function preload() {
    //load images here
    dogImg = loadImage('images/Dog.png');
    happyDogImg = loadImage('images/happydog.png');
    bedroomImg = loadImage('images/Bed Room.png');
    gardenImg = loadImage('images/Garden.png');
    washroomImg = loadImage('images/Wash Room.png');
    livingroomImg = loadImage('images/Living Room.png');
}

function setup() {
    createCanvas(850,600);

    database = firebase.database();
    foodStock = database.ref('Food');
    foodStock.on("value", readStock);

    lastFed = database.ref('lastFed');
    lastFed.on("value", function (data) {
        lastFed = data.val();
    });

    dog = createSprite(750, 300, 80, 80);
    dog.addImage(dogImg);
    dog.scale = 0.15;

    // console.log(dog.x, dog.y);

    foodObj = new Food();

    // feeddog = createButton('Feed the Dog');
    // feeddog.position(width / 2 + 90, 150);
    // feeddog.mousePressed(feed);

    // addfood = createButton('Add Food');
    // addfood.position(width / 2 - 10, 150);
    // addfood.mousePressed(addFoods);

    readState = database.ref('gameState');
    readState.on("value", function (data) {
        gameState = data.val();
    });

}


function draw() {
    background("green");
    // background(bedroomImg);


    var btn = createButton("Feed the Dog");
    btn.position(width / 2 + 90, 150);

    if (btn.mousePressed(function () {
        console.log(foodObj.x, foodObj.y);
        dog.x = foodObj.x;
        dog.y = foodObj.y;
        if (foodS > 0) {
            foodS--;
        }
        gameState = 1;
        database.ref('/').update({ 'gameState': gameState, lastFed: hour() });
    }));

    if (gameState == 1) {
        foodObj.display(foodS);
        dog.addImage(happyDogImg);
        dog.scale = 0.175;
        // dog.y = 250;
    }

    var addfood = createButton("Add Food");
    addfood.position(260, 150);

    if (addfood.mousePressed(function () {
        dog.x = 440;
        dog.y = 300;
        foodS++;
        gameState = 2;
        database.ref('/').update({ 'gameState': gameState });
    }));
    if (gameState == 2) {
        foodObj.display(foodS);
        dog.addImage(dogImg);
        dog.scale = 0.175;
        // milkBotltle2.visible = false;
        // dog.y = 250;
    }

    var bath = createButton("I want to take a bath");
    bath.position(360, 125);
    if (bath.mousePressed(function () {
        gameState = 3;
        database.ref('/').update({ 'gameState': gameState });
    }));

    if (gameState == 3) {
        dog.addImage(washroomImg);
        dog.x = width / 2;
        dog.y = height / 2;
        dog.scale = 1;
        // milkBotltle2.visible = false;
    }

    var sleep = createButton("I am very sleepy");
    sleep.position(240, 125);
    if (sleep.mousePressed(function () {
        gameState = 4;
        database.ref('/').update({ 'gameState': gameState });
    }));

    if (gameState == 4) {
        dog.addImage(bedroomImg);
        dog.x = width / 2;
        dog.y = height / 2;
        dog.scale = 1;
        // milkBotltle2.visible = false;
    }

    var play = createButton("Lets play!");
    play.position(500, 125);
    if (play.mousePressed(function () {
        gameState = 5;
        database.ref('/').update({ 'gameState': gameState });
    }));

    if (gameState == 5) {
        dog.addImage(livingroomImg);
        dog.x = width / 2;
        dog.y = height / 2;
        dog.scale = 1;
        // milkBotltle2.visible = false;
    }

    var playingarden = createButton("Lets play in park");
    playingarden.position(120, 125);
    if (playingarden.mousePressed(function () {
        gameState = 6;
        database.ref('/').update({ 'gameState': gameState });
    }));

    if (gameState == 6) {
        dog.addImage(gardenImg);
        dog.x = width / 2;
        dog.y = height / 2;
        dog.scale = 1;
        // milkBotltle2.visible = false;
    }

    // currentTime = hour();

    // if (currentTime == (lastFed + 1)) {
    //     update("playing");
    //     foodObj.garden(width / 2, height / 2, width, height);
    // }
    // else if (currentTime == (lastFed + 2)) {
    //     update("sleeping");
    //     foodObj.bedroom(width / 2, height / 2, width, height);
    // }
    // else if (currentTime > (lastFed + 2) && currentTime <= (lastFed + 4)) {
    //     update("bathing");
    //     foodObj.washroom(width / 2, height / 2, width, height);
    // }
    // else {
    //     update("hungry");
    //     foodObj.display();
    // }

    drawSprites();

    // textSize(30);
    // fill('white');
    // text('x: ' + mouseX + '   y: ' + mouseY, 20, 50);

    writeStock(foodS);

    if (foodS == 0) {
        dog.addImage(happyDogImg);
        // milkBotltle2.visible = false;
    }
    else {
        dog.addImage(dogImg);
        // milkBotltle2.visible = true;
    }


    // console.log(foodObj.x, foodObj.y);

    // console.log(foodS);

    //add styles here

    fill('black');
    textSize(28);
    if (lastFed > 0 || lastFed <= 24) {
        if (lastFed >= 12) {
            text('Last Fed: ' + lastFed % 12 + ' PM', 150, 50);
        }
        else if (lastFed == 0) {
            text('Last Fed: 12 AM', 160, 50);
        }
        else {
            text('Last Feed: ' + lastFed + ' AM', 150, 50);
        }
    }

    fill('black');
    textSize(20);
    if (foodS >= 0) {
        text('Food remaining: ' + foodS, 170, height - 20);
    }

    // if (gameState != "hungry") {
    //     feeddog.hide();
    //     addfood.hide();
    //     dog.remove();
    // }
    // else {
    //     feeddog.show();
    //     addfood.show();
    //     dog.addImage(dogImg);
    // }
    // console.log(gameState);

}

function update(state) {
    database.ref('/').update({
        gameState: state
    })
}

// function feed() {
//     dog.addImage(happyDogImg);
//     dog.x = foodObj.x;
//     dog.y = foodObj.y;
//     foodObj.updateFoodStock(foodObj.getFoodStock() - 1)

//     database.ref('/').update({
//         lastFed: hour()
//     })
//     if (foodS > 0) {
//         database.ref('/').update({
//             // Food: foodObj.getFoodStock()
//             Food: foodS - 1
//         })
//     }
// }

// function addFoods() {
//     dog.x = 440;
//     dog.y = 250;
//     foodS++;
//     database.ref('/').update({
//         Food: foodS
//     })
// }

function readStock(data) {
    foodS = data.val();
}

async function writeStock(x) {
    // if (x <= 0) {
    //     x = 0;
    // }
    // else {
    //     x -= 1;
    // }
    database.ref('/').update({
        Food: x
    })
}