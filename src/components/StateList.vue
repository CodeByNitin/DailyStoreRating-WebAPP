<template>
<div id="app">
  <v-app id="inspire">
    <v-container fluid>
        <v-layout row wrap>
        <v-flex xs12 class="text-xs-center" mt-5>
            <h1>Please Select State</h1>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 mt-3>
            <blockquote class="blockquote text-xs-center">
            select state from Dropdown, <br>
            after selecting the state please click on next button
            </blockquote>
        </v-flex>
        <v-flex xs12 sm6 offset-sm3 class="text-xs-center" mt-5>
          <v-form ref="form" v-model="valid" lazy-validation>
            <v-select
            :items="stateList"
            v-model="state"
            label="Select the State for proceed further"
            required
            :rules="[v => !!v || 'Please select the State']"
            autocomplete>
            </v-select>
          </v-form>
            <v-btn 
              color="blue darken-1"
              style="color: #FFFFFF"
              @click="selectState">
                Next
              <i class="material-icons">forward</i>
            </v-btn>
        </v-flex>
        </v-layout>
    </v-container>
  </v-app>
</div>
</template>
<script>
import httpClient from "../services/httpClient.js";
export default {
  data() {
    return {
      valid: true,
      stateList: [],
      state: 0
    };
  },
  mounted() {
    httpClient({
      method: "get",
      url: process.env.API_BASE + "/state/"
    }).then(response => {
      response.data.data[0].attributes.forEach(element => {
        this.stateList.push({
          text: element.stateName,
          value: element.stateId,
          selected: true,
          sortable: true
        });
      });
      this.stateList = response.data.data[0].attributes.map(element => {
        return {
          text: element.stateName,
          value: element.stateId,
          selected: true,
          sortable: true
        };
      });
    });
  },
  methods: {
    selectState() {
      if (this.$refs.form.validate()) {
        localStorage.setItem("stateId", this.state);
        this.$router.push({
          name: "StoreList",
          params: { stateId: this.state }
        });
      } else {
        this.$refs.form.validate();
      }
    }
  }
};
</script>
<style>
</style>
