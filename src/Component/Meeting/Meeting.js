import React, { useEffect, useState } from 'react';
import sweetAlertService from "../../Service/sweetAlertServices";
import { Modal } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import axios from 'axios';

const Meeting = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const[getmeetings, setGetMeetings] = useState([]);
    const[AddUpdateMeeting, setAddUpdateMeeting]= useState(
        {
            "projectMeetingId": 0,
            "projectId": 0,
            "meetingLeadByEmpId": 0,
            "meetingDate": "",
            "startTime": "",
            "endTime": "",
            "meetingMedium": "",
            "isRecordingAvailable": true,
            "recordingUrl": "",
            "meetingNotes": "",
            "clientPersonNames": "",
            "meetingTitle": "",
            "meetingStatus": ""
          }
    );

    // State variables for holding error messages
    const [errors, setErrors] = useState({
        meetingDate: '',
        startTime: '',
        endTime: '',
        meetingMedium: '',
        recordingUrl: '',
        meetingNotes: '',
        clientPersonNames: '',
        meetingTitle: '',
        meetingStatus: ''
      }
);

    const changeAddUpdateMeeting = (event, key) => {
        AddUpdateMeeting(prevObj => ({ ...prevObj, [key]: event.target.value }));
        // Clear error message when user starts typing again
        setAddUpdateMeeting(prevErrors => ({ ...prevErrors, [key]: '' }));
    }

    useEffect(() => {
        getAllMeetings();
      }, [])
    
      const getAllMeetings = async () => {
        try {
            const result = await axios.get("https://freeapi.gerasim.in/api/ClientStrive/GetAllMeetings", {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                }
            });
            setGetMeetings(result.data.data);
        } catch (error) {
            console.error("Error fetching :", error);
        }
    };

    const Formvalidation = () => {
        let isValid = true;
        const newErrors = { ...errors };

        // Validation for each field
        if (!AddUpdateMeeting.contactPersonName.trim()) {
            newErrors.errors.meetingDate = 'Meeting Date is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.companyName.trim()) {
            newErrors.startTime = 'Start Time is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.address.trim()) {
            newErrors.endTime = 'End Time is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.city.trim()) {
            newErrors.meetingMedium = 'Meeting Medium is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.pincode.trim()) {
            newErrors.recordingUrl = 'Recording URL is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.state.trim()) {
            newErrors.meetingNotes = 'Meeting Notes is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.EmployeeStrength) {
            newErrors.clientName = 'Client Person Name is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.gstNo.trim()) {
            newErrors.meetingTitle = 'Meeting Title is required';
            isValid = false;
        }
        if (!AddUpdateMeeting.contactNo.trim()) {
            newErrors.meetingStatus = 'Meeting Status is required';
            isValid = false;
        }
        
        setErrors(newErrors);
        return isValid;
    }


    const SaveMeeting = async () => {
        debugger
        if (Formvalidation()) {
            try {
                const result = await axios.post(
                    "https://freeapi.gerasim.in/api/ClientStrive/AddUpdateProjectMeeting",
            AddUpdateMeeting,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('loginToken')}`
                        }
                    }
                );
                if (result.data.data) {
                    alert(result.data.data);
                } else {
                    alert(result.data.message);
                }
            } catch (error) {
                console.error("Error saving meetings:", error);
            }
            return; 
        }
    };

    
    
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
                               <select>
                                {
                                    getmeetings.map((meeting)=>{
                                        return(<option value={meeting.projectId}>{meeting.projectId}</option>)
                                    })
                                }
                               </select>
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
                                                            <select name="projecId" id="" onChange={(event) => changeAddUpdateMeeting(event, 'projectId')} className='form-control'></select>
                                                            
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label>Meeting Lead By EmpId</label>
                                                            <select name="" id="" onChange={(event) => changeAddUpdateMeeting(event, 'meetingLeadByEmpId')} className='form-control'></select>
                                                        </div>
                                                    </div>
                                                    <div className="row">
                                                        <div className='col-md-6'>
                                                            <label>Meeting Date </label>
                                                            <input type="date" onChange={(event) => changeAddUpdateMeeting(event, 'meetingDate')} className='form-control' />
                                                            <small className="text-danger">{errors.meetingDate}</small>
                                                        </div>
                                                        <div className='col-md-6'>
                                                            <label>Satrt Time</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'startTime')} className='form-control' />
                                                            <small className="text-danger">{errors.startTime}</small>
                                                        </div>
                                                        

                                                    </div>
                                                    <div className="row">
                                                    <div className='col-md-6'>
                                                            <label>End Time</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'endTime')} className='form-control' />
                                                            <small className="text-danger">{errors.endTime}</small>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Meeting Medium</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'meetingMedium')} className='form-control' placeholder='Employee Strength' />
                                                            <small className="text-danger">{errors.meetingMedium}</small>
                                                        </div>
                                                       

                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6">
                                                            <label htmlFor="">Recording Url</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'recordingUrl')} className='form-control' placeholder='Recording Url' />
                                                            <small className="text-danger">{errors.recordingUrl}</small>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Meeting Notes</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'meetingNotes')} className='form-control' placeholder='Enter Notes' />
                                                            <small className="text-danger">{errors.meetingNotes}</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6">
                                                            <label htmlFor="">Client Person Name</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'clientPersonNames')} className='form-control' placeholder='Client Person Name' />
                                                            <small className="text-danger">{errors.clientName}</small>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">Meeting Title</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'meetingTitle')} className='form-control' placeholder='Meeting Title' />
                                                            <small className="text-danger">{errors.meetingTitle}</small>
                                                        </div>
                                                        
                                                    </div>
                                                    <div className="row">
                                                    <div className="col-md-6">
                                                            <label htmlFor="">Meeting status</label>
                                                            <input type="text" onChange={(event) => changeAddUpdateMeeting(event, 'meetingStatus')} className='form-control' placeholder='Meeting Status' />
                                                            <small className="text-danger">{errors.meetingStatus}</small>
                                                        </div>
                                                        <div className="col-md-6">
                                                            <label htmlFor="">IsRecording Available</label>
                                                            <input type="checkbox" onChange={(event) => changeAddUpdateMeeting(event, 'isRecordingAvailable')} name="" id="" className='form-check' />
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
                                        <button type='submit' className='btn btn-sm btn-primary' onClick={SaveMeeting}>Add</button>
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

