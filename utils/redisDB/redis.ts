import { createClient } from "redis";

const client = createClient({ url: process.env.REDIS_URL });

const connect = async () => {
  if (client.isOpen) {
    console.log("Already connected to Redis");
    return;
  }

  await client.connect();
  console.log("Connected successfully.");
};

export const disconnect = async () => {
  if (!client.isOpen) {
    return;
  }
  await client.disconnect();
  console.log("Disconnected.");
};

export const tokenKeyExist = async () => {
  await connect();
  const exists = await client.exists("cacheBetachSite");
  await disconnect();
  return exists;
};

export const getcache = async () => {
  await connect();
  const cache = await client.get("cacheBetachSite");
  await disconnect();
  return cache;
};

export const setcache = async (token: string) => {
  await connect();
  await client.set("cacheBetachSite", token);
  return await disconnect();
};
