<template>
  <Field v-slot="{ field, errorMessage }" :name="props.name">
    <DynamicFieldText
      v-if="['text', 'number', 'date'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :type="type"
      :error-messages="errorMessage"
      :disabled="disabled"
      :hint="hint"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <DynamicFieldSelect
      v-if="['select', 'select-multiple'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :error-messages="errorMessage"
      :multiple="type === 'select-multiple'"
      :items="items"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <DynamicFieldAutocomplete
      v-if="type === 'autocomplete'"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :error-messages="errorMessage"
      :multiple="type === 'select-multiple'"
      :items="items"
      @update:model-value="emit('update:modelValue', $event)"
    />
  </Field>
</template>

<script setup>
import { Field } from 'vee-validate'

const props = defineProps({
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  type: { type: String, default: 'text' },
  appendInnerIcon: { type: String, default: '' },
  hint: { type: String, default: '' },
  disabled: Boolean,
  readOnly: { type: Boolean, default: false },
  selectFilter: { type: Boolean, default: false },
  items: { type: Array, default: () => ([]) },
  itemTitle: { type: String, default: 'name' },
  itemValue: { type: String, default: 'id' },
  itemSubtitle: { type: String, default: null },
  maxlength: { type: Number, default: null },
  acceptNewValue: { type: Boolean, default: false },
  counter: { type: Number, default: null }
})

const emit = defineEmits(['update:modelValue'])
</script>
