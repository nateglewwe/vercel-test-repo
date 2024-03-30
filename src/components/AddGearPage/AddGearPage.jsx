import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';

function AddGearPage(props) {

  const store = useSelector((store) => store);

  const [fileName, setFileName] = useState('');  // Selected image file name
  const [fileType, setFileType] = useState('');  // Selected file type
  const [selectedFile, setSelectedFile] = useState();  //Selected image file
  const [imagePreview, setImagePreview] = useState();  // Selected image preview
  const [imageList, setImageList] = useState([]);  // Used to display uploaded images on the page

  const onFileChange = async (event) => {

    const fileToUpload = event.target.files[0];
    const copyFile = new Blob([fileToUpload], { type: fileToUpload.type, name: fileToUpload.name });
    const resizedFile = await readAndCompressImage(copyFile, {
      quality: 1.0,    // 100% quality
      maxHeight: 300, // max height of the image
    });
    const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/png'];
    // Check if the file is one of the allowed types.
    if (acceptedImageTypes.includes(fileToUpload.type)) {
      // Resizing the image removes the name, store it in a separate variable
      setFileName(encodeURIComponent(fileToUpload.name));
      setFileType(encodeURIComponent(fileToUpload.type));
      // Save the resized file
      setSelectedFile(resizedFile);
      // Create a URL that can be used in an img tag for previewing the image
      setImagePreview(URL.createObjectURL(resizedFile));
    } else {
      alert('Please select an image');
    }
  }

  return (
    <div>
      <h1>Add Gear:</h1>
      {imagePreview ? 
        <img src={imagePreview} alt={`Photo of ${fileName}`} />
      :
        <p>Add a photo to display preview here</p>
      }<br />
      <input type="file" accept="image/*" onChange={onFileChange} />
      

    </div>
  );
}

export default AddGearPage;