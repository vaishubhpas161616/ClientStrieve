import React, { useState } from 'react';
import sweetAlertService from "../../Service/sweetAlertServices";
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';



const Meeting = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    return (
        <div>
            <div className="container-fluid">
                <div className='row mt-3'>
                    <div className='col-md-1'></div>
                    <div className='col-md-10'>
                        <div className='card bg-light'>
                            <div className='card-header bg-info'>
                                <div className="row mt-2">
                                    <div className="col-md-10 text-center ">
                                        <h4 >Get All Metting List</h4>
                                    </div>
                                    <div className="col-md-2">
                                        <React.Fragment>
                                            <Button variant="success" className='btn-md m-1 text-right' onClick={handleShow}> Add</Button>
                                        </React.Fragment>
                                    </div>
                                </div>
                            </div>
                            <div className='card-body'>

                            </div>
                        </div>
                    </div>
                </div>
                <div className='col-md-12'>
                    <form action=""  >
                        <Modal show={show} onHide={handleClose} >
                            <Modal.Header closeButton className='bg-light'>
                                <Modal.Title>Add Update Project Meeting</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <div >
                                    <div >
                                        <div className='card-body'>
                                            <div className="row">
                                                <div className="col-12">
                                                    <div className='row'>
                                                        <div className="col-md-6">
                                                            <label>Project Id</label>
                                                            <select name="" id="" className='form-control'></select>

                                                        </div>
                                                        <div className="col-md-6">
                                                            <label>Meeting Lead By EmpId</label>
                                                            <select name="" id="" className='form-control'></select>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className='col-md-6'>
                                                            <label>Meeting Date </label>
                                                            <input type="date" className='form-control' />
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <label>Satrt Time</label>
                                                            <input type="text" className='form-control' />
                                                        </div>
                                                        

                                                    </div>
                                                    <div className="row">
                                                    <div className='col-md-6'>
                                                            <label>End Time</label>
                                                            <input type="text" className='form-control' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Meeting Medium</label>
                                                            <input type="text" className='form-control' placeholder='Employee Strength' />
                                                        </div>
                                                       

                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6">
                                                            <label htmlFor="">Recording Url</label>
                                                            <input type="text" className='form-control' placeholder='Recording Url' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Meeting Notes</label>
                                                            <input type="text" className='form-control' placeholder='Enter Notes' />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6">
                                                            <label htmlFor="">Client Person Name</label>
                                                            <input type="text" className='form-control' placeholder='Client Person Name' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Meeting Title</label>
                                                            <input type="text" className='form-control' placeholder='Meeting Title' />
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6">
                                                            <label htmlFor="">Meeting status</label>
                                                            <input type="text" className='form-control' placeholder='Meeting Status' />
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">IsRecording Available</label>
                                                            <input type="checkbox" name="" id="" className='form-check' />
                                                        </div>
                                                    </div>

                                                </div>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Modal.Body>
                            <Modal.Footer>
                                <form action=""  >
                                    {
                                        <button type='submit' className='btn btn-sm btn-primary'>Add</button>
                                    }
                                </form>
                                <button className='btn btn-sm btn-secondary' >Reset</button>
                            </Modal.Footer>
                        </Modal>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default Meeting;