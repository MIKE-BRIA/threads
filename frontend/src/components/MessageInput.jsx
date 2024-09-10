import {
  Flex,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import { IoSendSharp } from "react-icons/io5";
import useShowToast from "../hooks/useShowToast";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  conversationsAtom,
  selectedConversationAtom,
} from "../atoms/messagesAtom";
import { BsFillImageFill } from "react-icons/bs";

const MessageInput = ({ setMessages }) => {
  const [messageText, setMessageText] = useState("");
  const showToast = useShowToast();
  const selectedConversation = useRecoilValue(selectedConversationAtom);
  const [setConversations] = useRecoilState(conversationsAtom);
  const imageRef = useRef(null);
  const { onClose } = useDisclosure();

  async function handleSendMessage(e) {
    e.preventDefault();

    if (!messageText) return;

    try {
      const res = await fetch("/api/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          recipientId: selectedConversation.userId,
        }),
      });

      const data = await res.json();
      if (data.error) return showToast("Error", data.error, "error");

      setMessages((messages) => [...messages, data]);

      setConversations((prevConvs) => {
        const updatedConversations = prevConvs.map((conversation) => {
          if (conversation._id === selectedConversation._id) {
            return {
              ...conversation,
              lastMessage: {
                text: messageText,
                sender: data.sender,
              },
            };
          }

          return conversation;
        });

        return updatedConversations;
      });

      setMessageText("");
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }

  return (
    <>
      <Flex gap={2} alignItems={"center"}>
        <form onSubmit={handleSendMessage} style={{ flex: 95 }}>
          <InputGroup>
            <Input
              w={"full"}
              placeholder="Enter message"
              onChange={(e) => setMessageText(e.target.value)}
              value={messageText}
            />
            <InputRightElement onClick={handleSendMessage} cursor={"pointer"}>
              <IoSendSharp />
            </InputRightElement>
          </InputGroup>
        </form>
        <Flex flex={5} cursor={"pointer"}>
          <BsFillImageFill size={20} onClick={() => imageRef.current.click()} />
          <input type="file" hidden ref={imageRef} />
        </Flex>
        <Modal
          isOpen={true}
          onClose={() => {
            onClose();
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader></ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Flex mt={5} w={"full"}>
                <Image src="" />
              </Flex>
              <Flex>
                <IoSendSharp size={24} cursor={"pointer"} />
              </Flex>
            </ModalBody>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
};

export default MessageInput;
