<template>
<!-- TODO: create logic with isActive prop for BottomNavigationItems -->
  <SfBottomNavigation class="navigation-bottom smartphone-only">
    <nuxt-link to="/">
      <SfBottomNavigationItem :class="$route.path == '/' ? 'sf-bottom-navigation__item--active' : null" icon="home" size="20px" label="Home"/>
    </nuxt-link>
    <SfBottomNavigationItem icon="menu" size="20px" label="Menu"/>
    <SfBottomNavigationItem :icon="isStoreChosen ? 'marker_fill' : 'marker'" size="20px" label="Stores" @click="redirectToStoreLocator"/>
    <SfBottomNavigationItem icon="heart" size="20px" label="Wishlist" @click="toggleWishlistSidebar"/>
    <!-- TODO: add logic for label - if on Home then Basket, if on PDC then AddToCart etc. -->
    <SfBottomNavigationItem
      label="Basket"
      icon="add_to_cart"
      @click="toggleCartSidebar"
    >
      <template #icon>
        <SfCircleIcon aria-label="Add to cart">
          <SfIcon
            icon="add_to_cart"
            color="white"
            size="25px"
          />
        </SfCircleIcon>
      </template>
    </SfBottomNavigationItem>
  </SfBottomNavigation>
</template>

<script>
import { SfBottomNavigation, SfIcon, SfCircleIcon } from '@storefront-ui/vue';
import { useUiState } from '~/composables';
export default {
  components: {
    SfBottomNavigation,
    SfIcon,
    SfCircleIcon
  },
  setup(props, { root }) {
    const { toggleCartSidebar, toggleWishlistSidebar, isStoreChosen } = useUiState();
    const redirectToStoreLocator = () => {
      root.$router.push("/storelocator");
    }
    return {
      toggleWishlistSidebar,
      toggleCartSidebar,
      isStoreChosen,
      redirectToStoreLocator,
    };
  }
};
</script>
<style lang="scss" scoped>
.navigation-bottom {
  --bottom-navigation-z-index: 3;
}
</style>