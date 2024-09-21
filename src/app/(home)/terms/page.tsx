import React from 'react';

// Sample data for the Terms of Service
const termsOfServiceSections = [
  {
    title: "Introduction",
    content: "Welcome to our website! By accessing or using our services, you agree to comply with these Terms of Service."
  },
  {
    title: "Acceptance of Terms",
    content: "By using our services, you accept and agree to these Terms. If you do not agree, please do not use our services."
  },
  {
    title: "User Responsibilities",
    content: "Users must provide accurate information and maintain the confidentiality of their account. You are responsible for all activities that occur under your account."
  },
  {
    title: "AI Services",
    content: "Our platform may include AI-driven features. By using these services, you acknowledge and accept the inherent limitations of AI technology, including potential inaccuracies and biases."
  },
  {
    title: "Data Usage",
    content: "We may collect and use data generated through our AI services to improve our offerings. Your data will be handled in accordance with our Privacy Policy."
  },
  {
    title: "Intellectual Property",
    content: "All content and technology on our platform, including AI algorithms, are the property of our company and are protected by intellectual property laws."
  },
  {
    title: "Limitation of Liability",
    content: "We are not liable for any damages resulting from the use of our services, including those related to AI inaccuracies or service interruptions."
  },
  {
    title: "Modifications",
    content: "We reserve the right to modify these Terms at any time. Changes will be posted on our website, and continued use of the services constitutes acceptance of the updated Terms."
  },
  {
    title: "Governing Law",
    content: "These Terms are governed by the laws of [Your Jurisdiction]. Any disputes arising under these Terms will be subject to the exclusive jurisdiction of the courts in that jurisdiction."
  },
  {
    title: "Contact Us",
    content: "If you have any questions about these Terms, please contact us at support@example.com."
  },
];

const TermsOfService = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>
      {termsOfServiceSections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <p className="text-gray-700">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default TermsOfService;
