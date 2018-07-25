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

    // get cryptographically strong random values
    crypto.getRandomValues(randomValues);

    for (let a = 0; a < randomValues.length; a++) {
      result.push(this.charset[randomValues[a] % this.charset.length]);
    }

    return result.join('');
  }
}

const random = new Random();

export default random;
