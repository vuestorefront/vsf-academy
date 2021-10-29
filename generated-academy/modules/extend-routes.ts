export default function () {
  this.extendRoutes(routes => {
    const routesToRemove = ['Category___', 'Product___', 'Brand__']
    // const pathsToReplace = {
    //   '/p/:id/:slug': '/product/:id/:slug',
    //   '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?': '/category/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
    // }

    const pathsToReplace = [
      {
        oldPath: '/p/:id/:slug',
        newPath: '/product/:id/:slug'
      },
      {
        oldPath: '/c/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?',
        newPath: '/category/:slug_1/:slug_2?/:slug_3?/:slug_4?/:slug_5?'
      },
    ]

    return routes
      .filter(({ name } ) => !routesToRemove.some(routeName => name.includes(routeName)))
      .map(route => {
        const pathToReplace = pathsToReplace.find(({ oldPath }) => route.path.includes(oldPath))

        if (pathToReplace) {
          const { oldPath, newPath } = pathToReplace

          return { ...route, path: route.path.replace(oldPath, newPath) }
        }
        return route
      })
  })
}
