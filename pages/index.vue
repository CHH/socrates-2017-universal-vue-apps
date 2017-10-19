<template>
  <div class="container-fluid">
    <h1>Meine Aufgaben</h1>

    <div class="row">
      <div class="col">
        <div class="row align-items-center">
          <div class="col">
            <h2>
              <small>
                2 Aufgaben
              </small>
            </h2>
          </div>
          <div class="col-auto">
            <button class="btn btn-primary btn-sm">Neue Aufgabe</button>
          </div>
        </div>

        <ul class="list-unstyled">
          <li>
            <label>
              <input type="checkbox" name="done">
              SoCraTes 2017 Demo vorbereiten
            </label>
          </li>
          <li>
            <label>
              <input type="checkbox" name="done">
              better.co.at promoten
            </label>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
}
</script>

<style>
</style>
