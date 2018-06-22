<template>
<div id="app">
  <v-app id="inspire">
      <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center" mt-5>
        <h1>Welcome to Daily Store Rating</h1>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 mt-3>
        <blockquote class="blockquote text-xs-center">
          Give your important opnion, <br>
          your opnion valuable for us
        </blockquote>
      </v-flex>
      <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
        <g-signin-button
          :params="googleSignInParams"
          @success="onSignInSuccess"
          @error="onSignInError">
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDk2LjgyOCA5Ni44MjciIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDk2LjgyOCA5Ni44Mjc7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8Zz4KCQk8cGF0aCBkPSJNNjIuNjE3LDBIMzkuNTI1Yy0xMC4yOSwwLTE3LjQxMywyLjI1Ni0yMy44MjQsNy41NTJjLTUuMDQyLDQuMzUtOC4wNTEsMTAuNjcyLTguMDUxLDE2LjkxMiAgICBjMCw5LjYxNCw3LjMzLDE5LjgzMSwyMC45MTMsMTkuODMxYzEuMzA2LDAsMi43NTItMC4xMzQsNC4wMjgtMC4yNTNsLTAuMTg4LDAuNDU3Yy0wLjU0NiwxLjMwOC0xLjA2MywyLjU0Mi0xLjA2Myw0LjQ2OCAgICBjMCwzLjc1LDEuODA5LDYuMDYzLDMuNTU4LDguMjk4bDAuMjIsMC4yODNsLTAuMzkxLDAuMDI3Yy01LjYwOSwwLjM4NC0xNi4wNDksMS4xLTIzLjY3NSw1Ljc4NyAgICBjLTkuMDA3LDUuMzU1LTkuNzA3LDEzLjE0NS05LjcwNywxNS40MDRjMCw4Ljk4OCw4LjM3NiwxOC4wNiwyNy4wOSwxOC4wNmMyMS43NiwwLDMzLjE0Ni0xMi4wMDUsMzMuMTQ2LTIzLjg2MyAgICBjMC4wMDItOC43NzEtNS4xNDEtMTMuMTAxLTEwLjYtMTcuNjk4bC00LjYwNS0zLjU4MmMtMS40MjMtMS4xNzktMy4xOTUtMi42NDYtMy4xOTUtNS4zNjRjMC0yLjY3MiwxLjc3Mi00LjQzNiwzLjMzNi01Ljk5MiAgICBsMC4xNjMtMC4xNjVjNC45NzMtMy45MTcsMTAuNjA5LTguMzU4LDEwLjYwOS0xNy45NjRjMC05LjY1OC02LjAzNS0xNC42NDktOC45MzctMTcuMDQ4aDcuNjYzYzAuMDk0LDAsMC4xODgtMC4wMjYsMC4yNjYtMC4wNzcgICAgbDYuNjAxLTQuMTVjMC4xODgtMC4xMTksMC4yNzYtMC4zNDgsMC4yMTQtMC41NjJDNjMuMDM3LDAuMTQ3LDYyLjgzOSwwLDYyLjYxNywweiBNMzQuNjE0LDkxLjUzNSAgICBjLTEzLjI2NCwwLTIyLjE3Ni02LjE5NS0yMi4xNzYtMTUuNDE2YzAtNi4wMjEsMy42NDUtMTAuMzk2LDEwLjgyNC0xMi45OTdjNS43NDktMS45MzUsMTMuMTctMi4wMzEsMTMuMjQ0LTIuMDMxICAgIGMxLjI1NywwLDEuODg5LDAsMi44OTMsMC4xMjZjOS4yODEsNi42MDUsMTMuNzQzLDEwLjA3MywxMy43NDMsMTYuNjc4QzUzLjE0MSw4Ni4zMDksNDYuMDQxLDkxLjUzNSwzNC42MTQsOTEuNTM1eiAgICAgTTM0LjQ4OSw0MC43NTZjLTExLjEzMiwwLTE1Ljc1Mi0xNC42MzMtMTUuNzUyLTIyLjQ2OGMwLTMuOTg0LDAuOTA2LTcuMDQyLDIuNzctOS4zNTFjMi4wMjMtMi41MzEsNS40ODctNC4xNjYsOC44MjUtNC4xNjYgICAgYzEwLjIyMSwwLDE1Ljg3MywxMy43MzgsMTUuODczLDIzLjIzM2MwLDEuNDk4LDAsNi4wNTUtMy4xNDgsOS4yMkM0MC45NCwzOS4zMzcsMzcuNDk3LDQwLjc1NiwzNC40ODksNDAuNzU2eiIgZmlsbD0iIzAwMDAwMCIvPgoJCTxwYXRoIGQ9Ik05NC45ODIsNDUuMjIzSDgyLjgxNFYzMy4wOThjMC0wLjI3Ni0wLjIyNS0wLjUtMC41LTAuNUg3Ny4wOGMtMC4yNzYsMC0wLjUsMC4yMjQtMC41LDAuNXYxMi4xMjVINjQuNDczICAgIGMtMC4yNzYsMC0wLjUsMC4yMjQtMC41LDAuNXY1LjMwNGMwLDAuMjc1LDAuMjI0LDAuNSwwLjUsMC41SDc2LjU4VjYzLjczYzAsMC4yNzUsMC4yMjQsMC41LDAuNSwwLjVoNS4yMzQgICAgYzAuMjc1LDAsMC41LTAuMjI1LDAuNS0wLjVWNTEuNTI1aDEyLjE2OGMwLjI3NiwwLDAuNS0wLjIyMywwLjUtMC41di01LjMwMkM5NS40ODIsNDUuNDQ2LDk1LjI1OSw0NS4yMjMsOTQuOTgyLDQ1LjIyM3oiIGZpbGw9IiMwMDAwMDAiLz4KCTwvZz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8Zz4KPC9nPgo8L3N2Zz4K" />
          Sign In with Google
        </g-signin-button>
        <span class="f-signin-button">
          <img src="data:image/svg+xml;utf8;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iaXNvLTg4NTktMSI/Pgo8IS0tIEdlbmVyYXRvcjogQWRvYmUgSWxsdXN0cmF0b3IgMTYuMC4wLCBTVkcgRXhwb3J0IFBsdWctSW4gLiBTVkcgVmVyc2lvbjogNi4wMCBCdWlsZCAwKSAgLS0+CjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgdmVyc2lvbj0iMS4xIiBpZD0iQ2FwYV8xIiB4PSIwcHgiIHk9IjBweCIgd2lkdGg9IjE2cHgiIGhlaWdodD0iMTZweCIgdmlld0JveD0iMCAwIDUxMCA1MTAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDUxMCA1MTA7IiB4bWw6c3BhY2U9InByZXNlcnZlIj4KPGc+Cgk8ZyBpZD0icG9zdC1mYWNlYm9vayI+CgkJPHBhdGggZD0iTTQ1OSwwSDUxQzIyLjk1LDAsMCwyMi45NSwwLDUxdjQwOGMwLDI4LjA1LDIyLjk1LDUxLDUxLDUxaDQwOGMyOC4wNSwwLDUxLTIyLjk1LDUxLTUxVjUxQzUxMCwyMi45NSw0ODcuMDUsMCw0NTksMHogICAgIE00MzMuNSw1MXY3Ni41aC01MWMtMTUuMywwLTI1LjUsMTAuMi0yNS41LDI1LjV2NTFoNzYuNXY3Ni41SDM1N1Y0NTloLTc2LjVWMjgwLjVoLTUxVjIwNGg1MXYtNjMuNzUgICAgQzI4MC41LDkxLjgsMzIxLjMsNTEsMzY5Ljc1LDUxSDQzMy41eiIgZmlsbD0iIzAwMDAwMCIvPgoJPC9nPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+CjxnPgo8L2c+Cjwvc3ZnPgo=" /> &nbsp; 
          Sign In with Facebook
        </span>
      </v-flex>
    </v-layout>
  </v-container>
  <v-snackbar
        :timeout="timeout"
        :top="y === 'top'"
        :color="'error'"
        :bottom="y === 'bottom'"
        :right="x === 'right'"
        :left="x === 'left'"
        v-model="snackbar">
        {{ text }}
        <v-btn flat color="black" @click.native="snackbar = false">Close</v-btn>
  </v-snackbar>
  </v-app>
</div>
</template>
<script>
import httpClient from "../services/httpClient.js";
export default {
  data() {
    return {
      /**
       * The Auth2 parameters, as seen on
       * https://developers.google.com/identity/sign-in/web/reference#gapiauth2initparams.
       * As the very least, a valid client_id must present.
       * @type {Object}
       */
      googleSignInParams: {
        client_id: process.env.GOOGLE_CLIENT_ID
      },
      snackbar: false,
      y: "top",
      x: "right",
      timeout: 6000,
      text: ""
    };
  },
  methods: {
    onSignInSuccess(googleUser) {
      // `googleUser` is the GoogleUser object that represents the just-signed-in user.
      // See https://developers.google.com/identity/sign-in/web/reference#users
      const payload = JSON.stringify({
        data: {
          attributes: {
            id: googleUser.getBasicProfile().Eea,
            name: googleUser.getBasicProfile().ig,
            email: googleUser.getBasicProfile().U3,
            typeOfLogin: "Google",
            accessToken: googleUser.Zi.access_token,
            imageUrl: googleUser.getBasicProfile().Paa
          }
        }
      });
      httpClient({
        method: "post",
        url: process.env.API_BASE + "/auth/login",
        data: payload
      }).then(response => {
        if (response.status === 200) {
          localStorage.setItem(
            "Token",
            response.data.data[0].attributes.access_token
          );
          this.$router.push({
            name: "StateList",
            params: { resource: "Test" }
          });
        } else {
          this.snackbar = true;
          this.text = "Error occur!, please try again after some time";
        }
      });
    },
    onSignInError(error) {
      //Error handling and showing pop-up
      this.snackbar = true;
      this.text = error.error;
    }
  }
};
</script>
<style scoped>
.g-signin-button {
  /* This is where you control how the button looks.*/
  display: inline-block;
  padding: 9px 18px;
  border-radius: 3px;
  background-color: #d32f2f;
  color: #fff;
  box-shadow: 0 3px 0 #c62828;
  cursor: pointer;
  margin: 2%;
  width: 220px;
}
.f-signin-button {
  /* This is where you control how the button looks.*/
  display: inline-block;
  padding: 9px 18px;
  border-radius: 3px;
  background-color: #3c82f7;
  color: #fff;
  box-shadow: 0 3px 0 #0f69ff;
  cursor: pointer;
  margin: 2%;
  width: 220px;
}
</style>
