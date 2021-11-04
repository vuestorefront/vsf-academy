<template>
  <div>
    <h1>{{ $t('Winter sale') }}!</h1>
    <i18n
      tag="p"
      path="Check out our awesome winter collection items on sale and get the best deals."
    >
      <span>{{ $n(100, 'currencyNoCents') }}</span>
    </i18n>
    <SfCard
      class="card"
      title="My main title"
      image="https://via.placeholder.com/350"
      :titleLevel="3"
      buttonText="Learn more"
    >
      <template #details>
        <h3>Secondary title</h3>
      </template></SfCard
    >
  </div>
</template>
<script>
import { SfCard } from '@storefront-ui/vue'
export default {
  layout: 'default-no-footer',
  components: {
    SfCard,
  },
}
</script>
<style lang="scss">
.card {
 h3 {
   margin-bottom: var(--spacer-lg);
 }
}
</style>
