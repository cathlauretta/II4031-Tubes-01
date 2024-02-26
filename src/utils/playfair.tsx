const keyMatrix = (key: String): Array<String> => {
  /* Valid Letters as Key are the members of alphabets */
  const validLetters = "ABCDEFGHIKLMNOPQRSTUVWXYZabcdefghiklmnopqrstuvwxyz";

  /* k adalah key yang isinya hanya unique alphabet characters */
  var k = new String("");
  /* Cek setiap huruf dalam key, kalo ada dalam ValidLetters & belum ada di k, masukin ke k */
  for (let x = 0; x < key.length; x++) {
    if (!k.includes(key[x]) && validLetters.includes(key[x])) {
      k.concat(key[x].toUpperCase());
    }
  }

  /* Menambahkan sisa alphabet yang belum ada secara berurutan */
  for (let x = 0; x < 25; x++) {
    if (!k.includes(validLetters[x])) {
      k.concat(validLetters[x]);
    }
  }

  /* Kelompokkan 5 x 5 */
  var km = new Array<String>();
  for (let x = 0; x < k.length; x += 5) {
    km.concat(k.slice(x, x + 5));
  }

  return km;
};

const plainMatrix = (plaintext: String): Array<String> => {
  var pm = new Array<String>();
  // Ubah jd huruf kapital, hapus spasi, dan hapus J
  plaintext = plaintext.toUpperCase().replace(" ", "").replace("J", "I");

  var loop = true;
  var x = 1;
  while (loop) {
    // Jika tidak ada 2 huruf yang sama berimpitan, cari sampe ada
    while (plaintext[x] != plaintext[x - 1]) {
      x++;
      // Jika jumlah iterasi udah sama dengan panjang plaintext, hentikan loop.
      if (x == plaintext.length) {
        loop = false;
        break;
      }
    }

    // Sisipkan 'x' diantara kedua huruf
    plaintext = plaintext
      .slice(0, x - 1)
      .concat("x")
      .concat(plaintext.slice(x, plaintext.length - 1));
  }

  // Jika jumlah karakter ganjil, tambahkan 'x' di akhir
  if (plaintext.length % 2 != 0) {
    plaintext.concat("x");
  }

  // Bentuk Array of Bigram
  for (let x = 0; x < plaintext.length; x += 2) {
    pm.concat(plaintext.slice(x, x + 1));
  }

  return pm;
};

export function encPlayfair(plaintext: String, key: String): String {
  const bigrams = plainMatrix(plaintext);
  const km = keyMatrix(key);

  // Untuk setiap bigram
  for (var bigram in bigrams) {
    // Cari posisi dari setiap karakter
    var posX = [-1, -1];
    var posY = [-1, -1];
    for (let x = 0; x < 2; x++) {
      var y = 0;
      var search = true;
      while (y < 5 && search) {
        if (km[y].includes(bigram[x])) {
          posX[x] = y;
          /* cari kolom */
          posY[x] = km[y].indexOf(bigram[x]);
          search = false;
        }
      }
    }

    // Jika sebaris, geser kanan sekali (siklik)
    if (posX[0] == posX[1]) {
      bigram = km[posX[0]][(posY[0] + 1) % 5].concat(
        km[posX[1]][(posY[1] + 1) % 5]
      );
    } // Jika sekolom, geser ke bawah sekali (siklik)
    else if (posY[0] == posY[1]) {
      bigram = km[(posX[0] + 1) % 5][posY[0]].concat(
        km[(posX[1] + 1) % 5][posY[1]]
      );
    } /* Jika beda kolom & beda baris,
      Huruf ke-1: Cari yang sebaris dengan huruf pertama dan sekolom dengan huruf kedua 
      Huruf ke-2: Cari yang sebaris dengan huruf kedua dan sekolom dengan huruf pertama */ else {
      bigram = km[posX[0]][posY[1]].concat(km[posX[1]][posY[0]]);
    }
  }

  // Sambungin semua isi dari Array Bigram jadi String
  return bigrams.join("");
}

// Menghilangkan x yang pernah disisipkan,
// kecuali yang di akhir yang menggenapkan jumlah karakter
const postprocess = (text: String): String => {
  var x = 0;
  var loop = true;
  while (loop) {
    if (x + 2 >= text.length) {
      if (text[x] == text[x + 2] && text[x + 1] == "x") {
        text = text.slice(0, x).concat(text.slice(x + 2, text.length - 1));
      } else {
        x++;
      }
    } else {
      loop = false;
    }
  }

  return text;
};

// Mirip sama Encryption, bedanya cuma di arah enkripsi kalo sebaris, sekolom, atau tidak sama sekali
export function decPlayfair(ciphertext: String, key: String): String {
  const bigrams = plainMatrix(ciphertext);
  const km = keyMatrix(key);

  for (var bigram in bigrams) {
    var posX = [-1, -1];
    var posY = [-1, -1];
    for (let x = 0; x < 2; x++) {
      var y = 0;
      var search = true;
      while (y < 5 && search) {
        if (km[y].includes(bigram[x])) {
          posX[x] = y;
          /* cari kolom */
          posY[x] = km[y].indexOf(bigram[x]);
          search = false;
        }
      }
    }

    if (posX[0] == posX[1]) {
      bigram = km[posX[0]][(posY[0] - 1) % 5].concat(
        km[posX[1]][(posY[1] - 1) % 5]
      );
    } else if (posY[0] == posY[1]) {
      bigram = km[(posX[0] - 1) % 5][posY[0]].concat(
        km[(posX[1] - 1) % 5][posY[1]]
      );
    } else {
      bigram = km[posX[0]][posY[1]].concat(km[posX[1]][posY[0]]);
    }
  }

  return postprocess(bigrams.join(""));
}
