import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';

function Navbar() {
  return (
    <Box bg="teal.500" py={4} position={{base:"static",md:"sticky"}} px={8} color="white">
          <Flex alignItems="center" gap={3}>
               <ArrowBackIcon fontSize="1.5em"/>
        <Text fontSize="xl" fontWeight="bold">
         Chat App
        </Text>
      </Flex>
    </Box>
  );
}

export default Navbar;
