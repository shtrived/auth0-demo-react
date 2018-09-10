class Random {
  constructor() {
    let charset = '0123456789';
    charset += 'ABCDEFGHIJKLMNOPQRSTUVXYZ';
    charset += 'abcdefghijklmnopqrstuvwxyz';
    charset += '-._~';
    this.charset = charset;

    let crypto = window.crypto || window.msCrypto;
    this.crypto = crypto;
  }

  getRandomString(length) {
    const result = [];
    const randomValues = new Uint8Array(length);

    if (!this.crypto) {
      return null;
    }

    this.crypto.getRandomValues(randomValues);

    for (let a = 0; a < randomValues.length; a++) {
      result.push(this.charset[randomValues[a] % this.charset.length]);
    }

    return result.join('');
  }
}

class UUIDv4 {
  constructor() {
    let crypto = window.crypto || window.msCrypto;
    this.crypto = crypto;
  }

  create() {
    if (!this.crypto) {
      return null;
    }

    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
      (
        c ^
        (this.crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
}

const random = new Random();
const uuidv4 = new UUIDv4();

export { random, uuidv4 };
