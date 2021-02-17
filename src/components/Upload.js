import React, { useState } from 'react'
import {storage, db} from "../firebase/firebase"

export default function App() {
  // handle images
  const allInputs = {imgUrl: ''};
  const [imageAsFile, setImageAsFile] = useState('');
  const [imageAsUrl, setImageAsUrl] = useState(allInputs);
  
  const handleImageAsFile = (event) => {
    const image = event.target.files[0];
    setImageAsFile(imageFile => image);
  }

  // handle text
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [tag, setTag] = useState('poster'); // default is poster

  const uploadImage = (event) => {
    event.preventDefault();
    if(imageAsFile === '' )
    {
      console.error(`not an image, the image file is a ${typeof(imageAsFile)}`);
    }

    const uploadTask = storage.ref(`/images/${imageAsFile.name}`).put(imageAsFile)

    uploadTask.on('state_changed', 
    (snapShot) => {
      // takes a snap shot of the process as it is happening
      console.log('here', snapShot)
    }, (err) => {
      // catches the errors
      console.log(err)
    }, () => {
      // gets the functions from storage refences the image storage in firebase by the children
      // gets the download url then sets the image from firebase as the value for the imgUrl key:
      storage.ref('images').child(imageAsFile.name).getDownloadURL()
        .then(fireBaseUrl => {
          // console.log('test', fireBaseUrl) this is the img url
          setImageAsUrl(prevObject => ({...prevObject, imgUrl: fireBaseUrl}))
        
          db.collection('posts').add({
            title,
            description,
            src: fireBaseUrl,
            tag
          })
        })
      })
  }

  return (
    <div>
      <form onSubmit={uploadImage}>
        <input type='file' onChange={handleImageAsFile} />
        <input type='text' onChange={(event) => setTitle(event.target.value)} name='title' placeholder='Enter a title' value={title}  />
        <input type='text' onChange={(event) => setDescription(event.target.value)} name='description' placeholder='Enter a description' value={description} />
        <select name='tags' value={tag} onChange={(event) => setTag(event.target.value)}>
          <option value='poster'>poster</option>
          <option value='pattern'>pattern</option>
          <option value='apparel'>apparel</option>
          <option value='packaging'>packaging</option>
        </select>
        <button>Upload</button>
      </form>
    </div>
  )
}