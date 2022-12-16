// 判定用
var breaks = [0, 75, 150, 225, 300, 375, 450, 525, 600];

function plot() {
    var num = document.getElementById('num').value;
    if (numCheck(num) == true) {
        var point = 0; // point定義
        var xyxy = [];

        // グラフ関係(グラフは600*600,線の間隔は75)
        var rangeMin = 75;
        var rangeMax = 525;
        var l = 37.5; // 針の長さ

        for (var i = 1; i <= num; i++) {
            // 第一プロット点生成
            var randomX1 = Math.random() * (rangeMax - rangeMin) + rangeMin;
            var randomY1 = Math.random() * (rangeMax - rangeMin) + rangeMin;

            // 第二プロット点生成
            var angle = Math.random() * 360;
            // ゴリ押し場合分けの三平方
            if (0 <= angle && angle <= 90) {
                var angle = 90 - angle;
                var x2 = randomX1 + l * Math.cos(angle * Math.PI / 180);
                var y2 = randomY1 + l * Math.sin(angle * Math.PI / 180);
            } else if (90 < angle && angle <= 180) {
                var angle = angle - 90;
                var x2 = randomX1 + l * Math.cos(angle * Math.PI / 180);
                var y2 = randomY1 - l * Math.sin(angle * Math.PI / 180);
            } else if (180 < angle && angle <= 270) {
                var angle = 270 - angle;
                var x2 = randomX1 - l * Math.cos(angle * Math.PI / 180);
                var y2 = randomY1 - l * Math.sin(angle * Math.PI / 180);
            } else if (270 < angle && angle <= 360) {
                var angle = angle - 270;
                var x2 = randomX1 - l * Math.cos(angle * Math.PI / 180);
                var y2 = randomY1 + l * Math.sin(angle * Math.PI / 180);
            }

            // 交わり判定
            var judge = place(randomY1, y2);
            if (judge) {
                point = point + 1;
            }

            // 配列に座標情報追加
            xyxy[i - 1] = [
                [randomX1, randomY1],
                [x2, y2], judge
            ];
        }
        var result = num / point;
        document.getElementById('result-num').innerHTML = result; // 数値結果出力

        canvas(xyxy); // グラフ描画
    }
}

function numCheck(targetNum) {
    if (targetNum) {
        if (targetNum == 0) {
            window.alert('1以上の数値を入れてください.');
            return false;
        } else if (10000 < targetNum) {
            var yesno = confirm('数値が大きすぎるため時間がかかる恐れがあります.');
            if (yesno) {
                return true;
            } else {
                return false;
            }
        } else {
            return true;
        }
    } else {
        window.alert('数値を入力してください.');
    }
}


function place(y1, y2) {
    if (breaks.indexOf(y1) != -1 || breaks.indexOf(y2) !== -1) {
        return true;
    }
    var twoPoints = [];
    for (var n = 0; n < 2; n++) {
        var point = 0
        if (n == 0) {
            var y = y1;
        } else {
            var y = y2;
        }
        for (var i = 0; i < breaks.length - 1; i++) {
            if (breaks[i] < y) {
                var point = point + 1;
            }
        }
        twoPoints[n] = point;
    }
    if (twoPoints[0] == twoPoints[1]) {
        return false;
    } else {
        return true;
    }
}

function canvas(xyxy) {
    var ctx = document.getElementById('canvas').getContext('2d');
    ctx.clearRect(0, 0, ctx.canvas.clientWidth, ctx.canvas.clientHeight); // リセット

    // 基準線描画
    for(var n = 0; n < breaks.length; n++){
        ctx.beginPath();
        ctx.moveTo(0,breaks[n]);
        ctx.lineTo(600, breaks[n]);
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.stroke();
    }

    // 座標から各針を描画
    for (var i = 0; i < xyxy.length; i++) {
        if (xyxy[i][2] == true) {
            ctx.beginPath();
            ctx.moveTo(xyxy[i][0][0], xyxy[i][0][1]);
            ctx.lineTo(xyxy[i][1][0], xyxy[i][1][1]);
            ctx.strokeStyle = "blue";
            ctx.lineWidth = 3;
            ctx.stroke();
        }else{
            ctx.beginPath();
            ctx.moveTo(xyxy[i][0][0], xyxy[i][0][1]);
            ctx.lineTo(xyxy[i][1][0], xyxy[i][1][1]);
            ctx.strokeStyle = "gray";
            ctx.lineWidth = 3;
            ctx.stroke();
        }
    }
}
