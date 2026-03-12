const express = require("express")
const cors = require("cors")
const axios = require("axios")
require("dotenv").config()

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.static("public"))

app.post("/api/chat", async (req, res) => {
  try {

    const response = await axios.post(
      "https://api.anthropic.com/v1/messages",
      {
        model: "claude-3-sonnet-20240229",
        max_tokens: 800,
        messages: req.body.messages
      },
      {
        headers: {
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01",
          "content-type": "application/json"
        }
      }
    )

    res.json(response.data)

  } catch (error) {
    console.error(error.response?.data || error.message)
    res.status(500).json({ error: "AI request failed" })
  }
})

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
