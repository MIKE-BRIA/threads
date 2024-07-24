import {
  Avatar,
  Box,
  Flex,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Portal,
  Text,
  VStack,
  Button,
} from "@chakra-ui/react";
import { BsInstagram } from "react-icons/bs";
import { CgMoreO } from "react-icons/cg";
import userAtom from "../atoms/userAtom";
import { useRecoilValue } from "recoil";
import { Link } from "react-router-dom";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";

const UserHeader = ({ user }) => {
  // const toast = useToast();
  const showToast = useShowToast();
  const currentUser = useRecoilValue(userAtom); //logged in user
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const [updating, setUpdating] = useState(false);

  function copyurl() {
    const currentUrl = window.location.href;
    navigator.clipboard.writeText(currentUrl).then(() => {
      // toast({ description: "copied to clipboard" });
      showToast("copied to clipboard");
    });
  }

  async function handleFollowUnfollow() {
    if (!currentUser) return showToast("Please Login to follow");

    if (updating) return;
    setUpdating(true);
    try {
      const res = await fetch(`/api/users/follow/${user._id}`, {
        method: "POST",
        headers: { "content-type": "application/json" },
      });

      const data = await res.json();
      if (data.error) return showToast("Error", data.error, "error");

      if (following) {
        showToast(`Unfollowed ${user.name}`);
        user.followers.pop(); //simulate removing from followers
      } else {
        showToast(`Followed ${user.name}`);
        user.followers.push(currentUser?._id); //simulate adding to followers
      }

      setFollowing(!following);
      console.log(data);
    } catch (error) {
      showToast("Error", error, "error");
    } finally {
      setUpdating(false);
    }
  }

  return (
    <>
      <VStack gap={4} alignItems={"start"}>
        <Flex justifyContent={"space-between"} w={"full"}>
          <Box>
            <Text fontSize={"2xl"} fontWeight={"bold"}>
              {user.name}
            </Text>
            <Flex gap={2} alignItems={"center"}>
              <Text fontSize={"sm"}>{user.username}</Text>
              <Text
                fontSize={"xs"}
                bg={"gray.dark"}
                color={"gray.light"}
                p={1}
                borderRadius={"full"}
              >
                threads.next
              </Text>
            </Flex>
          </Box>
          <Box>
            {user.profilePic && (
              <Avatar name={user.name} src={user.profilePic} size={"xl"} />
            )}
            {!user.profilePic && (
              <Avatar
                name={user.name}
                src="https://bit.ly/broken-link"
                size={"xl"}
              />
            )}
          </Box>
        </Flex>
        <Text>{user.bio} </Text>

        {currentUser?._id === user._id && (
          <Link to="/update">
            <Button size={"sm"}>Update Profile</Button>
          </Link>
        )}
        {currentUser?._id !== user._id && (
          <Button
            size={"sm"}
            onClick={handleFollowUnfollow}
            isLoading={updating}
          >
            {following ? "Unfollow" : "Follow"}
          </Button>
        )}
        <Flex w={"full"} justifyContent={"space-between"}>
          <Flex gap={2} alignItems={"center"}>
            <Text color={"gray.light"}>
              {user.followers.length}{" "}
              {user.followers.length === 1 ? "follower" : "followers"}
            </Text>
            <Text color={"gray.light"}>{user.following.length} following</Text>
            <Box w={1} h={1} bg={"gray.light"} borderRadius={"full"}></Box>
            <Link color={"gray.light"}>instagram.com</Link>
          </Flex>
          <Flex gap={3}>
            <Box>
              <BsInstagram size={24} cursor={"pointer"} />
            </Box>
            <Box>
              <Menu>
                <MenuButton>
                  <CgMoreO size={24} cursor={"pointer"} />
                </MenuButton>
                <Portal>
                  <MenuList bg={"gray.dark"}>
                    <MenuItem
                      bg={"gray.dark"}
                      color={"gray.light"}
                      onClick={copyurl}
                    >
                      copy link
                    </MenuItem>
                  </MenuList>
                </Portal>
              </Menu>
            </Box>
          </Flex>
        </Flex>

        <Flex w={"full"}>
          <Flex
            flex={1}
            borderBottom={"1.5px solid white"}
            justifyContent={"center"}
            pb="3"
            cursor={"pointer"}
          >
            <Text fontWeight={"bold"}>Threads</Text>
          </Flex>

          <Flex
            flex={1}
            borderBottom={"1px solid gray"}
            justifyContent={"center"}
            pb="3"
            color={"gray.light"}
            cursor={"pointer"}
          >
            <Text fontWeight={"bold"}>Replies</Text>
          </Flex>
        </Flex>
      </VStack>
    </>
  );
};

export default UserHeader;
