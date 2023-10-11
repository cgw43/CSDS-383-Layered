const pg = require('pg')
const connectionString = "postgres://postgres:password@localhost:3001/event_manager";

async function createEvent(eventData) {
    var client = new pg.Client(connectionString)
  
    try {
      await client.connect();
  
      const query = {
        text: 'SELECT create_event($1, $2, $3, $4, $5, $6)',
        values: [
          eventData.uuid,
          eventData.date,
          eventData.time,
          eventData.title,
          eventData.description,
          eventData.host_email
        ]
      };
  
      const result = await client.query(query);
      console.log('Created new event successfully.');
  
      return result;
    } catch (err) {
      console.error('Error running the stored procedure:', err);
      throw err;
    } finally {
      client.end();
    }
  }

async function createParticipant(participantData) {
    var client = new pg.Client(connectionString)
  
    try {
      await client.connect();
  
      const query = {
        text: 'SELECT create_participant($1, $2, $3, $4)',
        values: [
          participantData.participant_uuid,
          participantData.event_uuid,
          participantData.participant_name,
          participantData.participant_email
        ]
      };
  
      const result = await client.query(query);
      console.log('Added new participant successfully.');
  
      return result;
    } catch (err) {
      console.error('Error running the stored procedure:', err);
      throw err;
    } finally {
      client.end();
    }
}

async function viewEvents() {
    var client = new pg.Client(connectionString)

    try {
      await client.connect();
  
      const query = {
        text: 'SELECT * FROM view_events()'
      };
  
      const result = await client.query(query);
      console.log('Events:', result.rows);
  
      return result.rows;
    } catch (err) {
      console.error('Error running the stored procedure:', err);
      throw err;
    } finally {
      client.end();
    }
  }

  async function viewParticipants() {
    var client = new pg.Client(connectionString)
    try {
      await client.connect();
  
      const query = {
        text: 'SELECT * FROM view_participants()'
      };
  
      const result = await client.query(query);
      console.log('Data from participants table:', result.rows);
  
      return result.rows;
    } catch (err) {
      console.error('Error running the stored procedure:', err);
      throw err;
    } finally {
      client.end();
    }
  }

  function customQuery(){
    var pgClient = new pg.Client(connectionString)
    pgClient.connect()
    const query = ``
    pgClient.query(query, (err, result) => {
        if (err) {
            console.error('Error running the query:', err);
            pgClient.end(); // Close the database connection
            return;
        }
        // Query was successful, and the result is in the "result" variable
        console.log('Query Result:', result.rows);
    })
}