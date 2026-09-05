import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '1mb' }));
app.use(express.static(__dirname));

app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ success: false, message: 'Please fill in all required fields.' });
    }

    const payload = {
      name,
      email,
      _replyto: email,
      subject: `[Portfolio Contact] ${subject || 'New Message'} - from ${name}`,
      message: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'No Subject'}\n\nMessage:\n${message}`,
      _captcha: 'false',
      _template: 'table'
    };

    const targetUrl = 'https://formsubmit.co/ajax/harishanvar56@gmail.com';
    const response = await fetch(targetUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://harishanvar.portfolio',
        'Referer': 'https://harishanvar.portfolio/'
      },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    return res.json(data);
  } catch (error) {
    console.error('Contact endpoint error:', error);
    return res.status(500).json({ success: false, message: 'Error processing contact request: ' + error.message });
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on http://0.0.0.0:${PORT}`);
});
