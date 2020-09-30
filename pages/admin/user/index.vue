<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card color="grey">
                    <v-card-title>
                        User Management
                        <v-spacer></v-spacer>
                        <v-btn color="secondary">
                            <v-icon left>mdi-plus-box</v-icon>
                            Create
                        </v-btn>
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                            :items="users"
                            :headers="headers"
                            :items-per-page="10"
                            class="primary user-table"
                        >
                            <template v-slot:[`item.avatar`]="{ item }">
                                <v-avatar class="ma-2">
                                    <v-img :src="item.avatar"></v-img>
                                </v-avatar>
                            </template>
                            <template v-slot:[`item.role`]="{ value }">
                                <RoleDisplay :role="value" />
                            </template>
                            <template v-slot:[`item.edit`]="{ item }">
                                <v-btn @click="userEdit(item._id)" color="pink">
                                    <v-icon left>mdi-square-edit-outline</v-icon>
                                    Edit
                                </v-btn>
                            </template>
                            <template v-slot:[`item.status`]="{ item }">
                                <v-switch
                                    :label="item.avatar !== '' ? 'Active' : 'InActive'"
                                    :value="true"
                                    color="orange"
                                    class="m-switch"
                                />
                            </template>
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import RoleDisplay from '@/components/DataTable/RoleDisplay'
export default {
    components: {
        RoleDisplay
    },
    data: () => ({
        headers: [
            { text: 'Name', value: 'name', sortable: false, width: '15%'},
            { text: 'Avatar', value: 'avatar', sortable: false },
            { text: 'Email', value: 'email', sortable: false },
            { text: 'Level', value: 'role', sortable: false },
            { text: 'Status', value: 'status', sortable: false },
            { text: 'Action', value: 'edit', sortable: false }
        ]
    }),
    async asyncData ({ store, $axios }) {
        $axios.setToken(store.state.user.token, 'Bearer')
        const resp = await store.dispatch('user/getUserList')
        const users = resp.status === 1 ? resp.users : []

        return {
            users
        }
    },
    mounted () {
        // console.log(this.users)
    },
    methods: {
        userEdit (id) {
            alert(id)
        }
    }
}
</script>
<style>
.theme--dark.v-data-table.user-table > .v-data-table__wrapper > table > tbody > tr:hover:not(.v-data-table__expanded__content):not(.v-data-table__empty-wrapper) {
    background: #ff5252 !important;
    cursor: pointer;
}
.m-switch.theme--dark.v-input--switch .v-input--switch__thumb {
    color: white !important;
}
.m-switch .theme--dark.v-label {
    color: orange;
}
</style>