import React, { useEffect, useState } from 'react';
import {useSelector} from 'react-redux';
import { readAndCompressImage } from 'browser-image-resizer';

import FeatureInput from '../FeatureInput/FeatureInput';


function AddGearPage(props) {

  const store = useSelector((store) => store);

  const [fileName, setFileName] = useState('');  // Selected image file name
  const [fileType, setFileType] = useState('');  // Selected file type
  const [selectedFile, setSelectedFile] = useState();  //Selected image file
  const [imagePreview, setImagePreview] = useState();  // Selected image preview
  const [imageList, setImageList] = useState([]);  // Used to display uploaded images on the page

  const [nameInput, setNameInput] = useState('');  //Stores name of gear to be added
  const [feature1Input, setFeature1Input] = useState('');  //Stores value of feature
  const [feature2Input, setFeature2Input] = useState('');
  const [feature3Input, setFeature3Input] = useState('');
  const [feature4Input, setFeature4Input] = useState('');
  const [feature5Input, setFeature5Input] = useState('');
  const [feature6Input, setFeature6Input] = useState('');
  const [feature7Input, setFeature7Input] = useState('');
  const [feature8Input, setFeature8Input] = useState('');
  const [note1Input, setNote1Input] = useState('');  //Stores value of note
  const [note2Input, setNote2Input] = useState('');
  const [note3Input, setNote3Input] = useState('');
  const [note4Input, setNote4Input] = useState('');
  const [note5Input, setNote5Input] = useState('');
  const [note6Input, setNote6Input] = useState('');
  const [note7Input, setNote7Input] = useState('');
  const [note8Input, setNote8Input] = useState('');



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

  const deletePhoto = () => {
    setFileName('');
    setFileType('');
    setSelectedFile();
    setImagePreview();
    document.getElementById('fileUploader').value= null;
  }

  const addGearToList = () => {
    console.log();
  }

  return (
    <div>
      <h1>Add Gear:</h1>
      {imagePreview ? 
        <img src={imagePreview} alt={`Photo of ${fileName}`} />
      :
        <p>Add a photo to display preview here</p>
      }<br />
      <input type="file" accept="image/*" id="fileUploader"onChange={onFileChange} />
      <input type="button" value="Delete Photo" onClick={() => deletePhoto()}/><br />
      <h4>Name:</h4>
      <input id="nameInput" placeholder="Name" value={nameInput}
          onChange={(event) => {setNameInput(event.target.value)}} />
      <h4>Features:</h4>
      <input id="feature1Input" placeholder="Feature 1" value={feature1Input}
          onChange={(event) => {setFeature1Input(event.target.value)}} /><br />

      <form onSubmit={addGearToList}>
        <FeatureInput /><br />
        <FeatureInput /><br />
        <FeatureInput /><br />
      <button type="submit">Add Gear</button>
      </form>
      

    </div>
  );
}

export default AddGearPage;

const updateKeyValue = (key, newValue) => {
  setState(prevState => ({
    ...prevState,
    [key]: newValue
  }));
};

const changeFeature = (featureNum, newValue) => {
  setFeatures(prevState => ({
    ...prevState,
    featureNum: newValue
  }))
}