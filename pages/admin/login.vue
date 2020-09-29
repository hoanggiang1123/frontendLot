<template>
    <v-container fluid fill-height>
        <v-row>
            <v-col md="6" offset-md="3">
                <v-card color="primary">
                    <v-card-title class="justify-center display-1">
                        VNLottery
                    </v-card-title>
                    <v-card-subtitle class="d-flex justify-center text-h6">
                        Welcom back, Please Sign in
                    </v-card-subtitle>
                    <v-card-text>
                        <v-form
                            ref="signInForm"
                            @submit.prevent="signIn"
                            v-model="valid"
                            class="custom-form"
                        >
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
                                :append-icon="
                                    `mdi-eye${showPass === true ? '' : '-off'}`
                                "
                                :type="showPass === true ? 'text' : 'password'"
                                :rules="passwordRules"
                                label="Password"
                                prepend-icon="mdi-security"
                                color="white"
                                required
                            />
                            <v-layout>
                                <v-flex>
                                    <v-checkbox
                                        v-model="remember"
                                        label="Remember Password"
                                        color="white"
                                    />
                                </v-flex>
                                <v-flex class="d-flex justify-end align-center">
                                    <v-btn text>Forget Your Password?</v-btn>
                                </v-flex>
                            </v-layout>
                            <v-btn
                                block
                                type="submit"
                                color="secondary"
                                class="mt-4"
                                :disabled="!valid"
                                >Sign In</v-btn
                            >
                            <v-list-item class="mt-2">
                                Dont have an account?
                                <span
                                    @click="goToSignUp"
                                    class="font-weight-bold ml-4"
                                    style="cursor: pointer;"
                                    >Sign Up</span
                                >
                            </v-list-item>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
        <v-dialog
            v-model="dialog"
            max-width="650"
            @click:outside="removeDialog"
        >
            <v-card color="red">
                <v-card-title>
                    <v-icon class="mr-4">mdi-alert-circle</v-icon> Error
                </v-card-title>
                <v-card-text>
                    <v-list-item>
                        <span class="secondary--text text--lighten-4">{{
                            error
                        }}</span>
                    </v-list-item>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-container>
</template>
<script>
const emailRules = [
    v => !!v || "Email is required",
    v => (v && v.length <= 25) || "Email must be less than 25 characters",
    v => /.+@.+\..+/.test(v) || "Email must be valid"
];
const passwordRules = [
    v => !!v || "Password is required",
    v => (v && v.length > 5) || "Must be greater than 6 characters"
];
export default {
    middleware: 'isNotAuthenticated',
    layout: "noheader",
    data() {
        return {
            email: "hoanggiang1123@gmail.com",
            password: "123456",
            remember: false,
            showPass: false,
            valid: true,
            emailRules: emailRules,
            passwordRules: passwordRules,
            dialog: false,
            error: null,
            dialogTimeout: null
        };
    },
    watch: {
        error(val) {
            if (val) {
                this.dialog = true;
            } else {
                this.dialog = false;
            }
        }
    },
    methods: {
        goToSignUp() {
            this.$router.push({ path: "/admin/signup" });
        },
        toggleShowPass() {
            this.showPass = !this.showPass;
        },
        removeDialog() {
            this.error = null;
            clearTimeout(this.dialogTimeout);
        },
        async signIn() {
            if (this.$refs.signInForm.validate()) {
                const userInfo = {
                    email: this.email,
                    password: this.password
                };
                this.$store.dispatch("user/userSignIn", userInfo).then(res => {
                    if (res.status === 1) {
                        this.$router.push({ path: "/admin" });
                    } else {
                        this.error = res.err;
                        this.dialogTimeout = setTimeout(() => {
                            this.error = null;
                        }, 3000);
                    }
                });
            }
        }
    }
};
</script>
<style>
.v-application .custom-form .error--text {
    color: #ffc107 !important;
    caret-color: #ffc107 !important;
}
</style>
