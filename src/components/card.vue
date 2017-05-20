<template>
  <div class="card">
    <slot></slot>
  </div>
</template>

<script>
export default
  { name: 'card'
  , methods: {}
  , props: {}
  }
</script>

<style lang="less" scoped>
.card {
  background-color: white;
  box-shadow: 0 1px 2px 0 #ccc;
  margin-top: 2.0rem;
  padding: 1.0rem;
  width: 100%;

  @media (min-width: 450px) {
    width: 80%;
  }

  @media (min-width: 800px) {
    width: 600px;
  }
}
</style>
