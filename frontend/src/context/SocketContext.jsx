import { createContext, useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import userAtom from "../atoms/userAtom";
import io from "socket.io-client";
import { useContext } from "react";

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const user = useRecoilValue(userAtom);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (user?._id) {
      const newSocket = io("http://localhost:3000", {
        query: {
          userId: user._id,
        },
      });

      newSocket.on("getOnlineUsers", (users) => {
        setOnlineUsers(users);
      });

      setSocket(newSocket);

      return () => {
        newSocket.close();
      };
      // return () => socket && socket.close();
    }
  }, [user?._id]); // Only re-run if user._id changes

  console.log(onlineUsers, "onlineUsers");

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketContext };
