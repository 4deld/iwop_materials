/*
소프트웨어과 유일 웹 동아리 IWOP
Chrome을 기준으로 작성됨. (ES6문법 배제 IE11,Edge 일부 호환)

GitHub : https://github.com/IWOP/iwop.github.io , https://github.com/Andy-0414/IWOP

© 2019. PJH. All rights reserved.
*/

// 스크롤 이벤트
const between = function (value, min, max) { return value >= min && value <= max }
    //value가 min보다 같거나 크고 max보다 같거나 작으면 true 아니면 false 반환

const swapClass = function(ele, on, off){
    ele.classList.add(on);
    ele.classList.remove(off);
}
    //ele의 클래스 목록에서 on을 추가하고 off를 삭제

var y = window.scrollY
    //문서가 수직으로 얼마나 스크롤됐는지 픽셀 단위로 반환

var user__maxY = window.innerHeight
    //브라우저 창의 크기


var layout = document.querySelector('#layout')
var topBar = document.querySelector('.topBar')
var startPage = document.querySelector('.iwop__startPage')
var section = document.querySelectorAll('section')
var iwop__main = document.querySelector('.iwop.iwop__main')
var iwop__sub = document.querySelector('.iwop.iwop__sub')
var iwop__scroll = document.querySelectorAll('.iwop__startPage__scroll *')
var quickMenu = document.querySelector('.quickMenu')
var quickMenu__item = document.querySelectorAll('.quickMenu__item')
var quickMenu__item__content = document.querySelectorAll('.quickMenu__item__content')

window.onscroll = function(e){
    //스크롤될때 발동됨
    var y = window.scrollY || window.pageYOffset
    //둘은 똑같음. 오래된 브라우저는 pageYOffset만 지원하는 경우가 있어서 추가

    //탑 바
    if (!between(y, 0, iwop__main.offsetTop)) {
        swapClass(iwop__main, 'iwop--disable', 'iwop--active')
        swapClass(iwop__sub, 'iwop--active', 'iwop--disable')
        for (let idx = 0; idx < iwop__scroll.length; idx++) {
            const x = iwop__scroll[idx];
            swapClass(x, 'iwop__startPage__scroll__item--disable', 'iwop__startPage__scroll__item--active')
        }
    }
    else {
        swapClass(iwop__main, 'iwop--active', 'iwop--disable')
        swapClass(iwop__sub, 'iwop--disable', 'iwop--active')
        for (let idx = 0; idx < iwop__scroll.length; idx++) {
            const x = iwop__scroll[idx];
            swapClass(x, 'iwop__startPage__scroll__item--active', 'iwop__startPage__scroll__item--disable')            
        }
    }
    if (!between(y, 0, user__maxY)) {
        swapClass(topBar, 'topBar--attach', 'topBar--detach')
        layout.style.marginTop = "70px"
    }
    else {
        swapClass(topBar, 'topBar--detach', 'topBar--attach')
        swapClass(quickMenu, 'quickMenu--disable', 'quickMenu--active')
        layout.style.marginTop = "0px"
    }
    for (let idx = 0; idx < section.length; idx++) {
        const x = section[idx];
        var tmp = section[idx - 1] || { offsetTop: window.pageYOffset }
        if (tmp) {
            if (between(y, tmp.offsetTop, x.offsetTop)) {
                quickMenuItemSelect(idx)
            }
        }
    }
}

// 퀵 메뉴
function gotoStartPage() {
    window.scrollTo({ behavior: 'smooth', top: 0 });
    //window.scrollTo({top:0, left:0, behavior:'auto'});
    //모든 값 필수x 순서 상관x  top은 세로 위치, left는 가로 위치, scroll-behavior은 스크롤 효과
}
function gotoScroll(className) {
    var ele = document.getElementsByClassName(className)[0]
    window.scrollTo({ behavior: 'smooth', top: ele.offsetTop - 70 })
    //offsetTop -> 해당 요소의 top위치(마진 포함)을 가져옴
}
function quickMenuItemSelect(num) {
    for (let idx = 0; idx < quickMenu__item.length; idx++) {
        const x = quickMenu__item[idx];
        if (num == idx) swapClass(x, 'quickMenu__item--active', 'quickMenu__item--disable')
        else swapClass(x, 'quickMenu__item--disable', 'quickMenu__item--active')   
    }
}
function toggleQuickMenu() {
    quickMenu.classList.toggle('quickMenu--disable')
    quickMenu.classList.toggle('quickMenu--active')
    //없으면 추가하고 있으면 없애는것
}
