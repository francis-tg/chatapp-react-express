import React from 'react';
import { Box, Flex, Text } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { useDispatch } from 'react-redux';
import { toUserList } from '../redux/features/chat';

function Navbar() {
  const dispatch = useDispatch()
  return (
    <Box bg="teal.500" py={4} position={"sticky"} zIndex={10} px={8} top={0} color="white">
          <Flex alignItems="center" gap={3}>
               <ArrowBackIcon fontSize="1.5em" onClick={()=>dispatch(toUserList(false))}/>
        <Text fontSize="xl" fontWeight="bold">
         Chat App
        </Text>
      </Flex>
    </Box>
  );
}

export default Navbar;
