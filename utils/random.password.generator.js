const usedPasswords = new Set();

function generateUniquePassword() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let pass = "";

  do {
    pass = "";
    for (let i = 0; i < 8; i++) { 
      pass += chars[Math.floor(Math.random() * chars.length)];
    }
  } while (usedPasswords.has(pass));

  usedPasswords.add(pass);
  return pass;
}

export default generateUniquePassword
