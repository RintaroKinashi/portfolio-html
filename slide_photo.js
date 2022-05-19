const pics_src = ["img/welcome1.jpg","img/welcome2.jpg","img/welcome3.jpg"];
let num = -1;


function slideshow_timer(){
  if (num === 2){
    num = 0;
  }
  else {
    num ++;
  }
  document.getElementById("mypic").src = pics_src[num];
}

setInterval(slideshow_timer, 1000);
