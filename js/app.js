const keyboardElement = document.querySelectorAll(".keyboard");

//시도
const answer = "APPLE";
let index = 0;
let attempts = 0;

function appStart() {
  //게임종료시 종료 팝업
  const displayGameover = () => {
    const div = document.createElement("div");
    div.innerText = "게임이 종료되었습니다.";
    div.style =
      "display : flex; justify-content:center; align-items : center; position : absolute; top:40vh; left :45vw;background-color : white; ";
    document.body.appendChild(div);
  };

  // 게임 종료
  const gameover = () => {
    window.removeEventListener("keydown", handlekeydown);
    displayGameover();
    clearInterval(timer);
  };

  //다음줄 넘어가기
  const nextLine = () => {
    if (attempts === 5) return gameover();
    attempts += 1;
    index = 0;
  };

  const handleEnterKey = () => {
    //animate
    const newspaperSpinning = [
      { transform: " scale(1)" },
      { transform: " scale(1.5)" },
    ];

    const newspaperTiming = {
      duration: 1000,
      iterations: Infinity,
    };

    let 맞은_갯수 = 0;

    for (let i = 0; i < 5; i++) {
      const block = document.querySelector(
        `.board-block[data-index='${attempts}${i}']`
      );

      //입력한 값
      const letter = block.innerText;

      //키보드 매치 맞으면 색깔 바뀌는
      const answerText = answer[i];

      const keyboardBlock = document.querySelector(
        `.keyboard[data-key='${letter}']`
      );

      if (letter === answerText) {
        맞은_갯수 += 1;
        block.style.background = "lime";
        keyboardBlock.style.background = "lime";
        block.animate(newspaperSpinning, newspaperTiming);
      } else if (answer.includes(letter)) {
        block.style.background = "yellow";
        keyboardBlock.style.background = "yellow";
      } else {
        block.style.background = "#787c7e";
        block.style.transform = "scale(0.8)";
        block.style.transition = "ease-in-out 1s all";
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

  //자판 클릭시 입력
  const handleKeyClick = (e) => {
    const key = e.target.attributes[1].value;

    const indexElement = document.querySelector(
      `.board-block[data-index='${attempts}${index}'`
    );

    if (key === "DELETE") handleBackSpace();
    else if (index === 5) {
      if (key === "ENTER") {
        handleEnterKey();
      } else {
        return;
      }
    } else if (key !== "ENTER") {
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

  for (let i = 0; i < keyboardElement.length; i++) {
    keyboardElement[i].addEventListener("click", handleKeyClick);
  }
  startTimer();

  window.addEventListener("keydown", handlekeydown);
}

appStart();
