// 1. 5글자 단어
// 2. 6번의 시도 가능
// 3. 존재하면 노란색, 위치도 맞으면 초록색으로
// 4. 게임종료 판단
// 5. 추가(상단에 게임 시간 표시하기)

//시도
const answer = "APPLE";
let index = 0;
let attempts = 0;

function appStart() {
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display : flex; justify-content:center; align-items : center; position : absolute; top:40vh; left :45vw;background-color : white; ";
    document.body.appendChild(div);
  };

  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    let 맞은_갯수 = 0;
    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      //입력한 값
      const letter = block.innerText;
      const answerText = answer[i];
      if (letter === answerText) {
        맞은_갯수 += 1;
        block.style.background = "lime";
      } else if (answer.includes(letter)) {
        block.style.background = "yellow";
      } else {
        block.style.background = "#787c7e";
      }
      block.style.color = "white";
    }
    if (맞은_갯수 === 5) gameover();
    else nextLine();
  };

  //지우기 함수
  const handleBackSpace = () => {
    if (index > 0) {
      const preBlock = document.querySelector(
        `.board-block[data-index='${attempts}${index - 1}']`
      );
      preBlock.innerText = "";
    }
    if (index !== 0) index -= 1;
  };

  //입력 함수
  const handlekeydown = (e) => {
    const key = e.key.toUpperCase();
    const keyCode = e.keyCode;
    const indexElement = document.querySelector(
      `.board-block[data-index='${attempts}${index}'`
    );

    if (e.key === "Backspace") handleBackSpace();
    else if (index === 5) {
      if (e.key === "Enter") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (65 <= keyCode && keyCode <= 90) {
      indexElement.innerText = key;
      index++;
    }
  };

  const startTimer = () => {
    const 시작_시간 = new Date();

    function setTime() {
      const 현재_시간 = new Date();
      const 흐른_시간 = new Date(현재_시간 - 시작_시간);

      const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
      const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
      const timeH1 = document.querySelector(".time");

      timeH1.innerText = `${분}:${초}`;
    }

    timer = setInterval(setTime, 1000);
  };
  startTimer();
  window.addEventListener("keydown", handlekeydown);
}

appStart();
