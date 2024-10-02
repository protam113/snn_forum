import React, { createContext, useState, useEffect, useCallback } from "react";

const QueueContext = createContext();

export const QueueProvider = ({ children }) => {
  const [queue, setQueue] = useState([]);
  const [processing, setProcessing] = useState(false);

  const addRequest = useCallback((promiseFunc) => {
    setQueue((prevQueue) => [...prevQueue, promiseFunc]);
  }, []);

  useEffect(() => {
    const processNext = async () => {
      if (queue.length === 0 || processing) return;

      setProcessing(true);
      const nextRequest = queue[0];
      try {
        await nextRequest();
      } catch (error) {
        console.error("Queue error:", error);
      } finally {
        setQueue((prevQueue) => prevQueue.slice(1));
        setProcessing(false);
      }
    };

    processNext();
  }, [queue, processing]);

  return (
    <QueueContext.Provider value={{ addRequest }}>
      {children}
    </QueueContext.Provider>
  );
};

export const useQueue = () => React.useContext(QueueContext);
