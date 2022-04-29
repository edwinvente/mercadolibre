//conexión con la base de datos
const { connection } = require("../config.db");

exports.storeDna = async (dna) => {
  let status = true;
  try {
    await connection.query("INSERT INTO dna(dna) VALUES (?) ", [dna]);
  } catch (e) {
    status = false;
    console.log(e);
  }
  return status;
};

exports.validateDnaExist = async (str, callback = null) => {
  connection.query(
    "select * from dna where dna = ?",
    [str],
    (error, results) => {
      if (error) throw error;
      if (callback) callback(results.length > 0 ? true : false, str);
    }
  );
};
