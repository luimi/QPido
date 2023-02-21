module.exports = {
    randomNumberBetween: (from, to) => {
      return Math.floor(Math.random() * to) + from;
    },
    randomString: (length) => {
      var result = "";
      var characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
      var charactersLength = characters.length;
      for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    },
    maskEmail: (email) => {
      return email.replace(/^(.)(.*)(.@.*)$/,(_, a, b, c) => a + b.replace(/./g, '*') + c);
    }
  };
  