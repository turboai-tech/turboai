'use client'

import { Label, ListBox, Select } from '@heroui/react'

export interface SelectOption {
  value: string
  label: string
}

interface FieldSelectProps {
  label: string
  name: string
  placeholder: string
  options: SelectOption[]
  value: string | null
  onChange: (value: string | null) => void
  isRequired?: boolean
}

/**
 * Form select wired to HeroUI v3’s Select composition.
 * Use `value` / `onChange` and static ListBox items with `id` + `textValue`
 * — the `items` render-prop shape without `id` leaves the menu unusable.
 */
export default function FieldSelect({
  label,
  name,
  placeholder,
  options,
  value,
  onChange,
  isRequired = false,
}: FieldSelectProps) {
  return (
    <Select
      className="w-full"
      isRequired={isRequired}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={(key) => onChange(key == null ? null : String(key))}>
      <Label>{label}</Label>
      <Select.Trigger className="border border-default/50" type="button">
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover className="z-50">
        <ListBox>
          {options.map((option) => (
            <ListBox.Item
              key={option.value}
              id={option.value}
              textValue={option.label}>
              {option.label}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
    </Select>
  )
}
