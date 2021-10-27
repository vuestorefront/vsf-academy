<template>
    <div class="loader"></div>
</template>
<script>
export default {
   name: "AppLoader", 
}
</script>
<style scoped>
.loader {
  margin: var(--spacer-3xl) auto;
  width: 40px;
  height: 40px;
  border: 2px solid var(--c-primary-variant);
  border-radius: 50%;
  border-left-color: var(--c-primary);
  animation-name: spin;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
}
@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>