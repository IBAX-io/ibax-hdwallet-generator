import elliptic from 'elliptic';
import sha3 from 'js-sha3';
import CryptoJS, { SHA512 } from 'crypto-js';
import Long from 'long';
import keyring from './keyring';
import crc64 from './crc64';
import * as convert from './convert';

const ec = new elliptic.ec('secp256k1');
const addressLength = 20;
export default {
  generatePublicKey(privateKey: string) {
    const keyPair = ec.keyFromPrivate(privateKey);
    const pubKey = keyPair.getPublic();
    const publicHex = pubKey.encode('hex', false);
    console.log(publicHex);
    return publicHex;
  },
  publicToID(publicKey: string): string {
    if (publicKey.startsWith('04')) {
      //  const keyDigest = SHA256(CryptoJS.enc.Hex.parse(publicKey.slice(2)));
      const keyDigest = CryptoJS.enc.Hex.parse(
        sha3.keccak256(convert.toArrayBuffer(publicKey.slice(2)) as any)
      );
      const hashDigest = SHA512(keyDigest as any).toString();
      const bytes = [];
      for (let i = 0; i < hashDigest.length; i += 2) {
        bytes.push(parseInt(hashDigest[i] + hashDigest[i + 1], 16));
      }
      const crc = crc64(bytes);
      const value = '0'.repeat(addressLength - crc.length) + crc;
      const crcDigits = value.split('').map((l) => parseInt(l, 10));
      const addrChecksum = keyring.checksum(crcDigits.slice(0, -1));
      const crcLong = Long.fromString(crc);
      const keyId = crcLong
        .sub(keyring.remainder(crc, 10))
        .add(addrChecksum)
        .toString();
      return keyId;
    }
    throw new Error('Unsupported public key format');
  },
  hexHash(data: any): string {
    const txHash = sha3.keccak256.arrayBuffer(data);
    const hexHash = sha3.keccak256(txHash);
    return hexHash;
  },
  addressString(keyId: string): string {
    const num = Long.fromString(keyId, true, 10).toString();
    const val = '0'.repeat(20 - num.length) + num;
    let ret = '';
    for (let i = 0; i < 4; i += 1) {
      ret += `${val.slice(i * 4, (i + 1) * 4)}-`;
    }
    ret += val.slice(16);
    return ret;
  },
  generateAddres(publicKey: string): string {
    const keyID = this.publicToID(publicKey);
    const address = this.addressString(keyID);
    return address;
  }
};
