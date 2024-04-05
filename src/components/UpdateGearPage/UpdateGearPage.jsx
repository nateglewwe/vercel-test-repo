import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { readAndCompressImage } from 'browser-image-resizer';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';

import './UpdateGearPage.css';

import EditableFeature from '../EditableFeature/EditableFeature';
import EditableNote from '../EditableNote/EditableNote';

function UpdateGearPage(props) {

  const dispatch = useDispatch();
  const history = useHistory();
  const gear = useSelector((store) => store.gear.gearToUpdate);
  const [nameInput, setNameInput] = useState(gear.name);
  let [isEditing, setIsEditing] = useState(false);

  const [fileName, setFileName] = useState('');  // Selected image file name
  const [fileType, setFileType] = useState('');  // Selected file type
  const [selectedFile, setSelectedFile] = useState();  //Selected image file
  const [imagePreview, setImagePreview] = useState();  // Selected image preview
  const [imageList, setImageList] = useState([]);  // Used to display uploaded images on the page

  const features = [gear.feature_1, gear.feature_2, gear.feature_3, gear.feature_4,
                    gear.feature_5, gear.feature_6, gear.feature_7, gear.feature_8]
  const gearFeatures = features.map((feature, index) => <EditableFeature initialValue={feature} featureKey = {`feature_${index+1}`} key={index}/>)
  const notes = [gear.note_1, gear.note_2, gear.note_3, gear.note_4,
                 gear.note_5, gear.note_6, gear.note_7, gear.note_8]
  const gearNotes = notes.map((note, index) => <EditableNote initialValue={note} noteKey = {`note_${index+1}`} key={index}/>)
  const { toolId } = useParams();

  useEffect(() => {
    dispatch({ type: 'FETCH_GEAR_TO_UPDATE', payload: toolId });
    // getPhoto(); //I THINK THIS IS DONE??---------------------------------------------------------------
  }, []);

  function deletePhoto (toolName) {
    console.log('Deleting photo of single tool:', toolName);
    dispatch({ type: 'DELETE_PHOTO', payload: toolId });
  }

  const changeName = (event) => {
    if (event.key && event.key !== 'Enter'){
      return;
    }
    if (isEditing === true) {
      console.log('Changing name of gear to:', nameInput );
      dispatch({ type: 'CHANGE_GEAR_NAME', payload: {newName: nameInput, id: toolId} })
      setNameInput('')
    }
    setIsEditing(!isEditing)
  }

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

  const sendPhotoToServer = (event) => {
    event.preventDefault();
    //const fileName = encodeURIComponent(selectedFile.name); DON'T NEED THIS ANYMORE?
    const formData = new FormData();
    formData.append ('image', selectedFile);
    axios.post(`api/user/photo?photoName=${fileName}&toolId=${toolId}`, formData)
    .then (response => {
      console.log('Success!');
      alert('Success!');
      clearForm();
      // getPhoto(); //I THINK THIS IS DONE??!--------------------------------------------
    }) .catch (err => {
      console.log('Error in sendPhotoToServer axios post', err);
      alert('Something went wrong oh no');
    })
  }

  const clearForm = () => {
    setFileName('');
    setFileType('');
    setSelectedFile();
    setImagePreview();
    document.getElementById('fileUploader').value= null;
  }

  const getPhoto = () => { //I THINK I'M DONE WITH THIS??--------------------------------------
    axios.get(`/api/user/photo/https://freelancersgearschedulerbucket.s3.us-east-2.amazonaws.com/gearphotos/2/Midas%20MR18.jpg`)
    // console.log('ON THE CLIENT-SIDE AXIOS GET PHOTO ROUTE') //USED FOR DEBUGGING
    .then(response => {
      setImageList(response.data);
    }).catch(error => {
      console.log('error', error);
      alert('Something went wrong');
    });
  }

  return (
    <div className="updateGearDOM" >
      <h1>Update This Gear:</h1>
      {gear && (<>
        <Grid container spacing={2} className="gearGridUpdate" >
          <Grid item xs={3}>
            <b>Name: </b>
            {isEditing ?
            <>
              <input id="nameInput" placeholder="Name" value={nameInput}
                onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName}/>
              <Button variant="contained" size="small" onClick={changeName}>Save</Button>&nbsp;
              <Button variant="contained" size="small" onClick={() => setIsEditing(false)}>Cancel</Button>
            </>
            :
            <>
              <span>{gear.name}</span>&nbsp;
              <Button variant="contained" size="small" onClick={changeName}>Edit</Button>
            </>}<br /><br />
            <img src={imagePreview} alt={`Photo of ${gear.name}`} />
            <form onSubmit={sendPhotoToServer}>
              <input type="file" accept="image/*" id="fileUploader" onChange={onFileChange} required/>
              <Button variant="contained" size="small" type="submit">Change Photo</Button>
              {/* NEED TO ADD CANCEL BUTTON WITH CONDITIONAL RENDERING!---------------------------------------- */}
            </form><br />
            <Button variant="contained" size="small" onClick={() => deletePhoto(gear.name)}>Delete Photo</Button>
          </Grid>
          <Grid item xs={4}>
            <b>Features:</b>
            {gearFeatures}
          </Grid>
          <Grid item xs={4}>
            <b>Notes:</b>
            {gearNotes}
          </Grid><br />
          <Grid item xs={1}>
            <input type="button" value="Back to Gear List" onClick={() => history.push(`/gearlist`)}/>
          </Grid>
        </Grid>
      </>)}
    </div>
  );
}

export default UpdateGearPage;