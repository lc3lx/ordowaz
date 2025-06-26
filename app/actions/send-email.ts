"use server"

export async function sendContactEmail(prevState: any, formData: FormData) {
  try {
    const fullName = formData.get("fullName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const country = formData.get("country") as string
    const message = formData.get("message") as string

    // التحقق من الحقول المطلوبة
    if (!fullName || !email || !phone || !message) {
      return {
        success: false,
        message: "جميع الحقول مطلوبة",
      }
    }

    // التحقق من صحة الإيميل
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return {
        success: false,
        message: "يرجى إدخال بريد إلكتروني صحيح",
      }
    }

    // محاكاة وقت المعالجة
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // تسجيل البيانات (في الإنتاج سيتم إرسال الإيميل الفعلي)
    console.log("📧 رسالة جديدة من موقع أردواز:")
    console.log("=====================================")
    console.log(`الاسم: ${fullName}`)
    console.log(`الإيميل: ${email}`)
    console.log(`الهاتف: ${phone}`)
    console.log(`الدولة: ${country || "غير محدد"}`)
    console.log(`الرسالة: ${message}`)
    console.log(`التاريخ: ${new Date().toLocaleString("ar-SA")}`)
    console.log("=====================================")

    return {
      success: true,
      message: "تم إرسال رسالتك بنجاح! سنتواصل معك قريباً عبر الإيميل أو الهاتف.",
      data: {
        fullName,
        email,
        phone,
        country,
        message,
      },
    }
  } catch (error) {
    console.error("Error processing contact form:", error)
    return {
      success: false,
      message: "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل معنا عبر واتساب.",
    }
  }
}
