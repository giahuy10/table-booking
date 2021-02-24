<template>
  <v-app id="login" class="login-1">
    <v-main>
      <div class="logo-center" xs6 sm8 md4 lg4>
        <img src="/logo2.png"  />
      </div>
      <v-container fluid fill-height>
        <v-layout align-center justify-center>
          <v-layout row align-center justify-center cus_login>
            <div class="bg-total">
              <v-card class="elevation-1 pa-3 w480px">
                <v-card-text>
                  <div class="layout column align-center">
                    <img
                      style="margin-top: -30px"
                      src="/logo3.png"
                     
                    />
                    <h2 class="flex my-4 primary--text1">
                      Table Booking System
                    </h2>
                  </div>
                  <v-form class="input-login">
                    <v-text-field
                      append-icon="person"
                      name="login"
                      label="ID"
                      type="text"
                      v-model="login.email"
                    ></v-text-field>
                    <v-text-field
                      append-icon="lock"
                      name="password"
                      label="Password"
                      id="password"
                      type="password"
                      v-model="login.password"
                      v-on:keyup.enter="handleLogin"
                    ></v-text-field>
                  </v-form>
              
                </v-card-text>
                <v-card-actions>
                  <v-btn
                    block
                    color="primary"
                    @click="handleLogin"
                    :loading="islogging"
                    style="background-color: red !important; height: 40px"
                    >Login</v-btn
                  >
                </v-card-actions>
              </v-card>
            </div>
          </v-layout>
        </v-layout>
      </v-container>
    </v-main>
    
  </v-app>
</template>

<script>
const Cookie = process.client ? require("js-cookie") : undefined;


export default {
  layout: "default",
  data: () => ({
    isAdmin: false,
    msgNotice: "",
    showNoticeModal: 3000,
    islogging: false,
    isloaded: false,
    login: {
      grant_type: "password",
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      email: "",
      password: "",
      remember: "",
      scope: "",
    },

  }),
  mounted: function () {
    let auth = Cookie.get("auth");
    if (auth) {
      this.checkCookie(JSON.parse(auth));
      this.isloaded = false;
    } else {
      this.isloaded = true;
    }
  },
  methods: {
    async handleLogin() {
      if (this.islogging === true) {
        return;
      }
      let err = [];
      if (!this.login.email.trim()) {
        err.push("Please enter ID");
      }
      if (!this.login.password) {
        err.push("Please enter Password");
      }
      if (err.length == 0) {
        this.islogging = true;
        try{
          let res = await this.$repo.auth.login(this.login)
          console.log('res', res)
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('no no no')
      }
    },
    handleLogin2(res) {
      let app = this;
      app.islogging = true;
      app.$store.commit("setAuth", res.data);
      Cookie.set("auth", {
        access_token: res.data.access_token,
      });
    },
  },
};
</script>

