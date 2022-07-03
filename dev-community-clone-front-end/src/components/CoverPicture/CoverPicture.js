import React from "react";
import ImageUploading from "react-images-uploading";
import CoverPictureCSS from "./CoverPicture.module.css";
import { useDispatch, useSelector } from "react-redux";
import { coverPicture } from "reducers/newPostReducer";

export function CoverPicture() {
  const [image, setImage] = React.useState([]);
  const dispatch = useDispatch();
  const maxNumber = 1;
// @ts-ignore
const prisitedImage = useSelector(state => state.newPost)
  const onChange = (uploadImage) => {
    // data for submit
    console.log(uploadImage);
    setImage(uploadImage);
    dispatch(coverPicture(JSON.stringify(uploadImage)))
    console.log(uploadImage);
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
