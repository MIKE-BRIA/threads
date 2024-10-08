import { Avatar, Box, Flex, Image, Text } from "@chakra-ui/react";
import { formatDistanceToNow } from "date-fns";
import { Link, useNavigate } from "react-router-dom";
import Action from "./Action";
import { useState } from "react";
import useShowToast from "../hooks/useShowToast";
import { useEffect } from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { useRecoilState, useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import postsAtom from "../atoms/postsAtom";

const Post = ({ post, postedBy }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const currentUser = useRecoilValue(userAtom);
  const [posts, setPosts] = useRecoilState(postsAtom);

  const showToast = useShowToast();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetch("/api/users/profile/" + postedBy);
        const data = await res.json();

        // console.log(data);
        if (data.error) {
          showToast("Error", data.error, "error");
          return;
        }

        setUser(data);
      } catch (error) {
        showToast("Error", error.message, "error");
        setUser(null);
      }
    };

    getUser();
  }, [postedBy, showToast]);

  async function handleDeletePost(e) {
    try {
      e.preventDefault();

      if (!window.confirm("Are you sure you want to delete this post?")) return;

      const res = await fetch(`/api/posts/${post._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (data.error) return showToast("Error", data.error, "error");

      showToast("Success", "Post deleted", "success");
      setPosts(posts.filter((p) => p._id !== post._id));
      navigate(`/${user.username}`);
    } catch (error) {
      showToast("Error", error.message, "error");
    }
  }
  return (
    <>
      <Link to={`/${user?.username}/post/${post._id}`}>
        <Flex gap={3} mb={4} py={5}>
          <Flex flexDirection={"column"} alignItems={"center"}>
            <Avatar
              size={"md"}
              name={user?.name}
              src={user?.profilePic}
              onClick={(e) => {
                e.preventDefault();
                navigate(`/${user?.username}`);
              }}
            />
            <Box w={"1px"} h={"full"} bg={"gray.light"} my={2}></Box>
            <Box position={"relative"} w={"full"}>
              {post.replies.length === 0 && (
                <Text textAlign={"center"}>🥱</Text>
              )}
              {post.replies[0] && (
                <Avatar
                  size={"xs"}
                  name={post.replies[0].username}
                  src={post.replies[0].userprofilePic}
                  position={"absolute"}
                  top={"0px"}
                  left={"15px"}
                  padding={"2px"}
                />
              )}
              {post.replies[1] && (
                <Avatar
                  size={"xs"}
                  name={post.replies[1].username}
                  src={post.replies[1].userprofilePic}
                  position={"absolute"}
                  bottom={"0px"}
                  right={"-5px"}
                  padding={"2px"}
                />
              )}
              {post.replies[2] && (
                <Avatar
                  size={"xs"}
                  name={post.replies[2].username}
                  src={post.replies[2].userprofilePic}
                  position={"absolute"}
                  bottom={"0px"}
                  left={"4px"}
                  padding={"2px"}
                />
              )}
            </Box>
          </Flex>

          <Flex flex={1} flexDirection={"column"}>
            <Flex justifyContent={"space-between"}>
              <Flex w={"full"} alignItems={"center"}>
                <Text
                  fontSize={"sm"}
                  fontWeight={"bold"}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/${user?.username}`);
                  }}
                >
                  {user?.username}
                </Text>
                <Image src="/verified.png" w={4} h={4} ml={1} />
              </Flex>
              <Flex gap={4} alignItems={"center"}>
                <Text
                  fontSize={"xs"}
                  width={36}
                  textAlign={"right"}
                  color={"gray.light"}
                >
                  {formatDistanceToNow(new Date(post.createdAt))} ago
                </Text>

                {currentUser?._id === user?._id && (
                  <DeleteIcon size={20} onClick={handleDeletePost} />
                )}
              </Flex>
            </Flex>

            <Text fontSize={"sm"}>{post.text}</Text>
            {post.img && (
              <Box
                borderRadius={6}
                overflow={"hidden"}
                border={"1px solid"}
                borderColor={"gray.light"}
                mt={3}
              >
                <Image src={post.img} alt="images from a post" />
              </Box>
            )}

            <Flex gap={3} my={1}>
              <Action post={post} />
            </Flex>
          </Flex>
        </Flex>
      </Link>
    </>
  );
};

export default Post;
