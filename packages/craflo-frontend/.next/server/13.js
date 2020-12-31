exports.ids = [13];
exports.modules = {

/***/ "./src/components/product-grid/product-list/product-list.tsx":
/*!*******************************************************************!*\
  !*** ./src/components/product-grid/product-list/product-list.tsx ***!
  \*******************************************************************/
/*! exports provided: Products, default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Products\", function() { return Products; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dynamic */ \"next/dynamic\");\n/* harmony import */ var next_dynamic__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_dynamic__WEBPACK_IMPORTED_MODULE_1__);\nvar __jsx = react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement;\n\n\nconst ErrorMessage = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/*! import() */ 12).then(__webpack_require__.bind(null, /*! components/error-message/error-message */ \"./src/components/error-message/error-message.tsx\")), {\n  loadableGenerated: {\n    webpack: () => [/*require.resolve*/(/*! components/error-message/error-message */ \"./src/components/error-message/error-message.tsx\")],\n    modules: ['components/error-message/error-message']\n  }\n});\nconst QuickView = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/*! import() */ 7).then(__webpack_require__.bind(null, /*! features/quick-view/quick-view */ \"./src/features/quick-view/quick-view.tsx\")), {\n  loadableGenerated: {\n    webpack: () => [/*require.resolve*/(/*! features/quick-view/quick-view */ \"./src/features/quick-view/quick-view.tsx\")],\n    modules: ['features/quick-view/quick-view']\n  }\n});\nconst GeneralCard = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/*! import() */ 6).then(__webpack_require__.bind(null, /*! components/product-card/product-card-one/product-card-one */ \"./src/components/product-card/product-card-one/product-card-one.tsx\")), {\n  loadableGenerated: {\n    webpack: () => [/*require.resolve*/(/*! components/product-card/product-card-one/product-card-one */ \"./src/components/product-card/product-card-one/product-card-one.tsx\")],\n    modules: ['components/product-card/product-card-one/product-card-one']\n  }\n});\nconst BookCard = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/*! import() */ 11).then(__webpack_require__.bind(null, /*! components/product-card/product-card-two/product-card-two */ \"./src/components/product-card/product-card-two/product-card-two.tsx\")), {\n  loadableGenerated: {\n    webpack: () => [/*require.resolve*/(/*! components/product-card/product-card-two/product-card-two */ \"./src/components/product-card/product-card-two/product-card-two.tsx\")],\n    modules: ['components/product-card/product-card-two/product-card-two']\n  }\n});\nconst FurnitureCard = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/*! import() */ 10).then(__webpack_require__.bind(null, /*! components/product-card/product-card-three/product-card-three */ \"./src/components/product-card/product-card-three/product-card-three.tsx\")), {\n  loadableGenerated: {\n    webpack: () => [/*require.resolve*/(/*! components/product-card/product-card-three/product-card-three */ \"./src/components/product-card/product-card-three/product-card-three.tsx\")],\n    modules: ['components/product-card/product-card-three/product-card-three']\n  }\n});\nconst MedicineCard = next_dynamic__WEBPACK_IMPORTED_MODULE_1___default()(() => __webpack_require__.e(/*! import() */ 8).then(__webpack_require__.bind(null, /*! components/product-card/product-card-five/product-card-five */ \"./src/components/product-card/product-card-five/product-card-five.tsx\")), {\n  loadableGenerated: {\n    webpack: () => [/*require.resolve*/(/*! components/product-card/product-card-five/product-card-five */ \"./src/components/product-card/product-card-five/product-card-five.tsx\")],\n    modules: ['components/product-card/product-card-five/product-card-five']\n  }\n});\nconst Products = ({\n  deviceType,\n  fetchLimit = 20,\n  loadMore = true,\n  type\n}) => {\n  /*\n  //--console.log(useCatalog)\n  //--console.log(\"Pulkitt\")\n    const {\n    catalogItems,\n    catalogItemsPageInfo,\n    isLoadingCatalogItems,\n    routingStore: { query },\n    shop,\n    uiStore\n  } = useCatalog;\n   useCatalog.uiStore.setPageSize(20)\n  useCatalog.uiStore.setSortBy(\"updatedAt-desc\")\n  const products = (catalogItems || []).map((item) => item.node.product);\n   const router = useRouter();\n  const { data, error, loading, fetchMore, networkStatus } = useQuery(\n    GET_PRODUCTS,\n    {\n      variables: {\n        type: type,\n        text: router.query.text,\n        category: router.query.category,\n        offset: 0,\n        limit: fetchLimit,\n      },\n      notifyOnNetworkStatusChange: true,\n    }\n  );\n    const loadingMore = networkStatus === NetworkStatus.fetchMore;\n   // Quick View Modal\n  const handleModalClose = () => {\n    const { pathname, query, asPath } = router;\n    const as = asPath;\n    router.push(\n      {\n        pathname,\n        query,\n      },\n      as,\n      {\n        shallow: true,\n      }\n    );\n    closeModal();\n  };\n   const handleQuickViewModal = (\n    modalProps: any,\n    deviceType: any,\n    onModalClose: any\n  ) => {\n    const { pathname, query } = router;\n    const as = `/product/${modalProps.slug}`;\n    if (pathname === '/product/[slug]') {\n      router.push(pathname, as);\n      return;\n    }\n    openModal({\n      show: true,\n      overlayClassName: 'quick-view-overlay',\n      closeOnClickOutside: false,\n      component: QuickView,\n      componentProps: { modalProps, deviceType, onModalClose },\n      closeComponent: 'div',\n      config: {\n        enableResizing: false,\n        disableDragging: true,\n        className: 'quick-view-modal',\n        width: 900,\n        y: 30,\n        height: 'auto',\n        transition: {\n          mass: 1,\n          tension: 0,\n          friction: 0,\n        },\n      },\n    });\n    router.push(\n      {\n        pathname,\n        query,\n      },\n      {\n        pathname: as,\n      },\n      {\n        shallow: true,\n      }\n    );\n  };\n  //if (error) return <ErrorMessage message={error.message} />;\n  if (loading && !loadingMore) {\n    return (\n      <LoaderWrapper>\n        <LoaderItem>\n          <Placeholder uniqueKey=\"1\" />\n        </LoaderItem>\n        <LoaderItem>\n          <Placeholder uniqueKey=\"2\" />\n        </LoaderItem>\n        <LoaderItem>\n          <Placeholder uniqueKey=\"3\" />\n        </LoaderItem>\n      </LoaderWrapper>\n    );\n  }\n   // if (!data || !data.products || data.products.items.length === 0) {\n  //   return <NoResultFound />;\n  // }\n  const handleLoadMore = () => {\n    fetchMore({\n      variables: {\n        offset: Number(data.products.items.length),\n        limit: fetchLimit,\n      },\n      updateQuery: (previousResult, { fetchMoreResult }) => {\n        if (!fetchMoreResult) {\n          return previousResult;\n        }\n        return {\n          products: {\n            __typename: previousResult.products.__typename,\n            items: [\n              ...previousResult.products.items,\n              ...fetchMoreResult.products.items,\n            ],\n            hasMore: fetchMoreResult.products.hasMore,\n          },\n        };\n      },\n    });\n  };\n   const renderCard = (productType, props) => {\n    switch (productType) {\n      case 'book':\n        return (\n          <BookCard\n            title={props.title}\n            image={props.image}\n            name={props?.author?.name}\n            data={props}\n            deviceType={deviceType}\n            onClick={() =>\n              router.push('/product/[slug]', `/product/${props.slug}`)\n            }\n          />\n        );\n      case 'medicine':\n        return (\n          <MedicineCard\n            title={props.title}\n            currency={CURRENCY}\n            image={props.image}\n            price={props.price}\n            weight={props.unit}\n            data={props}\n          />\n        );\n      case 'furniture':\n        return (\n          <FurnitureCard\n            title={props.title}\n            image={props.gallery[0].url}\n            discountInPercent={props.discountInPercent}\n            onClick={() =>\n              handleQuickViewModal(props, deviceType, handleModalClose)\n            }\n          />\n        );\n      default:\n        return (\n          <GeneralCard\n            title={props.title}\n            description={props.description}\n            image={props.primaryImage.URLs.medium}\n            weight={props.unit}\n            currency={props.pricing[0].currency.code}\n            price={props.pricing[0].displayPrice}\n            salePrice={23}\n            discountInPercent={2}\n            data={props}\n            deviceType={deviceType}\n            onClick={() =>\n              handleQuickViewModal(props, deviceType, handleModalClose)\n            }\n          />\n        );\n    }\n  };\n  return (\n    <>\n      <ProductsRow>\n        {products.map((item: any, index: number) => (\n          <ProductsCol\n            key={index}\n            style={type === 'book' ? { paddingLeft: 0, paddingRight: 1 } : {}}\n          >\n            <ProductCardWrapper>\n              <Fade\n                duration={800}\n                delay={index * 10}\n                style={{ height: '100%' }}\n              >\n                {renderCard(type, item)}\n              </Fade>\n            </ProductCardWrapper>\n          </ProductsCol>\n        ))}\n      </ProductsRow>\n         <ButtonWrapper>\n          <Button\n            onClick={handleLoadMore}\n            loading={loadingMore}\n            variant=\"secondary\"\n            style={{\n              fontSize: 14,\n            }}\n            border=\"1px solid #f1f1f1\"\n          >\n            <FormattedMessage id=\"loadMoreButton\" defaultMessage=\"Load More\" />\n          </Button>\n        </ButtonWrapper>\n    </>\n  );\n  };\n  */\n  return /*#__PURE__*/react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null);\n};\n/* harmony default export */ __webpack_exports__[\"default\"] = (Products); //\n// import Layout from \"components/Layout\";\n// import ProductGrid from \"components/ProductGrid\";\n//\n//\n// const productgrid = (useCatalog)=> {\n//\n//   const setPageSize = (pageSize) => {\n//     this.props.routingStore.setSearch({ limit: pageSize });\n//     this.props.uiStore.setPageSize(pageSize);\n//   };\n//\n//   const setSortBy = (sortBy) => {\n//     this.props.routingStore.setSearch({ sortby: sortBy });\n//     this.props.uiStore.setSortBy(sortBy);\n//   };\n//\n//\n//   const {\n//     catalogItems,\n//     catalogItemsPageInfo,\n//     isLoadingCatalogItems,\n//     routingStore: { query },\n//     shop,\n//     uiStore\n//   } = useCatalog;\n//\n//   const { routingStore } = this.props;\n//   routingStore.setTagId(null);\n//\n//\n//   const pageSize = query && inPageSizes(query.limit) ? parseInt(query.limit, 10) : uiStore.pageSize;\n//   const sortBy = query && query.sortby ? query.sortby : uiStore.sortBy;\n//\n//   //--console.log(catalogItems)\n//   let pageTitle;\n//   if (shop) {\n//     pageTitle = shop.name;\n//     if (shop.description) pageTitle = `${pageTitle} | ${shop.description}`;\n//   } else {\n//     pageTitle = \"Storefront\";\n//   }\n//\n//\n//\n//   return (\n//     <Layout shop={shop}>\n//       <ProductGrid\n//         catalogItems={catalogItems}\n//         currencyCode={(shop && shop.currency && shop.currency.code) || \"USD\"}\n//         isLoadingCatalogItems={isLoadingCatalogItems}\n//         pageInfo={catalogItemsPageInfo}\n//         pageSize={pageSize}\n//         setPageSize={setPageSize}\n//         setSortBy={setSortBy}\n//         sortBy={sortBy}\n//       />\n//     </Layout>\n//   );\n// }//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9zcmMvY29tcG9uZW50cy9wcm9kdWN0LWdyaWQvcHJvZHVjdC1saXN0L3Byb2R1Y3QtbGlzdC50c3g/NDk5ZSJdLCJuYW1lcyI6WyJFcnJvck1lc3NhZ2UiLCJkeW5hbWljIiwiUXVpY2tWaWV3IiwiR2VuZXJhbENhcmQiLCJCb29rQ2FyZCIsIkZ1cm5pdHVyZUNhcmQiLCJNZWRpY2luZUNhcmQiLCJQcm9kdWN0cyIsImRldmljZVR5cGUiLCJmZXRjaExpbWl0IiwibG9hZE1vcmUiLCJ0eXBlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUE7QUFFQTtBQTRCQSxNQUFNQSxZQUFZLEdBQUdDLG1EQUFPLENBQUMsTUFDM0IsZ0xBRDBCO0FBQUE7QUFBQSx3Q0FDbkIsZ0dBRG1CO0FBQUEsY0FDbkIsd0NBRG1CO0FBQUE7QUFBQSxFQUE1QjtBQUdBLE1BQU1DLFNBQVMsR0FBR0QsbURBQU8sQ0FBQyxNQUFNLCtKQUFQO0FBQUE7QUFBQSx3Q0FBYyxnRkFBZDtBQUFBLGNBQWMsZ0NBQWQ7QUFBQTtBQUFBLEVBQXpCO0FBQ0EsTUFBTUUsV0FBVyxHQUFHRixtREFBTyxPQUN6QixxTkFEeUI7QUFBQTtBQUFBLHdDQUNsQixzSUFEa0I7QUFBQSxjQUNsQiwyREFEa0I7QUFBQTtBQUFBLEVBQTNCO0FBR0EsTUFBTUcsUUFBUSxHQUFHSCxtREFBTyxPQUN0QixzTkFEc0I7QUFBQTtBQUFBLHdDQUNmLHNJQURlO0FBQUEsY0FDZiwyREFEZTtBQUFBO0FBQUEsRUFBeEI7QUFHQSxNQUFNSSxhQUFhLEdBQUdKLG1EQUFPLE9BQzNCLDhOQUQyQjtBQUFBO0FBQUEsd0NBQ3BCLDhJQURvQjtBQUFBLGNBQ3BCLCtEQURvQjtBQUFBO0FBQUEsRUFBN0I7QUFHQSxNQUFNSyxZQUFZLEdBQUdMLG1EQUFPLE9BQzFCLHlOQUQwQjtBQUFBO0FBQUEsd0NBQ25CLDBJQURtQjtBQUFBLGNBQ25CLDZEQURtQjtBQUFBO0FBQUEsRUFBNUI7QUFlTyxNQUFNTSxRQUFpQyxHQUFHLENBQUM7QUFDaERDLFlBRGdEO0FBRWhEQyxZQUFVLEdBQUcsRUFGbUM7QUFHaERDLFVBQVEsR0FBRyxJQUhxQztBQUloREM7QUFKZ0QsQ0FBRCxLQUszQztBQUNKO0FBQ0Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBWUUsc0JBQU8sdUhBQVA7QUFDRCxDQXBQTTtBQXNQUUosdUVBQWYsRSxDQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiIuL3NyYy9jb21wb25lbnRzL3Byb2R1Y3QtZ3JpZC9wcm9kdWN0LWxpc3QvcHJvZHVjdC1saXN0LnRzeC5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcic7XG5pbXBvcnQgZHluYW1pYyBmcm9tICduZXh0L2R5bmFtaWMnO1xuaW1wb3J0IHsgb3Blbk1vZGFsLCBjbG9zZU1vZGFsIH0gZnJvbSAnQHJlZHEvcmV1c2UtbW9kYWwnO1xuaW1wb3J0IHtcbiAgUHJvZHVjdHNSb3csXG4gIFByb2R1Y3RzQ29sLFxuICBCdXR0b25XcmFwcGVyLFxuICBMb2FkZXJXcmFwcGVyLFxuICBMb2FkZXJJdGVtLFxuICBQcm9kdWN0Q2FyZFdyYXBwZXIsXG59IGZyb20gJy4vcHJvZHVjdC1saXN0LnN0eWxlJztcbmltcG9ydCB7IENVUlJFTkNZIH0gZnJvbSAndXRpbHMvY29uc3RhbnQnO1xuaW1wb3J0IHsgdXNlUXVlcnkgfSBmcm9tICdAYXBvbGxvL3JlYWN0LWhvb2tzJztcbmltcG9ydCB7IE5ldHdvcmtTdGF0dXMgfSBmcm9tICdhcG9sbG8tY2xpZW50JztcbmltcG9ydCBQbGFjZWhvbGRlciBmcm9tICdjb21wb25lbnRzL3BsYWNlaG9sZGVyL3BsYWNlaG9sZGVyJztcbmltcG9ydCBGYWRlIGZyb20gJ3JlYWN0LXJldmVhbC9GYWRlJztcbmltcG9ydCBOb1Jlc3VsdEZvdW5kIGZyb20gJ2NvbXBvbmVudHMvbm8tcmVzdWx0L25vLXJlc3VsdCc7XG5pbXBvcnQgeyBGb3JtYXR0ZWRNZXNzYWdlIH0gZnJvbSAncmVhY3QtaW50bCc7XG5pbXBvcnQgeyBCdXR0b24gfSBmcm9tICdjb21wb25lbnRzL2J1dHRvbi9idXR0b24nO1xuaW1wb3J0IHsgR0VUX1BST0RVQ1RTIH0gZnJvbSAnZ3JhcGhxbC9xdWVyeS9wcm9kdWN0cy5xdWVyeSc7XG5pbXBvcnQgd2l0aENhdGFsb2dJdGVtcyBmcm9tIFwiY29udGFpbmVycy9jYXRhbG9nL3dpdGhDYXRhbG9nSXRlbXNcIjtcbmltcG9ydCBQYWdlU2l6ZVNlbGVjdG9yIGZyb20gXCJjb21wb25lbnRzL1BhZ2VTaXplU2VsZWN0b3JcIjtcbmltcG9ydCBTb3J0QnlTZWxlY3RvciBmcm9tIFwiY29tcG9uZW50cy9Tb3J0QnlTZWxlY3RvclwiO1xuaW1wb3J0IHsgaW5QYWdlU2l6ZXMgfSBmcm9tIFwibGliL3V0aWxzL3BhZ2VTaXplc1wiO1xuXG5pbXBvcnQge3dpdGhBcG9sbG99IGZyb20gXCJsaWIvYXBvbGxvL3dpdGhBcG9sbG9cIjtcbmltcG9ydCBpbmplY3QgZnJvbSBcImhvY3MvaW5qZWN0XCI7XG5cblxuY29uc3QgRXJyb3JNZXNzYWdlID0gZHluYW1pYygoKSA9PlxuICBpbXBvcnQoJ2NvbXBvbmVudHMvZXJyb3ItbWVzc2FnZS9lcnJvci1tZXNzYWdlJylcbik7XG5jb25zdCBRdWlja1ZpZXcgPSBkeW5hbWljKCgpID0+IGltcG9ydCgnZmVhdHVyZXMvcXVpY2stdmlldy9xdWljay12aWV3JykpO1xuY29uc3QgR2VuZXJhbENhcmQgPSBkeW5hbWljKFxuICBpbXBvcnQoJ2NvbXBvbmVudHMvcHJvZHVjdC1jYXJkL3Byb2R1Y3QtY2FyZC1vbmUvcHJvZHVjdC1jYXJkLW9uZScpXG4pO1xuY29uc3QgQm9va0NhcmQgPSBkeW5hbWljKFxuICBpbXBvcnQoJ2NvbXBvbmVudHMvcHJvZHVjdC1jYXJkL3Byb2R1Y3QtY2FyZC10d28vcHJvZHVjdC1jYXJkLXR3bycpXG4pO1xuY29uc3QgRnVybml0dXJlQ2FyZCA9IGR5bmFtaWMoXG4gIGltcG9ydCgnY29tcG9uZW50cy9wcm9kdWN0LWNhcmQvcHJvZHVjdC1jYXJkLXRocmVlL3Byb2R1Y3QtY2FyZC10aHJlZScpXG4pO1xuY29uc3QgTWVkaWNpbmVDYXJkID0gZHluYW1pYyhcbiAgaW1wb3J0KCdjb21wb25lbnRzL3Byb2R1Y3QtY2FyZC9wcm9kdWN0LWNhcmQtZml2ZS9wcm9kdWN0LWNhcmQtZml2ZScpXG4pO1xuXG50eXBlIFByb2R1Y3RzUHJvcHMgPSB7XG4gIGRldmljZVR5cGU/OiB7XG4gICAgbW9iaWxlOiBib29sZWFuO1xuICAgIHRhYmxldDogYm9vbGVhbjtcbiAgICBkZXNrdG9wOiBib29sZWFuO1xuICB9O1xuICBmZXRjaExpbWl0PzogbnVtYmVyO1xuICBsb2FkTW9yZT86IGJvb2xlYW47XG4gIHR5cGU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgUHJvZHVjdHM6IFJlYWN0LkZDPFByb2R1Y3RzUHJvcHM+ID0gKHtcbiAgZGV2aWNlVHlwZSxcbiAgZmV0Y2hMaW1pdCA9IDIwLFxuICBsb2FkTW9yZSA9IHRydWUsXG4gIHR5cGVcbn0pID0+IHtcbiAgLypcbiAgLy8tLWNvbnNvbGUubG9nKHVzZUNhdGFsb2cpXG4gIC8vLS1jb25zb2xlLmxvZyhcIlB1bGtpdHRcIilcblxuXG4gIGNvbnN0IHtcbiAgICBjYXRhbG9nSXRlbXMsXG4gICAgY2F0YWxvZ0l0ZW1zUGFnZUluZm8sXG4gICAgaXNMb2FkaW5nQ2F0YWxvZ0l0ZW1zLFxuICAgIHJvdXRpbmdTdG9yZTogeyBxdWVyeSB9LFxuICAgIHNob3AsXG4gICAgdWlTdG9yZVxuICB9ID0gdXNlQ2F0YWxvZztcblxuICB1c2VDYXRhbG9nLnVpU3RvcmUuc2V0UGFnZVNpemUoMjApXG4gIHVzZUNhdGFsb2cudWlTdG9yZS5zZXRTb3J0QnkoXCJ1cGRhdGVkQXQtZGVzY1wiKVxuICBjb25zdCBwcm9kdWN0cyA9IChjYXRhbG9nSXRlbXMgfHwgW10pLm1hcCgoaXRlbSkgPT4gaXRlbS5ub2RlLnByb2R1Y3QpO1xuXG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCB7IGRhdGEsIGVycm9yLCBsb2FkaW5nLCBmZXRjaE1vcmUsIG5ldHdvcmtTdGF0dXMgfSA9IHVzZVF1ZXJ5KFxuICAgIEdFVF9QUk9EVUNUUyxcbiAgICB7XG4gICAgICB2YXJpYWJsZXM6IHtcbiAgICAgICAgdHlwZTogdHlwZSxcbiAgICAgICAgdGV4dDogcm91dGVyLnF1ZXJ5LnRleHQsXG4gICAgICAgIGNhdGVnb3J5OiByb3V0ZXIucXVlcnkuY2F0ZWdvcnksXG4gICAgICAgIG9mZnNldDogMCxcbiAgICAgICAgbGltaXQ6IGZldGNoTGltaXQsXG4gICAgICB9LFxuICAgICAgbm90aWZ5T25OZXR3b3JrU3RhdHVzQ2hhbmdlOiB0cnVlLFxuICAgIH1cbiAgKTtcblxuXG4gIGNvbnN0IGxvYWRpbmdNb3JlID0gbmV0d29ya1N0YXR1cyA9PT0gTmV0d29ya1N0YXR1cy5mZXRjaE1vcmU7XG5cbiAgLy8gUXVpY2sgVmlldyBNb2RhbFxuICBjb25zdCBoYW5kbGVNb2RhbENsb3NlID0gKCkgPT4ge1xuICAgIGNvbnN0IHsgcGF0aG5hbWUsIHF1ZXJ5LCBhc1BhdGggfSA9IHJvdXRlcjtcbiAgICBjb25zdCBhcyA9IGFzUGF0aDtcbiAgICByb3V0ZXIucHVzaChcbiAgICAgIHtcbiAgICAgICAgcGF0aG5hbWUsXG4gICAgICAgIHF1ZXJ5LFxuICAgICAgfSxcbiAgICAgIGFzLFxuICAgICAge1xuICAgICAgICBzaGFsbG93OiB0cnVlLFxuICAgICAgfVxuICAgICk7XG4gICAgY2xvc2VNb2RhbCgpO1xuICB9O1xuXG4gIGNvbnN0IGhhbmRsZVF1aWNrVmlld01vZGFsID0gKFxuICAgIG1vZGFsUHJvcHM6IGFueSxcbiAgICBkZXZpY2VUeXBlOiBhbnksXG4gICAgb25Nb2RhbENsb3NlOiBhbnlcbiAgKSA9PiB7XG4gICAgY29uc3QgeyBwYXRobmFtZSwgcXVlcnkgfSA9IHJvdXRlcjtcbiAgICBjb25zdCBhcyA9IGAvcHJvZHVjdC8ke21vZGFsUHJvcHMuc2x1Z31gO1xuICAgIGlmIChwYXRobmFtZSA9PT0gJy9wcm9kdWN0L1tzbHVnXScpIHtcbiAgICAgIHJvdXRlci5wdXNoKHBhdGhuYW1lLCBhcyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIG9wZW5Nb2RhbCh7XG4gICAgICBzaG93OiB0cnVlLFxuICAgICAgb3ZlcmxheUNsYXNzTmFtZTogJ3F1aWNrLXZpZXctb3ZlcmxheScsXG4gICAgICBjbG9zZU9uQ2xpY2tPdXRzaWRlOiBmYWxzZSxcbiAgICAgIGNvbXBvbmVudDogUXVpY2tWaWV3LFxuICAgICAgY29tcG9uZW50UHJvcHM6IHsgbW9kYWxQcm9wcywgZGV2aWNlVHlwZSwgb25Nb2RhbENsb3NlIH0sXG4gICAgICBjbG9zZUNvbXBvbmVudDogJ2RpdicsXG4gICAgICBjb25maWc6IHtcbiAgICAgICAgZW5hYmxlUmVzaXppbmc6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlRHJhZ2dpbmc6IHRydWUsXG4gICAgICAgIGNsYXNzTmFtZTogJ3F1aWNrLXZpZXctbW9kYWwnLFxuICAgICAgICB3aWR0aDogOTAwLFxuICAgICAgICB5OiAzMCxcbiAgICAgICAgaGVpZ2h0OiAnYXV0bycsXG4gICAgICAgIHRyYW5zaXRpb246IHtcbiAgICAgICAgICBtYXNzOiAxLFxuICAgICAgICAgIHRlbnNpb246IDAsXG4gICAgICAgICAgZnJpY3Rpb246IDAsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICAgIHJvdXRlci5wdXNoKFxuICAgICAge1xuICAgICAgICBwYXRobmFtZSxcbiAgICAgICAgcXVlcnksXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRobmFtZTogYXMsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzaGFsbG93OiB0cnVlLFxuICAgICAgfVxuICAgICk7XG4gIH07XG4gIC8vaWYgKGVycm9yKSByZXR1cm4gPEVycm9yTWVzc2FnZSBtZXNzYWdlPXtlcnJvci5tZXNzYWdlfSAvPjtcbiAgaWYgKGxvYWRpbmcgJiYgIWxvYWRpbmdNb3JlKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxMb2FkZXJXcmFwcGVyPlxuICAgICAgICA8TG9hZGVySXRlbT5cbiAgICAgICAgICA8UGxhY2Vob2xkZXIgdW5pcXVlS2V5PVwiMVwiIC8+XG4gICAgICAgIDwvTG9hZGVySXRlbT5cbiAgICAgICAgPExvYWRlckl0ZW0+XG4gICAgICAgICAgPFBsYWNlaG9sZGVyIHVuaXF1ZUtleT1cIjJcIiAvPlxuICAgICAgICA8L0xvYWRlckl0ZW0+XG4gICAgICAgIDxMb2FkZXJJdGVtPlxuICAgICAgICAgIDxQbGFjZWhvbGRlciB1bmlxdWVLZXk9XCIzXCIgLz5cbiAgICAgICAgPC9Mb2FkZXJJdGVtPlxuICAgICAgPC9Mb2FkZXJXcmFwcGVyPlxuICAgICk7XG4gIH1cblxuICAvLyBpZiAoIWRhdGEgfHwgIWRhdGEucHJvZHVjdHMgfHwgZGF0YS5wcm9kdWN0cy5pdGVtcy5sZW5ndGggPT09IDApIHtcbiAgLy8gICByZXR1cm4gPE5vUmVzdWx0Rm91bmQgLz47XG4gIC8vIH1cbiAgY29uc3QgaGFuZGxlTG9hZE1vcmUgPSAoKSA9PiB7XG4gICAgZmV0Y2hNb3JlKHtcbiAgICAgIHZhcmlhYmxlczoge1xuICAgICAgICBvZmZzZXQ6IE51bWJlcihkYXRhLnByb2R1Y3RzLml0ZW1zLmxlbmd0aCksXG4gICAgICAgIGxpbWl0OiBmZXRjaExpbWl0LFxuICAgICAgfSxcbiAgICAgIHVwZGF0ZVF1ZXJ5OiAocHJldmlvdXNSZXN1bHQsIHsgZmV0Y2hNb3JlUmVzdWx0IH0pID0+IHtcbiAgICAgICAgaWYgKCFmZXRjaE1vcmVSZXN1bHQpIHtcbiAgICAgICAgICByZXR1cm4gcHJldmlvdXNSZXN1bHQ7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBwcm9kdWN0czoge1xuICAgICAgICAgICAgX190eXBlbmFtZTogcHJldmlvdXNSZXN1bHQucHJvZHVjdHMuX190eXBlbmFtZSxcbiAgICAgICAgICAgIGl0ZW1zOiBbXG4gICAgICAgICAgICAgIC4uLnByZXZpb3VzUmVzdWx0LnByb2R1Y3RzLml0ZW1zLFxuICAgICAgICAgICAgICAuLi5mZXRjaE1vcmVSZXN1bHQucHJvZHVjdHMuaXRlbXMsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgaGFzTW9yZTogZmV0Y2hNb3JlUmVzdWx0LnByb2R1Y3RzLmhhc01vcmUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG5cbiAgY29uc3QgcmVuZGVyQ2FyZCA9IChwcm9kdWN0VHlwZSwgcHJvcHMpID0+IHtcbiAgICBzd2l0Y2ggKHByb2R1Y3RUeXBlKSB7XG4gICAgICBjYXNlICdib29rJzpcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8Qm9va0NhcmRcbiAgICAgICAgICAgIHRpdGxlPXtwcm9wcy50aXRsZX1cbiAgICAgICAgICAgIGltYWdlPXtwcm9wcy5pbWFnZX1cbiAgICAgICAgICAgIG5hbWU9e3Byb3BzPy5hdXRob3I/Lm5hbWV9XG4gICAgICAgICAgICBkYXRhPXtwcm9wc31cbiAgICAgICAgICAgIGRldmljZVR5cGU9e2RldmljZVR5cGV9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICByb3V0ZXIucHVzaCgnL3Byb2R1Y3QvW3NsdWddJywgYC9wcm9kdWN0LyR7cHJvcHMuc2x1Z31gKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICBjYXNlICdtZWRpY2luZSc6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPE1lZGljaW5lQ2FyZFxuICAgICAgICAgICAgdGl0bGU9e3Byb3BzLnRpdGxlfVxuICAgICAgICAgICAgY3VycmVuY3k9e0NVUlJFTkNZfVxuICAgICAgICAgICAgaW1hZ2U9e3Byb3BzLmltYWdlfVxuICAgICAgICAgICAgcHJpY2U9e3Byb3BzLnByaWNlfVxuICAgICAgICAgICAgd2VpZ2h0PXtwcm9wcy51bml0fVxuICAgICAgICAgICAgZGF0YT17cHJvcHN9XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIGNhc2UgJ2Z1cm5pdHVyZSc6XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgPEZ1cm5pdHVyZUNhcmRcbiAgICAgICAgICAgIHRpdGxlPXtwcm9wcy50aXRsZX1cbiAgICAgICAgICAgIGltYWdlPXtwcm9wcy5nYWxsZXJ5WzBdLnVybH1cbiAgICAgICAgICAgIGRpc2NvdW50SW5QZXJjZW50PXtwcm9wcy5kaXNjb3VudEluUGVyY2VudH1cbiAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+XG4gICAgICAgICAgICAgIGhhbmRsZVF1aWNrVmlld01vZGFsKHByb3BzLCBkZXZpY2VUeXBlLCBoYW5kbGVNb2RhbENsb3NlKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIDxHZW5lcmFsQ2FyZFxuICAgICAgICAgICAgdGl0bGU9e3Byb3BzLnRpdGxlfVxuICAgICAgICAgICAgZGVzY3JpcHRpb249e3Byb3BzLmRlc2NyaXB0aW9ufVxuICAgICAgICAgICAgaW1hZ2U9e3Byb3BzLnByaW1hcnlJbWFnZS5VUkxzLm1lZGl1bX1cbiAgICAgICAgICAgIHdlaWdodD17cHJvcHMudW5pdH1cbiAgICAgICAgICAgIGN1cnJlbmN5PXtwcm9wcy5wcmljaW5nWzBdLmN1cnJlbmN5LmNvZGV9XG4gICAgICAgICAgICBwcmljZT17cHJvcHMucHJpY2luZ1swXS5kaXNwbGF5UHJpY2V9XG4gICAgICAgICAgICBzYWxlUHJpY2U9ezIzfVxuICAgICAgICAgICAgZGlzY291bnRJblBlcmNlbnQ9ezJ9XG4gICAgICAgICAgICBkYXRhPXtwcm9wc31cbiAgICAgICAgICAgIGRldmljZVR5cGU9e2RldmljZVR5cGV9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PlxuICAgICAgICAgICAgICBoYW5kbGVRdWlja1ZpZXdNb2RhbChwcm9wcywgZGV2aWNlVHlwZSwgaGFuZGxlTW9kYWxDbG9zZSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgIH1cbiAgfTtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPFByb2R1Y3RzUm93PlxuICAgICAgICB7cHJvZHVjdHMubWFwKChpdGVtOiBhbnksIGluZGV4OiBudW1iZXIpID0+IChcbiAgICAgICAgICA8UHJvZHVjdHNDb2xcbiAgICAgICAgICAgIGtleT17aW5kZXh9XG4gICAgICAgICAgICBzdHlsZT17dHlwZSA9PT0gJ2Jvb2snID8geyBwYWRkaW5nTGVmdDogMCwgcGFkZGluZ1JpZ2h0OiAxIH0gOiB7fX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8UHJvZHVjdENhcmRXcmFwcGVyPlxuICAgICAgICAgICAgICA8RmFkZVxuICAgICAgICAgICAgICAgIGR1cmF0aW9uPXs4MDB9XG4gICAgICAgICAgICAgICAgZGVsYXk9e2luZGV4ICogMTB9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3sgaGVpZ2h0OiAnMTAwJScgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtyZW5kZXJDYXJkKHR5cGUsIGl0ZW0pfVxuICAgICAgICAgICAgICA8L0ZhZGU+XG4gICAgICAgICAgICA8L1Byb2R1Y3RDYXJkV3JhcHBlcj5cbiAgICAgICAgICA8L1Byb2R1Y3RzQ29sPlxuICAgICAgICApKX1cbiAgICAgIDwvUHJvZHVjdHNSb3c+XG5cbiAgICAgICAgPEJ1dHRvbldyYXBwZXI+XG4gICAgICAgICAgPEJ1dHRvblxuICAgICAgICAgICAgb25DbGljaz17aGFuZGxlTG9hZE1vcmV9XG4gICAgICAgICAgICBsb2FkaW5nPXtsb2FkaW5nTW9yZX1cbiAgICAgICAgICAgIHZhcmlhbnQ9XCJzZWNvbmRhcnlcIlxuICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgZm9udFNpemU6IDE0LFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGJvcmRlcj1cIjFweCBzb2xpZCAjZjFmMWYxXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8Rm9ybWF0dGVkTWVzc2FnZSBpZD1cImxvYWRNb3JlQnV0dG9uXCIgZGVmYXVsdE1lc3NhZ2U9XCJMb2FkIE1vcmVcIiAvPlxuICAgICAgICAgIDwvQnV0dG9uPlxuICAgICAgICA8L0J1dHRvbldyYXBwZXI+XG4gICAgPC8+XG4gICk7XG59O1xuKi9cbiAgcmV0dXJuIDw+PC8+XG59XG5cbmV4cG9ydCBkZWZhdWx0IFByb2R1Y3RzO1xuXG5cblxuLy9cbi8vIGltcG9ydCBMYXlvdXQgZnJvbSBcImNvbXBvbmVudHMvTGF5b3V0XCI7XG4vLyBpbXBvcnQgUHJvZHVjdEdyaWQgZnJvbSBcImNvbXBvbmVudHMvUHJvZHVjdEdyaWRcIjtcbi8vXG4vL1xuLy8gY29uc3QgcHJvZHVjdGdyaWQgPSAodXNlQ2F0YWxvZyk9PiB7XG4vL1xuLy8gICBjb25zdCBzZXRQYWdlU2l6ZSA9IChwYWdlU2l6ZSkgPT4ge1xuLy8gICAgIHRoaXMucHJvcHMucm91dGluZ1N0b3JlLnNldFNlYXJjaCh7IGxpbWl0OiBwYWdlU2l6ZSB9KTtcbi8vICAgICB0aGlzLnByb3BzLnVpU3RvcmUuc2V0UGFnZVNpemUocGFnZVNpemUpO1xuLy8gICB9O1xuLy9cbi8vICAgY29uc3Qgc2V0U29ydEJ5ID0gKHNvcnRCeSkgPT4ge1xuLy8gICAgIHRoaXMucHJvcHMucm91dGluZ1N0b3JlLnNldFNlYXJjaCh7IHNvcnRieTogc29ydEJ5IH0pO1xuLy8gICAgIHRoaXMucHJvcHMudWlTdG9yZS5zZXRTb3J0Qnkoc29ydEJ5KTtcbi8vICAgfTtcbi8vXG4vL1xuLy8gICBjb25zdCB7XG4vLyAgICAgY2F0YWxvZ0l0ZW1zLFxuLy8gICAgIGNhdGFsb2dJdGVtc1BhZ2VJbmZvLFxuLy8gICAgIGlzTG9hZGluZ0NhdGFsb2dJdGVtcyxcbi8vICAgICByb3V0aW5nU3RvcmU6IHsgcXVlcnkgfSxcbi8vICAgICBzaG9wLFxuLy8gICAgIHVpU3RvcmVcbi8vICAgfSA9IHVzZUNhdGFsb2c7XG4vL1xuLy8gICBjb25zdCB7IHJvdXRpbmdTdG9yZSB9ID0gdGhpcy5wcm9wcztcbi8vICAgcm91dGluZ1N0b3JlLnNldFRhZ0lkKG51bGwpO1xuLy9cbi8vXG4vLyAgIGNvbnN0IHBhZ2VTaXplID0gcXVlcnkgJiYgaW5QYWdlU2l6ZXMocXVlcnkubGltaXQpID8gcGFyc2VJbnQocXVlcnkubGltaXQsIDEwKSA6IHVpU3RvcmUucGFnZVNpemU7XG4vLyAgIGNvbnN0IHNvcnRCeSA9IHF1ZXJ5ICYmIHF1ZXJ5LnNvcnRieSA/IHF1ZXJ5LnNvcnRieSA6IHVpU3RvcmUuc29ydEJ5O1xuLy9cbi8vICAgLy8tLWNvbnNvbGUubG9nKGNhdGFsb2dJdGVtcylcbi8vICAgbGV0IHBhZ2VUaXRsZTtcbi8vICAgaWYgKHNob3ApIHtcbi8vICAgICBwYWdlVGl0bGUgPSBzaG9wLm5hbWU7XG4vLyAgICAgaWYgKHNob3AuZGVzY3JpcHRpb24pIHBhZ2VUaXRsZSA9IGAke3BhZ2VUaXRsZX0gfCAke3Nob3AuZGVzY3JpcHRpb259YDtcbi8vICAgfSBlbHNlIHtcbi8vICAgICBwYWdlVGl0bGUgPSBcIlN0b3JlZnJvbnRcIjtcbi8vICAgfVxuLy9cbi8vXG4vL1xuLy8gICByZXR1cm4gKFxuLy8gICAgIDxMYXlvdXQgc2hvcD17c2hvcH0+XG4vLyAgICAgICA8UHJvZHVjdEdyaWRcbi8vICAgICAgICAgY2F0YWxvZ0l0ZW1zPXtjYXRhbG9nSXRlbXN9XG4vLyAgICAgICAgIGN1cnJlbmN5Q29kZT17KHNob3AgJiYgc2hvcC5jdXJyZW5jeSAmJiBzaG9wLmN1cnJlbmN5LmNvZGUpIHx8IFwiVVNEXCJ9XG4vLyAgICAgICAgIGlzTG9hZGluZ0NhdGFsb2dJdGVtcz17aXNMb2FkaW5nQ2F0YWxvZ0l0ZW1zfVxuLy8gICAgICAgICBwYWdlSW5mbz17Y2F0YWxvZ0l0ZW1zUGFnZUluZm99XG4vLyAgICAgICAgIHBhZ2VTaXplPXtwYWdlU2l6ZX1cbi8vICAgICAgICAgc2V0UGFnZVNpemU9e3NldFBhZ2VTaXplfVxuLy8gICAgICAgICBzZXRTb3J0Qnk9e3NldFNvcnRCeX1cbi8vICAgICAgICAgc29ydEJ5PXtzb3J0Qnl9XG4vLyAgICAgICAvPlxuLy8gICAgIDwvTGF5b3V0PlxuLy8gICApO1xuLy8gfVxuXG5cbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./src/components/product-grid/product-list/product-list.tsx\n");

/***/ })

};;