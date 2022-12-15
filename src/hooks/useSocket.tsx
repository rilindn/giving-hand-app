import { useContext } from 'react';
import { Socket } from 'socket.io-client';

import { SocketContext } from '../contexts/SocketContext';

const useSocket = () => {
  const context = useContext<ISocketContext | null>(SocketContext);

  if (context === undefined) {
    throw new Error('SocketContext was used outside of its Provider');
  }

  return context;
};

interface ISocketContext {
  socket: Socket | undefined;
  setSocket: React.Dispatch<Socket>;
}

export default useSocket;
