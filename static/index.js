const container = document.getElementById('container')


let isDrawing = false;
let colorTrend = true; // true => darker & false => lighter



// let basicHeight = document.documentElement.clientHeight;
// let basicWidth = document.documentElement.clientWidth;

container.addEventListener('mousedown', (e) => {
    if (e.button == 2) {
        // right click
        colorTrend = false;
    } else if (e.button == 0) {
        // left click
        colorTrend = true;
    }
    isDrawing = true;
})

container.addEventListener('mouseup', () => {
    isDrawing = false;
})




window.onload = function () {
    //去掉默认的contextmenu事件，否则会和右键事件同时出现。
    document.oncontextmenu = function (e) {
        e.preventDefault();
    };
}

// window.onresize = resizeEvent;



const SQUARES = 100;
for (let i = 0; i < SQUARES; i++) {
    const square = document.createElement('div');
    square.classList.add('square');
    square.addEventListener('mouseover', () => setColor(square));
    container.appendChild(square);
}


initalizeContainerColor()

function setColor(element) {
    if (isDrawing) {
        const color = setNewColor(element);
        element.style.background = color;
        element.style.boxshadow = `0 0 2px ${color}, 0 0 10px ${color}`;
    }
}

function setNewColor(element) {
    const color = element.style.background;
    let newColor;
    if (colorTrend) {
        newColor = getDarkColor(color, 0.5);
    } else {
        newColor = getLightColor(color, 0.5);
    }
    return newColor
}

function RgbToHex(rgbc) {
    var hexs = [rgbc[0].toString(16), rgbc[1].toString(16), rgbc[2].toString(16)];
    for (var i = 0; i < 3; i++) if (hexs[i].length == 1) hexs[i] = "0" + hexs[i];
    return "#" + hexs.join("");
}

function RGBRegValue(rgb) {
    var reg = /^rgb\((\d+),\s*(\d+),\s*(\d+)\)/i;
    rgb = reg.exec(rgb)
    return parseInt(rgb[1])
}

//得到hex颜色值为color的加深颜色值，level为加深的程度，限0-1之间
function getDarkColor(rgbc, level) {
    
    var rgb = [];
    var color = RGBRegValue(rgbc);
    for (var i = 0; i < 3; i++) rgb.push(Math.floor(color * (1 - level)));
    return RgbToHex(rgb);
}
//得到hex颜色值为color的减淡颜色值，level为加深的程度，限0-1之间
function getLightColor(rgbc, level) {
    var rgb = [];
    var color = RGBRegValue(rgbc);
    for (var i = 0; i < 3; i++) rgb.push(Math.floor((255 - color) * level + color));
    return RgbToHex(rgb);
}

function initializeSquareColor(square) {
    let rgbc = [];
    const color = Math.floor(Math.random() * 256);
    // 白 -> 黑 rgb三个值相同
    for (let i = 0; i < 3; i++) {
        rgbc.push(color)
    }
    square.style.background = RgbToHex(rgbc);
}

function initalizeContainerColor() {
    // console.log(container.childNodes);
    var squareData = document.getElementById("data");
    console.log(squareData);
    var loadColor = false;
    var previousColor;
    if (squareData!=null&&squareData.getAttribute('loaddata') == 'true') {
        // click generate
        loadColor = true;
        previousColor = squareData.getAttribute('datavalue').match(/\d+/g)
    }

    const childNodes = container.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
        if (loadColor) {
            var color = parseInt(previousColor[i]);
            var rgb = [color,color,color];
            childNodes[i].style.background = RgbToHex(rgb);
        } else {
            initializeSquareColor(childNodes[i])
        }
    }
    if (squareData!=null) squareData.setAttribute('loaddata','false');
}

// $(function() {
//     $('[name=generate]').click(function(){
//         var box_value = [];
//         const childNodes = container.childNodes;
//         for (let i = 0; i<childNodes.length; i++) {
//             box_value.push(RGBRegValue(childNodes[i].style.background))
//         }
//         // console.log(box_value)
//         $.post('./data', {
//             data : JSON.stringify(box_value),
//         })
//     })
// })

function getJSON() {
    var formInfo = document.forms['SUBMIT'];
    console.log(formInfo);
    var box_value = [];
    const childNodes = container.childNodes;
    for (let i = 0; i<childNodes.length; i++) {
        box_value.push(RGBRegValue(childNodes[i].style.background))
    }

    formInfo.jsonval.value = JSON.stringify(box_value);
    console.log(formInfo);
}

// function generate() {
    
//     $.ajax({
//         type: "POST",
//         contentType: 'application/json',
//         url: "/generate",
//         dataType: "json",
//         data : JSON.stringify(box_value),
//         success:function(response){
//             console.log(response);
//             document.write(response); 
//        }

//     });
// }

// function resizeEvent() {
//     var height = document.documentElement.clientHeight;
//     var width = document.documentElement.clientWidth;
//     for (let i=0;i<container.childNodes.length;i++) {
//         var block = container.childNodes[i];
//         block.style.width *= height/basicHeight;
//         block.style.height*= width/basicWidth;
//     }
// }

function changePage() {

}