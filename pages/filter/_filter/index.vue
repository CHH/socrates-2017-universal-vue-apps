<template>
  <div class="container-fluid">
    <div class="row bg-dark">
      <div class="col">
        <h1 class="py-2 text-light"><small>Meine Aufgaben</small></h1>
      </div>
    </div>

    <div class="row align-items-center justify-content-between py-2 bg-light">
      <div class="col-auto">
        <h2>
          <small>
            {{ items.length }} <span v-if="items.length == 1">Aufgabe</span><span v-else>Aufgaben</span>
          </small>
        </h2>
      </div>
      <div class="col-auto">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <nuxt-link to="/filter/all" class="nav-link" active-class="active">Alle</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/filter/open" class="nav-link" active-class="active">Offen</nuxt-link>
          </li>
          <li class="nav-item">
            <nuxt-link to="/filter/closed" class="nav-link" active-class="active">Erledigt</nuxt-link>
          </li>
        </ul>
      </div>
      <div class="col-auto">
        <button class="btn btn-primary" @click="add">Neue Aufgabe</button>
      </div>
    </div>

    <div class="row">
      <div class="col py-2">
        <transition-group name="slide-panel-left" tag="ol" class="list-unstyled">
          <li v-for="item in items" :key="item.id" class="todo-list-item">
            <todo-item :item="item" @done="done(item)" @click="edit(item)" />
          </li>
        </transition-group>
      </div>
      <div class="col py-2" v-if="currentlyEditingItem">
        <todo-editor :item="currentlyEditingItem" @save="save" @remove="remove(currentlyEditingItem)" @cancel="cancel(currentlyEditingItem)" />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from '~/components/TodoItem.vue'
import TodoEditor from '~/components/TodoEditor.vue'
import { mapState, mapGetters } from 'vuex'
import { DONE, SET_FILTER, UPDATE_ITEM } from '~/store/mutation-types'

export default {
  components: {
    TodoItem, TodoEditor
  },

  data () {
    return {
      currentlyEditingItem: null
    }
  },

  computed: {
    ...mapState(['items', 'filter']),
    ...mapGetters(['openItems'])
  },

  watch: {
    '$route': (route) => {
      this.setFilter(route.params.filter)
    }
  },

  methods: {
    async setFilter (filter) {
      this.$store.commit(SET_FILTER, { filter })
      return this.$store.dispatch('refresh')
    },

    async done (item) {
      this.$store.commit(DONE, { item, done: !item.done })

      return this.$store.dispatch('saveItem', { item })
    },

    async edit (item) {
      this.currentlyEditingItem = null
      this.currentlyEditingItem = item
    },

    async save ({ title }) {
      if (this.currentlyEditingItem.id) {
        this.$store.commit(UPDATE_ITEM, {item: this.currentlyEditingItem, props: {title}})
        await this.$store.dispatch('saveItem', {item: {...this.currentlyEditingItem, title}})
      } else {
        await this.$store.dispatch('addItem', {item: {...this.currentlyEditingItem, title}})
      }

      this.currentlyEditingItem = null
    },

    async cancel (item) {
      this.currentlyEditingItem = null
    },

    async remove (item) {
      await this.$store.dispatch('removeItem', { item })
      this.currentlyEditingItem = null
    },

    async add () {
      const item = {
        id: null,
        title: '',
        done: false
      }

      this.currentlyEditingItem = item
    }
  },

  async created () {
    if (process.browser) {
      this.$store.commit(SET_FILTER, { filter: this.$route.params.filter })
      return this.$store.dispatch('refresh')
    }
  }
}
</script>

<style lang="scss" scoped>
  .todo-list-item {
    transition: all 400ms;
  }
  .slide-panel-left-enter, .slide-panel-left-leave-to {
    transform: translateX(-25%);
    opacity: 0;
  }
  .slide-panel-left-active {
    position: absolute;
  }
</style>
