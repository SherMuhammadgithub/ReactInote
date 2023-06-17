import React, { useState } from 'react'
import { useContext } from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = (props) => {

    const context = useContext(noteContext);
    const { addNote } = context;
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault();
        addNote(note.title, note.description, note.tag);
        setNote({ title: "", description: "", tag: "" })
        props.showAlert("Added Successfully " , "success");

    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })

    }

    return (
        <div className="container my-3" >
            <h2>Add a Note</h2>
            <form className='my-3'>
                <div className="mb-3">
                    <label for="title" className="form-label">Title</label>
                    <input value={note.title} type="text" id="title" name='title' aria-describedby="emailHelp" className='form-control border-success border-2 border-dashed' onChange={onChange} minLength={5} required></input>
                    <div id="emailHelp" className="form-text " style={{ "font-family": "'Carter One', cursive" }}>We'll never share your information with anyone else.🙃</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Description</label>
                    <input value={note.description} type="text" className="form-control border-success border-2 border-dashed" id="description" name='description' onChange={onChange} minLength={5} required />
                    <div id="emailHelp" className="form-text " style={{ "font-family": "'Carter One', cursive" }}>We'll never share your information with anyone else.🙃</div>
                </div>
                <div className="mb-3">
                    <label for="exampleInputPassword1" className="form-label">Tag</label>
                    <input value={note.tag} type="text" className="form-control border-success border-2 border-dashed" id="tag" name='tag' onChange={onChange} minLength={5} required />
                    <div id="emailHelp" className="form-text " style={{ "font-family": "'Carter One', cursive" }}>We'll never share your information with anyone else.🙃</div>
                </div>
                <button disabled={note.title.length < 5 || note.description.length < 5} type="submit" className="btn btn-success" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default AddNote
