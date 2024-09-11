import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { Avatar } from "@chakra-ui/react";
import useFollowUnFollow from "../hooks/useFollowUnFollow";

const SuggestedUser = ({ user }) => {
  const { following, updating, handleFollowUnfollow } = useFollowUnFollow(user);

  return (
    <>
      <Flex gap={2} justifyContent={"space-between"} alignItems={"center"}>
        <Flex gap={2} as={Link} to={`${user.username}`}>
          <Avatar src={user.profilePic} />
          <Box>
            <Text fontSize={"sm"} fontWeight={"bold"}>
              {user.username}
            </Text>
            <Text color={"gray.light"} fontSize={"sm"}>
              {user.name}
            </Text>
          </Box>
        </Flex>
        <Button
          size={"sm"}
          color={following ? "black" : "white"}
          bg={following ? "white" : "blue.400"}
          onClick={handleFollowUnfollow}
          isLoading={updating}
          _hover={{
            color: following ? "black" : "white",
            opacity: ".8",
          }}
        >
          {following ? "Unfollow" : "Follow"}
        </Button>
      </Flex>
    </>
  );
};

export default SuggestedUser;
