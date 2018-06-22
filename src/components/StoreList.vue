<template>
<v-app>
		<div id="stateList">
			<div v-show="isLoading" class="loading">
				<div class="loading-icon"></div>
			</div>
			<div class="emptyList" v-show="emptyList">
				<v-container fluid>
					<v-layout row wrap>
						<v-flex xs12 class="text-xs-center" mt-5>
							<h1>Welcome to Daily Store Rating</h1>
						</v-flex>
						<v-flex xs12 sm6 offset-sm3 mt-3>
							<blockquote class="blockquote text-xs-center">
								Right now there is no store<br>Available for Rating
							</blockquote>
						</v-flex>
					</v-layout>
				</v-container>
			</div>
			<div class="card-container">
				<card v-for="(card, index) in cards.data" :key="index"
					v-bind:current="index === cards.index"
					v-bind:fullName="card.name"
					v-bind:picture="card.picture"
					v-bind:storeId="card.storeId"
					v-bind:approved="card.approved"
					v-on:draggedThreshold="setApproval"
          v-on:updateSnackbar="showSnackbar">
				</card>
			</div>
        <v-snackbar
          :timeout="timeout"
          :top="y === 'top'"
          :color="'success'"
          :bottom="y === 'bottom'"
          :right="x === 'right'"
          :left="x === 'left'"
          v-model="snackbar">
          {{ text }}
          <v-btn flat color="black" @click.native="snackbar = false">Close</v-btn>
        </v-snackbar>
		</div>
</v-app>
</template>
<script>
import httpClient from "../services/httpClient.js";
import card from "./stateCard";
export default {
  data: function() {
    return {
      isLoading: true, // Toggles the loading overlay
      cards: {
        data: null, // Array for card data
        index: 0, // Current index in the cards.data array
        max: 10 // Max cards to show in each stack
      },
      emptyList: false,
      snackbar: false,
      y: "top",
      x: "right",
      timeout: 3000,
      text: "Thank you, we noted your rating!"
    };
  },
  components: {
    card
  },
  methods: {
    showSnackbar: function(value) {
      this.snackbar = value
    },
    getData: function() {
      // this.show = false
      this.isLoading = true;
      this.cards.data = null;
      const self = this;
      //fetching store data according stateId
      httpClient({
        method: "get",
        url:
          process.env.API_BASE +
          "/store?stateId=" +
          localStorage.getItem("stateId")
      }).then(res => {
        const response = res.data.data[0].attributes;
        const data = response.map(function(object) {
          /*
						Construct a new array with objects containing only
						the relevent data from the original response data
					*/
          return {
            name: object.storeName,
            picture:
              "https://im-cdn.com/assets/images/online-store/online-store-header.51d264eff63b.png",
            storeId: object.storeId,
            approved: null
          };
        });
        setTimeout(function() {
          self.cards.data = data;
          self.cards.index = 0;
          self.isLoading = false;
          if (self.cards.data.length === 0) {
            self.emptyList = true;
          }
        }, 500);
      });
    },
    setApproval: function(approval) {
      /*
				Change approval value for current card, and request new data
				if at the end of the card array
			*/

      this.cards.data[this.cards.index].approved = approval;
      this.cards.index++;

      if (this.cards.index >= this.cards.data.length) {
        this.getData();
      }
    }
  },
  mounted: function() {
    this.getData();
  }
};
</script>
<style lang="scss">
/* CONSTANTS */

$cardsTotal: 3;
$cardsWidth: 420px;
$cardsHeight: 550px;
$cardsPositionOffset: 10px;
$cardsScaleOffset: 0.02;

/* COLOURS */

$colour-white: #ffffff;
$colour-orange: #f0a435;
$colour-grey: #6e6e6e;
$colour-text: #444444;
$colour-background: #f3f3f3;

/* EXTENDS */

%backgroundContain {
  background: center center no-repeat transparent;
  background-size: contain;
}

.card-container {
  position: relative;
  top: 50%;
  margin: 0 auto 0 auto;
  width: $cardsWidth;
  // height: $cardsHeight + ($cardsPositionOffset * ($cardsTotal - 1));
  transform: translateY(-50%);
}

/* LOADING */

$loadingSize: 125px;

%loadingPosition {
  position: absolute;
  left: 50%;
  top: 50%;
  margin-left: -($loadingSize / 2);
  margin-top: -($loadingSize / 2);
}

%loadingBorder {
  width: $loadingSize;
  height: $loadingSize;
  border-radius: 50%;
  border: 4px solid $colour-white;
}

.loading {
  z-index: 10;
  position: fixed;
  width: 100%;
  height: 100%;
  background: rgba($colour-orange, 0.5);
}

.loading > .loading-icon {
  width: $loadingSize;
  height: $loadingSize;
  @extend %loadingPosition;
}

.loading > .loading-icon:before,
.loading > .loading-icon:after {
  content: "";
  display: block;
  @extend %loadingPosition;
  @extend %loadingBorder;
}

.loading > .loading-icon:before {
  z-index: 0;
  animation: 1s pulse infinite linear;
}

.loading > .loading-icon:after {
  z-index: 10;
  background: url("https://cdn2.iconfinder.com/data/icons/shopping-online-e-commerce-store/512/store_pin_shop_location-512.png")
    center center no-repeat #ffffff;
  background-size: cover;
}

@-webkit-keyframes pulse {
  0% {
    opacity: 0;
    -webkit-transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -webkit-transform: scale(1.5);
  }
}

@-moz-keyframes pulse {
  0% {
    opacity: 0;
    -moz-transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -moz-transform: scale(1.5);
  }
}

@-ms-keyframes pulse {
  0% {
    opacity: 0;
    -ms-transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -ms-transform: scale(1.5);
  }
}

@-o-keyframes pulse {
  0% {
    opacity: 0;
    -o-transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    -o-transform: scale(1.5);
  }
}

@keyframes pulse {
  0% {
    opacity: 0;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0;
    transform: scale(1.5);
  }
}

/* CARD */

$defaultTranslation: $cardsPositionOffset * $cardsTotal;
$defaultScale: 1 - ($cardsScaleOffset * $cardsTotal);

.card {
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  left: 0;
  top: 0;
  margin-top: 10%;
  position: absolute;
  padding: 15px 15px 30px 15px;
  width: 420px;
  height: $cardsHeight;
  border-radius: 8px;
  background: $colour-white;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transform: translateY($defaultTranslation) scale($defaultScale);
  transform-origin: 50%, 100%;
  will-change: transform, opacity;
}

/*
	Cascade the cards by translation and scale based on
	their nth-child index
*/

@for $i from 1 through $cardsTotal {
  $index: $i - 1;
  $translation: $cardsPositionOffset * $index;
  $scale: 1 - ($cardsScaleOffset * $index);

  .card:nth-child(#{$i}) {
    opacity: 1;
    z-index: $cardsTotal - $index;
    transform: translateY($translation) scale($scale);
  }
}

.card.current {
  pointer-events: auto;
}

.card.animated {
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.card > .image {
  margin: 0 auto 30px 0;
  width: 420px - (15px * 2);
  height: 320px - (15px * 2);
  @extend %backgroundContain;
}

$imageIconSize: 200px;

.card > .image > .image-icon {
  position: relative;
  left: 50%;
  top: 50%;
  width: $imageIconSize;
  height: $imageIconSize;
  transform: translateX(-50%) translateY(-50%);
  background: center center no-repeat transparent;
  background-size: contain;
}

.card > .image > .image-icon.approve {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/icon-approve.svg");
}

.card > .image > .image-icon.reject {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/icon-reject.svg");
}

.card > .name {
  margin: 0 auto 30px 0;
  display: block;
  font-size: 24px;
  line-height: 24px;
  text-align: center;
  text-transform: capitalize;
}

$starSize: 24px;
$starSpacing: $starSize;
$starTotal: 7;

.card > .stars {
  margin: 0 auto 0 auto;
  width: ($starSize * $starTotal) + ($starSpacing * ($starTotal - 1));
}

.card > .stars:after {
  content: "";
  display: table;
  clear: both;
}

.card > .stars > .star-active,
.card > .stars > .star-inactive {
  float: left;
  margin-right: $starSpacing;
  width: $starSize;
  height: $starSize;
  @extend %backgroundContain;
}

.card > .stars > .star-active:last-child,
.card > .stars > .star-inactive:last-child {
  margin-right: 0;
}

.card > .stars > .star-active {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/star-active.svg");
}

.card > .stars > .star-inactive {
  background-image: url("https://s3-us-west-2.amazonaws.com/s.cdpn.io/617753/star-inactive.svg");
}
.card > .stars {
  color: #ffffff;
}
.emptyList {
  margin-top: 10%;
}
</style>

