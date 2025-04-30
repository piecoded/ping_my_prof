import React, { useState } from 'react';
import '../styles.css'; // Make sure this is imported

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqData = [
    {
      question: "How do I book an appointment?",
      answer: "Simply sign up as a student, log in, and request a meeting with your teacher through their profile.",
    },
    {
      question: "How will I know if my appointment is approved?",
      answer: "You'll receive a notification inside your dashboard once the teacher approves or declines your request.",
    },
    {
      question: "Can I cancel or reschedule an appointment?",
      answer: "Yes! You can manage your appointments directly from your dashboard at any time.",
    },
    {
      question: "Is PingMyProf free to use?",
      answer: "Yes, PingMyProf is completely free for both students and teachers!",
    },
  ];

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index); // close if clicking again
  };

  return (
    <section className="faq">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-list">
        {faqData.map((faq, index) => (
          <div key={index} className="faq-item">
            <h3 onClick={() => toggleFAQ(index)} className="faq-question">
              {faq.question}
              <span className="faq-toggle">{openIndex === index ? '-' : '+'}</span>
            </h3>
            {openIndex === index && <p className="faq-answer">{faq.answer}</p>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
