import {
  Avatar,
  AvatarBadge,
  Box,
  Flex,
  Image,
  Stack,
  Text,
  useColorMode,
  useColorModeValue,
  WrapItem,
} from "@chakra-ui/react";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom.js";
import { BsCheck2All } from "react-icons/bs";
import { selectedConversationAtom } from "../atoms/messagesAtom.js";

const Conversation = ({ conversation, isOnline }) => {
  const user = conversation.participants[0];
  const currentUser = useRecoilValue(userAtom);
  const lastMessage = conversation.lastMessage;
  const [selectedConversation, setSelectedConversation] = useRecoilState(
    selectedConversationAtom
  );
  const colorMode = useColorMode();

  return (
    <Flex
      gap={4}
      alignItems={"center"}
      p={"1"}
      _hover={{
        cursor: "pointer",
        bg: useColorModeValue("gray.600", "gray.dark"),
        color: "white",
      }}
      onClick={() =>
        setSelectedConversation({
          _id: conversation._id,
          userId: user._id,
          userProfilePic: user.profilePic,
          username: user.username,
          mock: conversation.mock,
        })
      }
      bg={
        selectedConversation?._id === conversation._id
          ? colorMode === "light"
            ? "gray.100"
            : "gray.dark"
          : ""
      }
      borderRadius={"md"}
    >
      <WrapItem>
        <Avatar
          size={{ base: "xs", sm: "sm", md: "md" }}
          src={user.profilePic}
          name={user.username}
        >
          {isOnline ? <AvatarBadge boxSize={"1em"} bg={"green.500"} /> : ""}
        </Avatar>
      </WrapItem>

      <Stack>
        <Text fontWeight={"700"} display={"flex"} alignItems={"center"}>
          {user.username} <Image src="/verified.png" w={4} h={4} ml={1} />
        </Text>
        <Flex fontSize={"xs"} alignItems={"center"} gap={1}>
          {currentUser._id === lastMessage.sender && (
            <Box color={lastMessage.seen ? "blue.400" : ""}>
              <BsCheck2All size={16} />
            </Box>
          )}
          <Text as="span">
            {lastMessage.text.length > 14
              ? lastMessage.text.substring(0, 14) + "..."
              : lastMessage.text}
          </Text>
        </Flex>
      </Stack>
    </Flex>
  );
};

export default Conversation;
