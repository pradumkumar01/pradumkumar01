import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const ServiceFAQ = ({ service }) => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      id: 1,
      question: "How long does the treatment take?",
      answer: `The ${service?.name} typically takes ${service?.duration} to complete. This includes consultation, preparation, treatment, and post-treatment care instructions.`
    },
    {
      id: 2,
      question: "What should I expect during the treatment?",
      answer: "Our certified professionals will guide you through each step of the process. The treatment is designed to be relaxing and rejuvenating, with minimal discomfort."
    },
    {
      id: 3,
      question: "How often should I get this treatment?",
      answer: service?.frequency || "We recommend this treatment every 4-6 weeks for optimal results, though frequency may vary based on your individual needs and skin/hair type."
    },
    {
      id: 4,
      question: "Are there any side effects?",
      answer: "This treatment is generally safe with minimal side effects. Some clients may experience mild redness or sensitivity immediately after treatment, which typically subsides within a few hours."
    },
    {
      id: 5,
      question: "What products do you use?",
      answer: "We use only premium, professional-grade products from trusted brands. All products are carefully selected for their quality and effectiveness."
    },
    {
      id: 6,
      question: "Can I reschedule or cancel my appointment?",
      answer: "Yes, you can reschedule or cancel your appointment up to 2 hours before your scheduled time without any charges. Please contact us or use our online booking system."
    },
    {
      id: 7,
      question: "What is your hygiene protocol?",
      answer: "We follow strict hygiene protocols including sanitization of all tools and equipment, use of disposable items where applicable, and maintaining clean treatment rooms for your safety."
    },
    {
      id: 8,
      question: "Do you offer any packages or discounts?",
      answer: "Yes, we offer various packages and seasonal discounts. Join our In Privileges loyalty program to earn points and get exclusive offers on treatments."
    }
  ];

  const toggleFAQ = (faqId) => {
    setOpenFAQ(openFAQ === faqId ? null : faqId);
  };

  return (
    <div className="bg-card rounded-lg shadow-card p-6">
      <h3 className="text-xl font-heading font-semibold mb-6">Frequently Asked Questions</h3>
      <div className="space-y-4">
        {faqs?.map((faq) => (
          <div key={faq?.id} className="border border-border rounded-lg">
            <button
              onClick={() => toggleFAQ(faq?.id)}
              className="w-full flex items-center justify-between p-4 text-left hover:bg-muted/50 transition-smooth"
            >
              <span className="font-medium pr-4">{faq?.question}</span>
              <Icon
                name={openFAQ === faq?.id ? "ChevronUp" : "ChevronDown"}
                size={20}
                className="text-muted-foreground flex-shrink-0"
              />
            </button>
            
            {openFAQ === faq?.id && (
              <div className="px-4 pb-4">
                <p className="text-muted-foreground leading-relaxed">
                  {faq?.answer}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 p-4 bg-muted rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="HelpCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
          <div>
            <h4 className="font-semibold mb-1">Still have questions?</h4>
            <p className="text-sm text-muted-foreground mb-3">
              Our customer care team is here to help you with any additional questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-2">
              <a
                href="tel:18001231952"
                className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth"
              >
                <Icon name="Phone" size={14} />
                <span>Call 1800 123 1952</span>
              </a>
              <span className="hidden sm:inline text-muted-foreground">•</span>
              <button className="inline-flex items-center space-x-2 text-sm text-primary hover:text-primary/80 transition-smooth">
                <Icon name="MessageCircle" size={14} />
                <span>Live Chat</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceFAQ;