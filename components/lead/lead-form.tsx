'use client'

import {
  Alert,
  Button,
  Checkbox,
  CheckboxGroup,
  Input,
  Label,
  TextArea,
  TextField,
} from '@heroui/react'
import { useLocale, useTranslations } from 'next-intl'
import { FormEvent, useState } from 'react'

import { trpc } from '@/utils/trpc-client'

import FieldSelect from './field-select'
import { COUNTRY_VALUES, INDUSTRY_VALUES, PRODUCT_VALUES } from './options'

interface LeadFormProps {
  /** 归因用：这份留资来自哪个位置 */
  source?: string
}

export default function LeadForm({ source }: LeadFormProps) {
  const t = useTranslations('Lead')
  const locale = useLocale()

  const [country, setCountry] = useState<string | null>(null)
  const [industry, setIndustry] = useState<string | null>(null)
  const [interests, setInterests] = useState<string[]>([])
  const [error, setError] = useState<string | null>(null)

  const submit = trpc.lead.submit.useMutation()

  const countryOptions = COUNTRY_VALUES.map((value) => ({
    value,
    label: t(`country_${value}`),
  }))
  const industryOptions = INDUSTRY_VALUES.map((value) => ({
    value,
    label: t(`industry_${value}`),
  }))

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError(null)

    const form = new FormData(event.currentTarget)

    try {
      await submit.mutateAsync({
        email: String(form.get('email') ?? ''),
        fullName: String(form.get('full_name') ?? '') || undefined,
        phone: String(form.get('phone') ?? '') || undefined,
        jobTitle: String(form.get('job_title') ?? '') || undefined,
        message: String(form.get('message') ?? '') || undefined,
        country: country ?? undefined,
        industry: industry ?? undefined,
        productInterest: interests as never,
        source,
        locale,
      })
    } catch {
      setError(t('error_submit'))
    }
  }

  if (submit.isSuccess) {
    return (
      <Alert status="success" className="text-sm">
        {t('success')}
      </Alert>
    )
  }

  return (
    <form className="flex flex-col gap-4" onSubmit={onSubmit}>
      {error ? (
        <Alert status="danger" className="text-sm">
          {error}
        </Alert>
      ) : null}

      <TextField isRequired className="w-full" name="email" type="email">
        <Label>{t('email')}</Label>
        <Input
          autoComplete="email"
          className="border-default/50 border"
          placeholder="you@company.com"
        />
      </TextField>

      <div className="grid gap-4 sm:grid-cols-2">
        <TextField className="w-full" name="full_name">
          <Label>{t('full_name')}</Label>
          <Input autoComplete="name" className="border-default/50 border" />
        </TextField>

        <TextField className="w-full" name="phone" type="tel">
          <Label>{t('phone')}</Label>
          <Input autoComplete="tel" className="border-default/50 border" />
        </TextField>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <FieldSelect
          label={t('country')}
          name="country"
          onChange={setCountry}
          options={countryOptions}
          placeholder={t('select_placeholder')}
          value={country}
        />
        <FieldSelect
          label={t('industry')}
          name="industry"
          onChange={setIndustry}
          options={industryOptions}
          placeholder={t('select_placeholder')}
          value={industry}
        />
      </div>

      <TextField className="w-full" name="job_title">
        <Label>{t('job_title')}</Label>
        {/* 职位不做枚举：真实职位名称千差万别，下拉框只会逼人选「其他」 */}
        <Input
          autoComplete="organization-title"
          className="border-default/50 border"
          placeholder={t('job_title_placeholder')}
        />
      </TextField>

      <CheckboxGroup
        className="flex flex-col gap-2"
        value={interests}
        onChange={setInterests}
      >
        <Label>{t('product_interest')}</Label>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
          {PRODUCT_VALUES.map((value) => (
            <Checkbox key={value} className="text-muted text-sm" value={value}>
              <Checkbox.Content>
                <Checkbox.Control className="border-default/60 border">
                  <Checkbox.Indicator />
                </Checkbox.Control>
                {t(`product_${value}`)}
              </Checkbox.Content>
            </Checkbox>
          ))}
        </div>
      </CheckboxGroup>

      <TextField className="w-full" name="message">
        <Label>{t('message')}</Label>
        <TextArea
          className="border-default/50 min-h-24 border"
          placeholder={t('message_placeholder')}
        />
      </TextField>

      <Button
        className="mt-1 w-full"
        isDisabled={submit.isPending}
        type="submit"
        variant="primary"
      >
        {submit.isPending ? t('submitting') : t('submit')}
      </Button>

      <p className="text-muted text-center text-xs">{t('privacy_note')}</p>
    </form>
  )
}
