import React, { useState, useEffect } from 'react';

const DynamicTable = () => {
  const [eventData, setEventData] = useState({});
  const [participantData, setParticipantData] = useState({});

  // on load, fetch from DB
  useEffect(() => {

    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:4001/events`);
      const newData = await response.json();
      setEventData(newData);
    };

    const fetchParticipants = async () => {
      const response = await fetch(`http://localhost:4001/participants`);
      const newData = await response.json();
      setParticipantData(newData);
    };

    fetchEvents();
    fetchParticipants();
  }, []);

// to properly update eventData
  useEffect(() => {
    console.log("eventData updated:", eventData);
  }, [eventData]);

// to properly update participantData
  useEffect(() => {
    console.log("participantData updated:", participantData);
  }, [participantData]);

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
          {Object.keys(eventData).length === 0 ? (
              <tr>
                <td colSpan="6">No Events Added Yet!</td>
              </tr>
            ) : (
              Object.keys(eventData).map((eventID) => {
                return (
                  <tr key={eventID}>
                    <td>{eventData[eventID].event_id}</td>
                    <td>{eventData[eventID].event_date}</td>
                    <td>{eventData[eventID].event_time}</td>
                    <td>{eventData[eventID].event_title}</td>
                    <td>{eventData[eventID].event_description}</td>
                    <td>{eventData[eventID].event_host_email}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
      <div className="container2">
        <table>
          <thead>
            <tr>
              <th>Event ID</th>
              <th>Participant ID</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {Object.keys(participantData).length === 0 ? (
              <tr>
                <td colSpan="6">No Participants Added Yet!</td>
              </tr>
            ) : (
              Object.keys(participantData).map((id) => {
                return (
                  <tr key={id}>
                    <td>{participantData[id].p_event_uuid}</td>
                    <td>{participantData[id].p_participant_uuid}</td>
                    <td>{participantData[id].p_participant_name}</td>
                    <td>{participantData[id].p_participant_email}</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DynamicTable;