import React from "react";

const Step1BasicInfo = ({
    formData,
    handleChange,
    handleThumbnailUpload,
    loading,
    nextStep
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
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter course title"
                        className="input"
                        id="title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="desc" className="label">Description</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Enter a short description"
                        className="textarea"
                        id="desc"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="category" className="label">Category</label>
                    <input
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter the course category"
                        className="category"
                        id="category"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="price" className="label">Price</label>
                    <input
                        name="price"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Set a price for the course"
                        className="price"
                        id="price"
                    />
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

                    {formData.thumbnail && (
                        <img
                            src={formData.thumbnail}
                            alt="Thumbnail Preview"
                            className="thumbnail-preview"
                        />
                    )}
                </div>
                <div className="navigation-buttons one-row">
                    <button className="add-btn" onClick={nextStep}>
                        Next
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Step1BasicInfo;
