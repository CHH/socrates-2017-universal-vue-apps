<template>
  <div class="todo-item form-check">
    <label :class="{'todo-item-done': done, 'text-muted': done}" class="form-check-label">
      <input type="checkbox" name="done" v-model="done" class="form-check-input">
      <span @click.prevent="click()">{{ item.title }}</span>
    </label>
  </div>
</template>

<script>
export default {
  props: ['item'],

  computed: {
    done: {
      get () {
        return this.item.done
      },

      set (value) {
        this.$emit('done')
      }
    }
  },

  methods: {
    click () {
      this.$emit('click')
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-item-done {
    text-decoration: line-through;
  }
</style>
