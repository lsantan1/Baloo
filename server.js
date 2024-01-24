require('dotenv').config();

const express = require('express');
const { OpenAI } = require("openai"); //adding OpenAi API to servercode 


const app = express();
app.use(express.json()); // This line replaces the need for body-parser w/ Express' built-in middleware for parsing JSON

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Initialize OpenAI w/ API key

app.use(express.static(__dirname));

//testing endpoint
app.post('/test', (req, res) => {
  console.log('Received test POST request:', req.body); // This will output the parsed body to the server console
  res.json(req.body);    // This will send back the parsed body as JSON
}); //testing 


//chat endpoint
app.post('/chat', async (req, res) => {
  try {
    const userMessage = req.body.message;
    const personalityDescription = "Baloo is a virtual assistant with a unique personality. He's funny and sassy, cute but a bit impatient. He likes to give witty and playful responses.";
    const chatCompletion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // model of openai to use
      messages: [
        { role: "system", content: personalityDescription },
        { role: "user", content: userMessage }
      ],
    });
      

    console.log("OpenAI API response:", chatCompletion);
      
    res.json({ response: chatCompletion.choices[0].message.content });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: error.message });
  }
});
//for sending requests to the API 

const PORT = process.env.PORT || 3000;
app.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});


// this is for local port, since I'm using Heroku, it needs to match the PORT that Heroku provides
//app.listen(3000, () => {
//    console.log('Server running on http://localhost:3000/');
//});

