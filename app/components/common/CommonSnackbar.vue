<template>
  <v-snackbar
    v-model="visible"
    :color="type"
    multi-line
    timeout="8000"
  >
    {{ message }}

    <template #actions>
      <v-btn
        color="gray"
        variant="tonal"
        size="small"
        @click="hideSnackbar()"
      >
        <span class="text-none">Close</span>
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { useSnackbarStore } from '@/stores/snackbar'

const snackbarStore = useSnackbarStore()

const { message, type, visible } = storeToRefs(snackbarStore)
const { hideSnackbar } = snackbarStore

</script>
