<template>
  <div id="dashboard">
    <SfHeading 
      :level="1" :title="loggedIn ? 'Hello John!' : `Welcome to the ${dashboard}`" 
      class="sf-heading--left dashboard__welocme"
    />
    <SfHero class="dashboard__hero">
      <SfHeroItem
        v-for="(hero, i) in heroes"
        :key="`${hero.title}-${i}`"
        :title="hero.title"
        :subtitle="hero.subtitle"
        :button-text="hero.buttonText"
        :background="hero.background"
        :image="hero.image"
        :class="hero.className"
      />
    </SfHero>
    <SfHeading 
      :level="3" title="Deals of week" 
      description="Find all the best deals in one place and save up to 60% on your favorite products."
      class="sf-heading--left dashboard__deals"
    />
    <SfCarousel
      v-if="pageMounted"
      class="dashboard__carousel" 
      :settings="{ peek: 16, breakpoints: { 1023: { peek: 0, perView: 2 } } }"
    >
      <template #prev="{go}">
        <SfArrow
          aria-label="prev"
          class="sf-arrow--left sf-arrow--long"
          @click="go('prev')"
        />
      </template>
      <template #next="{go}">
        <SfArrow
          aria-label="next"
          class="sf-arrow--right sf-arrow--long"
          @click="go('next')"
        />
      </template>
      <SfCarouselItem class="dashboard__carousel__item" v-for="(product, i) in products" :key="`${product.title}-${i}`">
        <SfProductCard
          :title="product.title"
          :image="product.image"
          :regular-price="product.price.regular"
          :max-rating="product.rating.max"
          :score-rating="product.rating.score"
          :show-add-to-cart-button="true"
          :is-on-wishlist="product.isInWishlist"
          link="/"
          class="dashboard__carousel__item__product"
          @click:wishlist="toggleWishlist(i)"
        />
      </SfCarouselItem>
    </SfCarousel>
    <AppLoader v-else />
    <SfBanner
      title="Eco Sandals"
      subtitle="Summer shoes"
      class="sf-banner--right dashboard__banner"
      description="The collection features formal and casual comfort shoes with a Danish design focus. Made from premium leathers and comfort."
      buttonText="Shop Now"
      image="/homepage/bannerA.webp"
    />
    <SfCallToAction
      title="Subscribe to Newsletters"
      button-text="Subscribe"
      description="Be aware of upcoming sales and events. Receive gifts and special offers!"
      image="/homepage/newsletter.webp"
      class="dashboard__call-to-action"
    />
  </div>
</template>
<script>
import { 
  SfHeading,
  SfHero,
  SfCarousel,
  SfProductCard,
  SfArrow,
  SfBanner,
  SfCallToAction,
 } from '@storefront-ui/vue';
import { ref, onMounted } from '@vue/composition-api';
import AppLoader from "../components/AppLoader.vue";

export default {
  name: 'Dashboard',
  components: {
    SfHeading,
    SfHero,
    SfCarousel,
    SfProductCard,
    SfArrow,
    SfBanner,
    SfCallToAction,
    AppLoader,
  },
  setup(props, context) {
    const loggedIn = false;
    const heroes = [
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        buttonText: 'Learn more',
        background: '#eceff1',
        image: '/homepage/bannerH.webp',
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        buttonText: 'Learn more',
        background: '#efebe9',
        image: '/homepage/bannerA.webp',
        className:
          'sf-hero-item--position-bg-top-left sf-hero-item--align-right'
      },
      {
        title: 'Colorful summer dresses are already in store',
        subtitle: 'SUMMER COLLECTION 2019',
        buttonText: 'Learn more',
        background: '#fce4ec',
        image: '/homepage/bannerB.webp',
      }
    ];

    const products = [
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: true
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productC.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productA.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        },
        {
          title: 'Cream Beach Bag',
          image: '/homepage/productB.webp',
          price: { regular: '50.00 $' },
          rating: { max: 5, score: 4 },
          isInWishlist: false
        }
      ];

    const pageMounted = ref(false);

    const { dashboard } = context.root.$route.params;

    onMounted(() => {
      pageMounted.value = true;
    });

    return {
      loggedIn,
      heroes,
      products,
      dashboard,
      pageMounted,
    }
  }
};
</script>

<style lang="scss" scoped>
#dashboard {
  margin: 0 var(--spacer-sm);
  @include for-desktop {
    margin: 0 auto;
  }
}
.dashboard {
  &__welocme {
    margin-top: var(--spacer-base);
    --heading-title-color: var(--c-primary);
    @include for-desktop {
      --heading-title-font-size: var(--h2-font-size);
    }
  }
  &__deals {
    @include for-desktop {
      --heading-text-align: center;
    }
  }
  &__hero {
    margin: var(--spacer-xl) auto var(--spacer-lg);
    --hero-item-background-position: center;
    ::v-deep .sf-link:hover {
      color: var(--c-white);
    }
    @include for-desktop {
      margin: var(--spacer-xl) auto var(--spacer-2xl);
    }
    .sf-hero-item {
      &:nth-child(even) {
        --hero-item-background-position: left;
        @include for-mobile {
          --hero-item-background-position: 30%;
        ::v-deep .sf-hero-item__wrapper {
          width: 50%;
        }
          ::v-deep .sf-hero-item__subtitle,
          ::v-deep .sf-hero-item__title {
            width: 100%;
          }
        }
      }
    }
    ::v-deep .sf-hero__control {
      &--right, &--left {
        display: none;
      }
    }
  }
  &__carousel {
      margin: 0 calc(var(--spacer-sm) * -1) 0 0;
    @include for-desktop {
      margin: 0;
    }
    &__item {
      margin: 1.375rem 0 2.5rem 0;
      @include for-desktop {
        margin: var(--spacer-xl) 0 var(--spacer-xl) 0;
      }
      &__product {
        --product-card-add-button-transform: translate3d(0, 30%, 0);
      }
    }
    ::v-deep .sf-arrow--long .sf-arrow--right {
      --arrow-icon-transform: rotate(180deg);
      -webkit-transform-origin: center;
      transform-origin: center;
    }
  }
  &__banner {
      background-position: left;
  }
  &__call-to-action {
    background-position: right;
    margin: var(--spacer-lg) 0;
    @include for-desktop {
      margin: var(--spacer-xl) 0 var(--spacer-2xl) 0;
    }
  }
}

</style>
