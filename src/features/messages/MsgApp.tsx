
import { MessageInput } from "./MessageInput";
import { useEffect, useState } from "react";

import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import * as React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import Chip from '@mui/material/Chip';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';

import styles from "../../assets/css/features/messages/msgapp.module.css"


export function MsgApp({ xmtp }) {
  const [convos, setConvos] = useState<any>([]);
  const [peer, setPeer] = useState<String>();
  const [msgstream, setMsgStream] = useState<any>([]);

  useEffect(() => {
    const init = async () => {
      try {
        const allConversations = await xmtp.conversations.list();
        setConvos(allConversations);

      } catch (error) {
        console.error(error);
      }
    };

    init();
    // eslint-disable-next-line
  }, []);

  async function SelectPeer(address) {
    console.log("Current peer", address)
    setPeer(address)
    LoadMessage()
  }

  async function LoadMessage() {
    console.log("peer in load msg", peer)
    const conversation = await xmtp.conversations.newConversation(peer)
    // Load all messages in the conversation
    const messages = await conversation.messages()
    console.log("Messages with peer", messages)
    setMsgStream(messages)
  }


  return (
    <>
      <div className={styles.app}>
        <div className={styles.conversationoutlet}>
          <div className={styles.conversation}>
            <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
              <nav aria-label="main mailbox folders">
                <List>
                  {convos.map((item: any, index: number) => (
                    <div key={index}>
                      <ListItem disablePadding>
                        <ListItemButton onClick={() => SelectPeer(item.peerAddress)}>
                          <ListItemIcon>
                            <Avatar alt="Remy Sharp"
                              src="/static/images/avatar/1.jpg"
                              sx={{ width: 54, height: 54 }} />
                          </ListItemIcon>
                          <ListItemText primary={item.peerAddress.substring(0, 5) + "..." + item.peerAddress.slice(-3)} />
                        </ListItemButton>
                      </ListItem>
                    </div>
                  ))}
                </List>
              </nav>
            </Box>
          </div>
          <div className={styles.addconvo}>

            <div className={styles.addtext}>
              <Chip label="Add Account address" />
            </div>
            <div className={styles.addicon}>
              <Fab size="medium" color="secondary" aria-label="add">
                <AddIcon />
              </Fab>
            </div>
          </div>
        </div>
        <div className={styles.outlet}>
          <div className={styles.msgstream}>
            {msgstream.map((item: any, index: number) => (
              <div key={index}>
                {item.senderAddress === xmtp.address ? (item.recipentAddress === peer ? "true" :

                  <div className={styles.send}>
                    <Stack direction="row" spacing={2}>
                      <Chip label={item.content} />
                      <Avatar alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }} />
                      <br />
                    </Stack>
                    <Typography variant="caption" display="block" gutterBottom>
                      12/15/2022 10:00 PM
                    </Typography>
                  </div>) :
                  <div className={styles.receive}>
                    <Stack direction="row" spacing={2}>
                      <Avatar alt="Remy Sharp"
                        src="/static/images/avatar/1.jpg"
                        sx={{ width: 24, height: 24 }} />
                      <Chip label={item.content} /><br />
                    </Stack>
                    <Typography variant="caption" display="block" gutterBottom>
                      12/15/2022 10:00 PM
                    </Typography>
                  </div>}



              </div>))}
          </div>
          <div className={styles.msginput}>
            <MessageInput xmtp={xmtp} peer={peer} />
          </div>
        </div>
      </div>
      {/* <button onClick={prints}>TEST </button> */}
    </>
  )
}