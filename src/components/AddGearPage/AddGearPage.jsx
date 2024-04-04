import React, { useEffect, useState } from 'react';//List of technology imports
import { readAndCompressImage } from 'browser-image-resizer';
import {useDispatch, useSelector} from 'react-redux';

import Button from '@mui/material/Button';//Listo f MUI imports
import TextField from '@mui/material/TextField';

import FeatureInput from '../FeatureInput/FeatureInput';// List of component imports


function AddGearPage(props) {

  const store = useSelector((store) => store);
  const dispatch = useDispatch();

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

  const addGearToList = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append ('image', selectedFile);
    dispatch({ type: 'POST_NEW_GEAR', payload: {fileName: fileName, formData: formData} });
    // clearForm();
    // getPhoto();
    // Add history.push back to gear list page?
  }

  return (
    <div>
      <form onSubmit={addGearToList}>
        <h1>Add Gear:</h1>
          {imagePreview ? 
            <img src={imagePreview} alt={`Photo of ${fileName}`} />
          :
            <p>Add a photo to display preview here</p>
          }<br />
          <input type="file" accept="image/*" id="fileUploader" onChange={onFileChange} />
          <Button variant="contained" onClick={() => deletePhoto()}>Delete Photo</Button>
        <h4>Name:</h4>          
          <TextField id="nameInput" placeholder="Name (Required)" value={nameInput}
              onChange={(event) => {setNameInput(event.target.value)}} size="small" required/>
        <h4>Features:</h4>
          <TextField id="feature1Input" placeholder="Feature 1" value={feature1Input}
              onChange={(event) => {setFeature1Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature2Input" placeholder="Feature 2" value={feature2Input}
              onChange={(event) => {setFeature2Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature3Input" placeholder="Feature 3" value={feature3Input}
              onChange={(event) => {setFeature3Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature4Input" placeholder="Feature 4" value={feature4Input}
              onChange={(event) => {setFeature4Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature5Input" placeholder="Feature 5" value={feature5Input}
              onChange={(event) => {setFeature5Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature6Input" placeholder="Feature 6" value={feature6Input}
              onChange={(event) => {setFeature6Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature7Input" placeholder="Feature 7" value={feature7Input}
              onChange={(event) => {setFeature7Input(event.target.value)}} size="small" margin="dense" /><br />
          <TextField id="feature8Input" placeholder="Feature 8" value={feature8Input}
              onChange={(event) => {setFeature8Input(event.target.value)}} size="small" margin="dense" /><br />
        <h4>Notes:</h4>
        <TextField id="note1Input" placeholder="Note 1" value={note1Input}
            onChange={(event) => {setNote1Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note2Input" placeholder="Note 2" value={note2Input}
            onChange={(event) => {setNote2Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note3Input" placeholder="Note 3" value={note3Input}
            onChange={(event) => {setNote3Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note4Input" placeholder="Note 4" value={note4Input}
            onChange={(event) => {setNote4Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note5Input" placeholder="Note 5" value={note5Input}
            onChange={(event) => {setNote5Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note6Input" placeholder="Note 6" value={note6Input}
            onChange={(event) => {setNote6Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note7Input" placeholder="Note 7" value={note7Input}
            onChange={(event) => {setNote7Input(event.target.value)}} size="small" margin="dense" /><br />
        <TextField id="note8Input" placeholder="Note 8" value={note8Input}
            onChange={(event) => {setNote8Input(event.target.value)}} size="small" margin="dense" /><br />
        <Button variant="contained" type="submit">Create Gear Listing</Button>
      </form>
    </div>
  );
}

export default AddGearPage;

// const updateKeyValue = (key, newValue) => {
//   setState(prevState => ({
//     ...prevState,
//     [key]: newValue
//   }));
// };

const changeFeature = (featureNum, newValue) => {
  if (featureNum === 1) {
    setFeatures(prevState => ({
      ...prevState,
      feature1: newValue
    }));
  } else if (featureNum === 2) {
    setFeatures(prevState => ({
      ...prevState,
      feature2: newValue
    }));
  } else if (featureNum === 3) {
    setFeatures(prevState => ({
      ...prevState,
      feature3: newValue
    }));
  } else if (featureNum === 4) {
    setFeatures(prevState => ({
      ...prevState,
      feature4: newValue
    }));
  } else if (featureNum === 5) {
    setFeatures(prevState => ({
      ...prevState,
      feature5: newValue
    }));
  } else if (featureNum === 6) {
    setFeatures(prevState => ({
      ...prevState,
      feature6: newValue
    }));
  } else if (featureNum === 7) {
    setFeatures(prevState => ({
      ...prevState,
      feature7: newValue
    }));
  } else if (featureNum === 8) {
    setFeatures(prevState => ({
      ...prevState,
      feature8: newValue
    }));
  } 
}