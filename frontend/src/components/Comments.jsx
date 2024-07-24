import { Avatar, Divider, Flex, Text } from "@chakra-ui/react";
// import { useState } from "react";
// import { BsThreeDots } from "react-icons/bs";
import Action from "./Action";

const Comments = ({ reply }) => {
  return (
    <>
      <Flex gap={4} py={2} my={2} w={"full"}>
        <Avatar src={reply.userProfilePic} name={reply.username} size={"sm"} />
        <Flex w={"full"} gap={1} flexDirection={"column"}>
          <Flex
            w={"full"}
            justifyContent={"space-between"}
            alignItems={"center"}
          >
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {reply.username}
            </Text>
            {/* <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"} color={"gray.light"}>
                {createdAt}
              </Text>
              <BsThreeDots />
            </Flex> */}
          </Flex>
          <Text>{reply.text}</Text>
          <Action />
        </Flex>
      </Flex>

      <Divider />
    </>
  );
};

export default Comments;
