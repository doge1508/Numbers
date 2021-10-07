const NUM_COLS = 9;

const playNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9];

let gameWindow;
let gameTable;
let hlCell = null;
let numbers = [];

window.onload = init;

function init() {
  gameWindow = document.getElementById("game-window");
  gameTable = document.getElementById("game-table");
  for (let y = 0; y < 4; y++) {
    let row = [];
    for (let x = 0; x < NUM_COLS; x++) {
      let number = playNumbers[Math.floor(playNumbers.length * Math.random())];
      row.push({ value: number, el: undefined });
    }
    numbers.push(row);
  }
  for (let y = 0; y < numbers.length; y++) {
    let tr = document.createElement("tr");
    let row = numbers[y];
    for (let x = 0; x < NUM_COLS; x++) {
      let td = document.createElement("td");
      //td.setAttribute("data-row", y);
      //td.setAttribute("data-col", x);
      td.dataset.row = y;
      td.dataset.col = x;
      td.addEventListener("click", handleClick);
      let img = document.createElement("img");
      img.setAttribute("width", "100%");
      img.setAttribute("height", "100%");
      img.setAttribute("src", "./assets/" + row[x].value + ".svg");
      td.appendChild(img);
      tr.appendChild(td);
      numbers[y][x].el = td;
    }
    gameTable.appendChild(tr);
  }
  window.onresize = resize;
  resize();
}

function resize() {
  let left = Math.round((window.innerWidth - 450) / 2);
  gameWindow.style.left = left + "px";
}

function handleClick(e) {
  let row = e.path[1].dataset.row;
  let col = e.path[1].dataset.col;
  if (row === undefined || col === undefined) {
    return;
  }
  if (!hlCell) {
    hlCell = { row: row, col: col };
    e.path[1].style["outline"] = "solid thick blue";
  } else {
    if (testCompatibility(hlCell.row, hlCell.col, row, col)) {
      console.log("compatible");
    } else {
      console.log("Not Compatible");
      numbers[hlCell.row][hlCell.col].el.style["outline"] = "none";
      hlCell = null;
      return;
    }
    if (
      testCol(hlCell.row, hlCell.col, row, col) ||
      testRow(hlCell.row, hlCell.col, row, col)
    ) {
      console.log("erase");
      numbers[row][col].value = -1;
      numbers[hlCell.row][hlCell.col].value = -1;
      numbers[row][col].el.firstChild.src = "./assets/smudge.png";
      numbers[hlCell.row][hlCell.col].el.firstChild.src = "./assets/smudge.png";
      numbers[hlCell.row][hlCell.col].el.style["outline"] = "none";
      hlCell = null;
      return;
    }
  }
}

function testCol(startRow, startCol, endRow, endCol) {
  if (startCol !== endCol) {
    return false;
  }
  if (startCol < 0 || endCol < 0) {
    return false;
  }
  if (startCol >= NUM_COLS || endCol >= NUM_COLS) {
    return false;
  }
  if (startRow === endRow) {
    return false;
  }
  if (startRow < 0 || endRow < 0) {
    return false;
  }
  if (startRow >= numbers.length || endRow >= numbers.length) {
    return false;
  }
  let minRow = Math.min(startRow, endRow);
  let maxRow = Math.max(startRow, endRow);
  for (let y = minRow + 1; y < maxRow; y++) {
    if (numbers[y][startCol].value >= 0) {
      return false;
    }
  }
  return true;
}

function testCompatibility(startRow, startCol, endRow, endCol) {
  let val1 = numbers[startRow][startCol].value;
  let val2 = numbers[endRow][endCol].value;
  return val1 >= 0 && val2 >= 0 && (val1 === val2 || val1 + val2 === 10);
}

function testRow(startRow, startCol, endRow, endCol) {
  startRow = Number(startRow);
  endRow = Number(endRow);
  startCol = Number(startCol);
  endCol = Number(endCol);
  if (startCol < 0 || endCol < 0) {
    console.log("a");
    return false;
  }
  if (startCol >= NUM_COLS || endCol >= NUM_COLS) {
    console.log("b");
    return false;
  }
  if (startRow === endRow && startCol === endCol) {
    console.log("c");
    return false;
  }
  if (startRow < 0 || endRow < 0) {
    console.log("d");
    return false;
  }
  if (startRow >= numbers.length || endRow >= numbers.length) {
    console.log("e");
    return false;
  }
  let minRow, maxRow, minCol, maxCol;
  if (startRow < endRow) {
    minRow = startRow;
    maxRow = endRow;
    minCol = startCol;
    maxCol = endCol;
  } else if (startRow > endRow) {
    minRow = endRow;
    maxRow = startRow;
    minCol = endCol;
    maxCol = startCol;
  } else if (startCol < endCol) {
    minRow = maxRow = startRow;
    minCol = startCol;
    maxCol = endCol;
  } else {
    minRow = maxRow = startRow;
    minCol = endCol;
    maxCol = startCol;
  }

  let firstMaxCol = minRow === maxRow ? maxCol : NUM_COLS - 1;
  console.log(minRow, maxRow, minCol, maxCol, firstMaxCol);
  for (let x = minCol + 1; x < firstMaxCol; x++) {
    console.log(x);
    if (numbers[minRow][x].value >= 0) {
      console.log("f");
      return false;
    }
  }
  if (minRow === maxRow) {
    console.log("j");
    return true;
  }
  for (let y = minRow + 1; y < maxRow; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (numbers[y][x].value >= 0) {
        console.log("g");
        return false;
      }
    }
  }
  for (let x = 0; x < maxCol; x++) {
    if (numbers[maxRow][x].value >= 0) {
      console.log("h");
      return false;
    }
  }
  console.log("i");
  return true;
}

function refreshRows() {
  let refreshNums = [];
  for (let y = 0; y < numbers.length; y++) {
    for (let x = 0; x < NUM_COLS; x++) {
      if (numbers[y][x].value >= 0 ) {
        refreshNums.push(numbers[y][x].value);
      }
    }
  }
  for (let i = 0; i < refreshNums.length; i++) {
    //Complete Rows
    //TODO: start putting refreshNums into table; remember partially filled rows
  }
}