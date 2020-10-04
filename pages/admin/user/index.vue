<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card color="accent">
                    <v-card-title>
                        User Management
                        <v-spacer></v-spacer>
                        <v-btn color="secondary" absolute top right>
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
                             <template v-slot:[`item.name`]="{ value }">
                                <v-list-item-title class="text-capitalize">{{ value }}</v-list-item-title>
                            </template>
                            <template v-slot:[`item.avatar`]="{ item }">
                                <v-avatar class="ma-2">
                                    <v-img :src="item.avatar ? SERVER_URL + item.avatar : require('~/assets/avatar/avatar_8.jpg')" lazy-src="https://blog.bdtt.tv/wp-content/uploads/2020/08/dot.jpg"></v-img>
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
                                <SwitchDisplay :item="item" @change-status="changeStatus"/>
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
import SwitchDisplay from '@/components/DataTable/SwitchDisplay'
import { SERVER_URL } from '@/helpers/constant'
export default {
    middleware: 'requireAdmin',
    components: {
        RoleDisplay,
        SwitchDisplay
    },
    data: () => ({
        headers: [
            { text: 'Name', value: 'name', sortable: false, width: '15%'},
            { text: 'Avatar', value: 'avatar', sortable: false },
            { text: 'Email', value: 'email', sortable: false },
            { text: 'Level', value: 'role', sortable: false },
            { text: 'Status', value: 'status', sortable: false },
            { text: 'Action', value: 'edit', sortable: false }
        ],
        SERVER_URL
    }),
    async asyncData ({ store, $axios }) {
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
            this.$router.push({ path: `/admin/user/${id}` })
        },
        changeStatus (userObj) {
            this.$store.dispatch('user/userChangeStatus', userObj).then((res) => {
                if (res.status === 1) {
                    this.$store.dispatch('user/getUserList').then((resp) => {
                        if (resp.status === 1) {
                            this.users = resp.users
                        }
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>
<style scoped>
::v-deep .v-data-table__wrapper table tbody tr:hover {
    background: #f34444   !important;
    cursor: pointer;
}
.m-switch.theme--dark.v-input--switch .v-input--switch__thumb {
    color: white !important;
}
.m-switch .theme--dark.v-label {
    color: orange;
}
.m-switch.switch-active.theme--dark.v-input--switch .v-input--switch__thumb {
    color: #00e676 !important;
}
.m-switch.switch-active .theme--dark.v-label {
    color: #00e676;
}
</style>