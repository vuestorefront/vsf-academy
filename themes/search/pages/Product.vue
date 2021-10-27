<template>
  <div id="product">
    <SfBreadcrumbs
      class="breadcrumbs desktop-only"
      :breadcrumbs="breadcrumbs"
    />
    <div class="product">
      <LazyHydrate when-idle>
        <SfGallery :images="productGallery" class="product__gallery" />
      </LazyHydrate>

      <div class="product__info">
        <div class="product__header">
          <SfHeading
            :title="productGetters.getName(product)"
            :level="3"
            class="sf-heading--no-underline sf-heading--left"
          />
          <SfIcon
            icon="drag"
            size="xxl"
            color="var(--c-text-disabled)"
            class="product__drag-icon smartphone-only"
          />
        </div>
        <div class="product__price-and-rating">
          <SfPrice
            :regular="$n(productGetters.getPrice(product).regular, 'currency')"
            :special="
              productGetters.getPrice(product).special &&
              $n(productGetters.getPrice(product).special, 'currency')
            "
          />
          <div>
            <div class="product__rating">
              <SfRating :score="averageRating" :max="5" />
              <a v-if="!!totalReviews" href="#" class="product__count">
                ({{ totalReviews }})
              </a>
            </div>
            <SfButton class="sf-button--text">{{
              $t('Read all reviews')
            }}</SfButton>
          </div>
        </div>
        <div>
          <p class="product__description desktop-only">
            {{ description }}
          </p>
          <SfButton class="sf-button--text desktop-only product__guide">
            {{ $t('Size guide') }}
          </SfButton>
          <SfSelect
            v-e2e="'size-select'"
            v-if="options.size"
            :value="configuration.size"
            @input="(size) => updateFilter({ size })"
            label="Size"
            class="sf-select--underlined product__select-size"
            :required="true"
          >
            <SfSelectOption
              v-for="size in options.size"
              :key="size.value"
              :value="size.value"
            >
              {{ size.label }}
            </SfSelectOption>
          </SfSelect>
          <div
            v-if="options.color && options.color.length > 1"
            class="product__colors desktop-only"
          >
            <p class="product__color-label">{{ $t('Color') }}:</p>
            <SfColor
              v-for="(color, i) in options.color"
              :key="i"
              :color="color.value"
              class="product__color"
              @click="updateFilter({ color })"
            />
          </div>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab title="Shipping"> Shipping </SfTab>
            <SfTab v-if="channels.length > 0" title="Click and Collect">
              <SfSelect
                v-e2e="'channel-select'"
                v-model="channelId"
                label="Select Channel"
                class="sf-select--underlined product__select-size"
              >
                <SfSelectOption
                  v-for="{ channel } in channels"
                  :key="channel.id"
                  :value="channel.id"
                >
                  {{ channel.name }}
                </SfSelectOption>
              </SfSelect>
            </SfTab>
          </SfTabs>
          <SfAddToCart
            v-e2e="'product_add-to-cart'"
            :stock="stock"
            v-model="qty"
            :disabled="loading"
            :canAddToCart="stock > 0"
            class="product__add-to-cart"
            @click="addToCart"
          />
        </div>

        <LazyHydrate when-idle>
          <SfTabs :open-tab="1" class="product__tabs">
            <SfTab title="Description">
              <div class="product__description">
                {{ description }}
              </div>
              <SfProperty
                v-if="productSku"
                name="Product Code"
                :value="productSku"
                class="product__property"
              />
              <SfProperty
                v-if="productCategoryName"
                name="Category"
                :value="productCategoryName"
                class="product__property"
              />
            </SfTab>
            <SfTab title="Read reviews">
              <SfReview
                v-for="review in reviews"
                :key="reviewGetters.getReviewId(review)"
                :author="reviewGetters.getReviewAuthor(review)"
                :date="reviewGetters.getReviewDate(review)"
                :message="reviewGetters.getReviewMessage(review)"
                :max-rating="5"
                :rating="reviewGetters.getReviewRating(review)"
                :char-limit="250"
                read-more-text="Read more"
                hide-full-text="Read less"
                class="product__review"
              />
            </SfTab>
            <SfTab
              title="Additional Information"
              class="product__additional-info"
            >
            </SfTab>
          </SfTabs>
        </LazyHydrate>
      </div>
    </div>

    <LazyHydrate when-visible>
      <RelatedProducts
        :products="relatedProducts"
        :loading="relatedLoading"
        title="Match it with"
      />
    </LazyHydrate>

    <LazyHydrate when-visible>
      <InstagramFeed />
    </LazyHydrate>
  </div>
</template>

<script>
import {
  SfProperty,
  SfHeading,
  SfPrice,
  SfRating,
  SfSelect,
  SfAddToCart,
  SfTabs,
  SfGallery,
  SfIcon,
  SfImage,
  SfBanner,
  SfAlert,
  SfSticky,
  SfReview,
  SfBreadcrumbs,
  SfButton,
  SfColor,
} from '@storefront-ui/vue'

import InstagramFeed from '~/components/InstagramFeed.vue'
import RelatedProducts from '~/components/RelatedProducts.vue'
import { ref, computed } from '@vue/composition-api'
import MobileStoreBanner from '~/components/MobileStoreBanner.vue'
import LazyHydrate from 'vue-lazy-hydration'
import { useSearch } from '@vsf-enterprise/algolia'
import {
  useProduct,
  useCart,
  productGetters,
  useReview,
  reviewGetters,
  useStore,
} from '<%= options.generate.replace.composables %>'
import { onSSR, useVSFContext } from '@vue-storefront/core'
import cacheControl from './../helpers/cacheControl'

export default {
  name: 'Product',
  transition: 'fade',
  middleware: cacheControl({
    'max-age': 60,
    'stale-when-revalidate': 5,
  }),
  setup(props, context) {
    const qty = ref(1)
    const { id } = context.root.$route.params
    const { products, search } = useProduct('products')
    const {
      products: relatedProducts,
      search: searchRelatedProducts,
      loading: relatedLoading,
    } = useProduct('relatedProducts')
    const { response: stores } = useStore()
    // to be added on local useStore factory
    function getSelected(stores) {
      return stores.results?.find(
        (result) => result.key === stores._selectedStore,
      )
    }
    const { addItem, loading } = useCart()
    const { reviews: productReviews, search: searchReviews } =
      useReview('productReviews')
    const {
      search: searchProductsCategory,
      result: resultProductsCategory,
      loading: loadingProductsCategory,
    } = useSearch('products-category')
    const {
      app: {
        i18n: { locale },
      },
    } = useVSFContext()
    const { fromCategory } = context.root.$route.query
    const attributes = {
      ...context.root.$route.query,
    }
    delete attributes.fromCategory

    const product = computed(
      () =>
        productGetters.getFiltered(products.value, {
          master: true,
          attributes,
        })[0],
    )
    const options = computed(() =>
      productGetters.getAttributes(products.value, ['color', 'size']),
    )
    const configuration = computed(() =>
      productGetters.getAttributes(product.value, ['color', 'size']),
    )
    const categories = computed(() =>
      productGetters.getCategoryIds(product.value),
    )
    const reviews = computed(() => reviewGetters.getItems(productReviews.value))
    const description = computed(() =>
      productGetters.getDescription(product.value),
    )

    const productSku = computed(() => productGetters.getSku(product.value))
    const productCategoryName = computed(() => {
      const category =
        resultProductsCategory.value &&
        resultProductsCategory.value.hits &&
        Array.isArray(resultProductsCategory.value.hits) &&
        resultProductsCategory.value.hits[0]
      if (!category) {
        return
      }
      return category.name[locale] || category.name
    })

    const selectedStore = computed(() => getSelected(stores.value))
    const channelId = ref(null)
    const channels = computed(() => {
      const productChannels =
        product.value?.availability?.channels?.results ?? []
      return productChannels
    })
    const selectedChannel = computed(() => {
      const selected = channels.value.find(
        (item) => item.channel.id === channelId.value,
      )
      return selected?.channel?.roles && selected?.channel?.id
        ? {
            ...(selected.channel.roles.includes('InventorySupply') && {
              supplyChannel: selected.channel.id,
            }),
            ...(selected.channel.roles.includes('ProductDistribution') && {
              distributionChannel: selected.channel.id,
            }),
          }
        : null
    })
    const addToCart = () => {
      addItem({
        product: product.value,
        quantity: parseInt(qty.value),
        customQuery: selectedChannel.value,
      })
    }
    // TODO: Breadcrumbs are temporary disabled because productGetters return undefined. We have a mocks in data
    // const breadcrumbs = computed(() => productGetters.getBreadcrumbs ? productGetters.getBreadcrumbs(product.value) : props.fallbackBreadcrumbs);
    const productGallery = computed(() =>
      productGetters.getGallery(product.value).map((img) => ({
        mobile: { url: img.small },
        desktop: { url: img.normal },
        big: { url: img.big },
        alt: product.value._name || product.value.name,
      })),
    )

    const breadcrumbs = computed(() => {
      if (!resultProductsCategory.value || !resultProductsCategory.value.hits) {
        return
      }
      const breadcrumbs = [{ text: 'Home', link: '/' }]
      if (!fromCategory) {
        return breadcrumbs
      }
      const slugs = fromCategory.split('/').map((_, index, arr) => {
        return [...arr].slice(0, index + 1).join('/')
      })

      const slugsToCategories = slugs
        .map((slug) => {
          return resultProductsCategory.value?.hits?.find((cat) => {
            return cat.slug[locale] === slug
          })
        })
        .filter(Boolean)
      if (!slugsToCategories.length) return

      const catsLocales = slugsToCategories.map((cat) => ({
        text: cat.name[locale],
        link: `/c/${cat.slug[locale]}`,
      }))

      return [
        ...breadcrumbs,
        ...catsLocales,
        {
          text: productGetters.getName(product.value),
          link: context.root.$route.fullPath,
        },
      ]
    })

    onSSR(async () => {
      await search({ id })
      await searchRelatedProducts({ catId: [categories.value[0]], limit: 8 })
      await searchReviews({ productId: id })
      if (fromCategory) {
        const slugs = fromCategory.split('/').map((_, index, arr) => {
          return [...arr].slice(0, index + 1).join('/')
        })
        await searchProductsCategory({
          query: '',
          parameters: {
            facetFilters: [slugs.map((slug) => `slug.${locale}:${slug}`)],
          },
          entity: 'category',
          useRaw: true,
        })
      }
    })

    const updateFilter = (filter) => {
      context.root.$router.push({
        path: context.root.$route.path,
        query: {
          ...configuration.value,
          ...filter,
        },
      })
    }

    return {
      addToCart,
      products,
      updateFilter,
      configuration,
      product,
      reviews,
      reviewGetters,
      averageRating: computed(() =>
        productGetters.getAverageRating(product.value),
      ),
      totalReviews: computed(() =>
        productGetters.getTotalReviews(product.value),
      ),
      relatedProducts: computed(() =>
        productGetters.getFiltered(relatedProducts.value, { master: true }),
      ),
      relatedLoading,
      options,
      qty,
      loading,
      productGetters,
      productGallery,
      description,
      productCategoryName,
      resultProductsCategory,
      breadcrumbs,
      productSku,
      channels,
      channelId,
      selectedChannel,
      selectedStore,
    }
  },
  components: {
    SfAlert,
    SfColor,
    SfProperty,
    SfHeading,
    SfPrice,
    SfRating,
    SfSelect,
    SfAddToCart,
    SfTabs,
    SfGallery,
    SfIcon,
    SfImage,
    SfBanner,
    SfSticky,
    SfReview,
    SfBreadcrumbs,
    SfButton,
    InstagramFeed,
    RelatedProducts,
    LazyHydrate,
  },
  data() {
    return {
      stock: 5,
    }
  },
}
</script>

<style lang="scss" scoped>
#product {
  box-sizing: border-box;
  @include for-desktop {
    max-width: 1272px;
    margin: 0 auto;
  }
}
.product {
  @include for-desktop {
    display: flex;
  }
  &__info {
    margin: var(--spacer-sm) auto;
    @include for-desktop {
      max-width: 32.625rem;
      margin: 0 0 0 7.5rem;
    }
  }
  &__header {
    --heading-title-color: var(--c-link);
    --heading-title-font-weight: var(--font-weight--bold);
    --heading-padding: 0;
    margin: 0 var(--spacer-sm);
    display: flex;
    justify-content: space-between;
    @include for-desktop {
      --heading-title-font-weight: var(--font-weight--semibold);
      margin: 0 auto;
    }
  }
  &__drag-icon {
    animation: moveicon 1s ease-in-out infinite;
  }
  &__price-and-rating {
    margin: 0 var(--spacer-sm) var(--spacer-base);
    align-items: center;
    @include for-desktop {
      display: flex;
      justify-content: space-between;
      margin: var(--spacer-sm) 0 var(--spacer-lg) 0;
    }
  }
  &__rating {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: var(--spacer-xs) 0 var(--spacer-xs);
  }
  &__count {
    @include font(
      --count-font,
      var(--font-weight--normal),
      var(--font-size--sm),
      1.4,
      var(--font-family--secondary)
    );
    color: var(--c-text);
    text-decoration: none;
    margin: 0 0 0 var(--spacer-xs);
  }
  &__description {
    @include font(
      --product-description-font,
      var(--font-weight--light),
      var(--font-size--base),
      1.6,
      var(--font-family--primary)
    );
  }
  &__select-size {
    margin: 0 var(--spacer-sm);
    @include for-desktop {
      margin: 0;
    }
  }
  &__colors {
    @include font(
      --product-color-font,
      var(--font-weight--normal),
      var(--font-size--lg),
      1.6,
      var(--font-family--secondary)
    );
    display: flex;
    align-items: center;
    margin-top: var(--spacer-xl);
  }
  &__color-label {
    margin: 0 var(--spacer-lg) 0 0;
  }
  &__color {
    margin: 0 var(--spacer-2xs);
  }
  &__add-to-cart {
    margin: var(--spacer-base) var(--spacer-sm) 0;
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__guide,
  &__compare,
  &__save {
    display: block;
    margin: var(--spacer-xl) 0 var(--spacer-base) auto;
  }
  &__compare {
    margin-top: 0;
  }
  &__tabs {
    --tabs-title-z-index: 0;
    margin: var(--spacer-lg) auto var(--spacer-2xl);
    --tabs-title-font-size: var(--font-size--lg);
    @include for-desktop {
      margin-top: var(--spacer-2xl);
    }
  }
  &__property {
    margin: var(--spacer-base) 0;
    &__button {
      --button-font-size: var(--font-size--base);
    }
  }
  &__review {
    padding-bottom: 24px;
    border-bottom: var(--c-light) solid 1px;
    margin-bottom: var(--spacer-base);
  }
  &__additional-info {
    color: var(--c-link);
    @include font(
      --additional-info-font,
      var(--font-weight--light),
      var(--font-size--sm),
      1.6,
      var(--font-family--primary)
    );
    &__title {
      font-weight: var(--font-weight--normal);
      font-size: var(--font-size--base);
      margin: 0 0 var(--spacer-sm);
      &:not(:first-child) {
        margin-top: 3.5rem;
      }
    }
    &__paragraph {
      margin: 0;
    }
  }
  &__gallery {
    flex: 1;
  }
}
.breadcrumbs {
  margin: var(--spacer-base) auto var(--spacer-lg);
}
@keyframes moveicon {
  0% {
    transform: translate3d(0, 0, 0);
  }
  50% {
    transform: translate3d(0, 30%, 0);
  }
  100% {
    transform: translate3d(0, 0, 0);
  }
}
</style>
