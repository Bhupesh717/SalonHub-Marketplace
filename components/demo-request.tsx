'use client'

import { useState, useEffect } from 'react'
import { Send, X } from 'lucide-react'

interface DemoRequestProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export default function DemoRequest({ open, onOpenChange }: DemoRequestProps) {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    school: '',
    enquiryType: '',
    message: '',
  })

  const enquiryOptions = [
    { value: '', label: 'Select an enquiry type' },
    { value: 'product-demo', label: 'Request a Product Demo' },
    { value: 'pricing', label: 'Pricing or Plans' },
    { value: 'technical', label: 'Technical Support' },
    { value: 'partnership', label: 'Partnership or Collaboration' },
    { value: 'other', label: 'Other' },
  ]

  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => e.key === 'Escape' && onOpenChange(false)
    if (open) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = 'unset'
    }
  }, [open, onOpenChange])

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    onOpenChange(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-auto max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-2xl font-bold text-gray-900">Request a Demo</h2>
          <button
            onClick={() => onOpenChange(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Full Name *
              </label>
              <input
                type="text"
                required
                value={formData.fullName}
                onChange={e => handleChange('fullName', e.target.value)}
                placeholder="John Doe"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Email Address *
              </label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={e => handleChange('email', e.target.value)}
                placeholder="john@example.com"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                Phone Number
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={e => handleChange('phone', e.target.value)}
                placeholder="+91 (555) 123-4567"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 block mb-1">
                School Name
              </label>
              <input
                type="text"
                value={formData.school}
                onChange={e => handleChange('school', e.target.value)}
                placeholder="Your School Name"
                className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black transition-all"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Enquiry Type *
            </label>
            <select
              required
              value={formData.enquiryType}
              onChange={e => handleChange('enquiryType', e.target.value)}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black text-gray-700 transition-all"
            >
              {enquiryOptions.map(option => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 block mb-1">
              Message *
            </label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={e => handleChange('message', e.target.value)}
              placeholder="Tell us more about your inquiry..."
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:ring-2 focus:ring-black focus:border-black resize-none transition-all"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-black text-white font-semibold py-3 px-6 rounded-md hover:bg-gray-900 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <Send className="h-5 w-5" />
            Send Message
          </button>

          <p className="text-xs text-gray-500 text-center">
            We respect your privacy. Your information will only be used to respond to your inquiry.
          </p>
        </form>
      </div>
    </div>
  )
}
