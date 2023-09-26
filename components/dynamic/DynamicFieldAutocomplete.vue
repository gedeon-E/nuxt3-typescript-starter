<template>
  <v-autocomplete
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
    auto-select-first
    variant="solo-filled"
    rounded
    flat
    chips
    @update:focused="onFocused($event)"
  >
    <template v-if="itemSubtitle" #item="{ props: autocompleteProps, item }">
      <v-list-item
        lines="3"
        v-bind="autocompleteProps"
        :title="item?.raw[itemTitle]"
        :subtitle="item?.raw[itemSubtitle]"
      />
    </template>
  </v-autocomplete>
</template>

<script setup>
const props = defineProps({
  modelValue: { type: [String, Array, null], required: true, default: null },
  multiple: Boolean,
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  itemTitle: { type: String, default: 'name' },
  itemValue: { type: String, default: 'id' },
  itemSubtitle: { type: String, default: null },
  field: { type: Object, required: true },
  readOnly: { type: Boolean, default: false },
  acceptNewValue: { type: Boolean, default: false },
  errorMessages: { type: [Array, String], default: () => ([]) },
  items: { type: Array, default: () => ([]) }
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

function onFocused (focused) {
  if (
    !props.acceptNewValue &&
    !focused &&
    !props.items.find(item => item[props.itemValue] === value.value)
  ) {
    value.value = null
  }
}
</script>
