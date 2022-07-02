import React from "react";
import ImageUploading from "react-images-uploading";

export function CoverPicture() {
  const [image, setImage] = React.useState(null);
  const maxNumber = 1;

  const onChange = (uploadImage) => {
    // data for submit
    console.log(uploadImage);
    setImage(uploadImage);
  };

  return (
    <div>
      <ImageUploading
        value={image}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          onImageRemoveAll,
          onImageUpdate,
          onImageRemove,
          errors,
          isDragging,
          dragProps,
        }) => (
          // write your building UI
          <div className="upload__image-wrapper">
            <button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              {...dragProps}
            >
              Click or Drop here your cover photo
            </button>
            &nbsp;
            <button onClick={onImageRemoveAll}>Remove the cover photo</button>
            {imageList.map((image, index) => (
              <div key={index} className="image-item">
                <img src={image["data_url"]} alt="" width="100" />
                <div className="image-item__btn-wrapper">
                  <button onClick={() => onImageUpdate(index)}>Update</button>
                  <button onClick={() => onImageRemove(index)}>Remove</button>
                </div>
              </div>
            ))}
           { errors &&
            <div>
              {errors.maxNumber && (
                <span>Number of selected images exceed maxNumber</span>
              )}
              {errors.acceptType && (
                <span>Your selected file type is not allow</span>
              )}
              {errors.maxFileSize && (
                <span>Selected file size exceed maxFileSize</span>
              )}
              {errors.resolution && (
                <span>Selected file is not match your desired resolution</span>
              )}
            </div>}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default CoverPicture;
