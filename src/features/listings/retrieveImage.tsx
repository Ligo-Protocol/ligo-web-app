import { useEffect } from "react";
import { Web3Storage } from "web3.storage";

export function RetrieveImage() {
  useEffect(() => {
    async function imageFunction() {
      console.log("First step");
      const cid = "bafybeihj4iorhf6clb6no6hjlpcmchwb4aebxfhxa3fgu77g2hdksz7kya";
      const token: string = process.env.REACT_APP_WEB3STORAGE_TOKEN!;
      const client = new Web3Storage({ token });
      const res = await client.get(cid);

      console.log(`Got a response! [${res!.status}] ${res!.statusText}`);
      if (!res!.ok) {
        throw new Error(`failed to get ${cid}`);
      }

      // unpack File objects from the response

      console.log("Before file unpack");
      const files = await res!.files();

      console.log("After file unpack");
      for (const file of files) {
        console.log(
          `${file.cid} -- ${file.webkitRelativePath} -- ${file.size}`
        );
      }
    }
    imageFunction().catch((error: any) => {
      console.log(error);
    });
  }, []);

  return <div></div>;
}
