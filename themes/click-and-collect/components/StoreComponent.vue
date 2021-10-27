<template>
   <div class="sf-store">
    <div class="sf-store__distance">
      <div>
        <span class="sf-store__kilometers">{{ distance }}km</span> 
        <span>away</span>
      </div>
      <SfButton 
        class="sf-store__button desktop-only"
        @click="pickStore"
      >
        {{ buttonText }}
      </SfButton>
    </div>
    <SfImage :src="picture" :alt="`${storeName} picture`" />
    <div class="sf-store__info">
      <div class="sf-store__heading">
        <div class="sf-store__name">
          {{ storeName }}
        </div>
      </div>
      <div class="sf-store__address">
        {{ address }}
      </div>
      <div class="sf-store__hours">
        <div>
          <div>Opening hours</div>
            {{ openingHours }}
        </div>
      </div>
    </div>
    <SfButton 
      class="sf-store__pick-store sf-button--full-width smartphone-only"
      @click="pickStore"
    >
      {{ buttonText }}
    </SfButton>
  </div>
</template>
<script>
import { SfButton, SfImage } from '@storefront-ui/vue';
import { useUiState } from '~/composables';

export default {
  name: 'StoreComponent',
  props: {
    distance: {
      type: String,
      required: true,
    }, 
    picture: {
      type: String,
      default: "/icons/store.svg",
    },
    storeName: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    openingHours: {
      type: String,
      required: true,
    },
    buttonText: {
      type: String,
      default: "Pick this store"
    }
  },
  components: {
    SfImage,
    SfButton
  },
  setup(props, { root }) {
    const { chooseStore } = useUiState();
    const pickStore = () => {
      chooseStore();
      root.$router.push(`/${props.storeName}`);
    }
    return {
      pickStore,
    }
  }
};
</script>

<style lang="scss" scoped>
.sf-store {
  --store-padding: 0 0 var(--spacer-xs);
  &__name {
    margin-bottom: var(--spacer-sm);
  }
  &__distance {
    display: flex;
    justify-content: flex-end;
    margin: var(--spacer-sm) 0 0;
  }
  &__kilometers {
    font-weight: var(--font-weight--semibold);;
  }
  &__hours {
    text-transform: uppercase;
    font-family: var(--font-family--secondary);
    font-size: var(--font-size--xs);
    margin-bottom: var(--spacer-sm);
  }
  &__address {
    margin: 0 0 var(--spacer-xs);
  }
  &__info {
    margin-left: var(--spacer-xs);
    width: 70%;
  }
  &__pick-store {
    width: 100%;
  }
  @include for-desktop {
    margin-top: var(--spacer-sm);
    &__info {
      margin-left: var(--spacer-sm);
      width: unset;
    }
    &__distance {
      flex-direction: column;
      justify-content: space-between;
      align-items: flex-end;
      margin: 0;
    }
    &__kilometers {
      font-weight: var(--font-weight--normal);
    }
    &__button {
      max-width: 10.625rem;
      margin: var(--spacer-sm) 0;
    }
  }
}
</style>
