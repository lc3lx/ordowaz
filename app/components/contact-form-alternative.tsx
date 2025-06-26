"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, CheckCircle, AlertCircle } from "lucide-react"

// نموذج بديل يعمل بدون Server Actions
export function ContactFormAlternative() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const whatsappNumber = "00962799033406"
  const whatsappLink = `https://wa.me/${whatsappNumber}`

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault() // منع إعادة تحميل الصفحة
    setIsSubmitting(true)
    setStatus(null)

    try {
      // التحقق من الحقول المطلوبة
      if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
        setStatus({
          success: false,
          message: "جميع الحقول مطلوبة",
        })
        return
      }

      // التحقق من صحة الإيميل
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setStatus({
          success: false,
          message: "يرجى إدخال بريد إلكتروني صحيح",
        })
        return
      }

      // محاكاة إرسال الإيميل
      await new Promise((resolve) => setTimeout(resolve, 2000))

      // تسجيل البيانات
      console.log("📧 رسالة جديدة من موقع أردواز:")
      console.log("=====================================")
      console.log(`الاسم: ${formData.fullName}`)
      console.log(`الإيميل: ${formData.email}`)
      console.log(`الهاتف: ${formData.phone}`)
      console.log(`الدولة: ${formData.country || "غير محدد"}`)
      console.log(`الرسالة: ${formData.message}`)
      console.log(`التاريخ: ${new Date().toLocaleString("ar-SA")}`)
      console.log("=====================================")

      setStatus({
        success: true,
        message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.",
      })

      setIsSubmitted(true)

      // إعادة تعيين النموذج
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        country: "",
        message: "",
      })
    } catch (error) {
      setStatus({
        success: false,
        message: "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const resetForm = () => {
    setIsSubmitted(false)
    setStatus(null)
    setFormData({
      fullName: "",
      email: "",
      phone: "",
      country: "",
      message: "",
    })
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
      <div className="container mx-auto relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">أرسل لنا رسالة</h3>
            <p className="text-xl text-blue-100 mb-8">تواصل معنا مباشرة وسنقوم بالرد عليك في أقرب وقت ممكن</p>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            {isSubmitted && status?.success ? (
              // رسالة النجاح
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-gray-600 mb-8">شكراً لتواصلك معنا. سنقوم بالرد عليك في أقرب وقت ممكن.</p>
                <div className="space-y-4">
                  <Button onClick={resetForm} variant="outline" className="w-full">
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
              // النموذج
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="الاسم الكامل"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="البريد الإلكتروني"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="رقم الهاتف"
                    required
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                </div>

                <div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="اترك رسالتك هنا..."
                    required
                    rows={6}
                    disabled={isSubmitting}
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 resize-none transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
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
                      <span>جاري الإرسال...</span>
                    </div>
                  ) : (
                    "إرسل رسالة"
                  )}
                </Button>

                {status && !status.success && (
                  <div className="p-4 rounded-xl text-center font-medium bg-red-100 text-red-800 border border-red-200 flex items-center justify-center space-x-2 space-x-reverse">
                    <AlertCircle className="h-5 w-5" />
                    <span>{status.message}</span>
                  </div>
                )}
              </form>
            )}

            {/* WhatsApp Alternative */}
            {!isSubmitted && (
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
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
