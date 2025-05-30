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
  ctx2.moveTo(75, 250);
  ctx2.lineTo(125, 250);
  ctx2.lineTo(125, 150);
  ctx2.lineTo(135, 150);
  ctx2.lineTo(135, 350);
  ctx2.lineTo(125, 350);
  ctx2.lineTo(125, 500);
  ctx2.lineTo(120, 500);
  ctx2.lineTo(120, 350);
  ctx2.lineTo(80, 350);
  ctx2.lineTo(80, 500);
  ctx2.lineTo(75, 500);
  ctx2.fill();
}
onMounted(() => {
  draw();
  create();
});
</script>
