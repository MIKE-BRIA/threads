import { useState } from "react";
import useShowToast from "./useShowToast";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";

const useFollowUnFollow = (user) => {
  const currentUser = useRecoilValue(userAtom);
  const [updating, setUpdating] = useState(false);
  const [following, setFollowing] = useState(
    user.followers.includes(currentUser?._id)
  );
  const showToast = useShowToast();

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

  return { handleFollowUnfollow, updating, following };
};

export default useFollowUnFollow;
