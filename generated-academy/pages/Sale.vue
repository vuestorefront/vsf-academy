<template>
  <div>
    <h1>{{ title }}!</h1>
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
  setup(_, context) {
    const { _i18n } = context.root
    const title = _i18n.t('Winter sale')

    return {
      title,
    }
  },
}
</script>
