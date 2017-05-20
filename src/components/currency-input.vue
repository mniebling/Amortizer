<template>
  <div class="currency-input">
    <span v:if="left-widget" class="left-widget">{{ leftWidget }}</span>
    <span v:if="right-widget" class="right-widget">{{ rightWidget }}</span>
    <input
      type="text"
      class="currency-input-box"
      v-bind:value="value"
      v-bind:class="classObject"
      v-on:input="updateValue($event.target.value)">
    <label class="label">{{ label }}</label>
  </div>
</template>

<script>
let updateValue = function (value) {
  this.$emit('input', value)
}

let classObject = function () {
  return (
    { 'has-left-widget': this.leftWidget
    , 'has-right-widget': this.rightWidget
    })
}

export default
  { name: 'currency-input'
  , computed: { classObject }
  , methods: { updateValue }
  , props:
    { 'label': String
    , 'left-widget': String
    , 'right-widget': String
    , 'value': String
    }
  }
</script>

<style lang="less" scoped>
.currency-input {
  position: relative;
  width: 20.0rem;

  &:not(:last-child) {
    margin-bottom: 2.5rem;
  }
}

.currency-input-box {
  border: none;
  border-bottom: 1px solid #999;
  padding: 0.6rem 0;
  transition: 0.25s all;
  width: 100%;

  &:focus {
    border-bottom: 2px solid #666;
    outline: none;
  }

  &.has-left-widget { padding-left: 1.4rem; }
  &.has-right-widget { padding-right: 2.0rem; }
}

.left-widget {
  color: #aaa;
  position: absolute;
  left: 0;
  top: 0.6rem;
}

.right-widget {
  color: #aaa;
  position: absolute;
  right: 0;
  top: 0.6rem;
}

.label {
  display: block;
  font-size: 1.3rem;
  font-weight: bold;
  margin-top: 0.5rem;
}
</style>
