import sgMail from '@sendgrid/mail';

// Load the SendGrid API Key from environment variables
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const msg = {
        to: 'your-email@gmail.com', // Your Gmail where messages will be sent
        from: `contact@yourdomain.com`, // Your authenticated domain email
        subject: `New Contact Form Submission from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

    try {
        await sgMail.send(msg);
        return res.status(200).json({ message: 'Message sent successfully!' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error sending message', error });
    }
}