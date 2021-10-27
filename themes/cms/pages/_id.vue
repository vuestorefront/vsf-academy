<template>
  <div v-if="content" class="dynamic-page">
    <% if (options.cms.name === 'storyblok') { -%><render-content :content="content.content" />
    <% } else { -%><render-content :content="content" /><% } %>
  </div>
</template>

<script>
import Vue from 'vue';
import { useContent } from '<%= options.cms.source %>';
import { onSSR } from '@vue-storefront/core';

/*
* This page is prepared for CMS dynamic content rendering.
*/
export default Vue.extend({
  name: 'CMSDynamicPage',
  setup (props, { root }) {
    const { $route } = root;
    const { id } = $route.params;
    const { search, content } = useContent(id);
    onSSR(async () => {
      await search({
        '<% if (options.cms.name === "storyblok") { -%>slug<% } else { %>url<% } %>': id,
        ...JSON.parse('<%- JSON.stringify(options.cms.nodeConfig) %>')
      });
    });
    return {
      content
    }
  }
});
</script>

<style lang="scss">
.dynamic-page .render-content {
  width: 100%;
  margin: 0 auto;
  margin-bottom: var(--spacer-xl);
}
</style>
