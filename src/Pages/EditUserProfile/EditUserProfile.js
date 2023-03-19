import './EditUserProfile.css'
import { FaUserEdit, FaLock, FaArrowRight, FaKey } from 'react-icons/fa';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const EditUserProfile = () => {

    const [show, setShow] = useState(false);
    const [show2, setShow2] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleClose2 = () => setShow2(false);
    const handleShow2 = () => setShow2(true);




    return (
        <div className="Container-Edit d-flex flex-column align-items-center">
            <div className='main-1 d-flex flex-column p-2' style={{ backgroundColor: '#0D1117', height: '45%', width: '22.5%', borderRadius: '7.5px', marginTop: '1.5%' }}>
                <p><FaUserEdit style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px' }} />ProfileSetting</p>
                <div className='circle-img align-self-center' style={{ height: '142.5px', width: '142.5px' }}> </div>
                <button class='align-self-center' style={{ backgroundColor: '#21262D', marginTop: '10px', width: '30%', borderRadius: '5px' }}>Upload</button>
                <p style={{ marginTop: '2.5px' }}>Display Name</p>
                <input placeholder='Virapat Poangmalai' style={{ padding: '5px', marginBottom: '10px' }}></input>
                <p style={{ marginBottom: '10px' }}>Status</p>
                <input placeholder='Hardwork with React/Redux 🔥' style={{ padding: '5px', marginBottom: '5px' }}></input>
            </div>
            <div className='main-2 p-2' style={{ backgroundColor: '#0D1117', height: '15%', width: '22.5%', borderRadius: '7.5px', marginTop: '1%' }}>
                <p><FaUserEdit style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px', }} />Quiz Setting</p>
                <div class='d-flex justify-content-between'>
                    <p style={{ marginTop: '2.5px' }}>Background Music</p>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ backgroundColor: '#238636', border: 'none' }}></input>
                    </div>
                </div>
                <div class='d-flex justify-content-between'>
                    <p style={{ marginTop: '2.5px' }}>Sound Effect</p>
                    <div class="form-check form-switch">
                        <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault" style={{ backgroundColor: '#238636', border: 'none' }}></input>
                    </div>
                </div>
            </div>
            <div className='main-3 p-2' style={{ backgroundColor: '#0D1117', height: '25%', width: '22.5%', borderRadius: '7.5px', marginTop: '1%', marginBottom: '1%' }}>
                <p><FaLock style={{ marginBottom: '7px', marginRight: '7.5px', width: '19px', }} />Account Setting</p>
                <div class='d-flex justify-content-between'>
                    <p style={{ marginTop: '2.5px' }}>Change Password</p>
                    <FaArrowRight onClick={handleShow}  />
                </div>
                <div class='d-flex justify-content-between'>
                    <p style={{ marginTop: '2.5px' }}>Delete Account</p>
                    <FaArrowRight onClick={handleShow2} />
                </div>
                <button style={{ backgroundColor: '#21262D', marginTop: '65px', width: '30%', borderRadius: '5px' }}>Logout</button>
            </div>
            <button style={{ backgroundColor: '#238636', height: '4.25%', width: '22.5%', borderRadius: '5px', fontSize: '17.5px' }}>Save</button>


            
                <Modal show={show} onHide={handleClose} style={{ top: '40%', color: 'white' }}>
                    <Modal.Header style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
                        <Modal.Title> <FaKey /> Change Password</Modal.Title>
                    </Modal.Header>
                    <div class='p-2'>
                        <p style={{ marginBottom: '7px', marginRight: '7.5px', marginTop: '10px' }}>Enter New Password</p>
                        <input class='input-change' type={'password'} style={{ padding: '5px', marginBottom: '10px', width: '100%' }}></input>
                        <p style={{ marginBottom: '7px', marginRight: '7.5px', marginTop: '10px' }}>Re-Enter New Password</p>
                        <input class='input-change' type={'password'} style={{ padding: '5px', marginBottom: '10px', width: '100%' }}></input>
                    </div>

                    <Modal.Footer style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
                        <Button onClick={handleClose} style={{ width: '105px', height: '41px', backgroundColor: '#424242', border: 'none', fontSize: '20px' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose} style={{ width: '105px', height: '41px', backgroundColor: '#238636', border: 'none', fontSize: '20px' }}>
                            Save
                        </Button>
                    </Modal.Footer>
                </Modal>
            

            
                <Modal show={show2} onHide={handleClose2} style={{ top: '40%', color: 'white' }}>
                    <Modal.Header style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
                        <Modal.Title> <FaKey /> Delete Account</Modal.Title>
                    </Modal.Header>
                    <div class='p-2'>
                        <p style={{ marginBottom: '7px', marginRight: '7.5px', marginTop: '10px' }}>Are you sure you want to delete your account? All your data will be deleted.</p>
                       
                    </div>

                    <Modal.Footer style={{ backgroundColor: '#0D1117', border: '1px solid #0D1117' }}>
                        <Button onClick={handleClose2} style={{ width: '105px', height: '41px', backgroundColor: '#424242', border: 'none', fontSize: '20px' }}>
                            Cancel
                        </Button>
                        <Button onClick={handleClose2} style={{ width: '160px', height: '41px', backgroundColor: '#EA4949', border: 'none', fontSize: '20px' }}>
                            Delete Account
                        </Button>
                    </Modal.Footer>
                </Modal>
          






        </div>

    )
}

export default EditUserProfile