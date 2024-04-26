import React from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Employee = () => {
  const navigate = useNavigate();

  const handleAddEmployee = () => {
    navigate('/employee-form'); 
  };

  return (
    <div>
      <div className='row mt-3'>
        <div className='col-md-1'></div>
        <div className='col-md-10'>
          <div className='card bg-light'>
            <div className='card-header bg-info'>
              <div className="row mt-2">
                <div className="col-md-10 text-center">
                  <h4>Get All Client List</h4>
                </div>
                <div className="col-md-2">
                  <Button variant="success" className='btn-md m-1 text-right' onClick={handleAddEmployee}> Add Employee</Button>
                </div>
              </div>
            </div>
                            <div className='card-body'>
                            <table className="table table-striped table-bordered">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Designation</th>
                                    <th>Contact No.</th>
                                    <th>Total Experience</th>
                                    <th>City</th>
                                    <th>Personal Address</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* Render your employee list here */}
                            </tbody>
                        </table>
                
                            </div>
                        </div>
                    </div>
                </div>
                        

                <div className='col-4'>
                    {/* Your content in col-4 */}
                </div>
            </div>

    );
};

export default Employee;
