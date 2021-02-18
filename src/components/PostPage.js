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

  const handleSubmit = (event) => {
    event.preventDefault();
    // get the doc to update by the id
    const updateDoc = db.collection('posts').doc(currentPost.id);
    // update
    return updateDoc.update({
      title,
      description
    })
    .then(() => {
      console.log('success');
    })
    .catch((error) => {
      console.log('error', error);
    })
    // save title, description, additional images to firebase
  }

  return (
    <div>
      <IconButton onClick={() => setEdit(true)}><EditIcon/></IconButton>
      {edit ? 
      <div>
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField id="standard-basic" label='Title' value={title} onChange={(event) => setTitle(event.target.value)} />
          <TextField id="standard-basic" label='Description' value={description} onChange={(event) => setDescription(event.target.value)} />
          <input accept="image/*" id="icon-button-file" type="file" style={{display: 'none'}} />
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