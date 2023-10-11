const pg = require('pg')
var connectionString = "postgres://postgres:password@localhost:3001/";

function createDB() {
    var pgClient = new pg.Client(connectionString)
    pgClient.connect()
    let query=  `CREATE DATABASE "event_manager";`

    pgClient.query(query, (err, result) => {
        if (err) {
            console.error('Error running the query:', err);
            pgClient.end(); // Close the database connection
            return;
        }
    })

    connectionString = "postgres://postgres:password@localhost:3001/event_manager";

    query = `
        CREATE TABLE events (
            uuid VARCHAR PRIMARY KEY,
            date VARCHAR,
            time VARCHAR,
            title VARCHAR(255),
            description VARCHAR(600),
            host_email VARCHAR
        );
        
        CREATE TABLE participants (
            participant_uuid VARCHAR PRIMARY KEY,
            event_uuid VARCHAR,
            participant_name VARCHAR(600),
            participant_email VARCHAR,
            FOREIGN KEY (event_uuid) REFERENCES events(uuid)
        );
        
        CREATE OR REPLACE FUNCTION create_event(
            p_uuid VARCHAR,
            p_date DATE,
            p_time VARCHAR,
            p_title VARCHAR(255),
            p_description VARCHAR(600),
            p_host_email VARCHAR
        )
        RETURNS VOID AS $$
        BEGIN
            INSERT INTO events (uuid, date, time, title, description, host_email)
            VALUES (p_uuid, p_date, p_time, p_title, p_description, p_host_email);
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE OR REPLACE FUNCTION create_participant(
            p_participant_uuid VARCHAR,
            p_event_uuid VARCHAR,
            p_participant_name VARCHAR(600),
            p_participant_email VARCHAR
        )
        RETURNS VOID AS $$
        BEGIN
            INSERT INTO participants (participant_uuid, event_uuid, participant_name, participant_email)
            VALUES (p_participant_uuid, p_event_uuid, p_participant_name, p_participant_email);
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE OR REPLACE FUNCTION view_events()
        RETURNS TABLE (
            event_id VARCHAR,
            event_date VARCHAR,
            event_time VARCHAR,
            event_title VARCHAR(255),
            event_description VARCHAR(600),
            event_host_email VARCHAR
        ) AS $$
        BEGIN
            RETURN QUERY
            SELECT uuid AS event_id, date AS event_date, time AS event_time, title AS event_title, description AS event_description, host_email AS event_host_email
            FROM events;
        END;
        $$ LANGUAGE plpgsql;
        
        CREATE OR REPLACE FUNCTION view_participants()
        RETURNS TABLE (
            p_participant_uuid VARCHAR,
            p_event_uuid VARCHAR,
            p_participant_name VARCHAR(600),
            p_participant_email VARCHAR
        ) AS $$
        BEGIN
            RETURN QUERY
            SELECT p.participant_uuid AS p_participant_uuid, p.event_uuid AS p_event_uuid, p.participant_name, p.participant_email
            FROM participants p;
        END;
        $$ LANGUAGE plpgsql;  `
    pgClient.query(query, (err, result) => {
        if (err) {
            console.error('Error running the query:', err);
            pgClient.end(); // Close the database connection
            return;
        }
    })
}

createDB();