import React, { useEffect, useState } from 'react';

const LeaveRequests = () => {
    const [leaveRequests, setLeaveRequests] = useState([]);

    useEffect(() => {
        
        fetch('')
            .then(response => response.json())
            .then(data => setLeaveRequests(data))
            .catch(error => console.error('Error fetching leave requests:', error));
    }, []);

    return (
        <div className="leave-requests">
            <h2>Leave Requests</h2>
            <table>
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Leave Type</th>
                        <th>Start Date</th>
                        <th>End Date</th>
                        <th>Status</th>
                        <th>Days Requested</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveRequests.map((request, index) => (
                        <tr key={index}>
                            <td>
                                <img src={request.profilePic} alt="profile" className="profile-pic" />
                                {request.name}
                            </td>
                            <td>{request.type}</td>
                            <td>{request.startDate}</td>
                            <td>{request.endDate}</td>
                            <td><span className={`status ${request.status.toLowerCase()}`}>{request.status}</span></td>
                            <td>{request.daysRequested}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveRequests;
