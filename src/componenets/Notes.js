import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from './Noteitem';
import AddNote from './AddNote';
import { useNavigate } from 'react-router-dom';

const Notes = (props) => {
  const context = useContext(noteContext);
  let history = useNavigate();
  const { notes, getNotes, editNote } = context; //{notes  , addNote}

  useEffect(() => {
    if(localStorage.getItem('token')){

      getNotes();
    }
    else{
      history('/login')
    }
    // eslint-disable-next-line
  }, [])
  const ref = useRef(null);
  const refClose = useRef(null);

  const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag });
    props.showAlert("updated Successfully")


  }


  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();



  }
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })

  }
  return (
    <>

      <AddNote showAlert = {props.showAlert} />
      {/* <!-- Button trigger modal --> */}

      <button style={{ "display": "none" }} ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      {/* <!-- Modal --> */}
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">Edit Note</h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form className='my-3'>
                <div className="mb-3">
                  <label for="etitle" className="form-label">Title</label>
                  <input type="text" id="etitle" name='etitle' aria-describedby="emailHelp" className='form-control border-success border-2 border-dashed' value={note.etitle} onChange={onChange} minLength={5} required ></input>
                  <div id="emailHelp" className="form-text " style={{ "font-family": "'Carter One', cursive" }}>We'll never share your information with anyone else.🙃</div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Description</label>
                  <input type="text" className="form-control border-success border-2 border-dashed" id="edescription" name='edescription' value={note.edescription} onChange={onChange} minLength={5} required />
                  <div id="emailHelp" className="form-text " style={{ "font-family": "'Carter One', cursive" }}>We'll never share your information with anyone else.🙃</div>
                </div>
                <div className="mb-3">
                  <label for="exampleInputPassword1" className="form-label">Tag</label>
                  <input type="text" className="form-control border-success border-2 border-dashed" id="etag" name='etag' value={note.etag} onChange={onChange} minLength={5} required />
                  <div id="emailHelp" className="form-text " style={{ "font-family": "'Carter One', cursive" }}>We'll never share your information with anyone else.🙃</div>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length < 5 || note.edescription.length < 5} onClick={handleClick} type="button" className="btn btn-success">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3" >
        <h2>Your Notes</h2>
        <div className="container" style={{ "textAlign": "center" }}>
          {notes.length === 0 && 'No Notes to Dispaly😙'}
        </div>
        {notes.map((note) => {

          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert = {props.showAlert} />
        }
        )}

      </div>
    </>

  )
}

export default Notes
