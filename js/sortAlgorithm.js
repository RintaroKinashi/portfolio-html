"use strict";

{
  const defaultDisplayNumber = document.getElementById("defaultDisplayNumber");
  const resultDisplayNumber = document.getElementById("resultDisplayNumber");
  const reset = document.getElementById("reset");
  const quickSort = document.getElementById("quickSort");
  const mergeSort = document.getElementById("mergeSort");
  // const sortExplanation = document.getElementById("sortExplanation");
  // TODO: 任意の数値を入力可能にする
  // TODO: ランダムに数値を生成可能にする
  const defaultNumber = [8.1, 2, 3, 4.5, -2];

  const sortType = {
    quick: 1,
    merge: 2,
  };

  // TODO: ボタン押下時に説明文を表示できるようにする
  // const QUICK_SORT_EXPLANATION = "";
  // const MERGE_SORT_EXPLANATION = "1. 整列対象のデータを2分割する<br>2. 2分割した値の要素数が1になるまで、2分割を繰り返す<br>3. 分割した要素同士を並び替えしながら戻していく";

  // 初期化
  defaultDisplayNumber.innerText = defaultNumber.join(", ");

  setButtonStateInitial();

  // 関数
  function setButtonStateInitial() {
    reset.classList.add("inactive");
    quickSort.classList.remove("inactive");
    mergeSort.classList.remove("inactive");
  }

  function setButtonStatestarted() {
    reset.classList.remove("inactive");
    quickSort.classList.add("inactive");
    mergeSort.classList.add("inactive");
  }

  /** 各ソートアクションを行う */
  function startSortAction(sortActionType) {
    setButtonStatestarted();
    switch (sortActionType) {
      case sortType.quick:
        resultDisplayNumber.innerText = quickSortAction(defaultNumber).join(", ");
        break;
      case sortType.merge:
        resultDisplayNumber.innerText = mergeSortAction(defaultNumber).join(", ");
        break;

      default:
        break;
    }
  }

  reset.addEventListener("click", () => {
    if (reset.classList.contains("inactive")) return;
    setButtonStateInitial();
    resultDisplayNumber.innerText = "";
    // sortExplanation.innerText = "";
  });

  quickSort.addEventListener("click", () => {
    console.log("【クイックソート】");
    if (quickSort.classList.contains("inactive")) return;
    startSortAction(sortType.quick);
  });

  mergeSort.addEventListener("click", () => {
    if (mergeSort.classList.contains("inactive")) return;
    console.log("【マージソート】");
    startSortAction(sortType.merge);
    // sortExplanation.innerHTML = MERGE_SORT_EXPLANATION;
  });

  document.addEventListener("keydown", (e) => {
    if (e.code === "Enter") {
      if (!reset.classList.contains("inactive")) {
        resetGame();
      } else if (!quickSort.classList.contains("inactive")) {
        startQuickSort();
      } else {
        startMergeSort();
      }
    }
  });

  /** クイックソートを行う */
  function quickSortAction(arr) {
    if (arr.length <= 1) return arr;

    const pivot = arr[0]; // ピボットとして最初の要素を選択
    const left = [];
    const right = [];

    for (let i = 1; i < arr.length; i++) {
      arr[i] < pivot ? left.push(arr[i]) : right.push(arr[i]);
    }

    console.log("pivot:", pivot);
    console.log("pivotより小さい数値群:", left);
    console.log("pivotより大きい数値群:", right);

    const sortedLeft = quickSortAction(left);
    const sortedRight = quickSortAction(right);
    console.log("pivot（基準値）:", pivot);
    console.log("pivotより小さい数値群（並び替え済）:", sortedLeft);
    console.log("pivotより大きい数値群（並び替え済）:", sortedRight);

    // 左右の部分配列を再帰的にソートし、結合して返す
    const sortedArray = [...sortedLeft, pivot, ...sortedRight];
    console.log("並び替え済みの数値群:", sortedArray);
    return sortedArray;
  }

  /** マージソートを行う */
  function mergeSortAction(arr) {
    if (arr.length <= 1) return arr;

    // 配列を中央で分割
    const middle = Math.floor(arr.length / 2);
    const left = arr.slice(0, middle);
    const right = arr.slice(middle);

    // 再帰的に左右の部分配列をソート
    const sortedLeft = mergeSortAction(left);
    const sortedRight = mergeSortAction(right);

    // ソートされた部分配列をマージして結合
    const sortedArray = merge(sortedLeft, sortedRight);
    console.log("並び替え済みの数値群:", sortedArray);
    return sortedArray;
  }

  function merge(left, right) {
    let result = [];
    let leftIndex = 0;
    let rightIndex = 0;
    console.log("left:", left, " right:", right);

    // 左右の部分配列を比較してマージ
    while (leftIndex < left.length && rightIndex < right.length) {
      if (left[leftIndex] < right[rightIndex]) {
        result.push(left[leftIndex]);
        leftIndex++;
      } else {
        result.push(right[rightIndex]);
        rightIndex++;
      }
      console.log("result:", result);
    }

    // どちらかの部分配列が残っている場合、残りを追加
    return result.concat(left.slice(leftIndex), right.slice(rightIndex));
  }
}
