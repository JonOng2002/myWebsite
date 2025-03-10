import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    const msg = {
        to: 'jonongca@gmail.com',  // Replace with your email to receive messages
        from: 'no-reply@jonongca.com',  // Must be from your verified domain
        replyTo: email,  // Allows you to reply directly to the visitor
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