<template>
  <div>
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <AppHeader />
    </LazyHydrate>

    <div id="store-locator">
      <nuxt :key="$route.fullPath"/>

      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <AppFooter class="desktop-only"/>
    </LazyHydrate>
  </div>
</template>

<script>
import AppHeader from '~/components/AppHeader.vue';
import AppFooter from '~/components/AppFooter.vue';
import TopBar from '~/components/TopBar.vue';
import CartSidebar from '~/components/CartSidebar.vue';
import WishlistSidebar from '~/components/WishlistSidebar.vue';
import LoginModal from '~/components/LoginModal.vue';
import LazyHydrate from 'vue-lazy-hydration';
import Notification from '~/components/Notification';

export default {
  name: 'store-locator',
  components: {
    LazyHydrate,
    TopBar,
    AppHeader,
    AppFooter,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification
  }
};
</script>

<style lang="scss">
@import "~@storefront-ui/vue/styles";
#store-locator {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
    min-height: 85vh;
  }
}

.no-scroll {
  overflow: hidden;
  height: 100vh;
}

// Reset CSS
html {
  width: auto;
  @include for-mobile {
    overflow-x: hidden;
  }
}
body {
  overflow-x: hidden;
  color: var(--c-text);
  font-size: var(--font-size--base);
  font-family: var(--font-family--primary);
  margin: 0;
  padding: 0;
}
a {
  text-decoration: none;
  color: var(--c-link);
  &.sf-link.sf-button {
    &:hover {
      color: var(--c-white);
      --button-background: var(--c-primary) radial-gradient(circle, transparent 1%, var(--c-primary-variant) 1%) center/15000%;
    }
    &:active {
      --button-background: var(--c-primary) radial-gradient(circle, transparent 40%, var(--c-primary-variant) 1%) center/15000%;
    }
  }
}
h1 {
  font-family: var(--font-family--secondary);
  font-size: var(--h1-font-size);
  line-height: 1.6;
  margin: 0;
}
h2 {
  font-family: var(--font-family--secondary);
  font-size: var(--h2-font-size);
  line-height: 1.6;
  margin: 0;
}
h3 {
  font-family: var(--font-family--secondary);
  font-size: var(--h3-font-size);
  line-height: 1.6;
  margin: 0;
}
h4 {
  font-family: var(--font-family--secondary);
  font-size: var(--h4-font-size);
  line-height: 1.6;
  margin: 0;
}
</style>
