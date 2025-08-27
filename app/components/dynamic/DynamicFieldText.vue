<template>
  <v-text-field
    v-model="value"
    v-bind="field"
    :value="modelValue"
    :placeholder="placeholder || label"
    :label="label"
    :error-messages="errorMessages"
    :type="type"
    :disabled="disabled"
    :readonly="readOnly"
    :append-inner-icon="appendInnerIcon"
    :hint="hint"
    :maxlength="maxlength"
    :counter="counter"
    :density="density"
    variant="solo-filled"
    rounded
    flat
  />
</template>

<script setup>
import { dynamicFieldTextProps } from '@/types/dynamicField'

const props = defineProps({
  modelValue: { type: [String, Number, null], required: true, default: null },
  field: { type: Object, required: true },
  ...dynamicFieldTextProps
})
const emit = defineEmits(['update:modelValue'])

const value = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})
</script>
