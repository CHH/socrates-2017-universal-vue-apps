<template>
  <div class="container-fluid">
    <h1>Meine Aufgaben</h1>

    <div class="row">
      <div class="col">
        <div class="row align-items-center">
          <div class="col">
            <h2>
              <small>
                {{ open.length }} <span v-if="open.length == 1">Aufgabe</span><span v-else>Aufgaben</span>
              </small>
            </h2>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary btn-sm">Neue Aufgabe</button>
          </div>
        </div>

        <ul class="list-unstyled">
          <li v-for="item in items" :key="item.id">
            <label :class="{'text-muted': item.done}">
              <input type="checkbox" name="done" v-model="item.done">
              {{ item.title }}
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {
  },

  computed: {
    open () {
      return this.items.filter(item => !item.done)
    }
  },

  data () {
    return {
      items: [
        {
          id: 1,
          title: 'SoCraTes 2017 Demo vorbereiten',
          done: false
        },
        {
          id: 2,
          title: 'better.co.at promoten',
          done: false
        }
      ]
    }
  }
}
</script>

<style>
</style>
