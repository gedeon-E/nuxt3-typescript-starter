// import { PropType } from 'vue'

export const dynamicFieldCommonProps = {
  type: { type: String, default: 'text' },
  name: { type: String, required: true },
  placeholder: { type: String, default: '' },
  label: { type: String, default: '' },
  appendInnerIcon: { type: String, default: '' },
  disabled: Boolean,
  readOnly: { type: Boolean, default: false },
  hint: { type: String, default: '' },
  errorMessages: { type: [Array, String], default: () => ([]) },
  onUpdateModelValue: { type: Function, default: () => {} },
  density: { type: String as PropType<'default' | 'comfortable' | 'compact'>, default: 'default' }
}

export const dynamicFieldTextProps = {
  ...dynamicFieldCommonProps,
  maxlength: { type: Number, default: null },
  counter: { type: Number, default: null }
}

export const dynamicFieldPasswordProps = {
  ...dynamicFieldTextProps,
  updateMode: { type: Boolean, default: false }
}

export const dynamicFieldSelectProps = {
  ...dynamicFieldCommonProps,
  multiple: Boolean,
  itemTitle: { type: String, default: 'name' },
  itemValue: { type: String, default: 'id' },
  itemSubtitle: { type: String, default: null },
  selectFilter: { type: Boolean, default: false },
  items: { type: Array, default: () => ([]) }
}

export const dynamicFieldAutocompleteProps = {
  ...dynamicFieldSelectProps,
  acceptNewValue: { type: Boolean, default: false }
}

export const dynamicFieldFileProps = {
  ...dynamicFieldCommonProps
}

export const dynamicFieldSwitcherProps = {
  ...dynamicFieldCommonProps
}

export const dynamicFieldProps = {
  ...dynamicFieldCommonProps,
  ...dynamicFieldTextProps,
  ...dynamicFieldPasswordProps,
  ...dynamicFieldSelectProps,
  ...dynamicFieldAutocompleteProps,
  ...dynamicFieldFileProps
}
