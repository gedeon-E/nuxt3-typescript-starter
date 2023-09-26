<template>
  <v-text-field
    v-model="value"
    v-bind="field"
    :value="modelValue"
    :placeholder="placeholder"
    :label="label"
    :error-messages="errorMessages"
    :type="type"
    :disabled="disabled"
    :readonly="readOnly"
    :append-inner-icon="appendInnerIcon"
    :hint="hint"
    :maxlength="maxlength"
    :counter="counter"
    variant="solo-filled"
    rounded
    flat
  />
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Number, null], required: true, default: null },
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  appendInnerIcon: { type: String, default: '' },
  type: { type: String, default: 'text' },
  field: { type: Object, required: true },
  disabled: Boolean,
  readOnly: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  maxlength: { type: Number, default: null },
  errorMessages: { type: [Array, String], default: () => ([]) },
  counter: { type: Number, default: null }
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
