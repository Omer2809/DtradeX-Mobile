import client from "./client";

const apiEndpoint = "/messages";

const send = (message, listingId, toId, fromId) =>
client.post(apiEndpoint, {
    message,
    listingId,
    toId,
    fromId,
  });

// const deleteMessage = (id) => client.delete(`${apiEndpoint}/${id}`);

const getMyMessages = () => client.get("/my/messages/receive");

const getChat = (fromUserId, toUserId, listingId) =>
  client.post("/my/chat", { fromUserId, toUserId, listingId });

const deleteChat = (id) => client.delete(`/my/chat/${id}`);

const deleteForAll = (id) => client.delete(`${apiEndpoint}/forAll/${id}`);

const deleteForMe = (id) => client.delete(`${apiEndpoint}/forMe/${id}`);

export default {
  send,
  deleteForMe,
  deleteForAll,
  getMyMessages,
  getChat,
  deleteChat,
};

    // const endpoint = "/messages";
    
    // const send = (message, listingId, userId) =>
    //   client.post(endpoint, {
    //     message,
    //     listingId,
    //     userId,
    //   });
    
    // const sendReply = (message, listingId, toId,fromId) =>
    //   client.post(`${endpoint}/reply`, {
    //     message,
    //     listingId,
    //     toId,
    //     fromId,
    //   });
    
    // const deleteMessage = (id) => client.delete(`${endpoint}/${id}`);
    
    // export default {
    //   send,
    //   sendReply,
    //   deleteMessage
    // };
    // import client from "./httpService";
    // // import { apiUrl } from "../config.json";