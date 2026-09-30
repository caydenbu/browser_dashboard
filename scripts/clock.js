const centerdot = document.getElementById("dot");
const clock = document.getElementById("clock");

function CreateLines(){
  const div = document.createElement("div");
  div.classList.add("straight-lines");

  const [x,y, rot] = calculatePos(0)

  console.log(rot)
  div.style.rotate = rot + "deg"
  div.style.left = (centerdot.offsetLeft + x) + "px";
  div.style.top = (centerdot.offsetTop + y) + "px";

  clock.appendChild(div)
}

function calculatePos(radians){
  radius = clock.clientWidth/2;
  rotation = Math.cos(radians) * 90
  x = Math.cos(radians) * radius;
  y = Math.sin(radians) * radius;

  return [x, y, rotation];
}

CreateLines();
