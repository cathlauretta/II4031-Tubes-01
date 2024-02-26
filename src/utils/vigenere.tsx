const BASE_ORD = 65;

const autoKey = (key: String, plaintext: String): String => {
  /* Nyambungin key dengan potongan plaintext hingga sepanjang plaintext */
  return key += (plaintext.slice(0, plaintext.length - key.length));
};

const loopKey = (key: String, n: number): String => {
  /* Ngulangin key ampe panjangnya sama kayak plaintext */
  var x = 0;
  var fk = new String(key)
  while (fk.length != n) {
    fk += key.charAt(x);
    x++;
    if (x == key.length) {
      x = 0;
    }
    console.log(fk);
  }
  return fk;
};

export function encVigenere(plaintext: String, key: String, type: number): String {
  var fullkey = new String("");
  var ciphertext = new String("");

  if (type == 2) {
    fullkey = loopKey(key, plaintext.length);
    for (let x = 0; x < plaintext.length; x++) {
      console.log(plaintext.charCodeAt(x) - BASE_ORD);
      console.log(fullkey.charCodeAt(x) - BASE_ORD);

      var cipherNum = ((plaintext.charCodeAt(x) - BASE_ORD + (fullkey.charCodeAt(x) - BASE_ORD)) % 256) + BASE_ORD;
      console.log(plaintext.charCodeAt(x) + " decrypt jadi " + cipherNum);
      ciphertext += String.fromCharCode(cipherNum); //String.fromCharCode ngubah ASCII ke Character
    }
  } else {
    plaintext = plaintext.toUpperCase();
    plaintext = plaintext.replace(/[^A-Z]/g, "");
    key = key.toUpperCase();
  
    console.log(plaintext);

    if (type == 0) {
      fullkey = loopKey(key, plaintext.length);
    } else {
      fullkey = autoKey(key, plaintext);
    }

    console.log("passed")

    for (let x = 0; x < plaintext.length; x++) {
      console.log(plaintext.charCodeAt(x) - BASE_ORD);
      console.log(fullkey.charCodeAt(x) - BASE_ORD);
      /* cipherNum adalah huruf dalam plaintext yang diconvert ke ASCII kemudian dienkripsi memakai key */
      const cipherNum = ((plaintext.charCodeAt(x) - BASE_ORD + (fullkey.charCodeAt(x) - BASE_ORD)) % 26) + BASE_ORD;
      ciphertext += String.fromCharCode(cipherNum); //String.fromCharCode ngubah ASCII ke Character
    }
  }
    console.log(fullkey);
    console.log(ciphertext);
  return ciphertext;
}

export function decVigenere(ciphertext: String, key: String, type: number): String {
  var fullkey = new String("");
  var decryptedtext = new String("");

  if (type == 2) {
    fullkey = loopKey(key, ciphertext.length);
    for (let x = 0; x < ciphertext.length; x++) {
      var cipherNum = ((ciphertext.charCodeAt(x) - BASE_ORD - (fullkey.charCodeAt(x) - BASE_ORD)) % 256) + BASE_ORD;
      console.log(ciphertext.charCodeAt(x) + " decrypt jadi " + cipherNum);
      decryptedtext += (String.fromCharCode(cipherNum));
    }
  } else {
    ciphertext = ciphertext.toUpperCase();
    ciphertext = ciphertext.replace(/[^A-Z]/g, "");
    key = key.toUpperCase();

    if (type == 0) {
      fullkey = loopKey(key, ciphertext.length);
    } else if (type == 1) {
      fullkey = key;
    }

    for (let x = 0; x < ciphertext.length; x++) {
      var cipherNum = ((ciphertext.charCodeAt(x) - BASE_ORD - (fullkey.charCodeAt(x) - BASE_ORD)) % 26) + BASE_ORD;
      if (cipherNum < 65) {
        cipherNum += 26;
      }
      console.log(ciphertext.charCodeAt(x) + " decrypt jadi " + cipherNum);
      (type == 1) ? fullkey += String.fromCharCode(cipherNum) : null;
      decryptedtext += (String.fromCharCode(cipherNum));
    }
    console.log(fullkey);
    console.log(decryptedtext);
  }
  return decryptedtext;
}
