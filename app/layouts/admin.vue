<template>
  <div>
    <div class="admin-layout-container">
      <LayoutSidebar
        :show-sidebar="showSidebar"
        @hide-sidebar="showSidebar = false"
      >
        <div>
          <LayoutHeader
            :is-sidebar-visible="showSidebar"
            @show-sidebar="showSidebar = true"
          />
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
    <CommonAlert />
  </div>
</template>

<script setup lang="ts">
const { isMobile } = useMQ()

const showSidebar = ref(true)

watch(isMobile, (newIsMobile) => {
  showSidebar.value = !newIsMobile
})
</script>

<style lang="scss">
  .admin-layout-container {
    background-color: white;
    width: 100%;
    min-height: 100vh;
  }
</style>
