//좌표 0.0의 기준은 왼쪽 상단이 지정
//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas")
ctx = canvas.getContext("2d")
canvas.width=400;
canvas.height=700;
document.body.appendChild(canvas)

//이미지 불러오는 함수
let backgroundImage, spaceshipImage, enemyImage, gameoverImage, bulletImage , boomImage

let gameOver = false // true이면 게임이 끝남

let score = 0;

//우주선 좌표 , 이미지 크기 가 64,64
let spaceshipX = canvas.width/2 - 30
let spaceshipY = canvas.height - 70

let bulletList = [] //총알 저장하는 리스트
function Bullet(){
    this.x = 0
    this.y = 0
    this.init = function(){
        this.x = spaceshipX + 22
        this.y = spaceshipY - 20
        this.alive = true //ture면 살아있는 총알
        bulletList.push(this);
    };
    this.update = function(){
        this.y -= 5;
    };

    this.checkHit=function(){
        //총알.y <= 적군.y and 총알.x >= 적군.x and 총알.x <= 적군.x + 적군의 넓이
        for (let i = 0; i<enemyList.length;i++){
            if(this.y <=enemyList[i].y
                && this.x>=enemyList[i].x
                && this.x<=enemyList[i].x + 40){
                score++;
                this.alive = false //죽은 총알
                enemyList.splice(i,1);
            }
        }
    }
}

function generateRandomValue (min,max){
    let randomNum = Math.floor(Math.random()*(max-min+1))+min
    return randomNum
}

let enemyList = []
//적군
function Enemy(){
    this.x = 0;
    this.y = 0;
    this.init=function(){
        this.y = 0 // 최상단에서 시작
        this.x = generateRandomValue(0,canvas.width-96);
        enemyList.push(this)
    };
    this.update = function(){
        this.y +=2;
        if(this.y>canvas.height - 96){
            gameOver = true;
            //console.log("게임오버");
        }
    }
}

function loadImage(){
    backgroundImage = new Image();
    backgroundImage.src = "images/spacebackground.jpg";

    spaceshipImage = new Image();
    spaceshipImage.src = "images/spaceship.png";

    enemyImage = new Image();
    enemyImage.src = "images/enemy.png";

    gameoverImage = new Image();
    gameoverImage.src = "images/gameover.jpg";

    bulletImage = new Image();
    bulletImage.src = "images/bullet.png";

    boomImage = new Image();
    boomImage.src = "images/boom.png"
}
let keysDown = {}
//키보드 방향키 이벤트
function setupkeyboardListener(){
    document.addEventListener("keydown",function(event){
        //console.log("무슨 키가 눌렷니?",event.keyCode);
        keysDown[event.keyCode] = true
        //console.log("키다운 객체에 들어간 값은?" , keysDown);
    });
    document.addEventListener("keyup",function(event){
        delete keysDown[event.keyCode]
        //console.log("버튼 클릭후",keysDown);
        if(event.keyCode == 32){
            createBullet() //총알 생성 함수
        } //스페이스바는 32
    });
}

//총알 생성 함수
function createBullet(){
    console.log("총알 생성");
    let b = new Bullet();
    b.init()
    console.log("새로운 총알 리스트",bulletList);
}

function createEnemy(){
    const interval = setInterval(function(){
        let e = new Enemy();
        e.init()
    },500)
}

function update(){
    if(39 in keysDown){
        spaceshipX += 2  //우주선의 속도
    }//오른쪽 버튼(39) 눌릴떄
    if(37 in keysDown){
        spaceshipX -= 2
    }
    //우주선의 좌표값이 무한대 업데이트 가 아닌 경기장 안에서만 있게
    if(spaceshipX <=0){
        spaceshipX = 0
    }
    if(spaceshipX >= canvas.width - 64){
        spaceshipX = canvas.width - 64;
    }
    //적군의 y 좌표 업데이트
    for(let i = 0 ; i<enemyList.length; i++){
        enemyList[i].update();

    }
    //총알의 y좌표 업데이트하는 함수 호출
    for (let i =0; i < bulletList.length; i++){
       if(bulletList[i].alive){
            bulletList[i].update();
            bulletList[i].checkHit();
       }
    }
}

//캔버스에 그려주기
function render (){
    ctx.drawImage(backgroundImage,0,0,canvas.width,canvas.height);
    ctx.drawImage(spaceshipImage, spaceshipX ,spaceshipY );
    ctx.fillText(`score : ${score}`,20,30);
    ctx.fillStyle = "white";
    ctx.font = "20px Arial"

    for(let i = 0; i<bulletList.length; i++){
        if(bulletList[i].alive){
            ctx.drawImage(bulletImage,bulletList[i].x,bulletList[i].y,20,20)
        }else{
            ctx.drawImage(boomImage,bulletList[i].x,bulletList[i].y,20,20)
        }
    }

    for(let i=0;i<enemyList.length;i++){
        ctx.drawImage(enemyImage,enemyList[i].x,enemyList[i].y,40,40)
    }
}

//화면에 끊임없이 보여주는, 미친듯이 호출
function main(){
    //게임오버
    if(!gameOver){
        update() // 좌표값을 업데이트하고
    render() // 그려주고
    //console.log("anymation calls main function");
    requestAnimationFrame(main)
    }else{
        ctx.drawImage(gameoverImage,0,120,400,400);
    }

}
loadImage();
setupkeyboardListener();
createEnemy();//웹사이트가 시작되자마자 적군 등장
main();

//총알 만들기
//1.스페이스바누르면 발사
//2.총알이 발사 = 총알의 y값이 마이너스값 -> 0, x값은 스페이스바를 누른순간의 우주선의 x좌표
//3.발사된 총알들은 총알 배열에 저장을 한다.
//4.총알들은 x,y 좌표값이 있어야 한다.
//5.총알 배열을 가지고 render 그려준다.
