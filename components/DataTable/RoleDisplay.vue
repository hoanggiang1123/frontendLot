<template>
    <v-btn :color="roleColor" class="white--text text--darken-4" small elevation="5">
        {{ roleName }}
    </v-btn>
</template>
<script>
export default {
    props: {
        role: {
            type: Number,
            default: null
        }
    },
    computed: {
        roleColor () {
            return this.role === 1 ? 'success' : 'warning'
        },
        roleName () {
            switch (this.role) {
                case 1: return 'Super Admin'
                case 0: return 'Member'
                default: return 'Guest'
            }
        }
    }
}
</script>
<style>

</style>