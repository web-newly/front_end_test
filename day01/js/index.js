// 获取路径导航包含元素
var navpathNode = document.querySelector('.navpath');
// 获取路径导航数据
var path = goodData.path;
// 获取小图
var smallNode = document.querySelector('.small');
// 获取小图里的图片
var smallImageNode = document.querySelector('.small img');
// 获取遮罩层
var maskNode = document.querySelector('.small .mask');
// 获取大图
var bigNode = document.querySelector('.big');
// 获取大图里的图片
var bigImageNode = document.querySelector('.big img');
// 获取缩略图ul元素
var imagelistNode = document.querySelector('.wrapper #content .contentMain .center .left .leftbottom .imagelist ul');
// 获取缩略图左右按钮
var buttonArr = document.querySelectorAll('.leftbottom>a');
// 动态渲染路径导航
for(let i=0;i < path.length;i++){
    if(i === (path.length - 1)){
        let aNode = document.createElement('a');
        aNode.innerText = path[i].title;
        navpathNode.appendChild(aNode);
    }else{
        let aNode = document.createElement('a');
        aNode.href = path[i].url;
        aNode.innerText = path[i].title
        let iNode = document.createElement('i');
        iNode.innerText = '/';
        navpathNode.appendChild(aNode);
        navpathNode.appendChild(iNode);
    }
}
// 实现放大镜效果
smallNode.onmousemove = function(event){
    /* 
        当遮罩层是smallnode（加了鼠标移动事件的元素）的子元素时使用offsetx获取鼠标位置然后改变遮罩层的位置当鼠标在
        遮罩层中offsetx鼠标位置是相对于遮罩层的。这与实际效果不服
        解决：
        1.不要把遮罩层放入smallnode中
        2.使用client获取鼠标位置
    */
    let mouseX = event.clientX;
    let mouseY = event.clientY;
    let maskWidth = maskNode.offsetWidth;
    let maskHeight = maskNode.offsetHeight;
    let clientLeft = smallNode.getBoundingClientRect().left;
    let clientTop = smallNode.getBoundingClientRect().top;
    let left = mouseX - (maskWidth/2)-clientLeft,top = mouseY - (maskHeight/2)-clientTop;
    if(mouseX <= (clientLeft+maskWidth/2)){
        left = 0;
    }
    if(mouseY <= (clientTop+maskHeight/2)){
        top = 0;
    }
    if(mouseX >= (smallNode.offsetWidth/2+maskWidth/2+clientLeft)){
        left = smallNode.offsetWidth/2;
    }
    if(mouseY >= (smallNode.offsetHeight/2+maskHeight/2+clientTop)){
        top = smallNode.offsetHeight/2;
    }
    maskNode.style.left = left+'px';
    maskNode.style.top = top+'px';
    bigImageNode.style.left = -2*left+'px';
    bigImageNode.style.top = -2*top+'px';

}
smallNode.onmouseenter = function(){
    maskNode.style.display = 'block';
    bigNode.style.display = 'block';
}
smallNode.onmouseleave = function(){
    maskNode.style.display = 'none';
    bigNode.style.display = 'none';
}

// 动态渲染缩略图列表
// 获取缩略图动态数据
var dataImagesSrc = goodData.imagessrc;
for(let i=0;i < dataImagesSrc.length;i++){
    let liNode = document.createElement('li');
    let imgNode = document.createElement('img');
    imgNode.dataset.liIndex = i;
    imgNode.src = dataImagesSrc[i].s;
    imgNode.alt = 'iPhone';
    liNode.appendChild(imgNode);
    imagelistNode.appendChild(liNode);
}
// 标识变量
let flag;
// 点击缩略图切换小图和大图
imagelistNode.onclick = function(event){
    let imgindex = event.target.dataset.liIndex;
    if(imgindex){
        smallImageNode.src = dataImagesSrc[imgindex].s;
        bigImageNode.src = dataImagesSrc[imgindex].b;
        imagelistNode.childNodes[imgindex].style.border = '1px solid orange';
        if(flag){
            imagelistNode.childNodes[flag].style = '1px solid #ccc';
        }
        flag = imgindex;
    }
}
// 点击按钮进行缩略图轮播
// 获取元素的右外边距
let elementMarginRight = parseInt(getComputedStyle(imagelistNode.childNodes[0],null).getPropertyValue('margin-right'));
// 每步移动的距离
let step = imagelistNode.childNodes[0].offsetWidth+elementMarginRight;
// 可移动的距离（304）
let movableDistance = (imagelistNode.childElementCount-5)*(step);
imagelistNode.style.marginLeft = 0+'px';
for(let i=0;i<buttonArr.length;i++){
    buttonArr[i].onclick = function(event){
        let buttonDirection = event.target.dataset.direction;
        switch (buttonDirection) {
            case 'left':
                if(parseInt(imagelistNode.style.marginLeft) < 0){
                    if(parseInt(imagelistNode.style.marginLeft) >= -movableDistance){
                        buttonArr[1].style.backgroundColor = 'rgba(235,235,235,.1)';
                    }
                    imagelistNode.style.marginLeft = (parseInt(imagelistNode.style.marginLeft)+step) +'px';
                }
                if(parseInt(imagelistNode.style.marginLeft) == 0){
                    event.target.style.backgroundColor = 'rgb(155,155,155)';
                }
                break;
        
            case 'right':
                if(parseInt(imagelistNode.style.marginLeft) > -movableDistance){
                    if(parseInt(imagelistNode.style.marginLeft) <= 0){
                        buttonArr[0].style.backgroundColor = 'rgba(235,235,235,.1)';
                    }
                    imagelistNode.style.marginLeft = (parseInt(imagelistNode.style.marginLeft)-step) +'px';
                }
                if(parseInt(imagelistNode.style.marginLeft) == -movableDistance){
                    event.target.style.backgroundColor = 'rgb(155,155,155)';
                }
                break;
        }
    }
}

