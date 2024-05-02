let bool = true;
let image = document.getElementById("img1");
let temp = 1;
let nodelist = document.getElementsByClassName("thunder");
let okbrochill = document.querySelector(".okbrochill");
function pushme(counter) {
  // console.log(counter);
  if(counter >= 5){
    document.querySelector(".container1").style.opacity ="0";
  }
  else{
    document.querySelector(".container1").style.opacity ="1";
  }
  document.querySelector(".container1").style.transition ="all 1s";
}

function clickedmenu() { 
  if (okbrochill.scrollLeft < 8500)
    okbrochill.scrollLeft += 1708;

  setTimeout(() => {
    console.log(okbrochill.scrollLeft);
    pushme(okbrochill.scrollLeft/1707);
  },1000);
}

// const largerCard = document.getElementById('largerCard');

document.querySelector(".okbrochill").addEventListener("wheel", (e) => {
  document.querySelector(".okbrochill").scrollLeft += e.deltaY * 2.4;
  temp += 15;
  console.log(e.deltaY);
  if(okbrochill.scrollLeft >= 6400 ||  okbrochill.scrollLeft <= 5120 ){
    largerCard.style.opacity = "0";
    console.log("reached");
  }else{
    largerCard.style.opacity = "1";
  }
});

function expandiv(point) {
  nodelist[point].style.width = "100px";
  nodelist[point].style.transform = "scale(1.5,1)";
  nodelist[point].style.transition = "0.5s all";
  nodelist[point].style.opacity = "1";
}
function shrinkdiv(point) {
  nodelist[point].style.opacity = "0";
  nodelist[point].style.transform = "scale(2,1)";
  nodelist[point].style.transition = "0.5s all";
}