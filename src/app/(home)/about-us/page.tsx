import React from 'react';

// Sample data for the About Us section
const aboutUsSections = [
  {
    title: "Who We Are",
    content: "We are a team of passionate individuals committed to delivering innovative solutions that empower our users. Our diverse backgrounds and expertise allow us to create products that meet the evolving needs of our community."
  },
  {
    title: "Our Mission",
    content: "Our mission is to simplify technology for everyone, making powerful tools accessible and easy to use. We believe in fostering creativity and collaboration, enabling our users to achieve their goals."
  },
  {
    title: "Our Vision",
    content: "We envision a world where technology enhances lives, breaks down barriers, and creates opportunities for all. Through our dedication and innovation, we strive to lead the way in transforming ideas into reality."
  },
  {
    title: "Our Values",
    content: "Integrity, innovation, and inclusivity are at the core of everything we do. We value open communication, respect diverse perspectives, and continuously seek to improve ourselves and our services."
  },
  {
    title: "Join Us",
    content: "We are always looking for talented individuals to join our team. If you share our vision and values, check out our careers page for current openings and become a part of our journey."
  },
];

const AboutUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">About Us</h1>
      {aboutUsSections.map((section, index) => (
        <div key={index} className="mb-4">
          <h2 className="text-2xl font-semibold">{section.title}</h2>
          <p className="text-gray-700">{section.content}</p>
        </div>
      ))}
    </div>
  );
};

export default AboutUs;
