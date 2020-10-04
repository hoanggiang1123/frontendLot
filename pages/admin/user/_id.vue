<template>
    <v-container>
        <v-row>
            <v-col cols="6">
                <v-card color="primary">
                    <v-list-item>
                        <v-list-item-icon>
                            <v-icon large>mdi-account-edit</v-icon>
                        </v-list-item-icon>
                        <v-list-item-title class="text-h6">
                            Edit User Info
                        </v-list-item-title>
                    </v-list-item>
                    <v-card-text>
                        <v-form
                            class="user-edit-form"
                            @submit.prevent="handleChangeUserInfo"
                        >
                            <v-row>
                                <v-col cols="5">
                                    <v-list-item>
                                        <v-avatar size="150" class="user-avatar">
                                            <v-img :src="userAvatar"></v-img>
                                            <v-btn
                                                absolute
                                                bottom
                                                block
                                                color="secondary"
                                                type="button"
                                                @click="triggerOpenFile"
                                            >Upload
                                            </v-btn>
                                        </v-avatar>
                                        <v-file-input
                                            id="userAvatarField"
                                            v-model="file"
                                            @change="handleAvatarChange"
                                            accept="image/png, image/jpeg, image/bmp"
                                            style="display:none;"
                                            >
                                        </v-file-input>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-icon class="mr-4">
                                            <v-icon>mdi-account-reactivate</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                               {{ userProfile.username }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                    <v-list-item>
                                        <v-list-item-icon class="mr-4">
                                            <v-icon>mdi-email</v-icon>
                                        </v-list-item-icon>
                                        <v-list-item-content>
                                            <v-list-item-title>
                                                {{ userProfile.email }}
                                            </v-list-item-title>
                                        </v-list-item-content>
                                    </v-list-item>
                                </v-col>
                                <v-col cols="7">
                                    <v-text-field
                                        label="Display Name"
                                        v-model="userProfile.name"
                                        prepend-icon="mdi-face"
                                    >
                                    </v-text-field>
                                    <v-text-field
                                        label="Phone"
                                        v-model="userProfile.phone"
                                        prepend-icon="mdi-phone"
                                    >
                                    </v-text-field>
                                    <v-textarea
                                        label="About"
                                        v-model="userProfile.about"
                                        prepend-icon="mdi-folder-information"
                                    >
                                    </v-textarea>
                                </v-col>
                                <v-col cols="12">
                                    <v-btn block color="secondary" type="submit">Save</v-btn>
                                </v-col>
                            </v-row>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
            <v-col cols="6" class="pt-0">
                <v-row>
                    <v-col cols="12">
                        <v-card color="primary">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon large>mdi-account-key</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="text-h6">
                                   Change Password
                                </v-list-item-title>
                            </v-list-item>
                            <v-card-text>
                                <v-form
                                    ref="changePassForm"                        
                                    v-model="valid"
                                >
                                    <v-text-field
                                        label="Old Password"
                                        v-model="password"
                                        prepend-icon="mdi-security"
                                        type="password"
                                        :rules="passwordRules"
                                        required
                                    ></v-text-field>
                                    <v-text-field
                                        label="New Password"
                                        v-model="newPassword"
                                        prepend-icon="mdi-keyboard"
                                        type="password"
                                        :rules="verifyPassword"
                                        required
                                    ></v-text-field>
                                    <v-btn @click="changePassword" block color="secondary" class="mt-4" :disabled="!valid">Save</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                    <v-col cols="12">
                        <v-card color="primary">
                            <v-list-item>
                                <v-list-item-icon>
                                    <v-icon large>mdi-google-circles-group</v-icon>
                                </v-list-item-icon>
                                <v-list-item-title class="text-h6">
                                    User Role & Status
                                </v-list-item-title>
                            </v-list-item>
                            <v-card-text>
                                <v-form
                                    
                                >
                                    <v-select
                                        v-model="roleValues"
                                        :items="roles"
                                        item-text="name"
                                        item-value="val"
                                        label="Role"
                                        prepend-icon="mdi-account-switch-outline"
                                    ></v-select>
                                    <v-select
                                        v-model="statusValues"
                                        :items="status"
                                        item-text="name"
                                        item-value="val"
                                        label="Status"
                                        prepend-icon="mdi-account-tie-voice-off"
                                    ></v-select>
                                    <v-btn block color="secondary" @click="handleRoleAndStatus">Save</v-btn>
                                </v-form>
                            </v-card-text>
                        </v-card>
                    </v-col>
                </v-row>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import { SERVER_URL } from '@/helpers/constant'

const passwordRules = [
    v => !!v || "Password is required",
    v => (v && v.length > 5) || "Must be greater than 6 characters"
];
export default {
    async asyncData ({ store, params, redirect }) {
        const id = params.id
        const userProfile = await store.dispatch('user/getUserInfoById', id)
        if (userProfile.status === 1) {
            const roleValues = userProfile.user.role === 0 ? { name: 'Member', val: 0 } : { name: 'Admin', val: 1 }
            const statusValues = userProfile.user.status === 'active' ? { name: 'Active', val: 'active' } : { name: 'Inactive', val: 'inactive' }
            return {
                userProfile: userProfile.user,
                roleValues,
                statusValues
            }
        } else {
            redirect(404, '/error')
        }
    },
    data: () => ({
        roles: [
            { name: 'Admin', val: 1 },
            { name: 'Member', val: 0 }
        ],
        status: [
             { name: 'Active', val: 'active' },
             { name: 'Inactive', val: 'inactive' }
        ],
        password: '',
        newPassword: '',
        passwordRules: passwordRules,
        valid: true,
        file: null,
        folder: 'user',
        SERVER_URL
    }),
    computed: {
        verifyPassword () {
            return [
                v => !!v || "Password is required",
                v => (v && v.length > 5) || "Must be greater than 6 characters",
                v => v !== this.password || 'New Password not the same with old'
            ]
        },
        userAvatar () {
            if (this.userProfile.avatar === '') {
                return require('~/assets/avatar/avatar_8.jpg')
            } else {
                if (this.userProfile.avatar.indexOf('uploads') > -1) {
                    return SERVER_URL + this.userProfile.avatar
                } else {
                    return this.userProfile.avatar
                }
            }
        }
    },
    methods: {
        triggerOpenFile () {
            if (document.getElementById('userAvatarField')) {
                document.getElementById('userAvatarField').click()
            }
        },
        handleAvatarChange () {
        
            const reader = new FileReader()
            reader.addEventListener('load', () => {
                this.userProfile.avatar = reader.result
            })

            if (this.file) {
                reader.readAsDataURL(this.file)
            }
        },
        handleRoleAndStatus () {
            console.log(this.roleValues)
            console.log(this.statusValues)
        },
        handleChangeUserInfo () {
            const name = this.userProfile.name
            const phone = this.userProfile.phone
            const about = this.userProfile.about
            const id = this.userProfile._id
            const file = this.file
            const folder = this.folder
            if(name === '' && phone === '' && about === '' && file === null) {
                alert('User Info Can not be empty')
                return false
            }

            let formData = new FormData()
            formData.append('userId', id)
            formData.append('name', name)
            formData.append('phone', phone)
            formData.append('about', about)
            formData.append('folder', folder)
            formData.append('avatar', file)
            this.$store.dispatch('user/userEditInfo', formData).then((res) => {
                if (res.status === 1) {
                    this.userProfile = res.user
                    alert('User Info Update Success')
                }
            })

        },
        changePassword () {
            if(this.$refs.changePassForm.validate()) {
                const userObj = { userId: this.userProfile._id, password: this.password, newPassword: this.newPassword }
                this.$store.dispatch('user/userChangePassword', userObj)
                    .then((res) => {
                        if (res.status === 1) {
                            alert('Change Password Success')
                        }
                    })
            }
        }
    }
}
</script>
<style scope>
::v-deep .user-avatar {
    border:3px solid orange !important;
}
.myapp.v-application .primary--text {
    color: white !important;
    caret-color: white !important;
}
.myapp .theme--dark.v-list {
    background: #ff5252;
}
.myapp.v-application .error--text {
    color: orange !important;
}
</style>