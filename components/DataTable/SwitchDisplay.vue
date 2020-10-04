<template>
    <v-switch
        :label="switchActive ? 'Active' : 'InActive'"
        :color="switchActive ? 'success' : 'orange'"
        :class="`m-switch ${ switchActive ? 'switch-active' : '' }`"
        :input-value="switchActive"
        @click="changeStatus"
    />
</template>
<script>
export default {
    name: 'SwitchDisplay',
    props: {
        item: {
            type: Object,
            default: {}
        }
    },
    data: () => ({
        active: false
    }),
    computed: {
        switchActive () {
            return this.item.status === 'active'
        }
    },
    methods: {
        changeStatus () {
            const statusChange = this.switchActive === true ? 'inactive' : 'active'
            const userObj = { userId: this.item._id, status: statusChange }
            this.$emit('change-status', userObj)
        }
    }
}
</script>
<style lang="scss" scoped>

</style>