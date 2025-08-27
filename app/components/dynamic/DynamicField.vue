<template>
  <Field v-slot="{ handleChange, handleBlur, field, errorMessage }" :name="(props.name as string)">
    <DynamicFieldText
      v-if="['text', 'number', 'date'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :type="type"
      :error-messages="errorMessage"
      :disabled="disabled"
      :hint="hint"
      @update:model-value="onUpdateModelValue"
    />
    <DynamicFieldSwitcher
      v-if="type === 'switcher'"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :error-messages="errorMessage"
      :disabled="disabled"
      :hint="hint"
      :handle-change="handleChange"
      :handle-blur="handleBlur"
      @update:model-value="emit('update:modelValue', $event)"
    />
    <DynamicFieldTextArea
      v-if="['textarea'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :type="type"
      :error-messages="errorMessage"
      :disabled="disabled"
      :hint="hint"
      @update:model-value="onUpdateModelValue"
    />
    <DynamicFieldPassword
      v-if="['password'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :type="type"
      :error-messages="errorMessage"
      :disabled="disabled"
      :hint="hint"
      @update:model-value="onUpdateModelValue"
    />
    <DynamicFieldSelect
      v-if="['select', 'select-multiple'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :error-messages="errorMessage"
      :multiple="type === 'select-multiple'"
      :items="items"
      @update:model-value="onUpdateModelValue"
    />
    <DynamicFieldAutocomplete
      v-if="type === 'autocomplete'"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :error-messages="errorMessage"
      :items="items"
      @update:model-value="onUpdateModelValue"
    />
    <DynamicFieldCombobox
      v-if="type === 'combobox'"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :error-messages="errorMessage"
      :items="items"
      @update:model-value="onUpdateModelValue"
    />
    <DynamicFieldFile
      v-if="['image', 'file'].includes(type)"
      v-model="field.value"
      v-bind="props"
      :field="field"
      :type="type"
      :error-messages="errorMessage"
      :disabled="disabled"
      :hint="hint"
      :handle-change="handleChange"
      :handle-blur="handleBlur"
      @update:model-value="onUpdateModelValue"
    />
  </Field>
</template>

<script lang="ts" setup>
import { Field } from 'vee-validate'
import { dynamicFieldProps } from '@/types/dynamicField'

const props = defineProps(dynamicFieldProps)

const emit = defineEmits(['update:modelValue'])

function onUpdateModelValue ($event: Event) {
  emit('update:modelValue', $event)
  if (props.onUpdateModelValue) {
    props.onUpdateModelValue($event)
  }
}
</script>
