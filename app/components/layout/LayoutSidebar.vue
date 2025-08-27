<template>
  <div
    class="layout-sidebar-container"
    :class="{ 'layout-sidebar-container-hidden': !showSidebar }"
  >
    <div class="layout-sidebar-content-wrapper">
      <div class="layout-sidebar-content">
        <div class="h-100 d-flex flex-column justify-space-between">
          <div>
            <div class="header-infos-container">
              <v-card
                rounded="xl"
                elevation="0"
              >
                <template #text>
                  <div class="d-flex justify-space-between">
                    <div class="d-flex align-center">
                      <v-avatar color="primary" class="mr-2">
                        <v-icon icon="mdi-account-circle" />
                      </v-avatar>
                      <div class="header-infos">
                        <small> Connecté en tant que </small> <br>
                        <v-tooltip :text="currentUser.email" location="bottom">
                          <template #activator="{ props }">
                            <span
                              v-bind="props"
                              class="text-primary"
                            >
                              {{ currentUser.email }}
                            </span>
                          </template>
                        </v-tooltip>
                      </div>
                    </div>
                    <div>
                      <v-btn
                        icon="mdi-menu-open"
                        @click="emit('hide-sidebar')"
                      />
                    </div>
                  </div>
                </template>
              </v-card>
            </div>

            <div class="header-infos-spacer" />

            <div class="mt-3">
              <LayoutSidebarLinks />
            </div>
          </div>

          <div class="text-center">
            <img src="~/assets/logo/nodejs-logo.jpg" class="my-2" alt="logo" width="80">
          </div>
        </div>
      </div>
    </div>

    <div class="content">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { UserI } from '~/types/user'

defineProps<{
  showSidebar: boolean
}>()

const { data } = useAuth()
const currentUser = data.value as UserI

const emit = defineEmits(['hide-sidebar'])
</script>

<style lang="scss">
@use "@/assets/scss/mixins.scss" as *;

$layout-sidebar-height: 92px;

.layout-sidebar-container {
  display: flex;
  padding: 10px;
  box-sizing: border-box;
  .layout-sidebar-content-wrapper {
    width: $sidebar-width;
    opacity: 1;
    transform: translateX(0);
    position: fixed;
    transition: all 0.3s ease-in-out;
  }

  .layout-sidebar-content {
    width: $sidebar-width;
    background: $bg-card;
    padding: 10px;
    border-radius: 20px;
    height: calc(100vh - 20px);
    overflow-y: scroll;
    position: fixed;
    @include stylized-scrollbar;
    .header-infos-container {
      position: fixed;
      height: $layout-sidebar-height;
      z-index: 3;
      background-color: $bg-card;
      padding-top: 20px;
      top: 0;
      .header-infos {
        width: 145px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
    .header-infos-spacer {
      height: $layout-sidebar-height;
    }
  }
  .content {
    padding: 10px;
    width: calc(100% - $main-content-left-offset);
    background: $bg-card;
    border-radius: 20px;
    margin-left: 10px;
    position: relative;
    left: $sidebar-width;
    transition: all 0.3s ease-in-out;
  }

  &.layout-sidebar-container-hidden {
    .layout-sidebar-content-wrapper {
      opacity: 0;
      transform: translateX(-100%);
    }
    .content {
      left: 0;
      width: 100%;
      margin-left: 0;
    }
  }
}
</style>
