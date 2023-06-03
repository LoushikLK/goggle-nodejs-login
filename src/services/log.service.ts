import fs from "fs/promises";

export const logService = async (message: string) => {
  try {
    await fs.writeFile("../../log.txt", message, { flag: "a" });
  } catch (error) {
    console.error(error);
  }
};
