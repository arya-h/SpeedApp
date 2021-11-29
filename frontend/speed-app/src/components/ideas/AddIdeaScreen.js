import React, { useState } from "react";
import { Row, Col, Container, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { addNewIdea } from "../../actions/idea";
import { getStorage, ref } from "firebase/storage";
import Files from "react-files";
//table for files selected
import { Badge } from "@material-ui/core";
import { DataGrid } from "@material-ui/data-grid";

//attachment logo
import attachmentLogo from "../../assets/attachment_logo.png";

export const AddIdeaScreen = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [numSelectedFiles, setNumSelectedFiles] = useState(0);
  //state to show error in case user selects more than 3 files
  const [showErrorToastFiles, setShowErrorToastFiles] = useState(false);


  const user = useSelector((state) => state.auth);

  // Create a root reference
  const storage = getStorage();


  const onFilesError = (error, file) => {
    console.log("error code " + error.code + ": " + error.message);
  };

  const onFilesChange = (files) => {

    console.log("SIZE: ", uploadedFiles.length)
    if(uploadedFiles.length > 2){

      console.log("too many files were selected")
      return;
    }else{
      files.forEach(x => {
        let obj={
          id:x.name+Date.now(),
          name: x.name,
          size: x.size,
          extension: x.extension
        }
        setUploadedFiles(prev => [...prev, obj]);
      })
      
  
    }

    

    

}


  // Create a reference to 'mountains.jpg'
  // const fileRef = ref(storage, "mountains.jpg");

  // Create a reference to 'images/mountains.jpg'
  // const mountainImagesRef = ref(storage, "images/mountains.jpg");

  const FileUploader = (props)=>{
    return (
      <div className="files">
        <Files
          className='files-dropzone'
          onChange={props.onChange}
          onError={props.onError}
          accepts={['image/png', '.pdf', 'audio/*']}
          multiple
          maxFiles={3}
          maxFileSize={10000000}
          minFileSize={0}
          clickable
        >
          Drop files here or click to upload
        </Files>
      </div>
    )
  }


  const FileTable = (props)=>{

    const columns = [
      { field: "name", headerName: "Name", width: 300 },
      { field: "ssizeize", headerName: "Size", width: 130 },
      { field: "extension", headerName: "extension", width: 130 },
    ];

    console.log(props);
   
    // return(<></>)

    let res = [];
    res.push({id: Date.now(), name:"ara", extension:".pdf", size:323})
    res.push({id: Date.now()+1232, name:"sssssara", extension:".pdf", size:323})
    if (props.rows.length <=3) {
      return(
      // <div style={{ height: 400, width: "100%" }}>
      <Container fluid style={{height:"300px"}}>
        <DataGrid
          rows={props.rows}
          
          columns={columns}
          pagination={true}
          pageSize={3}
          rowsPerPageOptions={[3]}
          checkboxSelection
        />
        </Container>
      // </div>)
      )
    } else {
      return <Alert variant="info">no files yet</Alert>;
    }
  };





  return (
    <div>
      <div className="container-fluid px-5">
        {/* TODO: Sidebar */}
        <div className="row">
          <div className="col">
            <h1 className="my-3">Add Idea</h1>
          </div>
        </div>
        <form>
          <div className="form-group">
            <div className="row mb-4">
              <label htmlFor="ideaTitle">
                <h2>Title</h2>
              </label>
              <input
                type="text"
                className="form-control"
                placeholder="Title"
                id="ideaTitle"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
              ></input>
            </div>
            <div className="row">
              <label htmlFor="ideaDescription">
                <h2>Description</h2>
              </label>
              <textarea
                type="text"
                className="form-control"
                id="ideaDescription"
                placeholder="Description"
                rows="3"
                value={content}
                onChange={(event) => setContent(event.target.value)}
              ></textarea>
            </div>
            <div className="row"></div>

            {/* attachment row */}

            <Container fluid style={{ marginTop: "1%", marginLeft: "-1.5%" }}>
              <Row>
                {/* title */}
                <Col xs={3}>
                  {" "}
                  <Button variant="info">
                    <FileUploader onChange={onFilesChange} onError={onFilesError}/>
                      </Button>
                        </Col>
              </Row>

              <Row>

                <FileTable rows={uploadedFiles}  />
              </Row>
            </Container>

            <div className="col-6 text-end">
              <button
                className="btn btn-primary mt-3"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(
                    addNewIdea({
                      title: title,
                      content: content,
                      comments: [],
                      user,
                    })
                  );
                  history.push("/");
                }}
              >
                Add Idea
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}; 
