<template>
  <CommonDialog
    v-model="dialog"
    width="400"
    title="En attente de confirmation"
    action-text="Supprimer"
    action-icon="mdi-delete"
    @submit="onConfirm()"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="props.text" />
  </CommonDialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: Boolean,
  text: { type: String, default: '' }
})

const emit = defineEmits(['update:modelValue', 'confirm'])

const dialog = computed({
  get () {
    return props.modelValue
  },
  set (value) {
    emit('update:modelValue', value)
  }
})

function onConfirm () {
  dialog.value = false
  emit('confirm')
}
</script>
