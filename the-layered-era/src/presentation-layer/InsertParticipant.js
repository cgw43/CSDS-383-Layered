import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useState, useEffect } from 'react';

import './forms.css'

export default function InsertEvent() {

  const [eventData, setEventData] = useState([]);

  useEffect(() => {

    const fetchEvents = async () => {
      const response = await fetch(`http://localhost:4001/events`);
      const newData = await response.json();
      setEventData(newData);
    };
    fetchEvents();
  }, []);


  return (
      <Formik
        initialValues={{ participantID: '', eventID: '', name:'', email: ''}}
        validate={values => {
          let errors ={};

          // check UUID form if input
          if (values.participantID && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values.participantID)){
            errors.participantID ='Participant ID must be in proper UUID Format';
          }

          // check UUID Form if eventID Input
          if (!values.eventID){
            errors.eventID = "Must include an Event ID"
          } else if (values.eventID && !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(values.eventID)){
            errors.eventID ='Event ID must be in proper UUID Format';
          } 

          if (!values.name){
            errors.name = 'A name is required'
          } else if (values.name.length > 255){
            errors.name = 'Name cannot be over 255 characters long';
          }

          if (!values.email) {
            errors.email = 'An email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
       
        onSubmit={(values, { setSubmitting, resetForm }) => {
          if (!values.participantID) {
            values.participantID = crypto.randomUUID();
          }
          fetch('http://localhost:4001/participants', {
            body: JSON.stringify(values, null, 2),
            mode: "cors",
            headers: {
              "Content-Type": "application/json",
            },
            method: "POST",
          })
          .then(response => response.json())
            //show message to viewer like "event successfully added"
          .then(text => {
              if(text.message === 'duplicate key value violates unique constraint "participants_pkey"'){
                alert("This participant ID is already taken. Please use a different one.")
              }
              else if(text.message === "Data successfully added."){
                alert("The participant was added successfully!")
              }
              else{
                alert("An error occurred adding this participant. Please try again.")
              }
              })
          .catch((error) => {
            //UUID error logging to user here
            console.error("Error: ", error);
          })
          .finally(() => {
            setTimeout(() => {
              // alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
              resetForm({values: ''});
            }, 400);
          })
          }}
      >

        {({ isSubmitting }) => (
          <Form>
            <h1>Register a Participant!</h1>

            <div>
                <h3 className="label">Participant ID:</h3>
                <Field className="input" type="text" name="participantID" placeholder="Participant ID (Optional)" />
            </div>

            <div>
                <h3 className="label">Event ID: </h3>
                <Field as="select" name="eventID">
                  <option value="">Select an EventID</option>
                  {
                    eventData.map(event => <option key={event.event_id} value={event.event_id}>{event.event_id}</option>)
                  }
                </Field>
                <ErrorMessage className="error" name='eventID' component="div"/>
            </div>
            <div>
                <h3 className="label">Participant Name:</h3>
                <Field className="input" type="text" name="name" placeholder="ex. Luis Jimenez Segovia"/>
                <ErrorMessage className="error" name='name' component="div"/>
            </div>
            <div>
                <h3 className="label">Participant Email:</h3>
                <Field className="input" type="email" name="email" placeholder="ex. example@gmail.com"/>
                <ErrorMessage className="error" name='email' component="div"/>
            </div>
            <button className="button" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
  )

}