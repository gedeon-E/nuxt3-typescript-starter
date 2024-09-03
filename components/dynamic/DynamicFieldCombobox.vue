<template>
  <v-combobox
    v-model="value"
    v-bind="field"
    :value="modelValue"
    :placeholder="placeholder"
    :label="label"
    :error-messages="errorMessages"
    :multiple="multiple"
    :items="items"
    :item-title="itemTitle"
    :item-value="itemValue"
    :readonly="readOnly"
    :custom-filter="itemSubtitle ? customFilter : null"
    :density="density"
    auto-select-first
    variant="solo-filled"
    rounded
    flat
    chips
  >
    <template v-if="itemSubtitle" #item="{ props: autocompleteProps, item }">
      <v-list-item
        lines="3"
        v-bind="autocompleteProps"
        :title="item?.raw[itemTitle]"
        :subtitle="item?.raw[itemSubtitle]"
      />
    </template>
  </v-combobox>
</template>

<script setup>
import { dynamicFieldAutocompleteProps } from '@/types/dynamicField'

const props = defineProps({
  modelValue: { type: [String, Array, Number, null], required: true, default: null },
  field: { type: Object, required: true },
  ...dynamicFieldAutocompleteProps
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

function customFilter (_, queryText, item) {
  const textOne = item.raw[props.itemTitle].toLowerCase()
  const textTwo = item.raw[props.itemSubtitle].toLowerCase()
  const searchText = queryText.toLowerCase()

  return textOne.includes(searchText) ||
    textTwo.includes(searchText)
}
</script>
