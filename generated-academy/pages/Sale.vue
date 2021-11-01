<template>
  <div>
    <h1>{{ $t('Winter sale') }}!</h1>
    <i18n
      tag="p"
      path="Check out our awesome winter collection items on sale and get the best deals."
    >
      <span>{{ $n(100, 'currencyNoCents') }}</span>
    </i18n>
  </div>
</template>
<script>
export default {
  layout: 'default-no-footer',
}
</script>
