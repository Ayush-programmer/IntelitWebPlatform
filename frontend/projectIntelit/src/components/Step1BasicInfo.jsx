import React from "react";

const Step1BasicInfo = ({
    formData,
    handleChange,
    setFormData,
    handleThumbnailUpload,
    loading,
    nextStep,
    errors
}) => {
    return (
        <div className="step-container">
            <h2 className="step-heading">Step 1: Course Basic Information</h2>
            <form>
                <div className="form-group">
                    <label htmlFor="title" className="label">Course Title</label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title || ''}
                        onChange={handleChange}
                        placeholder="Enter course title"
                        className="input"
                        id="title"
                        required
                    />
                    {errors.title && <p className="error">{errors.title}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="desc" className="label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description || ''}
                        onChange={handleChange}
                        placeholder="Enter a short description"
                        className="textarea"
                        id="desc"
                        minLength={10}
                        maxLength={500}
                        required
                    />
                    {errors.description && <p className="error">{errors.description}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="label">Category</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category || ''}
                        onChange={handleChange}
                        placeholder="Enter the course category"
                        className="category"
                        id="category"
                        minLength={10}
                        maxLength={100}
                        required
                    />
                    {errors.category && <p className="error">{errors.category}</p>}
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="label">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price || ''}
                        onChange={handleChange}
                        placeholder="Set a price for the course"
                        className="price"
                        id="price"
                    />
                    {errors.price && <p className="error">{errors.price}</p>}
                </div>

                <div className="form-group">
                    <label className="label">Upload Thumbnail</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleThumbnailUpload}
                        className="file-input"
                    />
                    {loading && <div className="loader">Uploading...</div>}

                </div>
                <div className="navigation-buttons one-row">
                    <button type="button" className="nav-btn next-btn" onClick={nextStep}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step1BasicInfo;