import { createContext, useState, useEffect } from 'react';
import { Socket } from 'socket.io-client';

import useAuth from 'hooks/useAuth';
import { socket as socketClient } from '../api/ApiBase';

const SocketContext = createContext<ISocketContext | null>(null);

const SocketContextProvider: React.FC<Props> = ({ children }) => {
  const { authData } = useAuth();
  const [socket, setSocket] = useState<Socket | undefined>();

  useEffect(() => {
    if (!process.env.REACT_APP_ENABLE_WE_SOCKETS) return;
    socketClient.connect();
    if (authData) {
      socketClient.emit('join', authData?._id);
    }
    setSocket(socketClient);
  }, [authData]);

  return <SocketContext.Provider value={{ socket, setSocket }}>{children}</SocketContext.Provider>;
};

interface Props {
  children: React.ReactNode;
}

interface ISocketContext {
  socket: Socket | undefined;
  setSocket: React.Dispatch<Socket>;
}

export { SocketContext, SocketContextProvider };
