import React, { useState, useEffect } from 'react';

const DynamicTable = () => {
  const [eventData, setEventData] = useState([]);
  const [participantData, setParticipantData] = useState([]);

    
  useEffect(() => {

    fetch('http://localhost:4001/events', {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(response => response.json())
      .then(data => setEventData(data))

    fetch('http://localhost:4001/participants', {
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      method: "GET",
    })
      .then(response => response.json())
      .then(data => setParticipantData(data))
  }, []);


  return (
    <div>
      <div className="container1">
        <table>
          <thead>
            <tr>
              <th>UUID</th>
              <th>Date</th>
              <th>Time</th>
              <th>Title</th>
              <th>Description</th>
              <th>Host Email</th>
            </tr>
          </thead>
          <tbody>
            {eventData.map((item) => (
              <tr key={item.eventID}>
                <td>{item.eventID}</td>
                <td>{item.date}</td>
                <td>{item.time}</td>
                <td>{item.title}</td>
                <td>{item.description}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="container2">
        <table>
        <thead>
            <tr>
              <th>Event</th>
              <th>Participant ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {participantData.map((item) => (
              <tr key={item.eventID}>
                <td>{item.eventID}</td>
                <td>{item.participantID}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;
