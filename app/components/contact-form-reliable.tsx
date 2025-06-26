"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, CheckCircle, AlertCircle } from "lucide-react"
import emailjs from "@emailjs/browser"

export function ContactFormReliable() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState("")
  const [showEmailOptions, setShowEmailOptions] = useState(false)

  const whatsappNumber = "+962799033406"
  const whatsappLink = `https://wa.me/${whatsappNumber}`
  const targetEmail = "ordowazordoo@gmail.com"

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // التحقق من الحقول المطلوبة
      if (!formData.fullName || !formData.email || !formData.phone || !formData.message) {
        setError("جميع الحقول مطلوبة")
        return
      }

      // التحقق من صحة الإيميل
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        setError("يرجى إدخال بريد إلكتروني صحيح")
        return
      }

      // إرسال الإيميل عبر EmailJS مع البيانات الصحيحة
      const SERVICE_ID = "service_qbej15o"
      const TEMPLATE_ID = "template_osq4jrt"
      const PUBLIC_KEY = "vX5GWus1UbbAQB0QU"

      console.log("🔄 محاولة إرسال الإيميل...")
      console.log("📧 البيانات:", {
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        country: formData.country || "غير محدد",
        message: formData.message,
      })

      const templateParams = {
        title: "رسالة جديدة من موقع أردواز",
        name: formData.fullName,
        time: new Date().toLocaleString("ar-SA", {
          year: "numeric",
          month: "long",
          day: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }),
        message: `الاسم: ${formData.fullName}
البريد الإلكتروني: ${formData.email}
رقم الهاتف: ${formData.phone}
الدولة: ${formData.country || "غير محدد"}

الرسالة:
${formData.message}

---
تم الإرسال من موقع أردواز لخدمات البحث العلمي`,
        from_name: formData.fullName,
        from_email: formData.email,
        phone: formData.phone,
        country: formData.country || "غير محدد",
      }

      const result = await emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)

      console.log("✅ نجح الإرسال:", result)

      if (result.status === 200) {
        console.log("📧 تم إرسال الإيميل بنجاح إلى ordowazordoo@gmail.com")
        setIsSubmitted(true)

        // إعادة تعيين النموذج
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          country: "",
          message: "",
        })
      } else {
        throw new Error(`EmailJS returned status: ${result.status}`)
      }
    } catch (error) {
      console.error("❌ فشل في الإرسال:", error)
      setError(`فشل في إرسال الإيميل: ${error.message || "خطأ غير معروف"}. يرجى استخدام واتساب أو المحاولة مرة أخرى.`)
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
    setError("")
    setShowEmailOptions(false)
  }

  /*const generateEmailContent = () => {
    return `الاسم: ${formData.fullName}
الإيميل: ${formData.email}
الهاتف: ${formData.phone}
الدولة: ${formData.country || "غير محدد"}

الرسالة:
${formData.message}

---
تم الإرسال من موقع أردواز لخدمات البحث العلمي
التاريخ: ${new Date().toLocaleString("ar-SA")}`
  }

  const openEmailClient = () => {
    const subject = encodeURIComponent("رسالة جديدة من موقع أردواز")
    const body = encodeURIComponent(generateEmailContent())
    const mailtoLink = `mailto:${targetEmail}?subject=${subject}&body=${body}`
    window.open(mailtoLink, "_blank")
  }

  const copyEmailContent = async () => {
    const content = `إلى: ${targetEmail}
الموضوع: رسالة جديدة من موقع أردواز

${generateEmailContent()}`

    try {
      await navigator.clipboard.writeText(content)
      alert("تم نسخ محتوى الإيميل! يمكنك لصقه في تطبيق الإيميل المفضل لديك")
    } catch (err) {
      console.error("فشل في النسخ:", err)
    }
  }

  const sendWhatsAppMessage = () => {
    const message = encodeURIComponent(`مرحباً، أريد التواصل معكم بخصوص خدماتكم.

الاسم: ${formData.fullName}
الإيميل: ${formData.email}
الهاتف: ${formData.phone}
الدولة: ${formData.country || "غير محدد"}

الرسالة:
${formData.message}`)

    window.open(`${whatsappLink}?text=${message}`, "_blank")
  }*/

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
      <div className="container mx-auto relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">أرسل لنا رسالة</h3>
            <p className="text-xl text-blue-100 mb-4">تواصل معنا وسنقوم بالرد عليك في أقرب وقت ممكن</p>
            <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-6">
            
            </div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            {isSubmitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">تم إرسال رسالتك بنجاح!</h4>
                <p className="text-gray-600 mb-2">تم إرسال رسالتك مباشرة إلى:</p>
                <p className="text-blue-600 font-mono font-bold mb-6">ordowazordoo@gmail.com</p>
                <p className="text-gray-500 mb-8">سنقوم بالرد عليك في أقرب وقت ممكن</p>
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
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
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
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
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
                    className="w-full px-4 py-4 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800 placeholder-gray-500 transition-all duration-300 disabled:opacity-50"
                  />
                </div>

                <div>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
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
                    value={formData.message}
                    onChange={handleChange}
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
                    "إرسل رسالة فوراً"
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

            {/* WhatsApp Direct */}
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
