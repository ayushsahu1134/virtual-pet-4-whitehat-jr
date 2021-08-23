class Food {
    constructor() {
        var foodStock, lastFed;
        this.bottle = loadImage('images/milk.png');
    }

    display(food) {
        var x = 40, y = 220;
        this.foodStock = food;
        // console.log(this.foodStock);

        imageMode(CENTER);
        image(this.bottle, 950, 220, 60, 70);

        if (this.foodStock != 0) {
            // console.log(this.foodStock);
            for (var i = 0; i < this.foodStock; i++) {
                if (i % 10 == 0) {
                    x = 40;
                    y += 50;
                }
                image(this.bottle, x, y, 40, 50);
                x += 30;
            }
            this.x = x;
            this.y = y;
            // console.log(x, y);
        }

    }

    getFoodStock() {

    }

    updateFoodStock() {

    }

    deductFood() {

    }

    bedroom(x, y, w, h) {
        imageMode(CENTER)
        image(bedroomImg, x, y, w, h);
    }

    garden(x, y, w, h) {
        imageMode(CENTER)
        image(gardenImg, x, y, w, h);
    }

    washroom(x, y, w, h) {
        imageMode(CENTER)
        image(washroomImg, x, y, w, h);
    }
    livingroom(x, y, w, h) {
        imageMode(CENTER)
        image(livingroomImg, x, y, w, h);
    }
}
