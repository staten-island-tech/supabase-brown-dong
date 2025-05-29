<template>
  <div>
    <div><canvas id="ideeznuts" width="500" height="500"></canvas></div>
    <div><canvas id="MarkFridlin" width="500" height="500"></canvas></div>
  </div>
</template>

<script setup>
import { onMounted } from "vue";
let x = 0;
function draw() {
  const canvas = document.getElementById("ideeznuts");
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.lineWidth = 5;
  ctx.strokeStyle = "black";
  ctx.fillStyle = "white";
  ctx.fillRect(x, 200, 50, 50);
  ctx.strokeRect(x, 200, 50, 50);
  x += 2;
  if (x > canvas.width) x = -50;
  requestAnimationFrame(draw);
}
function create() {
  const canvas2 = document.getElementById("MarkFridlin");
  const ctx2 = canvas2.getContext("2d");
  ctx2.beginPath();
  ctx2.moveTo(75, 475);
  ctx2.lineTo(125, 475);
  ctx2.lineTo(125, 465);
  ctx2.lineTo(135, 465);
  ctx2.lineTo(135, 485);
  ctx2.lineTo(125, 485);
  ctx2.lineTo(125, 500);
  ctx2.lineTo(120, 500);
  ctx2.lineTo(120, 485);
  ctx2.lineTo(75, 500);
  ctx2.fill();
}
onMounted(() => {
  draw();
  create();
});
</script>
