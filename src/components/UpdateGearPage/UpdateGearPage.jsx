import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import { readAndCompressImage } from 'browser-image-resizer';

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
    getPhoto(); //I THINK THIS IS DONE??---------------------------------------------------------------
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
      getPhoto(); //I THINK THIS IS DONE??!--------------------------------------------
    }) .catch (err => {
      console.log('Error in onSubmit image axios post', err);
      alert('Something went wrong oh no');
    })
  }

  const clearForm = () => {
    setFileName('');
    setFileType('');
    setSelectedFile(undefined);
    setImagePreview(undefined);
  }

  const getPhoto = () => { //I THINK I'M DONE WITH THIS??--------------------------------------
    axios.get(`/api/user/photo/https://freelancersgearschedulerbucket.s3.us-east-2.amazonaws.com/gearphotos/2/Midas%20MR18.jpg`)
    // console.log(gear.photo) //USED FOR DEBUGGING
    .then(response => {
      setImageList(response.data);
    }).catch(error => {
      console.log('error', error);
      alert('Something went wrong');
    });
  }

  return (
    <div>
      <h1>Update This Gear:</h1>
      {gear && (<>
      <img src={imageList} alt={`Photo of ${gear.name}`} />
      <form onSubmit={sendPhotoToServer}>
        <input type="file" accept="image/*" onChange={onFileChange} />
        <button type="submit">Submit</button>
      </form>
      <input type="button" value="Delete Photo" onClick={() => deletePhoto(gear.name)}/><br />
      <h4>Name:</h4>
      {isEditing ?
      <>
        <input id="nameInput" placeholder="Name" value={nameInput}
          onChange={(event) => {setNameInput(event.target.value)}} onKeyDown={changeName}/>
        <button onClick={changeName}>Save</button>&nbsp;
        <button onClick={() => setIsEditing(false)}>Cancel</button>
      </>
      :
      <>
        <span>{gear.name}</span>&nbsp;
        <button onClick={changeName}>Edit</button>
      </>}
      <div>
        <h4>Features:</h4>
        {gearFeatures}
      </div>
      <div>
        <h4>Notes:</h4>
        {gearNotes}
      </div><br />
      <input type="button" value="Back to Gear List" onClick={() => history.push(`/gearlist`)}/>
      </>)}
    </div>
  );
}

export default UpdateGearPage;
