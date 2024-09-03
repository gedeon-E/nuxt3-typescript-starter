<template>
  <div>
    <v-text-field
      v-if="!updateMode || enableEditOnUpadteMode"
      v-model="value"
      v-bind="field"
      :value="modelValue"
      :placeholder="placeholder"
      :label="label"
      :error-messages="errorMessages"
      :type="computedType"
      :disabled="disabled"
      :readonly="readOnly"
      :append-inner-icon="computedIcon"
      :hint="hint"
      :maxlength="maxlength"
      :counter="counter"
      :density="density"
      variant="solo-filled"
      rounded
      flat
      @click:append-inner="onClickAppendIcon()"
    />
    <div v-else>
      <p class="ml-2 mb-1">
        {{ label }}
      </p>
      <div class="d-flex justify-space-between align-center">
        <v-chip>
          ********************************
        </v-chip>

        <v-btn size="small" icon="mdi-pencil" @click="enableEditOnUpadteMode = true" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { dynamicFieldPasswordProps } from '@/types/dynamicField'

const props = defineProps({
  modelValue: { type: [String, Number, null], required: true, default: null },
  field: { type: Object, required: true },
  ...dynamicFieldPasswordProps
})
const emit = defineEmits(['update:modelValue'])

const showPassword = ref(false)
const enableEditOnUpadteMode = ref(false)

const value = computed({
  get () {
    return props.modelValue
  },
  set (newValue) {
    emit('update:modelValue', newValue)
  }
})

const computedIcon = computed(() => (showPassword.value ? 'mdi-eye' : 'mdi-eye-off'))

const computedType = computed(() => (showPassword.value ? 'text' : 'password'))

function onClickAppendIcon () {
  showPassword.value = !showPassword.value
}
</script>
