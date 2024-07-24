import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { BsThreeDots } from "react-icons/bs";
import { Link } from "react-router-dom";
import Action from "./Action";
import { useState } from "react";

const UserPost = () => {
  const [liked, setLiked] = useState(false);
  return (
    <>
      <Link to={"/mark/post/1"}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar size={"md"} name="mark" src="/zuck-avatar.png" />
            <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
            <Box position={"relative"} w={"full"}>
              <Avatar
                size={"xs"}
                name="john "
                src="https://bit.ly/dan-abramov"
                position={"absolute"}
                top={"0px"}
                left={"15px"}
                padding={"2px"}
              />
              <Avatar
                size={"xs"}
                name="john "
                src="https://bit.ly/prosper-baba"
                position={"absolute"}
                bottom={"0px"}
                right={"-5px"}
                padding={"2px"}
              />
              <Avatar
                size={"xs"}
                name="john "
                src="https://bit.ly/sage-adebayo"
                position={"absolute"}
                bottom={"0px"}
                left={"4px"}
                padding={"2px"}
              />
            </Box>
          </Flex>

          <Flex flex={1} flexDirection={"column"}>
            <Flex justifyContent={"space-between"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text fontSize={"sm"} fontWeight={"bold"}>
                  markzuckerberg
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text fontSize={"sm"} color={"gray.light"}>
                  1d
                </Text>
                <BsThreeDots />
              </Flex>
            </Flex>

            <Text fontSize={"sm"}>This is my first post</Text>
            <Box
              borderRadius={6}
              overflow={"hidden"}
              border={"1px solid"}
              borderColor={"gray.light"}
            >
              <Image src="/post1.png" alt="" />
            </Box>

            <Flex gap={3} my={1}>
              <Action liked={liked} setLiked={setLiked} />
            </Flex>

            <Flex gap={2} alignItems={"center"}>
              <Text color={"gray.light"} fontSize={"sm"}>
                123 replies
              </Text>
              <Box
                w={0.5}
                h={0.5}
                borderRadius={"full"}
                bg={"gray.light"}
              ></Box>
              <Text color={"gray.light"} fontSize={"sm"}>
                1000 likes
              </Text>
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default UserPost;
