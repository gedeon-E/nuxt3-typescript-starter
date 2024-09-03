<template>
  <v-file-input
    v-model="settlementFile"
    :placeholder="placeholder"
    :label="label"
    :error-messages="errorMessages"
    :disabled="disabled"
    :readonly="readOnly"
    :hint="hint"
    :accept="acceptedFile"
    :density="density"
    variant="solo-filled"
    rounded
    flat
    clearable
    chips
    @update:model-value="handleChange"
    @blur="handleBlur"
  />
</template>

<script setup>
import { dynamicFieldFileProps } from '@/types/dynamicField'

const props = defineProps({
  ...dynamicFieldFileProps,
  modelValue: { type: [String, Array, null], required: true, default: null },
  handleChange: { type: Function, default: () => {} },
  handleBlur: { type: Function, default: () => {} }
})
defineEmits(['update:modelValue'])

const settlementFile = ref<Array<File>>(undefined)

const acceptedFile = computed(() => {
  if (props.type === 'image') {
    return 'image/png, image/jpeg, image/bmp'
  } if (props.type === 'file-excel') {
    return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel'
  }
  return '*'
})
</script>
