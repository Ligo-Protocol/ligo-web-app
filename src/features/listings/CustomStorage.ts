import { JWE } from "did-jwt";
import { create as createIpfs } from 'ipfs';

export class CustomStorageProvider
{
  
  async storeAgreement(encryptedAgreement: JWE): Promise<any> {
    const ipfs = await createIpfs({ repo: "ok" + Math.random() });
    const cid = await ipfs.dag.put(encryptedAgreement, {
      hashAlg: "sha2-256",
    });

    return cid;
  }

  async fetchAgreement(cid: any): Promise<JWE> {
    const ipfs = await createIpfs({ repo: "ok" + Math.random() });
    const retrieved = await ipfs.dag.get(cid);
    return retrieved.value as JWE;
  }
}