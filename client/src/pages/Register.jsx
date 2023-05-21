import React, { useState } from 'react';
import {
  Box,
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  IconButton,
    useToast,
  Link as ChLink
} from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../api/common';

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false);
    const [userData, setUserData] = useState({
        username: "",
        password: "",
        email:""
    });
    const {username,password,email} = userData
  const toast = useToast();
  const navigate= useNavigate()
  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegister = () => {
    // Perform registration logic here
    // Replace with your own implementation

   fetch(`${API_URL}/user/sign-up`, {
     method: "POST",
     headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify(userData)
    }).then(async(res) => {
      if (res.status === 201) {
        navigate("/")
        const token = await res.json()
        sessionStorage.setItem("token",token)
        toast({
      title: 'Connexion avec succès',
      description: 'Vous êtes bien connecté.',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
      } else {
        toast({
      title: 'Une erreur',
      description: 'Une erreur est survenue.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
      }
    })
    // Reset form fields
    
    };
    
    function onChange(e) {
         setUserData((prevData) => ({
                          ...prevData,
                          [e.target.id]: e.target.value
            }))
    }

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg="gray.100"
      p={4}
    >
      <Box
        bg="white"
        w="400px"
        p={8}
        borderRadius="md"
        boxShadow="md"
      >
              <Heading mb={4}>Créer un compte</Heading>
        <FormControl id="username" mb={4}>
          <FormLabel>Votre nom d'utilisateur</FormLabel>
          <Input
            type="text"
            
            value={username}
                      onChange={onChange}
          />
        </FormControl>
        <FormControl id="email" mb={4}>
          <FormLabel>Votre email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={onChange}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Votre mot de passe</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={onChange}
            />
            <InputRightElement width="3rem">
              <IconButton
                h="1.75rem"
                size="sm"
                onClick={handleShowPassword}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
              <Flex direction="column">
                  <Button colorScheme="teal" onClick={handleRegister}>
          Créer votre compte
              </Button>
              <ChLink>
              <Link to="/login">Connectez-vous</Link>
           </ChLink>
        </Flex>
          </Box>
         
    </Flex>
  );
}

export default RegisterPage;
