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

function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const toast = useToast();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const navigate = useNavigate()
  const handleLogin = () => {
    // Perform login logic here
    // Replace with your own implementation

    fetch(`${API_URL}/user/sign-in`, {
      method: "POST",
       headers: {
        "Content-Type": "application/json"
      },
      body:JSON.stringify({email:email,password:password})
    }).then(async(res) => {
      if (res.status === 200) {
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
         setEmail('');
    setPassword('');
      } else {
        toast({
      title: 'Une erreur',
      description: 'Une erreur est survenue.',
      status: 'error',
      duration: 3000,
      isClosable: true,
    });
      }
    }).catch((err)=>console.log(err))
    

    // Reset form fields
    setEmail('');
    setPassword('');
  };

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
        <Heading mb={4}>Connexion</Heading>
        <FormControl id="email" mb={4}>
          <FormLabel>Adresse email</FormLabel>
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </FormControl>
        <FormControl id="password" mb={4}>
          <FormLabel>Mot de passe</FormLabel>
          <InputGroup>
            <Input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                  <Button colorScheme="teal" onClick={handleLogin}>
          
                      Connectez-vous
              </Button>
              <ChLink>
              <Link to="/register">Créer un compte</Link>
           </ChLink>
        </Flex>
      </Box>
    </Flex>
  );
}

export default Login;
