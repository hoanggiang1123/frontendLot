<template>
    <v-chip :color="roleColor" class="white--text text--darken-4" small>
        {{ roleName }}
    </v-chip>
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