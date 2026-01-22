"use client"

import { motion, AnimatePresence } from "framer-motion"
import { 
  ChevronDown, 
  Search, 
  HelpCircle, 
  Book, 
  CreditCard, 
  Calendar, 
  Shield, 
  Phone,
  Mail,
  MessageSquare,
  X
} from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export default function FAQPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [openFaq, setOpenFaq] = useState<number | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  const categories = [
    { id: "all", label: "All Questions", icon: HelpCircle },
    { id: "booking", label: "Booking", icon: Book },
    { id: "payment", label: "Payment", icon: CreditCard },
    { id: "cancellation", label: "Cancellation", icon: Calendar },
    { id: "safety", label: "Safety & Insurance", icon: Shield }
  ]

  const faqs = [
    {
      category: "booking",
      question: "How do I book a travel package?",
      answer: "Booking is simple! Browse our packages, select your preferred destination, choose your travel dates and number of travelers, then click 'Book Now'. You'll be guided through our secure checkout process where you can review your details and complete payment. You'll receive an instant confirmation email with your booking details."
    },
    {
      category: "booking",
      question: "Can I customize my travel package?",
      answer: "Absolutely! While our packages are designed to provide the best experience, we understand everyone has unique preferences. Contact our travel consultants, and we'll work with you to customize your itinerary, accommodation preferences, activities, and more to create your perfect journey."
    },
    {
      category: "booking",
      question: "How far in advance should I book?",
      answer: "We recommend booking at least 2-3 months in advance for popular destinations and peak seasons. However, we also offer last-minute deals. Early booking often means better availability and sometimes special early-bird discounts."
    },
    {
      category: "booking",
      question: "What documents do I need to travel?",
      answer: "Generally, you'll need a valid passport (with at least 6 months validity), visa (if required for your destination), travel insurance documents, and booking confirmations. We provide a detailed checklist with every booking confirmation to ensure you have everything you need."
    },
    {
      category: "payment",
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, Mastercard, American Express, Discover) and debit cards through our secure Stripe payment gateway. All transactions are encrypted with bank-level security. For group bookings over $10,000, we also accept bank transfers."
    },
    {
      category: "payment",
      question: "Is my payment information secure?",
      answer: "Yes, absolutely! We use Stripe, one of the world's most trusted payment processors. All payment data is encrypted with 256-bit SSL encryption. We never store your complete credit card information on our servers. Your security is our top priority."
    },
    {
      category: "payment",
      question: "Can I pay in installments?",
      answer: "Yes! For bookings over $2,000, we offer flexible payment plans. You can pay a deposit (typically 30%) to secure your booking, with the balance due 30 days before departure. Contact our team to arrange a payment schedule that works for you."
    },
    {
      category: "payment",
      question: "Do you charge any booking fees?",
      answer: "No hidden fees! The price you see is the price you pay. We believe in transparent pricing. All taxes, service charges, and fees are included in the displayed package price. The only additional cost would be optional travel insurance or personal expenses during your trip."
    },
    {
      category: "cancellation",
      question: "What is your cancellation policy?",
      answer: "Full refund for cancellations made 30+ days before departure. Cancellations 15-29 days before: 50% refund. Cancellations 7-14 days before: 25% refund. Within 7 days: no refund. We strongly recommend travel insurance to protect against unforeseen circumstances."
    },
    {
      category: "cancellation",
      question: "Can I modify my booking after confirmation?",
      answer: "Yes! You can modify your booking details (dates, room preferences, etc.) up to 14 days before departure, subject to availability. Changes may incur additional fees depending on the modification. Contact our support team, and we'll help you make the necessary changes."
    },
    {
      category: "cancellation",
      question: "What if I need to cancel due to an emergency?",
      answer: "We understand that emergencies happen. While our standard cancellation policy applies, if you have travel insurance, most policies cover emergency cancellations due to medical reasons, family emergencies, or other covered events. Contact both us and your insurance provider immediately."
    },
    {
      category: "cancellation",
      question: "How long does a refund take?",
      answer: "Approved refunds are processed within 5-7 business days. The time it takes to appear in your account depends on your bank or card issuer, typically 7-10 business days from processing. You'll receive an email confirmation once your refund has been initiated."
    },
    {
      category: "safety",
      question: "Is travel insurance included in the package?",
      answer: "Travel insurance is not automatically included but is strongly recommended. We partner with leading insurance providers to offer comprehensive coverage including medical emergencies, trip cancellations, lost baggage, and more. You can add insurance during the booking process."
    },
    {
      category: "safety",
      question: "What safety measures do you have in place?",
      answer: "Your safety is paramount. All our partners (hotels, transportation, tour operators) are vetted and licensed. We provide 24/7 emergency support, all guides are certified and trained in first aid, and we continuously monitor travel advisories for all destinations we serve."
    },
    {
      category: "safety",
      question: "What happens if there's a natural disaster or emergency?",
      answer: "We have comprehensive emergency protocols. Our 24/7 support team monitors global events and will contact you immediately if your destination is affected. We'll work to relocate you to safety, arrange alternative accommodation, or postpone your trip as needed. Travel insurance covers many of these scenarios."
    },
    {
      category: "safety",
      question: "Do you offer COVID-19 related cancellations?",
      answer: "Yes, we have flexible COVID-19 policies. If travel restrictions prevent your trip or if you test positive before departure, we offer free rescheduling or credits toward future travel. Check our current COVID-19 policy on our website as guidelines are updated based on the current situation."
    },
    {
      category: "booking",
      question: "Are group discounts available?",
      answer: "Yes! We offer special rates for groups of 10 or more travelers. Group bookings also come with added benefits like a complimentary group leader package and flexible payment terms. Contact our group travel specialists for a custom quote."
    },
    {
      category: "booking",
      question: "Do you accommodate dietary restrictions?",
      answer: "Absolutely! We cater to all dietary requirements including vegetarian, vegan, gluten-free, halal, kosher, and allergy-specific needs. Simply indicate your requirements during booking, and we'll ensure all included meals meet your dietary needs."
    },
    {
      category: "payment",
      question: "Can I get a receipt for my booking?",
      answer: "Yes, you'll receive a detailed invoice via email immediately after booking. This includes a complete breakdown of costs and is suitable for expense claims or company reimbursement. You can also download receipts anytime from your account dashboard."
    },
    {
      category: "safety",
      question: "What if I have a medical condition?",
      answer: "Please inform us of any medical conditions during booking. We'll work with you to ensure appropriate accommodations and support. For serious conditions, you may need a doctor's clearance to travel. Our team can connect you with travel medicine specialists if needed."
    }
  ]

  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-purple-50/40 py-12 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 lg:py-20">
      {/* Background decorative elements */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          className="absolute right-0 top-40 h-96 w-96 rounded-full bg-gradient-to-br from-cyan-400/20 via-blue-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute left-0 top-96 h-96 w-96 rounded-full bg-gradient-to-tr from-purple-500/20 via-pink-500/10 to-transparent blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.4, 0.6, 0.4],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container relative z-10   mx-auto px-4">

        <motion.div
          className="mb-12 text-center lg:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 px-4 py-2 text-sm font-medium text-slate-700 shadow-lg backdrop-blur-sm dark:text-cyan-100"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
          >
            <HelpCircle className="h-4 w-4 text-cyan-500" />
            <span>Help Center</span>
          </motion.div>

          <h1 className="mb-6 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-5xl font-bold tracking-tight text-transparent dark:from-white dark:via-slate-100 dark:to-white md:text-6xl lg:text-7xl">
            Frequently Asked{" "}
            <span className="bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h1>

          <p className="mx-auto max-w-2xl text-lg text-slate-600 dark:text-slate-300 md:text-xl">
            Find answers to common questions about booking, payments, cancellations, and more.
          </p>
        </motion.div>

     
        <motion.div
          className="mx-auto mb-12 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
            <Input
              type="text"
              placeholder="Search for answers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border-2 border-slate-200 bg-white/80 py-6 pl-12 pr-12 text-base shadow-lg backdrop-blur-sm transition-all focus:border-cyan-500 focus:ring-4 focus:ring-cyan-500/20 dark:border-slate-700 dark:bg-slate-900/80 dark:focus:border-cyan-400"
            />
            {searchTerm && (
              <motion.button
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                onClick={() => setSearchTerm("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-slate-200 p-1 text-slate-600 transition-colors hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600"
              >
                <X className="h-4 w-4" />
              </motion.button>
            )}
          </div>
        </motion.div>

   
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-lg backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">
            <CardContent className="p-6">
              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                  <MessageSquare className="h-4 w-4" />
                </div>
                <p className="text-sm font-semibold text-slate-900 dark:text-white">
                  Filter by Category
                </p>
              </div>
              
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <motion.button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all ${
                      selectedCategory === category.id
                        ? "bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 text-white shadow-lg shadow-cyan-500/30"
                        : "border-2 border-slate-200 bg-white text-slate-700 hover:border-cyan-500 hover:bg-slate-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-300 dark:hover:border-cyan-400 dark:hover:bg-slate-800"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <category.icon className="h-4 w-4" />
                    {category.label}
                  </motion.button>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

 
        <motion.div
          className="mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Showing{" "}
            <span className="font-bold text-cyan-600 dark:text-cyan-400">
              {filteredFaqs.length}
            </span>{" "}
            {filteredFaqs.length === 1 ? "question" : "questions"}
          </p>
        </motion.div>

    
        <motion.div
          className="mx-auto max-w-4xl space-y-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredFaqs.length > 0 ? (
              filteredFaqs.map((faq, index) => (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="overflow-hidden border-2 border-slate-200 bg-white/80 shadow-lg backdrop-blur-sm transition-all hover:border-cyan-500 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/80 dark:hover:border-cyan-400">
                    <button
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                      className="flex w-full items-start justify-between gap-4 p-6 text-left transition-all"
                    >
                      <div className="flex-1">
                        <div className="mb-2 flex items-center gap-2">
                          <span className="inline-flex items-center gap-1 rounded-full bg-cyan-100 px-2 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300">
                            {categories.find(c => c.id === faq.category)?.label}
                          </span>
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {faq.question}
                        </h3>
                      </div>
                      <motion.div
                        animate={{ rotate: openFaq === index ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                        className="shrink-0"
                      >
                        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg">
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      </motion.div>
                    </button>
                    <motion.div
                      initial={false}
                      animate={{
                        height: openFaq === index ? "auto" : 0,
                        opacity: openFaq === index ? 1 : 0
                      }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="border-t border-slate-200 px-6 pb-6 pt-4 dark:border-slate-800">
                        <p className="leading-relaxed text-slate-600 dark:text-slate-400">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  </Card>
                </motion.div>
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-slate-200 bg-white/80 py-20 text-center backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80"
              >
                <div className="mb-4 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900">
                    <Search className="h-10 w-10 text-slate-400" />
                  </div>
                </div>
                <h3 className="mb-2 text-xl font-bold text-slate-900 dark:text-white">
                  No questions found
                </h3>
                <p className="mb-6 text-slate-600 dark:text-slate-400">
                  Try adjusting your search or filter criteria
                </p>
                <Button
                  onClick={() => {
                    setSearchTerm("")
                    setSelectedCategory("all")
                  }}
                  className="rounded-full bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600 px-6 py-2 text-white shadow-lg shadow-cyan-500/30"
                >
                  Clear Filters
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <Card className="overflow-hidden border-2  border-slate-200 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 shadow-2xl dark:border-slate-800">
            <CardContent className="p-8 text-center md:p-12">
              <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                Still Have Questions?
              </h2>
              <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
                Can't find the answer you're looking for? Our friendly support team is here to help!
              </p>
              
              <div className="flex flex-wrap items-center justify-center gap-4">
                <motion.a
                  href="mailto:support@tripnest.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="group rounded-full border-2 border-white bg-white px-6 py-6 text-base font-semibold text-slate-900 shadow-lg transition-all hover:bg-slate-50">
                    <span className="flex items-center gap-2">
                      <Mail className="h-5 w-5" />
                      Email Support
                    </span>
                  </Button>
                </motion.a>
                
                <motion.a
                  href="tel:+15551234567"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="group rounded-full border-2 border-white bg-transparent px-6 py-6 text-base font-semibold text-white shadow-lg transition-all hover:bg-white/10">
                    <span className="flex items-center gap-2">
                      <Phone className="h-5 w-5" />
                      Call Us: +1 (555) 123-4567
                    </span>
                  </Button>
                </motion.a>
              </div>

              <p className="mt-6 text-sm text-white/80">
                📞 Available Mon-Fri: 9AM - 6PM | Sat: 10AM - 4PM (EST)
              </p>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}