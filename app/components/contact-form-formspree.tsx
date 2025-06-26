"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, CheckCircle, AlertCircle } from "lucide-react"

export function ContactFormFormspree() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")

  const whatsappNumber = "00962799033406"
  const whatsappLink = `https://wa.me/${whatsappNumber}`

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    const form = e.currentTarget
    const formData = new FormData(form)

    try {
      // استبدل YOUR_FORM_ID بالـ ID الفعلي من Formspree
      const response = await fetch("https://formspree.io/f/ordowazordoo@gmail.com", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        setIsSubmitted(true)
        form.reset()
      } else {
        throw new Error("فشل في إرسال الرسالة")
      }
    } catch (error) {
      setError("حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
      <div className="container mx-auto relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">أرسل لنا رسالة</h3>
            <p className="text-xl text-blue-100 mb-4">سيتم إرسال رسالتك مباشرة إلى ordowazordoo@gmail.com</p>
            <div className="bg-green-100 border border-green-300 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">
                ✅ <strong>الإرسال الفعلي مُفعل!</strong> ستصل رسالتك إلى الإيميل المطلوب
              </p>
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-gray-600 mb-2">تم إرسال رسالتك إلى:</p>
                <p className="text-blue-600 font-mono font-bold mb-6">ordowazordoo@gmail.com</p>
                <p className="text-gray-500 mb-8">سنقوم بالرد عليك في أقرب وقت ممكن</p>
                <div className="space-y-4">
                  <Button onClick={() => setIsSubmitted(false)} variant="outline" className="w-full">
                    إرسال رسالة أخرى
                  </Button>
                  <Button
                    onClick={() => window.open(whatsappLink, "_blank")}
                    className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  >
                    <MessageCircle className="h-4 w-4 ml-2" />
                    تواصل عبر واتساب
                  </Button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <input type="hidden" name="_to" value="ordowazordoo@gmail.com" />
                <input type="hidden" name="_subject" value="رسالة جديدة من موقع أردواز" />
                <input type="hidden" name="_next" value="thank-you" />

                <div>
                  <input
                    type="text"
                    name="name"
                    placeholder="الاسم الكامل"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    placeholder="البريد الإلكتروني"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    placeholder="رقم الهاتف"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <select
                    name="country"
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all duration-300 disabled:opacity-50"
                  >
                    <option value="">اختر الدولة</option>
                    <option value="السعودية">السعودية</option>
                    <option value="الإمارات">الإمارات العربية المتحدة</option>
                    <option value="الكويت">الكويت</option>
                    <option value="قطر">قطر</option>
                    <option value="البحرين">البحرين</option>
                    <option value="عمان">عمان</option>
                    <option value="الأردن">الأردن</option>
                    <option value="لبنان">لبنان</option>
                    <option value="سوريا">سوريا</option>
                    <option value="العراق">العراق</option>
                    <option value="مصر">مصر</option>
                    <option value="المغرب">المغرب</option>
                    <option value="الجزائر">الجزائر</option>
                    <option value="تونس">تونس</option>
                    <option value="ليبيا">ليبيا</option>
                    <option value="السودان">السودان</option>
                    <option value="اليمن">اليمن</option>
                    <option value="فلسطين">فلسطين</option>
                    <option value="أخرى">أخرى</option>
                  </select>
                </div>

                <div>
                  <textarea
                    name="message"
                    placeholder="اترك رسالتك هنا..."
                    required
                    rows={6}
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none transition-all duration-300 disabled:opacity-50"
                  ></textarea>
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      <span>جاري الإرسال إلى ordowazordoo@gmail.com...</span>
                    </div>
                  ) : (
                    "إرسل رسالة إلى ordowazordoo@gmail.com"
                  )}
                </Button>

                {error && (
                  <div className="p-4 rounded-xl text-center font-medium bg-red-100 text-red-800 border border-red-200 flex items-center justify-center space-x-2 space-x-reverse">
                    <AlertCircle className="h-5 w-5" />
                    <span>{error}</span>
                  </div>
                )}
              </form>
            )}

            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-center text-gray-600 mb-4">أو تواصل معنا مباشرة عبر واتساب</p>
              <Button
                onClick={() => window.open(whatsappLink, "_blank")}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                <MessageCircle className="h-4 w-4 ml-2" />
                تواصل عبر واتساب
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
