import React, { useEffect, useState } from 'react';
import sweetAlertService from "../../Service/sweetAlertServices";
import axios from 'axios';

const Meeting = () => {
   
    useEffect(() => {
        getAllEmp();
      }, [])

    const getAllEmp = async () => {
        const response = await axios.get('https://freeapi.gerasim.in/api/ClientStrive/GetAllMeetings',{
          headers: {
            Authorization: `Bearer ${localStorage.getItem('loginToken')}` 
          }
        });
        
      }
    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col-6'>
                        <div className='card'>
                            <div className='card-header bg-info'>
                                Get All Meetings
                            </div>
                            <div className='card-body'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
        </div>
    );
};

export default Meeting;

