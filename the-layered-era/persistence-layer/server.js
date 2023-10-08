const express = require('express')
const PORT = process.env.PORT || 4001

const app = express()

app.listen(PORT, function() {
    console.log(`Server is running on  ${PORT}`)
});

// Endpoint to select all events
app.get("/events", async(req, res) => {
    try {
        const allEvents = []// query db when it's setup and connected
        res.json(allEvents.rows);
    } catch (err) {
        console.log(err.message);
    }
});

// Endpoint to select all registered participants
app.get("/participants", async(req, res) => {
    try {
        const allParticipants = []// query db when it's setup and connected
        res.json(allParticipants.rows);
    } catch (err) {
        console.error(err.message);
    }
});

// Endpoint for creating new events
app.post("/events", async (req, res) => {
    try {
        const { uuid, date, time, title, description, email } = req.body;
        const newEvent = []; // Insert into db when it's setup and connected
        res.json(newEvent.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

// Endpoint for registering participants
app.post("/participants", async (req, res) => {
    try {
        const { uuid, eventID, name, email } = req.body;
        const newParticipant = []; // Insert into db when it's setup and connected
        res.json(newParticipant.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

function isValidName(name) {
    return name.length != 0 && name.length <= 600;
}

function isValidEmail(email) {
    const emailRegex = new RegExp("^(?=.{1,64}@)[A-Za-z0-9_-]+(\\.[A-Za-z0-9_-]+)*@"
    + "[^-][A-Za-z0-9-]+(\\.[A-Za-z0-9-]+)*(\\.[A-Za-z]{2,})$");
    let result = email.match(emailRegex);
    return email.match(emailRegex) != null;

}

function isValidDescription(description) {
    return description.length <= 600;
}

function isValidTitle(title) {
    return title.length <= 255;
}

function isValidTime(time) {
    let extractTime = time.split(" ");
    if (extractTime.length != 2 || !(extractTime[1] == ("AM") || (extractTime[1] == ("PM")))) {
        return false;
    }

    let hoursMins = extractTime[0].split(":");
     if (hoursMins.length != 2) {
         return false;
        
     }

    return (hoursMins[0] > 0 && hoursMins[0] <= 12) && (hoursMins[1] >=0 && hoursMins[1] <= 59);
}

function isValidDate(date) {
    var regEx = /^\d{4}-\d{2}-\d{2}$/;
    // Checking for format
    if(!date.match(regEx)) {
        return false
    }
    let dateVals = date.split("-");

    if (dateVals[0] < 0) {
        return false;
    }

    if (dateVals[1] < 1 | dateVals[1] > 12) {
        return false;
    } 
    
    if (dateVals[2] < 1) {
        return false;
    }

    if ((dateVals[1] == 4 || dateVals[1] == 9 || dateVals[1] == 11) && dateVals[2] > 30) {
        console.log("30s");
        return false;
    } else if (dateVals[1] == 2 && dateVals[2] > 28) {
        console.log("FEB");
        return false;
    } else if (dateVals[2] > 31) {
        console.log("30s")
        return false;
    } else {
        return true;
    }
}

function isValidUUIDFormat(uuid) {
    return uuid.match(new RegExp("^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$")) != null;
}

function isValidParticipantUUID(uuid) {
    // waiting until db is connected
}

function isValidEventUUID(uuid) {
    // waiting until db is connected
}