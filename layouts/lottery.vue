<template>
    <v-app style="background-color: #e0e0e0" class="myapp">
        <v-app-bar fixed app color="primary">
            <v-container>
                <v-row>
                    <v-toolbar-title class="d-flex align-center justify-center hidden-sm-and-down custom-hidden">
                        <span class="font-weight-bold">VN</span>
                        LOTTERY
                    </v-toolbar-title>
                    <v-app-bar-nav-icon class="visible-sm" />
                    <div class="d-flex align-center justify-center">
                        <v-btn color="white" class="ml-md-12 mr-2 ml-sm-0 custom-mr" text><v-icon left class="custom-hidden">mdi-heart-pulse</v-icon>XSMB</v-btn>
                        <v-btn color="white" class="mr-2 custom-mr" text><v-icon left class="custom-hidden">mdi-fire</v-icon>XSMN</v-btn>
                        <v-btn color="white" class="mr-2 custom-mr" text><v-icon left class="custom-hidden">mdi-star</v-icon>XSMT</v-btn>
                    </div>
                    <v-spacer class="hidden-sm-and-down"></v-spacer>
                    <span class="d-lg-flex align-center justify-center hidden-md-and-down"><v-icon left>mdi-calendar-month</v-icon>Hôm nay: 10/09/2020</span>
                    <v-spacer class="hidden-md-and-down"></v-spacer>
                    <v-btn color="secondary" class="mx-2 hidden-sm-and-down"><v-icon left>mdi-login</v-icon>Đăng Nhập</v-btn>
                    <v-btn color="accent" class="ml-2 hidden-sm-and-down">Đăng Ký</v-btn>
                </v-row>
            </v-container>
        </v-app-bar>
        <v-main>
            <nuxt />
        </v-main>
    </v-app>
</template>
<script>
export default {
    
}
</script>
<style lang="scss" scoped>
@media (max-width: 490px) {
    .custom-hidden {
        display: none !important;
    }
}
@media (max-width: 320px) {
    .custom-mr {
        margin-right: 2px !important;
    }
}
@media (min-width: 490px) {
    .visible-sm {
        display: none !important;
    }
}
</style>