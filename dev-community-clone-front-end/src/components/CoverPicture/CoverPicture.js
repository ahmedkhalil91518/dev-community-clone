import React from "react";
import ImageUploading from "react-images-uploading";
import CoverPictureCSS from "./CoverPicture.module.css";
export function CoverPicture() {
  const [image, setImage] = React.useState([]);
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
          <div className={CoverPictureCSS.uploadImageWrapper}>
            <div className={CoverPictureCSS.uploadButtons}>
              <button
                style={isDragging ? { color: "red" } : undefined}
                onClick={onImageUpload}
                {...dragProps}
                className={CoverPictureCSS.button}
                disabled={image[0] ? true: false}
              >
                Click or Drop here your cover photo
              </button>
              {/* <button onClick={onImageRemoveAll} className={CoverPictureCSS.button}>Remove the cover photo</button> */}
            </div>
            {imageList.map((image, index) => (
              <div key={index} className={CoverPictureCSS.imageItem}>
                <img src={image["data_url"]} alt=""  className={CoverPictureCSS.image}/>
                <div className={CoverPictureCSS.imageItemButtons}>
                  <button onClick={() => onImageUpdate(index)} className={CoverPictureCSS.button}>Update</button>
                  <button onClick={() => onImageRemove(index)} className={CoverPictureCSS.button}>Remove</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </ImageUploading>
    </div>
  );
}

export default CoverPicture;
