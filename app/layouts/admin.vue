<template>
  <div>
    <div class="admin-layout-container">
      <LayoutSidebar>
        <div>
          <LayoutHeader />
        </div>
        <div>
          <CommonBreadcrumb />
          <div class="mt-3">
            <slot />
          </div>
        </div>
      </LayoutSidebar>
    </div>

    <CommonSnackbar />
  </div>
</template>

<style lang="scss">
  .admin-layout-container {
    background-color: white;
    width: 100%;
    min-height: 100vh;
  }
</style>
