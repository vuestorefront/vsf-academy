<template>
  <div id="home">
    <LazyHydrate never>
      <SfBanner
        class="main-banner"
        :title="banner.title"
        :subtitle="banner.subtitle"
        :description="banner.description"
        :button-text="banner.buttonText"
        :image="banner.image"
        :link="banner.link"
      />
    </LazyHydrate>
  </div>
</template>
<script>
import { SfBanner } from '@storefront-ui/vue';
import { computed } from '@vue/composition-api';
import LazyHydrate from 'vue-lazy-hydration';

export default {
  name: 'Home',
  layout: 'home',
  components: {
    SfBanner,
    LazyHydrate
  },
  setup() {
    const banner = computed(() => ({
      subtitle: 'Welcome to',
      title: 'Click and Collect!',
      description: '',
      buttonText: 'Pick your store',
      image: {
        mobile: '/homepage/banner--mobile.webp',
        desktop: '/homepage/banner--desktop.webp'
      },
      link: '/storelocator'
    }))

    return {
      banner,
    }
  }
};
</script>

<style lang="scss" scoped>
.main-banner {
  min-height: var(--banner-height, 45rem);
  @include for-mobile {
    height: 40rem;
    position: relative;
    background-position: top;
  }
  ::v-deep .sf-banner__subtitle {
    color: var(--c-primary);
    text-transform: none;
    font-weight: var(--font-weight--semibold);
    font-size: var(--h2-font-size);
    @include for-mobile {
      margin-left: var(--spacer-sm);
    }
  }
  ::v-deep  .sf-banner__title {
    text-transform: none;
    @include for-mobile {
      margin-left: var(--spacer-sm);
      font-size: 36px;
      font-weight: var(--font-weight--bold);
    }
    @include for-desktop {
      font-size: 48px;
      font-weight: var(--font-weight--semibold);
    }
  }
  ::v-deep .sf-link {
    --button-width: unset;
    --button-background: var(--c-primary);    
  }
  ::v-deep .sf-banner__wrapper {
    @include for-desktop {
      padding-left: 15rem
    }
    @include for-mobile {
      padding: 0;
      padding-top: var(--spacer-xl);
    }
  }
  ::v-deep .sf-banner__call-to-action {
    @include for-desktop {
      margin-top: var(--spacer-xl);
    }
    @include for-mobile {
      display: flex;
      text-align: center;
      width: 90%;
      position: absolute;
      bottom: 10rem;
      left: 5%;
    }
  }
}
</style>
