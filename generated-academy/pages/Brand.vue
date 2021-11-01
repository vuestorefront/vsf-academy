<template>
  <div class="brand-page">
    <SfHeading
      :level="1"
      :title="`Brand - ${$route.params.brand_name}`"
      :description="`Check out our amazing offering from ${$route.params.brand_name}`"
      class="sf-heading--left"
    ></SfHeading>
  </div>
</template>
<script>
import { SfHeading } from '@storefront-ui/vue'
export default {
  components: {
    SfHeading,
  },
}
</script>
<style lang="scss">
.brand-page {
  .sf-heading {
    &__title {
      --heading-title-color: var(--c-primary);
    }
    &__description {
      --heading-description-font-size: var(--font-size--lg);
    }
  }
}
</style>
