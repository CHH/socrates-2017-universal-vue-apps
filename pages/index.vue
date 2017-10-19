<template>
  <div><nuxt-child></nuxt-child></div>
</template>

<script>
export default {
  fetch ({ redirect }) {
    return redirect('/filter/all')
  }
}
</script>
