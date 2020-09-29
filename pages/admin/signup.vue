<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col md="6" offset-md="3">
                <v-card color="primary">
                <v-card-title class="justify-center display-1">
                    VNLottery
                </v-card-title>
                <v-card-subtitle class="d-flex justify-center text-h6">
                    Welcome To Lottery Vn, Please Sign Up
                </v-card-subtitle>
                <v-card-text>
                    <v-form
                    ref="signUpForm"
                    @submit.prevent="signUp"
                    v-model="valid"
                    class="custom-form"
                    >
                    <v-text-field
                        v-model="name"
                        :rules="nameRules"
                        label="Display Name"
                        prepend-icon="mdi-account-circle"
                        color="white"
                        required
                    />
                    <v-text-field
                        v-model="username"
                        :rules="userNameRules"
                        label="User Name"
                        prepend-icon="mdi-account-key"
                        color="white"
                        required
                    />
                    <v-text-field
                        v-model="email"
                        :rules="emailRules"
                        label="Email"
                        prepend-icon="mdi-email"
                        color="white"
                        required
                    />
                    <v-text-field
                        @click:append="toggleShowPass"
                        v-model="password"
                        :append-icon="`mdi-eye${showPass === true ? '' : '-off'}`"
                        :type="showPass === true ? 'text': 'password'"
                        :rules="passwordRules"
                        label="Password"
                        prepend-icon="mdi-lock-question"
                        color="white"
                        required
                    />
                    <v-btn block type="submit" color="secondary" class="mt-4" :disabled="!valid">Sign Up</v-btn>
                    <v-list-item class="mt-2">
                        Already created an account? <span @click="goToSignIn" class="font-weight-bold ml-4" style="cursor: pointer;">Sign In</span>
                    </v-list-item>
                    </v-form>
                </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
const userNameRules = [
  v => !!v || 'User Name is required',
  v => (v && v.length <= 20) || 'Email must be less than 20 characters',
  v => /^([a-z])[a-z0-9]*[^\s]\1*$/.test(v) || 'User name must be lowercase and no spaces'
]
const nameRules = [
  v => !!v || 'Name is required',
  v => (v && v.length <= 20) || 'Email must be less than 20 characters',
  v => /^[A-Za-z ]+$/.test(v) || 'Name must not contain special characters'
]
const emailRules = [
  v => !!v || 'Email is required',
  v => (v && v.length <= 25) || 'Email must be less than 25 characters',
  v => /.+@.+\..+/.test(v) || 'Email must be valid'
]
const passwordRules = [
  v => !!v || 'Password is required',
  v => (v && v.length > 5) || 'Must be greater than 6 characters',
]
export default {
    middleware: 'isNotAuthenticated',
    layout: 'noheader',
    data () {
        return {
            username: '',
            name: '',
            email: '',
            password: '',
            showPass: false,
            userNameRules: userNameRules,
            nameRules: nameRules,
            emailRules: emailRules,
            passwordRules: passwordRules,
            valid: true
        }
    },
    methods: {
        toggleShowPass () {
            this.showPass = !this.showPass
        },
        goToSignIn () {
            this.$router.push({ path: '/admin/login' })
        },
        signUp () {
            if (this.$refs.signUpForm.validate()) {
                const userRegInfo = {
                    name: this.name,
                    username: this.username,
                    email: this.email,
                    password: this.password
                }
                this.$store.dispatch('user/userSignUp', userRegInfo).then((res) => {
                    if (res.status === 1) {
                        this.$router.push('/')
                    } else {
                        alert('An Error Occurr')
                    }
                })
            }
        }
    }
}
</script>
<style>
.v-application .custom-form .error--text {
  color: #ffc107 !important;
  caret-color: #ffc107 !important;
}
</style>
