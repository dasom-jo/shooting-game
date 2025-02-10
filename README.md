# 🚀 Space Shooter Game

## 📌 개요
이 프로젝트는 캔버스를 활용한 간단한 슈팅 게임입니다.
플레이어는 우주선을 조작하여 적을 물리치고 점수를 획득할 수 있습니다.

---

## 🖥️ 기술 개요
- **언어**: JavaScript (ES6)
- **API**: HTML5 Canvas API
- **게임 방식**:
  - `setInterval()`을 이용해 적군을 생성
  - 키보드 이벤트(`keydown`, `keyup`)를 활용한 우주선 조작
  - 총알 발사 및 적군과의 충돌 감지

---

## 🎮 게임 설명
### **1. 조작법**
- **좌우 이동**: ← (왼쪽) / → (오른쪽) 키 사용
- **총알 발사**: Spacebar(스페이스바)

### **2. 게임 목표**
- 적을 제거하고 점수를 획득
- 적이 화면 아래로 넘어가면 게임 종료

---

## 📜 주요 개념 정리

### **1. `this` 사용법**
JavaScript에서 `this`는 객체 내에서 자기 자신을 가리키는 키워드입니다.
이 코드에서는 `this`를 활용하여 객체의 속성과 메서드를 정의합니다.


#### ✅ **총알(`Bullet`)에서 `this` 사용 예시**
```js
function Bullet() {
    this.x = 0;
    this.y = 0;
    this.alive = true; // 총알이 살아있는지 여부

    this.init = function () {
        this.x = spaceshipX + 22;
        this.y = spaceshipY - 20;
        bulletList.push(this);
    };

    this.update = function () {
        this.y -= 5; // 총알이 위로 이동
    };
}
//this.x 와 this.y를 사용하여 총알의 개별 좌표를 관리.
//this.init()을 호출하면 해당 총알 객체만 초기화됨.
```

### **2. `canvas` 사용법**
HTML5의 <canvas> 요소를 사용하여 2D 그래픽을 그립니다.
이 게임에서는 canvas를 생성한 후 body에 추가합니다.

#### ✅ **`canvas` 생성 코드**
```js
let canvas = document.createElement("canvas");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);
//document.createElement("canvas") → 새로운 <canvas> 요소 생성
//canvas.width / canvas.height → 캔버스 크기 설정
//document.body.appendChild(canvas) → 캔버스를 HTML 문서에 추가
```

### **2.`ctx`(CanvasRenderingContext2D) 사용법**
ctx는 캔버스에 그림을 그리는 도구입니다.
canvas.getContext("2d")를 호출하여 2D 렌더링 컨텍스트를 가져올 수 있습니다.

#### ✅ **이미지 그리기**
```js
ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
//배경및 우주선을 특정 좌표에 그림
```
#### ✅ **텍스트 표시(점수 출력)**
```js
ctx.fillStyle = "white";
ctx.font = "20px Arial";
ctx.fillText(`score: ${score}`, 20, 30);
//점수를 화면 좌측 상단에 표시
```