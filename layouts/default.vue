<template>
    <v-app style="background-color: #e0e0e0" class="myapp">
        <v-navigation-drawer
            v-model="drawer"
            :mini-variant="miniVariant"
            :clipped="clipped"
            fixed
            app
            color="accent"
        >
            <v-layout column align-center justify-center>
                <v-flex class="mt-4">
                    <v-avatar size="100" color="success">
                        <v-img :src="userAvatar"></v-img>
                    </v-avatar>
                </v-flex>
                <v-flex class="my-2">
                    <v-btn color="secondary" small @click="goToProfile">{{ userName }}</v-btn>
                </v-flex>
                 <v-flex>
                    <p class="white--text text-center subheading">{{ userLevel }}</p>
                </v-flex>
            </v-layout>
            <v-divider></v-divider>
            <v-list>
                <v-list-item v-for="item in menuItems" :key="item.text" :to="item.route" exact>
                    <v-list-item-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>
                            {{ item.text }}
                        </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-app-bar :clipped-left="clipped" fixed app color="primary">
            <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
            <v-btn icon @click="$router.push({ path: backPath })">
                <v-icon
                    >mdi-{{
                        `chevron-${miniVariant ? "right" : "left"}`
                    }}</v-icon
                >
            </v-btn>
            <v-toolbar-title v-text="title" />
            <v-spacer />
            <v-btn v-if="Auth" @click="logOut" color="secondary">
                LogOut
                <v-icon right>mdi-logout-variant</v-icon>
            </v-btn>
            <v-btn v-else @click="logIn" color="secondary">
                LogIn
                <v-icon right>mdi-login</v-icon>
            </v-btn>
        </v-app-bar>
        <v-main>
            <nuxt />
        </v-main>
        <v-footer :absolute="!fixed" app color="primary">
            <span
                >&copy; Copy Right VnLottery
                {{ new Date().getFullYear() }}</span
            >
        </v-footer>
    </v-app>
</template>

<script>
import { mapGetters } from 'vuex'
import { removeCookie } from "@/helpers/auth";
import { SERVER_URL } from '@/helpers/constant'
export default {
    data() {
        return {
            clipped: false,
            drawer: false,
            fixed: false,
            miniVariant: false,
            right: true,
            title: "VnLottery",
            menuItems: [
                { icon: 'mdi-view-dashboard', text: 'Dashboard', route: '/admin' },
                { icon: 'mdi-account-supervisor-circle', text: 'User Management', route: '/admin/user' },
            ],
            SERVER_URL,
            backPath: '/'
        };
    },
    computed: {
        ...mapGetters('user', ['Auth']),
        userName () {
            return this.Auth && this.Auth.name !== '' ? this.Auth.name : 'Hello Friends'
        },
        userAvatar () {
            return this.Auth && this.Auth.avatar !== '' ? SERVER_URL + this.Auth.avatar : require('~/assets/avatar/avatar_8.jpg')
        },
        userLevel () {
            if (this.Auth) {
                const { role } = this.Auth
                switch (role) {
                    case 1: return 'Super Admin'
                    case 0: return 'Member'
                }
            } else {
                return 'You are guest!!!'
            }
        }
    },
    watch: {
        '$route' (to, from) {
            this.backPath = from.path
        }
    },
    methods: {
        logOut() {
            this.$store.dispatch("user/userSignOut").then(res => {
                if (res.status === 1) {
                    this.$router.push("/");
                }
            });
        },
        logIn () {
            this.$router.push({ path: '/admin/login' })
        },
        goToProfile () {
            if (this.Auth) {
                this.$router.push({ path: `/admin/user/${this.Auth._id}` })
            }
        }
    }
};
</script>
