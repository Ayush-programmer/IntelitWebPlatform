import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Step2Resources = ({
    formData,
    setFormData,
    addMaterial,
    addReference,
    addTopic,
    prevStep,
    nextStep,
}) => {

    const handleTopicsChange = (index, value) => {
        const updatedTopics = [...formData.topicsToLearn];
        updatedTopics[index] = value;
        setFormData({ ...formData, topicsToLearn: updatedTopics});
    }

    const handleMaterialDescChange = (index, value) => {
        const updatedMaterials = [...formData.materials];
        updatedMaterials[index].desc = value;
        setFormData({ ...formData, materials: updatedMaterials });
    };

    const handleMaterialUrlChange = (index, value) => {
        const updatedMaterials = [...formData.materials];
        updatedMaterials[index].fileURL = value;
        setFormData({ ...formData, materials: updatedMaterials });
    };

    const handleReferenceChange = (index, value) => {
        const updatedReferences = [...formData.references];
        updatedReferences[index] = value;
        setFormData({ ...formData, references: updatedReferences });
    };

    return (
        <div className="step-container">
            <h2 className="step-title">Step 2: Course Learnings & Resources</h2>

            {/* Topics Section */}
            <div className="form-group">
                <h3 className="label">Topics to learn</h3>
                <AnimatePresence>
                    {formData.topicsToLearn.map((topic, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="input-wrapper"
                        >
                            <input
                                type="text"
                                value={topic}
                                onChange={(e) => handleTopicsChange(index, e.target.value)}
                                placeholder={`Topic ${index + 1}`}
                                className="form-input"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button type="button" onClick={addTopic} className="add-btn">
                    + Add Topic
                </button>
            </div>


            {/* Materials Section */}
            <div className="form-group">
                <h3 className="label">Materials</h3>
                <AnimatePresence>
                    {formData.materials.map((material, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="input-wrapper"
                        >
                            <input
                                type="text"
                                value={material.desc}
                                onChange={(e) => handleMaterialDescChange(index, e.target.value)}
                                placeholder={`Give a description of the material`}
                                className="form-input"
                            />
                            <input
                                type="text"
                                value={material.fileURL}
                                onChange={(e) => handleMaterialUrlChange(index, e.target.value)}
                                placeholder={`Give the File URL`}
                                className="form-input"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button type="button" onClick={addMaterial} className="add-btn">
                    + Add Material
                </button>
            </div>

            {/* References Section */}
            <div className="form-group">
                <h3 className="label">References</h3>
                <AnimatePresence>
                    {formData.references.map((reference, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="input-wrapper"
                        >
                            <input
                                type="text"
                                value={reference}
                                onChange={(e) => handleReferenceChange(index, e.target.value)}
                                placeholder={`Reference ${index + 1}`}
                                className="form-input"
                            />
                        </motion.div>
                    ))}
                </AnimatePresence>
                <button type="button" onClick={addReference} className="add-btn">
                    + Add Reference
                </button>
            </div>

            {/* Navigation Buttons */}
            <div className="navigation-buttons">
                <button type="button" onClick={prevStep} className="nav-btn back-btn">
                    Back
                </button>
                <button type="button" onClick={nextStep} className="nav-btn next-btn">
                    Next
                </button>
            </div>
        </div>
    );
};

export default Step2Resources;