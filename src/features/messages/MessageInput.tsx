import * as React from 'react';
import Button from '@mui/material/Button';
import SendIcon from '@mui/icons-material/Send';
import IconButton from '@mui/material/IconButton';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import TextField from '@mui/material/TextField';
import styles from "../../assets/css/features/messages/msgapp.module.css"
import { useState } from 'react';

const defaultValues = {
    textValue: "",
}

export function MessageInput({ xmtp, peer }) {
    const [formValues, setFormValues] = useState(defaultValues);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(formValues.textValue, peer.toString())
        try {
            const conversation = await xmtp.conversations.newConversation(
                peer.toString()
            );
            await conversation.send(formValues.textValue);
        }
        catch (error) {
            console.log("Ligo web app could not send message with XMTP.", error)
        }
    }

    return (
        <>

            <form onSubmit={handleSubmit}>
                <div className={styles.messageBox}>
                    <TextField
                        id="textValue-input"
                        name="textValue"
                        label="Your Text Here"
                        fullWidth
                        type="text"
                        value={formValues.textValue}
                        onChange={handleInputChange}
                    />
                    <IconButton color="primary" aria-label="upload picture" component="label">
                        <input hidden accept="image/*" type="file" />
                        <PhotoCamera />
                    </IconButton>
                    <Button variant="contained" color="primary" type="submit" endIcon={<SendIcon />}>
                        Send
                    </Button>
                </div>
            </form>

        </>
    )
}