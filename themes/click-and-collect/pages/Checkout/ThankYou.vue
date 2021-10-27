<template>
  <div>
    <div class="thank-you">
      <SfHeading title="Thank you for your order!" :level="1" class="thank-you__heading">
        <template #description>
          <p class="thank-you__heading-description">
            Your order number: {{order.number}}
          </p>
        </template>
      </SfHeading> 
      <p v-if="timerFinished" class="thank-you__timer-header">
        {{timerHeader.finished}}
      </p>
      <p v-else class="thank-you__timer-header">
        {{timerHeader.running}}        
      </p>
      <SfTimer @timeUp="onTimesUp" :timeLimit="timeLimit" class="thank-you__timer"/>   
      <StoreComponent class="thank-you__store-component" :storeName="storeName" :picture="picture" :address="address" :openingHours="openingHours" :distance="distance"/>        
      <SfButton class="thank-you__button" :link="destinationQuery" target="_blank" >
        guide me there
      </SfButton>
      <SfDivider class="thank-you__divider" />  
    </div>
  </div>
</template>
<script>
import { computed, ref } from '@vue/composition-api'
import { SfHeading, SfButton, SfDivider } from "@storefront-ui/vue";
import SfTimer from "../../components/SfTimer";
import StoreComponent from "../../components/StoreComponent";

export default {
  name: 'ThankYou',
  layout: 'home',
  components: {
    SfHeading, 
    SfButton,
    SfDivider,
    SfTimer,
    StoreComponent,
  },

  props: {
    timerHeader: {
      type: Object,
      default: () => {
        return {
          running: "Your order will be ready to collect in:",
          finished: "Your order is ready for pickup. Let them now!" 
        }
      }
    },
    storeName: {
      type: String,
      default: "Salisbery Store",
    },
    picture: {
      type: String,
      default: "/store-component/store.svg",
    },
    address: {
      type: String,
      default: "300 Salisbury Ave, Spencer, NC - 28159",
    },
    openingHours: {
      type: String,
      default: "Mon-Sun 5:00AM - 11: 00PM"
    },
    distance: {
      type: String,
      default: "200"
    },
    timeLimit: {
      type: Number,
      default: 10,
    },
    geoLocation: {
      type: Object,
      default: () => {
        return {
          coordinates: [44.933076, 15.629058]
        }
      }      
    }, 
    destinationPlaceId: {
      type: String,
      default: ""
    }, 
  },
  setup(props, { root }) {
    const timerFinished = ref(false);

    const onTimesUp = () => {
      timerFinished.value = true
    };

    const destinationQuery = computed(() => {
      return !!props.destinationPlaceId ? `https://www.google.com/maps/dir/?api=1&origin&destination=${props.geoLocation.coordinates[0]},${props.geoLocation.coordinates[1]}&destination_place_id=${props.destinationPlaceId}&dir_action=navigate` : `https://www.google.com/maps/dir/?api=1&origin&destination=${props.geoLocation.coordinates[0]},${props.geoLocation.coordinates[1]}&dir_action=navigate` ;
    })
    return {
      timerFinished,
      onTimesUp,
      destinationQuery,
      order: {
        number: `#${root.$route.query.order}`
      }
    }
  }
}
</script>
<style scoped lang="scss">
  .thank-you {
    display: flex;
    flex-direction: column;
    align-items: center;  
    
    margin: 0 var(--spacer-sm);
    &__heading {      
      --heading-title-color: var(--c-primary);
      --heading-description-color: var(--c-secondary-variant);
      display: flex;
      flex-direction: column;
      margin: var(--spacer-xl) 0 52px 0;
      font-size: var(--h5-font-size);
    }    
    &__timer {  
      display: flex;
      flex-direction: column; 
      align-items: center;
      &-header {
        text-align: center;
        margin: 0 0 56px 0;
        font-size: var(--h3-font-size);
        font-weight: var(--font-weight--bold);        
        font-family: var(--font-family--secondary);
      } 
    }
    &__store-component {
      display: flex;
      justify-content: space-between;
      width: 100%;
      margin: var(--spacer-xl) 0 var(--spacer-base) 0; 
      border-width: 0;
      ::v-deep .sf-store__distance {
        display: flex;
        flex: 0;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        order: 1;
      }  
      ::v-deep .sf-store__info {  
        display: flex;
        flex-direction: column;
        align-items: flex-start;
      } 
      ::v-deep .sf-store__pick-store {
        display: none;
      }
      ::v-deep .sf-image:not(.sf-image-loaded) {
        opacity: 1;
        position: relative;
      }
    }
    &__button {
      width: 100%;
      margin: 0 0 var(--spacer-sm) 0;       
      &:active {
        --button-box-shadow: none;
        --button-background: var(--c-primary) radial-gradient(circle, transparent 40%, var(--c-primary-variant) 1%) center/15000%;
        --button-transition: background 0s ;
        --button-text-decoration: underline;
        background-size: 100%;
      }
    }
    &__divider {
      width: 100%;
      margin: 0 0 var(--spacer-sm) 0;
    }
    @include for-desktop {
      max-width: 38.125rem;
      margin: 0 auto;
      ::v-deep .sf-store__button {
        display: none;
      }
      &__timer-header {
        font-weight: var(--font-weight--semibold);
      } 
      &__store-component {
        padding: 0 0 var(--spacer-sm) 0;
        border-width: 0 0 1px 0;
      }
       &__divider {
        display: none;
      }
      &__button {
        max-width: 17.5rem;
      }
    }
  } 
</style>