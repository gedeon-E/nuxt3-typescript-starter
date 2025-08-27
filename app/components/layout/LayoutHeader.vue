<template>
  <div>
    <div
      class="layout-header-container"
      :class="{ 'sidebar-hidden': !isSidebarVisible }"
    >
      <div class="layout-header-content">
        <v-card class="layout-header-card" rounded="xl" elevation="0">
          <template #text>
            <div class="d-flex justify-space-between align-center px-2">
              <div class="d-flex align-center">
                <v-btn
                  class="show-sidebar-btn"
                  icon="mdi-menu-close"
                  @click="emit('show-sidebar')"
                />

                <div class="logo" />
                <h1>{{ config.appName }}</h1>
              </div>

              <div class="d-flex">
                <v-btn
                  class="ml-3"
                  color="secondary"
                  icon="mdi-account"
                  size="small"
                  to="/admin/my-account"
                />

                <v-btn
                  class="ml-3"
                  color="primary"
                  icon="mdi-refresh"
                  size="small"
                  @click="reloadNuxtApp()"
                />
              </div>
            </div>
          </template>
        </v-card>
      </div>
    </div>
    <div class="layout-header-spacer" />
  </div>
</template>

<script lang="ts" setup>
defineProps({
  isSidebarVisible: { type: Boolean, required: true }
})
const config = useAppConfig()

const emit = defineEmits(['show-sidebar'])
</script>

<style lang="scss" scoped>
  .layout-header-spacer, .layout-header-container {
    height: $header-height;
    width: 100%;
  }

  .layout-header-container {
    position: fixed;
    z-index: 4;
    top: 0;
    left: $main-content-left-offset;
    width: calc(100% - $main-content-left-offset - 20px);
    margin-left: 10px;
    padding-top: 13px;
    background-color: white;
    transition: all 0.3s ease-in-out;

    .layout-header-content {
      background-color: $bg-card;
      padding-top: 15px;
      border-radius: 20px;
      padding-left: 10px;
      padding-right: 10px;
    }

    h1 {
      font-family: 'Monoton', sans-serif;
      font-weight: 100;
      font-size: 28px;
    }

    .show-sidebar-btn {
      transform: scale(0);
      transition: all 0.3s ease-in-out;
      opacity: 0;
      position: absolute;
      left: 10px;
    }

    .logo {
      margin-left: 0;
      transition: all 0.3s ease-in-out;
    }

    &.sidebar-hidden {
      left: 0;
      width: calc(100% - 20px);
      .show-sidebar-btn {
        transform: scale(1);
        opacity: 1;
      }

      .logo {
        margin-left: 50px;
      }
    }
  }
</style>
