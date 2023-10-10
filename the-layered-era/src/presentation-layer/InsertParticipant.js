import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import './forms.css'

export default function InsertEvent() {
  return (
    <div>
      <Formik
        initialValues={{ participantID: '', eventID: '', name:'', email: ''}}
        validate={values => {
          let errors ={};

          //TODO: VALID UUID CHECK [REGEX]

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
       
        onSubmit={(values, { setSubmitting }) => {
          console.log(values);
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
          .then(text => console.log(text))
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
          <Form>
            <h1>Register a Participant!</h1>

            <h3 className="label"></h3>
            <Field className="input" type="text" name="participantID" placeholder="Participant ID (Optional)" />

            <h3 className="label">Event ID: </h3>
            <Field className="input" type="text" name="eventID" placeholder="Event ID"/>
            <ErrorMessage className="error" name='eventID' component="div"/>

            <h3 className="label">Participant Name:</h3>
            <Field className="input" type="text" name="name" placeholder="ex. Luis Jimenez Segovina"/>
            <ErrorMessage className="error" name='name' component="div"/>

            <h3 className="label">Participant Email:</h3>
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