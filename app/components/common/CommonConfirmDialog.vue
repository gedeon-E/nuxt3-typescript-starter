<template>
  <CommonDialog
    v-model="dialog"
    width="400"
    title="En attente de confirmation"
    :action-text="actionText"
    :action-icon="actionIcon"
    @submit="onConfirm()"
  >
    <!-- eslint-disable-next-line vue/no-v-html -->
    <p v-html="props.text" />
  </CommonDialog>
</template>

<script lang="ts" setup>
const props = defineProps({
  modelValue: Boolean,
  text: { type: String, default: '' },
  actionText: { type: String, default: 'Valider' },
  actionIcon: { type: String, default: 'mdi-check' }
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
