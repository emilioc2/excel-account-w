'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

const schema = z.object({
  name: z.string().min(1, 'Please enter your name.'),
  email: z.string().email('Please enter a valid email address.'),
  phone: z.string().optional(),
  serviceName: z.string(),
  message: z.string().optional(),
})

type FormData = z.infer<typeof schema>

interface ServiceEnquiryFormProps {
  serviceName: string
}

export default function ServiceEnquiryForm({ serviceName }: ServiceEnquiryFormProps): React.ReactElement {
  const [success, setSuccess] = useState(false)
  const [submitting, setSubmitting] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { serviceName },
  })

  const onSubmit = async (data: FormData): Promise<void> => {
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })
      const json = await res.json()
      if (json.success) setSuccess(true)
    } finally {
      setSubmitting(false)
    }
  }

  if (success) {
    return (
      <p role="alert" className="text-green-700 font-semibold py-4">
        Thank you — we&apos;ll be in touch shortly.
      </p>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="flex flex-col gap-4">
      <input type="hidden" {...register('serviceName')} />
      <p className="text-sm text-gray-500">
        Enquiring about: <strong>{serviceName}</strong>
      </p>

      <div className="flex flex-col gap-1">
        <label htmlFor="enq-name" className="text-sm font-medium text-navy">
          Name <span aria-hidden="true">*</span>
        </label>
        <input
          id="enq-name"
          type="text"
          autoComplete="name"
          {...register('name')}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {errors.name && (
          <p role="alert" className="text-red-600 text-xs">{errors.name.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="enq-email" className="text-sm font-medium text-navy">
          Email <span aria-hidden="true">*</span>
        </label>
        <input
          id="enq-email"
          type="email"
          autoComplete="email"
          {...register('email')}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
        />
        {errors.email && (
          <p role="alert" className="text-red-600 text-xs">{errors.email.message}</p>
        )}
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="enq-phone" className="text-sm font-medium text-navy">Phone</label>
        <input
          id="enq-phone"
          type="tel"
          autoComplete="tel"
          {...register('phone')}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label htmlFor="enq-message" className="text-sm font-medium text-navy">Message</label>
        <textarea
          id="enq-message"
          rows={4}
          {...register('message')}
          className="border border-gray-300 rounded px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-teal resize-none"
        />
      </div>

      <button
        type="submit"
        disabled={submitting}
        className="bg-teal hover:bg-teal-dark text-white font-semibold rounded px-6 transition-colors duration-200 min-h-[44px] disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {submitting ? 'Sending…' : 'Send Enquiry'}
      </button>
    </form>
  )
}
