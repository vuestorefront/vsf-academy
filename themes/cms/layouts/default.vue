<template>
  <div>
    <RenderContent v-if="styleGuide.length" :content="styleGuide" />
    <LazyHydrate when-visible>
      <TopBar class="desktop-only" />
    </LazyHydrate>
    <LazyHydrate when-idle>
      <RenderContent v-if="header.length" :content="header" />
      <AppHeader v-else />
    </LazyHydrate>

    <div id="layout">
      <nuxt :key="$route.fullPath" />

      <LazyHydrate when-visible>
        <BottomNavigation />
      </LazyHydrate>
      <CartSidebar />
      <WishlistSidebar />
      <LoginModal />
      <Notification />
    </div>
    <LazyHydrate when-visible>
      <RenderContent v-if="footer.length" :content="footer" />
      <AppFooter v-else />
    </LazyHydrate>
  </div>
</template>

<script>
import BottomNavigation from '~/components/BottomNavigation.vue'
import TopBar from '~/components/TopBar.vue'
import CartSidebar from '~/components/CartSidebar.vue'
import WishlistSidebar from '~/components/WishlistSidebar.vue'
import LoginModal from '~/components/LoginModal.vue'
import LazyHydrate from 'vue-lazy-hydration'
import Notification from '~/components/Notification'
import AppHeader from '~/components/AppHeader'
import AppFooter from '~/components/AppFooter'

import { useContent } from '<%= options.cms.source %>'
import { onSSR } from '@vue-storefront/core'
import { onMounted, computed } from '@vue/composition-api'

export default {
  components: {
    AppHeader,
    AppFooter,
    LazyHydrate,
    TopBar,
    BottomNavigation,
    CartSidebar,
    WishlistSidebar,
    LoginModal,
    Notification,
  },
  setup(props, context) {
    const { search: searchStyleGuide, content: styleGuide } =
      useContent('style-guide')
    const { search: searchLayout, content: layout } = useContent('layout')

    onSSR(async () => {
      await searchStyleGuide({
        custom: {
          type: 'styleGuide',
          field: 'title',
          value: 'Page Style Guide',
        },
      })

      await searchLayout({
        custom: {
          type: 'layout',
          field: 'title',
          value: 'cms-layout',
        },
      })
    })

    <%- include(`ejs/${options.cms.name}/get-layout-part`); %>

    return {
      styleGuide,
      header: getLayoutPart('header'),
      footer: getLayoutPart('footer'),
    }
  },
}
</script>

<style lang="scss">
@import '~@storefront-ui/vue/styles';

#layout {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1240px;
    margin: auto;
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
  &:hover {
    color: var(--c-link-hover);
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
