<template>
  <div>
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
