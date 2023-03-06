const canvas = document.querySelector("#game-snake");//нашла объект canvas
const ctx = canvas.getContext("2d");

console.log(canvas);

let block = 30; //размер квадратика на поле
let gameScore = 0; //счёт в игре, начальное значение

const bgGame = new Image(); //класс для картинок
bgGame.src = "img/game-background.svg"; //путь к картинке с игравым полем

const apple = new Image(); //класс для картинок
apple.src = "img/apple.svg"; //путь к картинке с яблоком

const snakePart = new Image(); //класс для картинок
snakePart.src = "img/snake-part.svg"; //путь к картинке с элементом для змейки


const badApple = new Image(); //класс для картинок
badApple.src = "img/bad-apple.svg"; //путь к картинке с плохим яблоком



//объект для отображения еды
let food = {
    x: Math.floor((Math.random()*18+1))*block, //18 количество клеток по горизонт.
    y: Math.floor((Math.random()*15+4))*block, //15 по верт., округляем до целого числа
};

let badFood = {
    x: Math.floor((Math.random()*18+1))*block, //18 количество клеток по горизонт.
    y: Math.floor((Math.random()*15+4))*block, //15 по верт., округляем до целого числа
};

//объект для отображения змейки
let snake = []; //массив для частей змейки
snake[0] = {
    x: 2*block,
    y: 5*block,
};//каждый элемент массива будет объект с координатами


//обработчик собылий для всего док.,(нажатие на клав., вызов функции) 
let pressKey; 
document.addEventListener("keydown", direction); 
function direction(event){ //проверяем на какую клавишу нажали, по коду для клавиш
    
    if(event.keyCode == 37 && pressKey != "right"){
        pressKey = "left";}

    else if(event.keyCode == 38 && pressKey != "down")
        {pressKey = "up";}

    else if(event.keyCode == 39 && pressKey != "left")
        {pressKey = "right";}

    else if(event.keyCode == 40 && pressKey != "up")
        {pressKey = "down";}
    console.log(pressKey);
};

//столкновение с хвостом
function tailCollision(snakeHead, arr){
    for(let i = 0; i < arr.length; i++){
        if(snakeHead.x == arr[i].x && snakeHead.y == arr[i].y){
            clearInterval(drawGame);  
        }
    };
}

//функция рисования объектов
function draw(){
    ctx.drawImage(bgGame, 0, 0);//функция рисует картинку фона в опр. координатах
    ctx.drawImage(apple, food.x, food.y); //рисуем яблоко, обращаемся к координатам
    ctx.drawImage(badApple, badFood.x, badFood.y); //рисуем плохое яблоко, обращаемся к координатам

  //рисуем змею
  for (let i = 0; i < snake.length; i++){
    ctx.drawImage(snakePart, snake[i].x, snake[i].y);//рисуем змею, указываем начальные координаты
}

  //рисуем счёт
    ctx.fillStyle = "#fbba00";
    ctx.font = "50px Arial";
    ctx.fillText(gameScore, block*4, block*2.6);//функция с координатами счёта

  //двигаем змейку
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;


    if (snakeX == food.x && snakeY == food.y){ //змейка съедает и яблоко появляется в др. месте
        food = {
            x: Math.floor((Math.random()*18+1))*block, 
            y: Math.floor((Math.random()*15+4))*block, 
        };
        gameScore++; //увеличиваем счёт
    } else {
       snake.pop();//удаляется элемент змейки
    }

    if (snakeX == badFood.x && snakeY == badFood.y){ //змейка съедает и плохое яблоко появляется в др. месте
        badFood = {
            x: Math.floor((Math.random()*18+1))*block, 
            y: Math.floor((Math.random()*15+4))*block, 
        };
        gameScore = gameScore-1; //уменьшаем счёт
        snake.pop();//удаляется элемент змейки
    } 


                //условие для проигрыша - выход за пределы поля
    if(snakeX < block || snakeX > block*18 || snakeY < block*4 || snakeY > block*18 ){
        clearInterval(drawGame);
    }

    
    if (pressKey == "left") snakeX -= block; //перемещение змейки на одну клетку
    if (pressKey == "right") snakeX += block;
    if (pressKey == "up") snakeY -= block;
    if (pressKey == "down") snakeY += block;

    let newsnakePart = {
        x: snakeX,
        y: snakeY, 
    };

    tailCollision(newsnakePart, snake);
    snake.unshift(newsnakePart);// увеличение змейки, добавляем эл. в массив
}



let drawGame = setInterval (draw, 400);//вызываем функцию рисования объектов каждые 400 мсек - скорость змейки
console.log(snake);