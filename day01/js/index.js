// 获取路径导航包含元素
var navpathNode = document.querySelector('.navpath');
// 获取路径导航数据
var path = goodData.path;
// 获取小图
var smallNode = document.querySelector('.small');
// 获取遮罩层
var maskNode = document.querySelector('.small .mask');
// 获取大图
var bigNode = document.querySelector('.big');
// 获取大图里的图片
var bigImageNode = document.querySelector('.big img');

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

