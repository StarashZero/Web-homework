/*初始化全局变量*/
var S_judge = false;
var B_judge = false;
var G_judge = false;
/*添加事件*/
window.onload = function () {
    var S = document.getElementById("start");
    var E = document.getElementById("end");
    var B = document.getElementsByClassName("block");
    var G = document.getElementById("game");
    S.addEventListener('mouseover', over_S);
    E.addEventListener('mouseover', over_E);
    for (var temp=0;temp<B.length;temp++) {
        B[temp].addEventListener('mouseover', over_B);
    }
    G.addEventListener('mouseleave', out_G);
}
/*鼠标移至Start*/
function over_S() {
    S_judge = true;
    G_judge = true;
    document.getElementById("start").style.backgroundColor = "#EEEEEE";
    if(B_judge) {
        B_judge = false;
        var B = document.getElementsByClassName("block");
        for(var temp=0;temp<B.length;temp++) {
            B[temp].style.backgroundColor = "#EEEEEE";
        }
    }
    display("Game Start!");
}
/*鼠标移至End*/
function over_E() {
    if(S_judge) {
        if (G_judge) {
            display("You Win");
            document.getElementById("start").style.backgroundColor = "#83FC7F";
        }
        else {
            display("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
            document.getElementById("start").style.backgroundColor = "#83FC7F";
        }
    }
    else {
        if (!B_judge)
            display("Don't cheat, you should start form the 'S' and move to the 'E' inside the maze!");
    }
    S_judge = false;
}
/*鼠标触碰障碍*/
function over_B() {
    if(S_judge) {
        S_judge = false;
        B_judge = true;
        var B = document.getElementsByClassName("block");
        for(var temp=0;temp<B.length;temp++) {
            B[temp].style.backgroundColor = "red";
        }
        display("You Lose");
        document.getElementById("start").style.backgroundColor = "#83FC7F";
    }
}
/*鼠标移出游戏区域*/
function out_G() {
    if(B_judge) {
        var B = document.getElementsByClassName("block");
        for(var temp=0;temp<B.length;temp++) {
            B[temp].style.backgroundColor = "#EEEEEE";
        }
    }
    G_judge = false;
}
/*显示*/
function display(str) {
    document.getElementById("screen").value = str;
}
