/*初始化全程变量区，包括游戏开始判断，地鼠ID，分数，时间等*/
let ST = false;
let mole = "to1_1";
let score = 0;
let timer = null;
let time = 30;
/*添加基础属性*/
window.onload = function () {
    document.getElementById("score").value = 0;
    document.getElementById("time").value = time;
    let st = document.getElementById("st");
    st.addEventListener('click',cli_st);
    let cset = document.getElementsByClassName("circle");
    for(let temp=0;temp<cset.length;temp++) {
        cset[temp].addEventListener('click',cli_cir);
    }
}
/*触发Start/Stop按钮*/
function cli_st() {
    if(ST===false) {
        ST = true;
        time = 30;
        score = 0;
        let cset = document.getElementsByClassName("circle");
        mole = cset[Math.floor(Math.random()*60)].id;
        document.getElementById(mole).style.borderColor = "blue";
        document.getElementById(mole).style.backgroundColor = "aqua";
        document.getElementById("message").value = "Game start!";
        game();
    }
    else {
        ST = false;
        game();
        document.getElementById(mole).style.borderColor = "#BFBFBF";
        document.getElementById(mole).style.backgroundColor = "white";
        document.getElementById("message").value = "Game stop!";
    }
}
/*触发地鼠区*/
function cli_cir(event) {
    if(ST===true) {
        event = window.event||event;
        if (event.target.id === mole) {
            score++;
            document.getElementById(mole).style.borderColor = "#BFBFBF";
            document.getElementById(mole).style.backgroundColor = "white";
            let cset = document.getElementsByClassName("circle");
            mole = cset[Math.floor(Math.random()*60)].id;
            document.getElementById(mole).style.borderColor = "blue";
            document.getElementById(mole).style.backgroundColor = "aqua";
        }
        else {
            score--;
        }
        document.getElementById("score").value = score;
    }
}
/*时间自减*/
function decrtime() {
    time--;
    document.getElementById("time").value = time;
    if(time===0) {
        clearInterval(timer);
        ST = false;
        document.getElementById(mole).style.borderColor = "#BFBFBF";
        document.getElementById(mole).style.backgroundColor = "white";
        document.getElementById("message").value = "Game over!";
    }
}
/*游戏控制*/
function game() {
    if(ST===true) {
        document.getElementById("score").value = 0;
        document.getElementById("time").value = time;
        timer = setInterval(decrtime, 1000);
    }
    else {
        if(timer) {
            clearInterval(timer);
        }
    }
}