const autoKey = (key: String, plaintext: String): String => {
  return key.concat(plaintext.slice(0, plaintext.length - key.length));
};

const loopKey = (key: String, n: number): String => {
  var x = 0;
  while (key.length != n) {
    key.concat(key.charAt(x));
    x++;
    if (x == 3) {
      x = 0;
    }
  }
  return key;
};

function encVigenere(plaintext: String, key: String, autokey: Boolean): String {
  var fullkey = new String("");
  autokey
    ? (fullkey = autoKey(key, plaintext))
    : (fullkey = loopKey(key, plaintext.length));
  
  var ciphertext = new String("");
  for (let x = 0; x < plaintext.length; x++) {
    const cipherNum = ((plaintext.charCodeAt(x) - 97) + (key.charCodeAt(x) - 97)) % 26 + 97;
    ciphertext.concat(String.fromCharCode(cipherNum));
  }
  return ciphertext;
}

function decVigenere(ciphertext: String, key: String, autokey: Boolean): String {
  var fullkey = new String("");
  autokey
    ? (fullkey = autoKey(key, ciphertext))
    : (fullkey = loopKey(key, ciphertext.length));
  
  var decryptedtext = new String("");
  for (let x = 0; x < ciphertext.length; x++) {
    const cipherNum = ((ciphertext.charCodeAt(x) - 97) - (key.charCodeAt(x) - 97)) % 26 + 97;
    decryptedtext.concat(String.fromCharCode(cipherNum));
  }
  return decryptedtext;
}
