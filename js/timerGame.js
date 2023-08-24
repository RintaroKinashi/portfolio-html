"use strict";

{
  const emphasis = document.getElementById("emphasis");
  const timer = document.getElementById("timer");
  const start = document.getElementById("start");
  const stop = document.getElementById("stop");
  const reset = document.getElementById("reset");
  const result = document.getElementById("result");
  // TODO: ブラウザDBに保存できるようにする
  // @see: https://github.com/RintaroKinashi/portfolio-html/issues/26
  // const hide = document.getElementById("hide");
  // const form_recode = document.getElementById("form_recode");
  // const num_target = document.getElementById("num_target");
  // const num_diffrrence = document.getElementById("num_diffrrence");

  let startTime;
  let timeoutId;
  let targetTime = Math.floor(Math.random() * 4 + 6);
  let resultTime;
  let diff;

  /** カウントアップ関数 */
  function countUp() {
    const elapsedTime = new Date(Date.now() - startTime);
    const elapsedSeconds = String(elapsedTime.getSeconds()).padStart(2, "0");
    const elapsedMilliSeconds = String(elapsedTime.getMilliseconds()).padStart(3, "0").slice(0, 2);

    resultTime = `${elapsedSeconds}.${elapsedMilliSeconds}`;

    if (elapsedSeconds < 3) {
      timer.textContent = resultTime;
    } else if (elapsedSeconds > 20) {
      clearTimeout(timeoutId);
      resetGame();
    } else {
      timer.textContent = "٩( ᐛ )و";
      timer.style.fontSize = "20px";
    }
    timeoutId = setTimeout(() => {
      countUp();
    }, 10);
  }

  /** 結果メッセージ表示 */
  function showResultMessage(targetTime, resultTime) {
    diff = (resultTime - targetTime).toFixed(2);

    result.innerText = "誤差：" + diff + "秒\n ";
    if (diff === 0) {
      result.insertAdjacentText("beforeend", "ﾋﾟｯﾀﾘﾀﾞ!ｽｺﾞｲ! ");
    } else if (Math.abs(diff) <= 0.05) {
      result.insertAdjacentText("beforeend", "new recode! ");
    } else if (Math.abs(diff) <= 0.3) {
      result.insertAdjacentText("beforeend", "ｵｼｲ!ｱﾄﾁｮｯﾄ! ");
    } else if (Math.abs(diff) <= 1) {
      result.insertAdjacentText("beforeend", "ｲｲｶﾝｼﾞｨ ");
    } else {
      result.insertAdjacentText("beforeend", "ﾎﾞｸﾉﾎｳｶﾞｼﾞｮｳｽﾞﾀﾞﾖ ");
    }
    result.insertAdjacentText("beforeend", "٩( ᐛ )و");
  }

  function startGame() {
    setButtonStateRunning();
    startTime = Date.now();
    countUp();
  }

  function stopGame() {
    setButtonStateStopped();
    clearTimeout(timeoutId);
    timer.textContent = resultTime;
    timer.style.fontSize = "40px";
    showResultMessage(targetTime, resultTime);
    // num_target.value = targetTime;
    // num_diffrrence.value = diff;
    // if (Math.abs(diff) <= 0.05) {
    //   hide.style.display = "block";
    // } else {
    //   hide.style.display = "none";
    // }
  }

  function resetGame() {
    // if (hide.style.display === "block") {
    //   form_recode.submit();
    // } else {
    //   location.reload();
    // }
    location.reload();
  }

  function setButtonStateInitial() {
    start.classList.remove("inactive");
    stop.classList.add("inactive");
    reset.classList.add("inactive");
  }

  function setButtonStateRunning() {
    start.classList.add("inactive");
    stop.classList.remove("inactive");
    reset.classList.add("inactive");
  }

  function setButtonStateStopped() {
    start.classList.add("inactive");
    stop.classList.add("inactive");
    reset.classList.remove("inactive");
  }

  // イベント

  setButtonStateInitial();
  // hide.style.display = "none";
  emphasis.innerText = targetTime + ".00秒";

  if (document.documentElement.clientWidth >= 479) {
    result.innerText = "Enterｷｰﾀﾞｹﾃﾞｿｳｻﾃﾞｷﾙﾖ〜\n ٩( ᐛ )و";
  }

  start.addEventListener("click", () => {
    if (start.classList.contains("inactive")) return;
    startGame();
  });

  stop.addEventListener("click", () => {
    if (stop.classList.contains("inactive")) return;
    stopGame();
  });

  reset.addEventListener("click", () => {
    if (reset.classList.contains("inactive")) return;
    resetGame();
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      if (!start.classList.contains("inactive")) {
        startGame();
      } else if (!stop.classList.contains("inactive")) {
        stopGame();
      } else {
        resetGame();
      }
    }
  });
}
