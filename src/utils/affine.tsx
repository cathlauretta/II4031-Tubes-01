const inverseMod = (a: number, mod: number): number => {
  for (let x = 1; x < mod; x++) {
    if (((a % mod) * (x % mod)) % mod == 1) {
      return x;
    }
  }
  throw new Error("Can Not Find Mod Inverse!");
};

export function encAffine(m: number, plaintext: String, b: number): String {
  var ciphertext = new String("");
  for (let x = 0; x < plaintext.length; x++) {
    const cipherNum = ((m * (plaintext.charCodeAt(x) - 97) + b) % 26) + 97;
    ciphertext.concat(String.fromCharCode(cipherNum));
  }
  return ciphertext;
}

export function decAffine(m: number, ciphertext: String, b: number): String {
  var decryptedtext = new String("");
  for (let x = 0; x < ciphertext.length; x++) {
    const decryptedNum = ((inverseMod(m, 26) * (ciphertext.charCodeAt(x) - b)) % 26) + 97;
    decryptedtext.concat(String.fromCharCode(decryptedNum));
  }
  return decryptedtext;
}
