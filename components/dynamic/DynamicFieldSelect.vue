<template>
  <v-select
    v-model="value"
    v-bind="field"
    :value="modelValue"
    :placeholder="placeholder"
    :label="label"
    :error-messages="errorMessages"
    :multiple="multiple"
    :items="filteredItems"
    :item-title="itemTitle"
    :item-value="itemValue"
    :readonly="readOnly"
    :density="density"
    variant="solo-filled"
    chips
    rounded
    flat
  >
    <template v-if="selectFilter" #prepend-item>
      <v-text-field v-model="filter" placeholder="Rechercher" />
    </template>

    <template v-if="itemSubtitle" #item="{ props: selectProps, item }">
      <v-list-item
        lines="3"
        v-bind="selectProps"
        :title="item?.raw[itemTitle]"
        :subtitle="item?.raw[itemSubtitle]"
      />
    </template>
  </v-select>
</template>

<script setup>
import { dynamicFieldSelectProps } from '@/types/dynamicField'

const props = defineProps({
  modelValue: { type: [String, Array, Number, null], required: true, default: null },
  field: { type: Object, required: true },
  ...dynamicFieldSelectProps
})
const emit = defineEmits(['update:modelValue'])

const filter = ref('')

const value = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})

const filteredItems = computed(() => {
  if (props.itemTitle || props.itemSubtitle) {
    const regex = new RegExp(filter.value, 'i')
    return props.items
      .filter(item => (
        props.itemTitle && item[props.itemTitle] && item[props.itemTitle].toString().match(regex)
      ) || (
        props.itemSubtitle && item[props.itemSubtitle] && item[props.itemSubtitle].match(regex)
      ))
  }
  return props.items.slice()
})
</script>
