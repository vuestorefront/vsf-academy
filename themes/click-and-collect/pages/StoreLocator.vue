<template>
  <div>
    <div v-if="pageMounted">
      <SfBar 
        title="Pick your store" 
        :back="true" 
        :close="false"
        class="smartphone-only"
        @click:back="$router.push('/')" 
      />
      <SfBreadcrumbs
        :breadcrumbs="breadcrumbs"
        class="breadcrumbs desktop-only"
      />
      <div class="sf-store-locator">
        <SfSearchBar
          placeholder="Find your store by city or zip"
          class="store-locator__search smartphone-only"
          aria-label="Search"
          v-model="searchValue"
        />
        <div class="sf-store-locator__wrapper">
          <div class="sf-store-locator__list desktop-only">
            <SfSearchBar
              placeholder="Find your store by city or zip"
              class="store-locator__search store-locator__search--desktop desktop-only"
              aria-label="Search"
              v-model="searchValue"
            />
            <div class="sf-store-locator__stores desktop-only">
              Stores found: <span>{{ stores.length }}</span>
            </div>
            <SfScrollable
              v-if="!pickedStore"
              maxContentHeight="65vh"
              class="desktop-only"
            >
              <template #view-all>
                <div></div>
              </template>
              <StoreComponent
                v-for="store in stores"
                :key="store.name"
                :distance="store.distance" 
                :picture="store.picture" 
                :storeName="store.storeName" 
                :address="store.address" 
                :openingHours="store.openingHours"
              />
            </SfScrollable>
            <div v-else> 
              <StoreComponent
                :distance="pickedStore.distance" 
                :picture="pickedStore.picture" 
                :storeName="pickedStore.storeName" 
                :address="pickedStore.address"
                :openingHours="pickedStore.openingHours"
                class="modal__store"
              />
              <SfButton 
                class="show-more--desktop sf-button--full-width color-secondary" 
                @click="showMoreStores"
              >
                Show more stores in the area
              </SfButton>
            </div>
          </div>
          <div class="sf-store-locator__map-wrapper" :class="{'mapHidden': openModal && !pickedStore}">
            <GMap
              ref="gMap"
              language="en"
              :center="centerMap"
              :options="gmapOptions"
              :zoom="9"
              @click="openModal = false"
            >
              <GMapMarker
                v-for="(store, key) in stores"
                :key="key"
                :position="{lat: store.geoLocation.coordinates[0], lng: store.geoLocation.coordinates[1]}"
                :options="{icon: '/icons/pin.svg'}"
                @click="showStoreDetails(store)"
              >
              </GMapMarker>
            </GMap>
          </div>
        </div>
      </div>
      <SfBottomModal
        :is-open="openModal"
        transition="sf-collapse-bottom"
        title=""
        class="modal smartphone-only"
      > 
        <div v-if="pickedStore">
          <StoreComponent
            :distance="pickedStore.distance" 
            :picture="pickedStore.picture" 
            :storeName="pickedStore.storeName" 
            :address="pickedStore.address"
            :openingHours="pickedStore.openingHours"
            class="modal__store"
          />
          <SfButton 
            class="show-more--mobile sf-button--full-width color-secondary" 
            @click="showMoreStores"
          >
            Show more stores in the area
          </SfButton>
        </div>
        <SfScrollable
          v-else
          :maxContentHeight="moreStoresMaxHeight"
        >
          <template #view-all>
            <div></div>
          </template>
          <StoreComponent
            v-for="store in stores"
            :key="store.name"
            :distance="store.distance" 
            :picture="store.picture" 
            :storeName="store.storeName" 
            :address="store.address" 
            :openingHours="store.openingHours"
            class="modal__store"
          />
        </SfScrollable>
      </SfBottomModal>
    </div>
    <AppLoader v-else />
  </div>
</template>

<script>
import { ref, computed, onMounted } from '@vue/composition-api';
import StoreComponent from "../components/StoreComponent.vue";
import gmapOptions from "../plugins/googleMapTheme.js";
import AppLoader from "../components/AppLoader.vue";

import { 
  SfButton, 
  SfSearchBar,
  SfScrollable,
  SfBottomModal,
  SfBar,
  SfBreadcrumbs,
} from '@storefront-ui/vue';

export default { 
  name: "StoreLocator",
  components: {
    StoreComponent,
    SfButton,
    SfSearchBar,
    SfScrollable,
    SfBottomModal,
    SfBar,
    SfBreadcrumbs,
    AppLoader,
  },
  layout: "store-locator",
  setup() {
    const breadcrumbs = [
      {
        text: "Click & Collect",
        link: "/"
      },
      {
        text: "Store Locator",
        link: "/storelocator"
      }
    ];
    const searchValue = ref("");
    const pickedStore = ref(undefined);
    const openModal = ref(false);
    const gMap = ref(null);
    const stores = [
        {
          id: "1",
          distance: "1",
          storeName: "Salisbery Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 13:00AM - 11: 00PM",
          geoLocation: {
            coordinates: [44.933076, 15.629058]
          },
        },
        {
          id: "2",
          distance: "12",
          storeName: "2 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 8:00AM - 14: 00PM",
          geoLocation: {
            coordinates: [43.933076, 15.9819]
          },
        },
        {
          id: "3",
          distance: "2",
          storeName: "3 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 2:00AM - 13: 00PM",
          geoLocation: {
            coordinates: [44.933076, 13.9819]
          },
        },
        {
          id: "4",
          distance: "312",
          storeName: "4 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 9:00AM - 19: 00PM",
          geoLocation: {
            coordinates: [44.793300, 19.9819]
          },
        },
        {
          id: "5",
          distance: "124",
          storeName: "5 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 4:00AM - 17: 00PM",
          geoLocation: {
            coordinates: [45.820006, 13.22900]
          },
        },
        {
          id: "6",
          distance: "120",
          storeName: "6 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 12:00AM - 12: 00PM",
          geoLocation: {
            coordinates: [45.09906, 12.22900]
          },
        },
        {
          id: "7",
          distance: "1",
          storeName: "7 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 1:00AM - 11: 00PM",
           geoLocation: {
            coordinates: [44.00006, 19.22900]
          },
        },
        {
          id: "8",
          distance: "12",
          storeName: "8 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 10:00AM - 03: 00PM",
           geoLocation: {
            coordinates: [44.00006, 20.22900]
          },
        },
        {
          id: "9",
          distance: "2",
          storeName: "9 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 5:00AM - 16: 00PM",
           geoLocation: {
            coordinates: [45.00006, 18.22900]
          },
        },
        {
          id: "10",
          distance: "312",
          storeName: "10 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 4:00AM - 11: 00PM",
           geoLocation: {
            coordinates: [45.00006, 20.22900]
          },
        },
        {
          id: "11",
          distance: "124",
          storeName: "11 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Sun 7:00AM - 10: 00PM",
           geoLocation: {
            coordinates: [41.00006, 17.22900]
          },
        },
        {
          id: "12",
          distance: "120",
          storeName: "12 Store",
          address: "300 Salisbury Ave, Spencer, NC - 28159",
          openingHours: "Mon-Fri 2:00AM - 19: 00PM",
           geoLocation: {
            coordinates: [43.006, 19.2770]
          },
        },
    ];
    const pageMounted = ref(false);

    const centerMap = computed(() => {
      return {
        lat: pickedStore.value ? pickedStore.value.geoLocation.coordinates[0] : stores[0].geoLocation.coordinates[0],
        lng: pickedStore.value ? pickedStore.value.geoLocation.coordinates[1] : stores[0].geoLocation.coordinates[1]
      }
    })

    const showStore = (store) => {
      pickedStore.value = store;
      openModal.value = true;
    };

    const showMoreStores = () => {
      pickedStore.value = undefined;
      gMap.value.map.setZoom(8)
    }

    const showStoreDetails = (store) => {
      showStore(store); 
      gMap.value.map.panTo({ 
        lat: store.geoLocation.coordinates[0], 
        lng: store.geoLocation.coordinates[1] 
      }); 
      gMap.value.map.setZoom(12);
    }

    const moreStoresMaxHeight = computed(() => {
      if (typeof window != 'undefined' && window.document) {
        return window.innerHeight > 660 ? '65vh' : '50vh';
      }
    });

    onMounted(() => {
      pageMounted.value = true;
    })

    return {
      breadcrumbs,
      searchValue,
      gmapOptions: gmapOptions(),
      pickedStore,
      stores,
      openModal,
      showStore,
      gMap,
      showMoreStores,
      showStoreDetails,
      centerMap,
      moreStoresMaxHeight,
      pageMounted
    }
  },
};
</script>

<style lang="scss">
.breadcrumbs {
  margin: var(--spacer-base) 0 0;
}
.store-locator{
  &__search{
    margin: var(--spacer-sm);
    &--desktop  {
      margin: var(--spacer-xl) 0;
      width: 100%;
    }
  }
}
.GMap__Wrapper {
  height: 65vh;
  @include for-desktop {
    height: 80vh;
  }
}
.modal {
  &__store {
    margin: 0 var(--spacer-sm) 0;
  }
}
.sf-bottom-modal {
  background-color: var(--c-white);
}
.show-more {
  &--mobile {
    width: calc(100% - 32px);
    margin: 0 auto var(--spacer-lg);
  }
  &--desktop {
    width: 100%;
    margin-top: var(--spacer-xl);
  }
}
.sf-bottom-modal__overlay, .sf-bottom-modal__cancel {
  display: none;
}
.mapHidden {
  @include for-mobile {
    display: none;
  }
}

</style>