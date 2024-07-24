import { Flex, Spinner } from "@chakra-ui/react";
// import { Link } from "react-router-dom";
import useShowToast from "../hooks/useShowToast";
import { useEffect, useState } from "react";
import Post from "../components/Post";
import { useRecoilState } from "recoil";
import postsAtom from "../atoms/postsAtom";

const HomePage = () => {
  const showToast = useShowToast();
  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useRecoilState(postsAtom);

  useEffect(() => {
    const getFeedPosts = async () => {
      setPosts([]);
      try {
        const res = await fetch("/api/posts/feed");
        const data = await res.json();
        console.log(data);
        if (data.error) return showToast("Error", data.error, "error");

        setPosts(data);
      } catch (error) {
        showToast("Error", error.message, "error");
      } finally {
        setLoading(false);
      }
    };

    getFeedPosts();
  }, [showToast, setPosts]);
  return (
    <>
      {loading && (
        <Flex justify={"center"}>
          <Spinner size={"xl"} />
        </Flex>
      )}
      {!loading && posts.length === 0 && (
        <Flex justify={"center"}>
          <h1>Follow some users to get feed</h1>
        </Flex>
      )}

      {posts.map((post) => (
        <Post key={post._id} post={post} postedBy={post.postedBy} />
      ))}
    </>
  );
};

export default HomePage;
