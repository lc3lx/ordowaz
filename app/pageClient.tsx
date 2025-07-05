"use client";

import type React from "react";

import { useEffect, useState, useCallback } from "react";
import {
  Phone,
  MessageCircle,
  BookOpen,
  FileText,
  Search,
  BarChart,
  Shield,
  Microscope,
  Users,
  Award,
  Globe,
  Star,
  CheckCircle,
  ArrowLeft,
  Menu,
  X,
  AlertCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
// Add this import at the top with other imports
import emailjs from "@emailjs/browser";

// نقل مكون ContactForm خارج المكون الرئيسي
const ContactForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const whatsappNumber = "+962799033406";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSubmitting(true);
      setError("");

      try {
        // التحقق من الحقول المطلوبة
        if (
          !formData.fullName ||
          !formData.email ||
          !formData.phone ||
          !formData.message
        ) {
          setError("جميع الحقول مطلوبة");
          return;
        }

        // التحقق من صحة الإيميل
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
          setError("يرجى إدخال بريد إلكتروني صحيح");
          return;
        }

        // إعداد EmailJS
        const SERVICE_ID = "service_qbej15o";
        const TEMPLATE_ID = "template_s84s66n";
        const PUBLIC_KEY = "vX5GWus1UbbAQB0QU";

        // إرسال الإيميل عبر EmailJS
        const templateParams = {
          from_name: formData.fullName,
          from_email: formData.email,
          phone: formData.phone,
          country: formData.country || "غير محدد",
          message: formData.message,
          to_email: "ordowazordoo@gmail.com",
          subject: "رسالة جديدة من موقع أردواز",
        };

        const result = await emailjs.send(
          SERVICE_ID,
          TEMPLATE_ID,
          templateParams,
          PUBLIC_KEY
        );

        if (result.status === 200) {
          setIsSubmitted(true);
          // إعادة تعيين النموذج
          setFormData({
            fullName: "",
            email: "",
            phone: "",
            country: "",
            message: "",
          });

          console.log("✅ تم إرسال الإيميل بنجاح إلى ordowazordoo@gmail.com");
          console.log("📧 تفاصيل الإرسال:", result);
        } else {
          throw new Error("فشل في إرسال الإيميل");
        }
      } catch (error) {
        console.error("خطأ في الإرسال:", error);
        setError(
          "حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى أو التواصل عبر واتساب."
        );
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData]
  );

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >
    ) => {
      setFormData((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    },
    []
  );

  const resetForm = useCallback(() => {
    setIsSubmitted(false);
    setError("");
  }, []);

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 to-indigo-700/90"></div>
      <div className="container mx-auto relative">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-4xl md:text-5xl font-bold text-white mb-6">
              أرسل لنا رسالة
            </h3>
            <p className="text-xl text-blue-100 mb-4">
              سيتم إرسال رسالتك مباشرة إلى ordowazordoo@gmail.com
            </p>
            <div className="bg-green-100 border border-green-300 rounded-lg p-3 mb-6"></div>
          </div>

          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            {isSubmitted ? (
              // رسالة النجاح
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <h4 className="text-2xl font-bold text-gray-800 mb-4">
                  تم إرسال رسالتك بنجاح!
                </h4>
                <p className="text-gray-600 mb-2">تم إرسال رسالتك إلى:</p>
                <p className="text-blue-600 font-mono font-bold mb-6">
                  ordowazordoo@gmail.com
                </p>
                <p className="text-gray-500 mb-8">
                  سنقوم بالرد عليك في أقرب وقت ممكن
                </p>
                <div className="space-y-4">
                  <Button
                    onClick={resetForm}
                    variant="outline"
                    className="w-full"
                  >
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
                      <span>جاري الإرسال إلى ordowazordoo@gmail.com...</span>
                    </div>
                  ) : (
                    "تواصل معنا الان "
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

            {/* WhatsApp Alternative */}
            {!isSubmitted && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-center text-gray-600 mb-4">
                  أو تواصل معنا مباشرة عبر واتساب
                </p>
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
  );
};

export default function HomePage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "المساعدة في كتابة رسائل الماجستير وأطروحات الدكتوراه",
      description:
        "دعم شامل في إعداد وكتابة الرسائل الأكاديمية بأعلى معايير الجودة العلمية والأكاديمية",
      features: ["إعداد الخطة البحثية", "كتابة الفصول", "المراجعة النهائية"],
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "إعادة الصياغة اللغوية والتدقيق اللغوي والإملائي",
      description:
        "خدمات التدقيق والمراجعة اللغوية المتخصصة باللغتين العربية والإنجليزية",
      features: ["تدقيق إملائي", "مراجعة نحوية", "تحسين الأسلوب"],
    },
    {
      icon: <Search className="h-8 w-8" />,
      title: "توفير الدراسات السابقة",
      description:
        "البحث المتخصص عن وتوفير الدراسات السابقة والمراجع العلمية المتعلقة بموضوع بحثك",
      features: ["بحث شامل", "مراجع حديثة", "تصنيف منهجي"],
    },
    {
      icon: <FileText className="h-8 w-8" />,
      title: "كتابة المحتوى البحثي",
      description:
        "إعداد وكتابة المحتوى البحثي المتخصص وفقاً للخطة البحثية والمعايير الأكاديمية",
      features: ["محتوى أصيل", "منهجية علمية", "مراجع موثقة"],
    },
    {
      icon: <BookOpen className="h-8 w-8" />,
      title: "كتابة مخطط البحث (البروبوزال)",
      description:
        "إعداد مخططات البحث الأكاديمية المتميزة باللغتين العربية والإنجليزية",
      features: ["خطة واضحة", "أهداف محددة", "منهجية مناسبة"],
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "التحليل الكمي والنوعي",
      description:
        "خدمات التحليل الإحصائي المتقدم والتحليل النوعي للبيانات البحثية باستخدام أحدث البرامج",
      features: ["SPSS", "تحليل إحصائي", "تفسير النتائج"],
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "فحص الملفات (Turnitin) وفحص الذكاء الاصطناعي",
      description:
        "فحص شامل للأعمال البحثية للتأكد من الأصالة وعدم الانتحال باستخدام أحدث التقنيات",
      features: ["فحص Turnitin", "كشف AI", "تقرير مفصل"],
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "مشاريع التخرج الطبية والهندسية",
      description:
        "إعداد وتطوير مشاريع التخرج المتخصصة لكليات الطب والهندسة بمختلف التخصصات",
      features: ["تصميم تطبيقي", "بحث نظري", "عرض تقديمي"],
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "عمل أدوات الدراسة وبناء الأدوات البحثية",
      description:
        "تصميم وبناء أدوات البحث المتخصصة والاستبيانات العلمية وفق المعايير الأكاديمية",
      features: ["استبيانات", "مقاييس", "أدوات قياس"],
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "تفسير ومناقشة النتائج",
      description:
        "تحليل وتفسير نتائج البحوث العلمية بطريقة منهجية ودقيقة مع ربطها بالدراسات السابقة",
      features: ["تحليل عميق", "مناقشة علمية", "توصيات عملية"],
    },
    {
      icon: <Star className="h-8 w-8" />,
      title: "بحوث الترقية والمؤتمرات",
      description:
        "إعداد البحوث المتخصصة للترقيات الأكاديمية والمؤتمرات العلمية وفق أعلى المعايير",
      features: ["معايير عالمية", "جودة عالية", "مراجعة دقيقة"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "النشر في المجلات العالمية المحكمة",
      description:
        "المساعدة الشاملة في نشر البحوث في المجلات العلمية المفهرسة في قواعد البيانات العالمية",
      features: ["مجلات Scopus", "مراجعة الأقران", "فهرسة عالمية"],
    },
    {
      icon: <Globe className="h-8 w-8" />,
      title: "تصميم وتطوير المواقع الإلكترونية",
      description:
        "تصميم وتطوير مواقع إلكترونية احترافية ومتجاوبة لعرض خدمات البحث العلمي والأكاديمي بأفضل شكل ممكن",
      features: ["تصميم متجاوب", "سرعة عالية", "محسن لمحركات البحث"],
    },
    {
      icon: <MessageCircle className="h-8 w-8" />,
      title: "تطوير تطبيقات الجوال",
      description:
        "تطوير تطبيقات جوال متقدمة لخدمات البحث العلمي والأكاديمي لنظامي iOS و Android",
      features: ["تطبيقات أصلية", "واجهة سهلة", "إشعارات فورية"],
    },
    {
      icon: <Microscope className="h-8 w-8" />,
      title: "حلول الذكاء الاصطناعي للبحث العلمي",
      description:
        "تطوير أدوات ذكاء اصطناعي متخصصة لتحليل البيانات البحثية وتسريع عملية البحث العلمي والأكاديمي",
      features: ["تحليل البيانات", "معالجة النصوص", "التنبؤ الذكي"],
    },
  ];

  const whatsappNumber = "+962799033406";
  const whatsappLink = `https://wa.me/${whatsappNumber}`;

  const stats = [
    { number: "500+", label: "مشروع مكتمل" },
    { number: "98%", label: "معدل رضا العملاء" },
    { number: "50+", label: "باحث متخصص" },
    { number: "24/7", label: "دعم مستمر" },
  ];

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50"
      dir="rtl"
    >
      {/* Header */}
      <header
        className={`fixed top-0 w-full z-50 transition-all duration-300 ${
          scrollY > 50
            ? "bg-white/95 backdrop-blur-md shadow-lg"
            : "bg-transparent"
        }`}
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent">
                  أردواز
                </h1>
                <p className="text-sm text-slate-600">خدمات البحث العلمي</p>
              </div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-6 space-x-reverse">
              <Button
                onClick={() => window.open(whatsappLink, "_blank")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="h-4 w-4 ml-2" />
                تواصل معنا
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden mt-4 p-4 bg-white rounded-lg shadow-lg animate-in slide-in-from-top-2 duration-300">
              <Button
                onClick={() => {
                  window.open(whatsappLink, "_blank");
                  setIsMenuOpen(false);
                }}
                className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
              >
                <MessageCircle className="h-4 w-4 ml-2" />
                تواصل معنا
              </Button>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-indigo-600/5"></div>
        <div className="container mx-auto text-center relative">
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-blue-800 via-indigo-800 to-blue-900 bg-clip-text text-transparent mb-6 leading-tight">
              أردواز لخدمات البحث العلمي
            </h2>
            <p className="text-xl md:text-2xl text-slate-700 mb-8 max-w-4xl mx-auto leading-relaxed">
              أردواز - نقدم خدمات شاملة ومتخصصة في مجال البحث العلمي والأكاديمي،
              تصميم المواقع، تطبيقات الجوال، والذكاء الاصطناعي بأعلى معايير
              الجودة والدقة
            </p>
          </div>

          <div className="animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-300">
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Button
                size="lg"
                onClick={() => window.open(whatsappLink, "_blank")}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white px-8 py-4 text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                <MessageCircle className="h-5 w-5 ml-2" />
                تواصل عبر واتساب
              </Button>
              <div className="flex items-center text-slate-700 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full shadow-lg">
                <Phone className="h-5 w-5 ml-2 text-blue-600" />
                <span className="font-mono text-lg font-semibold">
                  {whatsappNumber}
                </span>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-slate-600 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4 bg-white relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-50/30 to-transparent"></div>
        <div className="container mx-auto relative">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              خدماتنا المتخصصة
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              نوفر مجموعة شاملة من الخدمات الأكاديمية والبحثية لدعم رحلتك
              العلمية
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
            {services.map((service, index) => (
              <Card
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 transform hover:scale-105 border-0 shadow-lg bg-gradient-to-br from-white to-slate-50/50 overflow-hidden"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <CardHeader className="pb-4 p-6">
                  <div className="flex items-start space-x-4 space-x-reverse">
                    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-3 rounded-xl text-white group-hover:scale-110 transition-transform duration-300 flex-shrink-0">
                      <div className="h-8 w-8">{service.icon}</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <CardTitle className="text-lg leading-tight text-slate-800 group-hover:text-blue-800 transition-colors duration-300">
                        {service.title}
                      </CardTitle>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4 p-6 pt-0">
                  <CardDescription className="text-slate-600 leading-relaxed">
                    {service.description}
                  </CardDescription>

                  <div className="space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <div
                        key={featureIndex}
                        className="flex items-center space-x-2 space-x-reverse"
                      >
                        <CheckCircle className="h-4 w-4 text-green-600 flex-shrink-0" />
                        <span className="text-slate-600">{feature}</span>
                      </div>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4 border-blue-200 hover:bg-blue-50 hover:border-blue-300 group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-indigo-600 group-hover:text-white transition-all duration-300"
                    onClick={() => window.open(whatsappLink, "_blank")}
                  >
                    <MessageCircle className="h-4 w-4 ml-2" />
                    استفسر الآن
                    <ArrowLeft className="h-4 w-4 mr-2 group-hover:translate-x-1 transition-transform duration-300" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <h3 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6">
              لماذا تختار أردواز؟
            </h3>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              نتميز بالخبرة والاحترافية في تقديم خدمات البحث العلمي
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-8">
            {[
              {
                icon: <Award className="h-10 w-10 md:h-12 md:w-12" />,
                title: "جودة عالية",
                description:
                  "نلتزم بأعلى معايير الجودة العالمية في جميع خدماتنا البحثية والأكاديمية",
                color: "from-blue-500 to-blue-600",
                bgColor: "from-blue-50 to-blue-100",
              },
              {
                icon: <Users className="h-10 w-10 md:h-12 md:w-12" />,
                title: "فريق متخصص",
                description:
                  "فريق من الخبراء والأكاديميين المتخصصين في مختلف المجالات العلمية",
                color: "from-green-500 to-green-600",
                bgColor: "from-green-50 to-green-100",
              },
              {
                icon: <Shield className="h-10 w-10 md:h-12 md:w-12" />,
                title: "سرية تامة",
                description:
                  "نضمن الحفاظ على سرية وخصوصية جميع أعمالكم وبياناتكم البحثية",
                color: "from-purple-500 to-purple-600",
                bgColor: "from-purple-50 to-purple-100",
              },
              {
                icon: <MessageCircle className="h-10 w-10 md:h-12 md:w-12" />,
                title: "دعم مستمر",
                description:
                  "متاحون للتواصل والدعم الفني على مدار الساعة طوال أيام الأسبوع",
                color: "from-orange-500 to-orange-600",
                bgColor: "from-orange-50 to-orange-100",
              },
              {
                icon: <Globe className="h-10 w-10 md:h-12 md:w-12" />,
                title: "تقنيات متقدمة",
                description:
                  "أردواز - نستخدم أحدث التقنيات في تصميم المواقع، تطبيقات الجوال، والذكاء الاصطناعي لخدمة البحث العلمي",
                color: "from-indigo-500 to-indigo-600",
                bgColor: "from-indigo-50 to-indigo-100",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-all duration-500"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div
                  className={`bg-gradient-to-br ${item.bgColor} w-20 h-20 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300 shadow-lg`}
                >
                  <div
                    className={`bg-gradient-to-r ${item.color} bg-clip-text text-transparent`}
                  >
                    {item.icon}
                  </div>
                </div>
                <h4 className="text-xl md:text-2xl font-bold mb-4 text-slate-800 group-hover:text-blue-800 transition-colors duration-300">
                  {item.title}
                </h4>
                <p className="text-slate-600 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactForm />

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-8">
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                أردواز لخدمات البحث العلمي
              </span>
            </div>
            <p className="text-slate-400 mb-6 max-w-2xl mx-auto">
              شريكك الموثوق في رحلة البحث العلمي والأكاديمي - نقدم خدمات متميزة
              بأعلى معايير الجودة
            </p>
            <div className="flex items-center justify-center space-x-4 space-x-reverse mb-6">
              <Phone className="h-4 w-4 text-blue-400" />
              <span className="font-mono">{whatsappNumber}</span>
            </div>
          </div>

          <div className="border-t border-slate-800 pt-8 text-center">
            <p className="text-sm text-slate-500">
              © 2024 أردواز لخدمات البحث العلمي. جميع الحقوق محفوظة.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
