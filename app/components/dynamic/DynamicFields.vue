<template>
  <v-row>
    <v-col
      v-for="(field) in props.fields"
      :key="field.name"
      :md="responsive ? '6' : '12'"
      class="pb-0"
      cols="12"
    >
      <DynamicField v-bind="field" />
    </v-col>
  </v-row>
</template>

<script setup>
const props = defineProps({
  fields: { type: Array, default: () => ([]) },
  responsive: Boolean
})
</script>
