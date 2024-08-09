import React, { useEffect, useState } from 'react';

const LeaveAllocation = () => {
    const [leaveAllocations, setLeaveAllocations] = useState([]);

    useEffect(() => {
        fetch('') 
            .then(response => response.json())
            .then(data => setLeaveAllocations(data))
            .catch(error => console.error('Error fetching leave allocations:', error));
    }, []);

    return (
        <div className="leave-allocation">
            <h2>Leave Allocation</h2>
            <table className="allocation-table">
                <thead>
                    <tr>
                        <th>Employee Name</th>
                        <th>Year</th>
                        <th>Days Allocated</th>
                        <th>Days Used</th>
                        <th>Days Remaining</th>
                    </tr>
                </thead>
                <tbody>
                    {leaveAllocations.map((allocation, index) => (
                        <tr key={index}>
                            <td className="employee-info">
                                <img src={allocation.profilePic} alt="profile" className="employee-image" />
                                {allocation.name}
                            </td>
                            <td>{allocation.year}</td>
                            <td>{allocation.daysAllocated}</td>
                            <td>{allocation.daysUsed}</td>
                            <td>{allocation.daysRemaining} days</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LeaveAllocation;
