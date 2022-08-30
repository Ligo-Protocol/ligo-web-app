import process from 'process'
import { useState } from 'react';
import { Web3Storage } from 'web3.storage'

function UploadImage() {
    
  const [selectedFile, setSelectedFile]: any= useState();

  function fileSelectHandler(event:any){
    setSelectedFile(event.target.files[0]);
  }

  async function fileUploadHandler(event:any){
  const token = process.env.REACT_APP_WEB3STORAGE_TOKEN;

  if (!token) {
    return console.error('A token is needed. You can create one on https://web3.storage')
  }
      
  const storage = new Web3Storage({ token })
  const cid = await storage.put(
    [selectedFile],
    {
    name: selectedFile.name
  })
  console.log(cid)
    }

    return (
        <div className="uploadImagge">
        <input type="file" onChange={fileSelectHandler}/>
        <button onClick={fileUploadHandler}>Upload</button>
        </div>
    )
}

export default UploadImage;

