const express = require('express')
const PORT = process.env.PORT || 4001

const app = express()

app.listen(PORT, function() {
    console.log(`Server is running on  ${PORT}`)
})
