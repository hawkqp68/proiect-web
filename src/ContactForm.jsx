import { useState } from "react";   

function ContactForm() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [feedback, setFeedback] = useState('');

    function handleSubmit() {
        if(name.trim() === '' || email.trim() === '' || message.trim() === '') {
            setFeedback('Te rog completeaza toate campurile.');
        }   else {  
            setFeedback(`Multumim pentru mesaj, ${name}! Te vom contacta la ${email}.`);
            setName('');
            setEmail('');
            setMessage('');
        }

    
    }


    return(
        <div>
            <h3>Formular de contact</h3>

            <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Numele tau"
            />
            <br />
            <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email-ul tau"
            />
            <br />
            <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Mesajul tau"
            />
            <br />
            <button onClick={handleSubmit}>Submit</button>

            <p>{feedback}</p>
        </div>
    );
    
}
export default ContactForm;