<template>
  <div>
    <div>
      <canvas
        id="ideeznuts"
        class="w-150 h-75 border-2 absolute translate-y-1/2 translate-x-1/2"
        ><img src="/Poliwhirl.png" class="w-150 h-75" alt="The goat"
      /></canvas>
    </div>
  </div>
</template>

<script setup>
function unction() {
  const canvas = document.getElementById("ideeznuts");
  const ctx = canvas.getContext("2d");
  ctx.fillStyle = "rgb(200 0 0)";
  ctx.fillRect(10, 10, 50, 50);
  ctx.fillStyle = "rgb(0 0 200 / 50%)";
  ctx.fillRect(30, 30, 50, 50);
}
unction();
</script>
