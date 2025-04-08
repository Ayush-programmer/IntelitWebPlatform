import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Step3FAQs = ({ formData, setFormData, addFaq, prevStep, nextStep }) => {
    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...formData.faq];
        updatedFaqs[index][field] = value;
        setFormData({ ...formData, faq: updatedFaqs });
    };

    return (
        <div className="step-container">
            <h2>Step 3: FAQs</h2>

            <AnimatePresence>
                {formData.faq.map((faq, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="faq-group"
                    >
                        <input
                            type="text"
                            placeholder={`Question ${index + 1}`}
                            value={faq.question}
                            onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                        />

                        <textarea
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>

            <button type="button" onClick={addFaq} className="add-btn">
                + Add FAQ
            </button>

            <div className="navigation-buttons">
                <button onClick={prevStep}>Back</button>
                <button onClick={nextStep}>Next</button>
            </div>
        </div>
    );
};

export default Step3FAQs;
