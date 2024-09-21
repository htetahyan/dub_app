import React from 'react';

// Sample data for the privacy policy
const privacyPolicySections = [
  {
    title: "Introduction",
    content: "This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website."
  },
  {
    title: "Information We Collect",
    content: "We may collect personal information such as your name, email address, and phone number when you register on our site."
  },
  {
    title: "How We Use Your Information",
    content: "We use the information we collect to provide and maintain our services, improve customer service, and communicate with you."
  },
  {
    title: "Cookies",
    content: "Our site uses cookies to enhance user experience and analyze site usage. You can control cookie settings through your browser."
  },
  {
    title: "Third-Party Disclosure",
    content: "We do not sell, trade, or otherwise transfer your personal information to outside parties without your consent."
  },
  {
    title: "Your Rights",
    content: "You have the right to access, correct, or delete your personal information. Please contact us to exercise these rights."
  },
  {
    title: "Changes to This Privacy Policy",
    content: "We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on our site."
  },
  {
    title: "Contact Us",
    content: "If you have any questions about this Privacy Policy, please contact us at support@example.com."
  },
];

const PrivacyPolicy = () => {
  return (
    
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">Last updated: [Date]</p>
      {privacyPolicySections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <p className="text-gray-700">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default PrivacyPolicy;
