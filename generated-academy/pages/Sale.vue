<template>
  <div>
    <h1>{{ $t('Winter sale') }}!</h1>
    <i18n tag="p" path="Check out our awesome winter collection items on sale and get the best deals.">
      <span>{{ $n(100, 'currencyNoCents') }}</span>
    </i18n>

    <SfLoader :class="{ loading }" :loading="loading">
      <div class="products" v-if="!loading">
        <SfProductCard
          v-e2e="'category-product-card'"
          v-for="(product, i) in products"
          :key="productGetters.getSlug(product)"
          :style="{ '--index': i }"
          :title="productGetters.getName(product)"
          :image="productGetters.getCoverImage(product)"
          :regular-price="$n(productGetters.getPrice(product).regular, 'currency')"
          :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
          :max-rating="5"
          :score-rating="productGetters.getAverageRating(product)"
          :show-add-to-cart-button="true"
          :isOnWishlist="isInWishlist({ product })"
          :isAddedToCart="isInCart({ product })"
          :link="localePath(`/product/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
          class="products__product-card"
          @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeItemFromWishlist({ product })"
          @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
        />
      </div>
    </SfLoader>
  </div>
</template>

<script>
import { SfProductCard, SfLoader } from '@storefront-ui/vue'
import { computed } from '@vue/composition-api'
import { useCart, useWishlist, productGetters, useFacet, facetGetters } from '@vsf-enterprise/commercetools'
import { useUiHelpers } from '~/composables'
import { onSSR } from '@vue-storefront/core'
import cacheControl from './../helpers/cacheControl'

// TODO(addToCart qty, horizontal): https://github.com/vuestorefront/storefront-ui/issues/1606
export default {
  transition: 'fade',
  layout: 'default-no-footer',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  setup(props, context) {
    const th = useUiHelpers()
    const { addItem: addItemToCart, isInCart } = useCart()
    const { addItem: addItemToWishlist, isInWishlist, removeItem: removeItemFromWishlist } = useWishlist()
    const { result, search, loading, error } = useFacet()

    const products = computed(() => facetGetters.getProducts(result.value))

    onSSR(async () => {
      await search({
        ...th.getFacetsFromURL(),
        categorySlug: 'sale'
      })

      if (error?.value?.search) context.root.$nuxt.error({ statusCode: 404 })
    })

    return {
      th,
      products,
      loading,
      productGetters,
      addItemToWishlist,
      removeItemFromWishlist,
      isInWishlist,
      addItemToCart,
      isInCart,
    }
  },
  components: {
    SfProductCard,
    SfLoader,
  },
}
</script>
<style lang="scss">
.products {
  box-sizing: border-box;
  margin: 0;
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  &__grid {
    justify-content: center;
    @include for-desktop {
      justify-content: flex-start;
    }
  }
  &__grid,
  &__list {
    display: flex;
    flex-wrap: wrap;
  }
  &__product-card {
    --product-card-title-margin: var(--spacer-base) 0 0 0;
    --product-card-title-font-weight: var(--font-weight--medium);
    --product-card-title-margin: var(--spacer-xs) 0 0 0;
    flex: 1 1 50%;
    @include for-desktop {
      --product-card-title-font-weight: var(--font-weight--normal);
      --product-card-add-button-bottom: var(--spacer-base);
      --product-card-title-margin: var(--spacer-sm) 0 0 0;
    }
  }
  &__product-card-horizontal {
    flex: 0 0 100%;
    @include for-mobile {
      ::v-deep .sf-image {
        --image-width: 5.3125rem;
        --image-height: 7.0625rem;
      }
    }
  }
  &__slide-enter {
    opacity: 0;
    transform: scale(0.5);
  }
  &__slide-enter-active {
    transition: all 0.2s ease;
    transition-delay: calc(0.1s * var(--index));
  }
  @include for-desktop {
    &__grid {
      margin: var(--spacer-sm) 0 0 var(--spacer-sm);
    }
    &__pagination {
      display: flex;
      justify-content: flex-start;
      margin: var(--spacer-xl) 0 0 0;
    }
    &__product-card-horizontal {
      margin: var(--spacer-lg) 0;
    }
    &__product-card {
      flex: 1 1 25%;
    }
    &__list {
      margin: 0 0 0 var(--spacer-sm);
    }
  }
  &__show-on-page {
    display: flex;
    justify-content: flex-end;
    align-items: baseline;
    &__label {
      font-family: var(--font-family--secondary);
      font-size: var(--font-size--sm);
    }
  }
}
</style>
