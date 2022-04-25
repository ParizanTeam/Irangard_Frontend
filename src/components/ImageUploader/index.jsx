import React, { useState } from "react";
import "./style.scss";

import Dropzone from "react-dropzone";

export default function ImageUploader() {
  const [fileNames, setFileNames] = useState([]);
  const handleDrop = acceptedFiles =>
    setFileNames(acceptedFiles.map(file => file.name));

  return (
    <div className="image-uploader">
      <Dropzone
        onDrop={handleDrop}
        accept="image/*"
        minSize={1024}
        maxSize={3072000}
      >
        {({
          getRootProps,
          getInputProps,
          isDragActive,
          isDragAccept,
          isDragReject
        }) => {
          const additionalClass = isDragAccept
            ? "accept"
            : isDragReject
            ? "reject"
            : "";

          return (
            <div
              {...getRootProps({
                className: `dropzone ${additionalClass}`
              })}
            >
              <input {...getInputProps()} />
              <span>{isDragActive ? "📂" : "📁"}</span>
              <p className="txt">عکسهای مورد نظر را در اینجا کشیده و رها کنید</p>
              <p className="txt">و یا برای انتخاب آنها اینجا کلیک کنید</p>
            </div>
          );
        }}
      </Dropzone>
      <div>
        <strong className="txt">فایلهای آپلود شده:</strong>
        <ul style={{marginTop:'15px'}}>
          {fileNames.map(fileName => (
            <li key={fileName}>{fileName}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
