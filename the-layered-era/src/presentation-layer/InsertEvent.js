import React from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './forms.css'

const api = axios.create({
  baseURL: 'http://localhost:3000', // Replace with your actual backend server URL
});

export default function InsertEvent() {
  return (
    <div>
      <Formik
        initialValues={{ eventID: '', date: '', time:'', title: '', description: '', email: ''}}
        validate={values => {
          let errors ={};

          //TODO: VALID UUID CHECK [REGEX]

          if (!values.date){
            errors.date = 'A date is required';
          }

          if (!values.time){
            errors.time = 'A time is required';
          }

          if (!values.title){
            errors.title = 'A title is required'
          } else if (values.title.length > 255){
            errors.title = 'Title cannot be over 255 characters long';
          }

          if (!values.description){
            errors.description = 'A description is required'
          } else if (values.description.length > 600){
            errors.description = 'Description cannot be over 600 characters long';
          }

          if (!values.email) {
            errors.email = 'An email is required';
          } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address';
          }

          return errors;
        }}
      
        onSubmit={(values, { setSubmitting }) => {
          fetch('/events', values)
          .then((response) =>{
            console.log('Server response: ', response.data);
            //show message to viewer like "event successfully added"
          })
          .catch((error) => {
            //UUID error logging to user here
            console.error("Error: ", error)
          })
          .finally(() => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          })
          }}
      >

        {({ isSubmitting }) => (
          <Form id="EventForm">
            <h1>Insert an Event!</h1>

            <h3 className="label">Event ID:</h3>
            <Field className="input" type="text" name="eventID" placeholder="Event ID (Optional)"/>
            <ErrorMessage className="error" name='eventID' component="div"/>

            <h3 className="label">Event Date</h3>
            <Field className="input" type="date" name="date" />
            <ErrorMessage className="error" name='date' component="div"/>

            <h3 className="label">Event Time:</h3>
            <Field className="input" type="time" name="time" />
            <ErrorMessage className="error" name='time' component="div"/>

            <h3 className="label">Event Title:</h3>
            <Field className="input" type="text" name="title" placeholder="ex. Architect's Rockin Party"/>
            <ErrorMessage className="error" name='title' component="div"/>

            <h3 className="label">Event Description:</h3>
            <Field className="input" type="text" name="description" placeholder="ex. This event is for...."/>
            <ErrorMessage className="error" name='description' component="div"/>

            <h3 className="label">Event Host's Email:</h3>
            <Field className="input" type="email" name="email" placeholder="ex. example@gmail.com"/>
            <ErrorMessage className="error" name='email' component="div"/>

            <button className="button" type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  )

}