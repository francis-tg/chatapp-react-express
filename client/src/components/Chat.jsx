import React, { useEffect, useState } from 'react';
import {
  Box,
  Input,
  Button,
  VStack,
  Text,
  StackDivider,
  Avatar,
  Flex,
  Spacer,
  Grid,
  AvatarBadge,
} from '@chakra-ui/react';
import { FaPaperPlane } from 'react-icons/fa';
import { API_URL } from '../api/common';

function Chat() {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
    const [activeUser, setActiveUser] = useState(null);
    const [users, setUsers] = useState([])
    const [Mine,setMine] = useState({})

  const handleSendMessage = () => {
    if (newMessage.trim() !== '') {
      /* const messageObj = {
        text: newMessage,
        isOutgoing: true, // Outgoing message
      };
      setMessages([...messages, messageObj]);
      setNewMessage(''); */
        fetch(`${API_URL}/message/add`, {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                outgoing_id: activeUser,
                message:newMessage
            })
        }).then(async (res) => {
            setNewMessage('')
           await fetch(`${API_URL}/message/${activeUser}`, {
            method: "GET",
            headers: {
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(async (res) => {
            const data = await res.json()
            setMessages(data)
        })
            setNewMessage('')
        })
    }
  };

  const handleSetActiveUser = (user) => {
      setActiveUser(user);
      fetch(`${API_URL}/message/${user}`, {
            method: "GET",
            headers: {
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(async (res) => {
            const data = await res.json()
            setMessages(data)
        })
    };
    function fetchUser() {
        fetch(`${API_URL}/user/protect`, {
            method: "POST",
            headers: {
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(async (res) => {
            const data = await res.json()
            sessionStorage.setItem("user", JSON.stringify(data))
            setMine(data)
        }).catch((err)=>{})
        fetch(`${API_URL}/user/`, {
            method: "GET",
            headers: {
                "Authorization":`Bearer ${sessionStorage.getItem("token")}`
            }
        }).then(async (res) => {
            const data = await res.json()
            setUsers(data)
        }).catch((err)=>{})
    }
    useEffect(() => {
        fetchUser()
       /*  if (activeUser) {
            handleSetActiveUser(activeUser)
        } */
    },[users,messages,activeUser])

  return (
    <Grid gap={4} p={{base:0,sm:5,md:5}} bg="gray.100" height="100vh" templateColumns={{ base: '1fr', md: '25% 1fr' }}
      templateRows={{ base: 'auto', md: '1fr' }}>
      <Box bg="white" boxShadow="md" borderRadius="md" display={{ base: activeUser ? 'none' : 'block', md: 'block' }}>
              <VStack
          spacing={2}
                  
          align="stretch"
          overflowY="auto"
          maxH="90vh"
          p={{base:4,sm:4,md:4}}
          divider={<StackDivider borderColor="gray.200" />}
        >
          <Text fontWeight="bold" fontSize="lg" mb={2}>
            Active Users
          </Text>
                  {users.map((user) => (
              <Box
            p={2}
            bg='teal.200'
            borderRadius="md"
            cursor="pointer"
            _hover={{ bg: 'teal.200' }}
            onClick={() => handleSetActiveUser(user._id)}
                  >
                      <Flex alignItems="center">
                              <Avatar size="sm" src="/avatar.png" mr={2} >
                                  <AvatarBadge boxSize='1em' bg='green.500' />
                          </Avatar>
                              <Text>{user.username}</Text>
                      </Flex>
          </Box>
         ))}
          
        </VStack>
      </Box>
      <Box bg="white" boxShadow="md"   display={{ base: activeUser ? "block" :'none', md: 'block' }} position="relative" p="5px" height="95vh" borderRadius="md">
        <VStack
          //divider={<StackDivider borderColor="gray.200" />}
          spacing={2}
          align="stretch"
          overflowY="auto"
          maxH="80vh"
          p={4}
        >
          {messages&&messages.map((message, index) => (
            <Flex
              key={index}
              alignItems={Mine._id ===message.outgoing_id ? 'flex-end' : 'flex-start'}
              justifyContent={Mine._id ===message.outgoing_id ? 'flex-end' : 'flex-start'}
              flexDirection={Mine._id ===message.outgoing_id ? 'row-reverse' : 'row'}
              mb={2}
              >
                  <Spacer/>
              
                
              <Box
                p={2}
                bg={Mine._id ===message.outgoing_id ? 'teal.500' : 'gray.200'}
                      borderRadius="md"
                      m="5px"
                color={Mine._id ===message.outgoing_id ? 'white' : 'black'}
              >
                <Text>{message.message}</Text>
                  </Box>
                  {Mine._id ===message.outgoing_id && (
                <Avatar size="sm" src="/avatar.png" mr={2} />
                  )}
            </Flex>
          ))}
        </VStack>
        <Flex mt={4} position="absolute" bottom="3px" p="8px" width="100%">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message"
            borderRadius="md"
            bg="white"
            boxShadow="md"
            flex="1"
            mr={2}
          />
          <Button
            onClick={handleSendMessage}
            colorScheme="teal"
            borderRadius="md"
            _hover={{ bg: 'teal.500' }}
          >
            <FaPaperPlane />
          </Button>
        </Flex>
      </Box>
    </Grid>
  );
}

export default Chat;
