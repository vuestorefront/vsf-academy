<template>
  <div>
    <h1>Brand - {{ $route.params.brand_name }}</h1>
    <p>Check out our amazing offering from {{ $route.params.brand_name }}</p>
  </div>
</template>
// <script>
// export default {
//   middleware({ route, error }) {
//     const paramsEmpty = !Object.keys(route.params).length
//     if (paramsEmpty) {
//       error({ statusCode: 404 })
//     }
//   },
// }
// </script>
