<template>
  <div class="todo-item-editor">
    <div class="card">
      <div class="card-body">
        <div class="form-group">
          <label for="todo-title">Aufgabe bearbeiten</label>
          <input v-focus type="text" class="form-control" id="todo-title" v-model="title" @keydown.enter="save()">
        </div>
        <div class="d-flex flex-row">
          <button type="submit" class="btn btn-primary" @click="save()">Speichern</button>
          <button type="button" class="btn btn-default ml-1" @click="cancel()">Abbrechen</button>
          <button type="button" class="btn btn-danger ml-auto" @click="remove()">Löschen</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['item'],

  data () {
    return {
      title: this.item.title
    }
  },

  methods: {
    async save () {
      this.$emit('save', {title: this.title})
    },

    async cancel () {
      this.$emit('cancel')
    },

    async remove () {
      this.$emit('remove')
    }
  }
}
</script>

