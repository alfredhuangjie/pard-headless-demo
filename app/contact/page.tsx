// app/contact/page.tsx

import ContactForm from "@/components/ContactForm"; // 导入我们刚刚创建的智能表单组件

export default function ContactPage() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-4xl font-bold mb-8 text-center">联系我们</h1>
      <p className="mb-8 text-gray-600 text-center max-w-2xl mx-auto">
        有任何问题或合作意向，请通过下面的表单与我们联系。
      </p>
      
      {/* 直接使用我们的智能表单组件 */}
      <ContactForm />
    </main>
  );
}