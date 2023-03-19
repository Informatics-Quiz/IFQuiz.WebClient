import './CreateQuiz.css'
import { FaImage } from "react-icons/fa";
import React from 'react';
const CreateQuiz = () => {
    return (
        <div className='ContainerCreateQuiz'>

            <div className='section1'>
                <input placeholder='Untitled Quiz' style={{ border: 'none', backgroundColor: '#161B22', color: 'white', paddingLeft: '7.5px', borderRadius: '5px', width: '15%', height: '100%' }}></input>
                <button type="button" className="btn btn-success" style={{ width: '6%', height: '100%', padding: '0', backgroundColor: '#238636' }}>Save</button>
            </div>



            <div class='row'>
                <div className='section2'>
                    <div className='image1' style={{ width: '50%', height: '20%', backgroundColor: '#161B22', marginTop: '20px' }}>
                        <FaImage style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px' }} /></div>
            </div>
            <div className='section3'>

            </div>
        </div>
            






        </div >
    )
}

export default CreateQuiz