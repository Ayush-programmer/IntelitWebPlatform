import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import { IoMdClose } from 'react-icons/io';

const Step2Resources = ({
    formData,
    setFormData,
    addMaterial,
    addReference,
    addTopic,
    prevStep,
    nextStep,
    errors,
    setErrors
}) => {

    const handleTopicsChange = (index, value) => {
        const updatedTopics = [...formData.topicsToLearn];
        updatedTopics[index] = value;
        setFormData({ ...formData, topicsToLearn: updatedTopics });

        let error = "";

        if (value.length > 200) {
            error = "Topic is too large";
        }

        setErrors(prev => ({
            ...prev,
            [`topic-${index}`]: error
        }));
    }

    const removeTopic = (index) => {
        const updatedTopics = formData.topicsToLearn.filter((_, i) => i !== index);

        setFormData(prev => ({
            ...prev,
            topicsToLearn: updatedTopics
        }));

        setErrors(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`topic-${index}`];
            return updatedErrors;
        });
    };

    const removeReference = (index) => {
        const updatedReferences = formData.references.filter((_, i) => i !== index);

        setFormData(prev => ({
            ...prev,
            references: updatedReferences
        }));

        setErrors(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`reference-${index}`];
            return updatedErrors;
        })
    }

    const removeMaterial = (index) => {
        const updatedMaterials = formData.materials.filter((_, i) => i !== index);

        setFormData(prev => ({
            ...prev,
            materials: updatedMaterials
        }));

        setErrors(prev => {
            const updatedErrors = { ...prev };
            delete updatedErrors[`materialDesc-${index}`];
            delete updatedErrors[`materialUrl-${index}`];
            return updatedErrors;
        });
    }

    const validateMaterial = (materials, index) => {
        const { desc, fileURL } = materials[index];

        let descError = "";
        let urlError = "";

        if (desc && !fileURL) {
            descError = "Material URL is required.";
        }

        if (fileURL && !desc) {
            urlError = "Material name is required.";
        }

        setErrors(prev => ({
            ...prev,
            [`materialDesc-${index}`]: urlError,
            [`materialUrl-${index}`]: descError
        }));
    };

    const handleMaterialDescChange = (index, value) => {
        const updatedMaterials = [...formData.materials];
        updatedMaterials[index].desc = value;
        setFormData({ ...formData, materials: updatedMaterials });

        validateMaterial(updatedMaterials, index);
    };

    const handleMaterialUrlChange = (index, value) => {
        const updatedMaterials = [...formData.materials];
        updatedMaterials[index].fileURL = value;
        setFormData({ ...formData, materials: updatedMaterials });

        validateMaterial(updatedMaterials, index)
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
                            <div className="input-row">
                                <input
                                    type="text"
                                    name='topicsToLearn'
                                    value={topic}
                                    onChange={(e) => handleTopicsChange(index, e.target.value)}
                                    placeholder={`Topic ${index + 1}`}
                                    className="form-input"
                                />
                                {formData.topicsToLearn.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeTopic(index)}
                                    >
                                        <IoMdClose color="#333" className='icon' />
                                    </button>)}
                                {errors[`topic-${index}`] && <p className='error'>{errors[`topic-${index}`]}</p>}
                            </div>
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
                            <div className="input-row">
                                <input
                                    type="text"
                                    name='materialDesc'
                                    value={material.desc}
                                    onChange={(e) => handleMaterialDescChange(index, e.target.value)}
                                    placeholder={`Give a description of the material`}
                                    className="form-input"
                                />
                                {formData.materials.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeMaterial(index)}
                                    >
                                        <IoMdClose color="#333" className='icon' />
                                    </button>)}
                                {errors[`materialDesc-${index}`] && <p className='error'>{errors[`materialDesc-${index}`]}</p>}
                            </div>
                            <input
                                type="text"
                                name='materialUrl'
                                value={material.fileURL}
                                onChange={(e) => handleMaterialUrlChange(index, e.target.value)}
                                placeholder={`Give the File URL`}
                                className="form-input"
                            />
                            {errors[`materialUrl-${index}`] && <p className='error'>{errors[`materialUrl-${index}`]}</p>}
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
                            <div className="input-row">
                                <input
                                    type="text"
                                    value={reference}
                                    onChange={(e) => handleReferenceChange(index, e.target.value)}
                                    placeholder={`Reference ${index + 1}`}
                                    className="form-input"
                                />
                                {formData.references.length > 1 && (
                                    <button
                                        type="button"
                                        className="remove-btn"
                                        onClick={() => removeReference(index)}
                                    >
                                        <IoMdClose 
                                        color="#333" className='icon' />
                                    </button>)}
                                {errors[`reference-${index}`] && <p className='error'>{errors[`reference-${index}`]}</p>}
                            </div>
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