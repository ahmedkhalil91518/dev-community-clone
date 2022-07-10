import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import CoverPictureCSS from "./CoverPicture.module.css";
import { useDispatch, useSelector } from "react-redux";
import { coverPicture } from "reducers/newPostReducer";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { app } from "../../firebase";
import CircularProgress from "@mui/material/CircularProgress";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

export function CoverPicture() {
  const [image, setImage] = useState([]);
  const [upImage, setUpImage] = useState("");
  const [progress, setProgress] = useState(0);
  const dispatch = useDispatch();
  const maxNumber = 1;
  const user = useSelector((state) => {
    // @ts-ignore
    return state.auth;
  });

  // @ts-ignore
  const auth = useSelector((state) => state.auth);
  const onChange = (uploadImage) => {
    setImage(uploadImage);
    upload(uploadImage[0].file);
    dispatch(coverPicture(upImage));
  };
  const configuredStorage = getStorage(app);
  const upload = (file) => {
    if (!file) return;
    const storageRef = ref(
      configuredStorage,
      `/files/covers/${auth.uid}/${file.name}`
    );
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const prog = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgress(prog);
      },
      (err) => {
        console.log(err);
      },
      () => {
        const durl = getDownloadURL(uploadTask.snapshot.ref).then((url) => {
          setUpImage(url);
          setProgress(100);
        });
      }
    );
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
                disabled={image[0] ? true : false}
              >
                Click or Drop here your cover photo
              </button>
              {/* <button onClick={onImageRemoveAll} className={CoverPictureCSS.button}>Remove the cover photo</button> */}
            </div>
            {imageList.map((image, index) => (
              <div key={index} className={CoverPictureCSS.imageItem}>
                <img
                  src={image["data_url"]}
                  alt=""
                  className={CoverPictureCSS.image}
                />
                <div className={CoverPictureCSS.imageItemButtons}>
                  <button
                    onClick={() => onImageUpdate(index)}
                    className={CoverPictureCSS.button}
                  >
                    Update
                  </button>
                  <button
                    onClick={() => onImageRemove(index)}
                    className={CoverPictureCSS.button}
                  >
                    Remove
                  </button>
                  {progress !== 0 && (
                    <div className={CoverPictureCSS.progress}>
                      <CircularProgress
                        variant="determinate"
                        value={progress}
                        color="inherit"
                        size={"70px"}
                      />
                      <Box
                        sx={{
                          top: 0,
                          left: 0,
                          bottom: 0,
                          right: 0,
                          position: "absolute",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <Typography
                          variant="caption"
                          component="div"
                          color="text.secondary"
                        >
                          {`${Math.round(progress)}%`}
                        </Typography>
                      </Box>
                    </div>
                  )}
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
