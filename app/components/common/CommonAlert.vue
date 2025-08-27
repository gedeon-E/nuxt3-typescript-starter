<template>
  <CommonDialog
    v-model="visible"
    width="400"
    title="ALERTE"
    action-text="D'accord"
    action-icon="mdi-check"
    @submit="hideAlert()"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="message" />
  </CommonDialog>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useAlertStore } from '@/stores/alert'

const alertStore = useAlertStore()

const { message, visible } = storeToRefs(alertStore)
const { hideAlert } = alertStore

</script>
