let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");

let offsetX = canvas.getBoundingClientRect().left;
let offsetY = canvas.getBoundingClientRect().top;

// autoSetSize();
let blocks = 100;
let canvasHistory = [];

setCanvasBg("white");
listenToUser();

function drawLine(x1, y1, x2, y2) {
  context.beginPath();
  // 设置线条末端样式。
  context.lineCap = "round";
  // 设定线条与线条间接合处的样式
  context.lineJoin = "round";
  context.moveTo(x1 - offsetX, y1 - offsetY);
  context.lineTo(x2 - offsetX, y2 - offsetY);
  context.stroke();
  context.closePath();
}


// function autoSetSize() {
//   canvasSetSize();
//   function canvasSetSize() {
//     // 把变化之前的画布内容copy一份，然后重新画到画布上
//     let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
//     let pageWidth = document.documentElement.clientWidth/2;
//     let pageHeight = document.documentElement.clientHeight/2;

//     canvas.width = pageWidth;
//     canvas.height = pageHeight;
//     context.putImageData(imgData, 0, 0);
//   }

//   window.onresize = function () {
//     canvasSetSize();
//   };
// }

// 监听用户鼠标事件
function listenToUser() {
  // 定义一个变量初始化画笔状态
  let painting = false;
  // 记录画笔最后一次的位置
  let lastPoint = { x: undefined, y: undefined };

  if (document.body.ontouchstart !== undefined) {
    console.log("touchstart");
    canvas.ontouchstart = function (e) {
      painting = true;
      let x1 = e.touches[0].clientX;
      let y1 = e.touches[0].clientY;
      lastPoint = { x: x1, y: y1 };
    };
    canvas.ontouchmove = function (e) {
      let x1 = lastPoint["x"];
      let y1 = lastPoint["y"];
      let x2 = e.touches[0].clientX;
      let y2 = e.touches[0].clientY;
      if (!painting) {
        return;
      }
      let newPoint = { x: x2, y: y2 };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    };

    canvas.ontouchend = function () {
      painting = false;
      
    };
  } else {
    // 鼠标按下事件
    console.log("鼠标按下事件");
    canvas.onmousedown = function (e) {
      painting = true;
      let x1 = e.clientX;
      let y1 = e.clientY;

      lastPoint = { x: x1, y: y1 };
    };

    // 鼠标移动事件
    canvas.onmousemove = function (e) {
      let x2 = e.clientX;
      let y2 = e.clientY;
      if (!painting) {
        return;
      }

      let newPoint = { x: x2, y: y2 };
      drawLine(lastPoint.x, lastPoint.y, newPoint.x, newPoint.y);
      lastPoint = newPoint;
    };

    // 鼠标松开事件
    canvas.onmouseup = function () {
      painting = false;
      
    };
  }
}

function setCanvasBg(color) {
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
}

function getGaussian(mean, std) {
  var x1, x2, w;
  do {
    x1 = 2.0 * Math.random() - 1.0;
    x2 = 2.0 * Math.random() - 1.0;
    w = x1 * x1 + x2 * x2;
  } while (w >= 1.0);
  w = Math.sqrt((-2.0 * Math.log(w)) / w);
  console.log(x1 * w * std + mean);
  return x1 * w * std + mean;
}

function setRandomValue() {

  let blocks = []
  for (let i = 0; i<100; i++) {
    blocks[i] = getGaussian(0, 1);
  }
}
