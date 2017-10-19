<template>
  <div class="todo-item form-check">
    <label :class="{'todo-item-done': done}" class="form-check-label">
      <input type="checkbox" name="done" v-model="done" class="form-check-input">
      <span>{{ title }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: [
    'item'
  ],

  data () {
    return {
      done: this.item.done,
      title: this.item.title
    }
  },

  watch: {
    done () {
      this.$emit('done')
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-item-done {
    text-decoration: line-through;
  }
</style>
