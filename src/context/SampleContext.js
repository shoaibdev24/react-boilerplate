import React, { createContext, useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useSelector } from "react-redux";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  // const [loading, setLoading] = useState(true); 

  const accessToken = useSelector((state) => state?.user?.auth?.access_token);

  useEffect(() => {

    if (!accessToken) {
      // setLoading(true);
      return;
    }
    // setLoading(false); // Once token is available, stop loading
    const newSocket = io(SOCKET_URL, {
      autoConnect : true,
      auth: { token: accessToken },
      transports: ["websocket"],
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Cleanup on unmount
    };
  }, [accessToken]); // 🔥 Reconnect when `accessToken` changes

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
