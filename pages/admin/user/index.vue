<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card color="primary">
                    <v-card-title>
                        User Management
                        <v-spacer></v-spacer>
                        <v-btn color="secondary">
                            <v-icon left>mdi-plus-box</v-icon>
                            Create
                        </v-btn>
                    </v-card-title>
                </v-card>

            </v-col>
        </v-row>
    </v-container>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    async asyncData ({ store }) {
        const resp = await store.dispatch('user/getUserList')
        const users = resp.status === 1 ? resp.users : []

        return {
            users
        }
    },
    mounted () {
        console.log(this.users)
    }
}
</script>
<style>

</style>