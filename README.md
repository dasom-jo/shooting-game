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
