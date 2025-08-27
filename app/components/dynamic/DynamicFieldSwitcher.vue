<template>
  <v-switch
    v-model="value"
    :label="label"
    :error-messages="errorMessages"
    :disabled="disabled"
    :readonly="readOnly"
    :hint="hint"
    color="primary"
    variant="solo-filled"
    rounded
    flat
    @update:model-value="handleChange"
    @blur="handleBlur"
  />
</template>

<script setup>
import { dynamicFieldSwitcherProps } from '@/types/dynamicField'

const props = defineProps({
  ...dynamicFieldSwitcherProps,
  modelValue: { type: Boolean, required: true, default: false },
  handleChange: { type: Function, default: () => {} },
  handleBlur: { type: Function, default: () => {} }
})

const value = ref(props.modelValue)
</script>
