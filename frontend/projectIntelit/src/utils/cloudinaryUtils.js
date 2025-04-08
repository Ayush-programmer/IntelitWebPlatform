const cloudName = import.meta.env.VITE_CLOUD_NAME;
const uploadPresetCourse = import.meta.env.VITE_CLOUD_PRESET_COURSE;

export const uploadThumbnailToCloudinary = async (file) => {
    console.log(file);
    
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPresetCourse);
    formData.append("folder", "course/media"); // this is optional if default set in preset

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/upload`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (data.secure_url) return data.secure_url;
    else throw new Error(data.error?.message || "Failed to upload thumbnail to Cloudinary");
};

export const uploadVideoToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", uploadPresetCourse);
    formData.append("folder", "course/media");

    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/video/upload`, {
        method: "POST",
        body: formData
    });

    const data = await res.json();

    if (data.secure_url) return data.secure_url;
    else throw new Error(data.error?.message || "Failed to upload video to Cloudinary");
};
