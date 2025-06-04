const express = require('express')
const {spawn} = require('child_process')
const cors = require('cors')

const app = express()
app.use(cors({
  origin: 'http://localhost:5173', 
}));
app.use(express.json())


app.get('/',(req,res)=>{
    res.send("Hello")
})
app.post('/fix', (req, res) => {
  const { code } = req.body;
  console.log('calling fix with code:', code);

  const python = spawn('python', ['../model.py', `${code}`]);
  let result = '';

  python.stdout.on('data', (data) => {
    result += data.toString();
    console.log('data in fix', result);
  });

  python.stderr.on('data', (err) => {
    console.error('Python error:', err.toString());
  });

  python.on('close', (exitCode) => {
    console.log('Python script exited with code', exitCode);
    res.json({ fix: result.trim() });
  });

  python.on('error', (err) => {
    console.error('Failed to start Python process:', err);
    res.status(500).json({ error: 'Python process failed' });
  });
})


app.listen(3007,()=>{
    console.log("Server running")
})