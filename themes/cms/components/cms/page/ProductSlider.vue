<template>
  <SfCarousel v-if="list.length" class="product-carousel">
    <SfCarouselItem v-for="(product, i) in list" :key="i">
      <SfProductCard
        class="product-card"
        data-cy="home-url_product"
        :title="productGetters.getName(product)"
        :image="product.images[0].url"
        :regular-price="$n(productGetters.getFormattedPrice(productGetters.getPrice(product).regular), 'currency')"
        :special-price="productGetters.getPrice(product).special && $n(productGetters.getPrice(product).special, 'currency')"
        :max-rating="5"
        :score-rating="3.5"
        :show-add-to-cart-button="true"
        :is-in-wishlist="isInWishlist({ product })"
        :link="localePath(`/p/${productGetters.getId(product)}/${productGetters.getSlug(product)}`)"
        @click:add-to-cart="addItemToCart({ product, quantity: 1 })"
        @click:wishlist="!isInWishlist({ product }) ? addItemToWishlist({ product }) : removeItemFromWishlist(product)"
        :is-added-to-cart="isInCart({ product })"
      />
    </SfCarouselItem>
  </SfCarousel>
</template>

<%- include(`ejs/${options.cms.name}/product-slider`); %>
