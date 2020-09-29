<template>
  <h1>Dynamic page {{ params }}</h1>
</template>
<script>
export default {
    data () {
        return {
            params: null
        }
    },
    async asyncData({ params, $axios, $vuetify, route }) {
        console.log(route)
    }
}
</script>
<style scoped>

</style>
