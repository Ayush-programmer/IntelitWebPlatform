import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IoMdClose } from 'react-icons/io';
IoMdClose

const Step3FAQs = ({ formData, setFormData, addFaq, prevStep, nextStep, errors, setErrors }) => {
    const handleFaqChange = (index, field, value) => {
        const updatedFaqs = [...formData.faq];
        updatedFaqs[index][field] = value;
        setFormData({ ...formData, faq: updatedFaqs });
        validateFAQ(updatedFaqs, index)
    };

    const validateFAQ = (faqs, index) => {
        const { question, answer } = faqs[index];

        let quesError = "";
        let ansError = "";

        if (question && !answer) {
            quesError = "Answer is required.";
        }

        if (answer && !question) {
            ansError = "Question is required.";
        }

        setErrors(prev => ({
            ...prev,
            [`ques-${index}`]: ansError,
            [`ans-${index}`]: quesError
        }));
    };

    const removeFAQ = (index) => {
        const updatedFAQ = formData.faq.filter((_, i) => i !== index);

        setFormData(prev => ({
            ...prev,
            faq: updatedFAQ
        }));

        setErrors(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`ques-${index}`];
            delete updatedErrors[`ans-${index}`];
            return updatedErrors;
        });
    }

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
                        <div className="input-row">
                            <input
                                type="text"
                                placeholder={`Question ${index + 1}`}
                                value={faq.question}
                                onChange={(e) => handleFaqChange(index, 'question', e.target.value)}
                            />
                            {formData.faq.length > 1 && (
                                <button
                                    type="button"
                                    className="remove-btn"
                                    onClick={() => removeFAQ(index)}
                                >
                                    <IoMdClose color="#333" className='icon' />
                                </button>)}
                            {errors[`ques-${index}`] && <p className='error'>{errors[`ques-${index}`]}</p>}
                        </div>

                        <textarea
                            placeholder="Answer"
                            value={faq.answer}
                            onChange={(e) => handleFaqChange(index, 'answer', e.target.value)}
                        />
                        {errors[`ans-${index}`] && <p className='error'>{errors[`ans-${index}`]}</p>}
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
