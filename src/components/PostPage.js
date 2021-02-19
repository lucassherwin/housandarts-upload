import React, { useState } from 'react'
import EditIcon from '@material-ui/icons/Edit';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import {storage, db} from "../firebase/firebase"

export default function PostPage({ currentPost }) {
  const [edit, setEdit] = useState(false); // when this is true the post can be edited
  const [title, setTitle] = useState(currentPost.data.title);
  const [description, setDescription] = useState(currentPost.data.description);

  const [additionalImages, setAdditionalImages] = useState([]);
  const allInputs = {imgUrl: ''};

  const [imageAsUrl, setImageAsUrl] = useState(allInputs);

  const [imageUrls, setImageUrls] = useState([]);

  // array of strings
  const [imagesAsFiles, setImagesAsFile] = useState([]);
  const handleImageAsFile = (event) => {
    // const image = event.target.files[0];
    const files = Array.from(event.target.files);
    files.forEach(f => {
      setImagesAsFile(images => [...images, f]);
    })
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(imagesAsFiles.length === 0)
    {
      console.error('There was an error', imagesAsFiles);
    }
    
    imagesAsFiles.forEach(imageAsFile => {
      const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile);
      uploadTask.on('state_changed', 
      (snapShot) => {
        // snapshot of the process
        console.log(snapShot);
      }, (err) => {
        console.error(err);
      }, () => {
        // gets the functions from storage refences the image storage in firebase by the children
        // gets the download url then sets the image from firebase as the value for the imgUrl key:
        storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          console.log(typeof(fireBaseUrl));
          // save urls in state
          setImageUrls(urls => [...urls, {imgUrl: fireBaseUrl}]);
          console.log(imageUrls)
        })
      })
    })
  }

  return (
    <div>
      <IconButton onClick={() => setEdit(true)}><EditIcon/></IconButton>
      {edit ? 
      <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="standard-basic" label='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
          <TextField id="standard-basic" label='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
          <input accept="image/*" id="icon-button-file" type="file" style={{display: 'none'}} onChange={handleImageAsFile} multiple={true} />
          <label htmlFor="icon-button-file">
          <IconButton color="primary" aria-label="upload picture" component="span">
            <PhotoLibraryIcon />
          </IconButton>
      </label>
          <Button variant="contained" color="primary" size="large" startIcon={<SaveIcon />} onClick={handleSubmit} >Save</Button>
        </form>
      </div> : 
      <div>
        <h1>{currentPost.data.title}</h1>
        <p>{currentPost.data.description}</p>
      </div>
      }
      <img src={currentPost.data.src} alt={currentPost.data.title} height='200px' />
    </div>
  )
}

    // event.preventDefault();
    // get the doc to update by the id
    // const updateDoc = db.collection('posts').doc(currentPost.id);
    // // update
    // return updateDoc.update({
    //   title,
    //   description,
    //   additionalImages
    // })
    // .then(() => {
    //   console.log('success');
    // })
    // .catch((error) => {
    //   console.log('error', error);
    // })
    // save title, description, additional images to firebase