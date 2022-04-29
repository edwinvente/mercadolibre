//conexión con la base de datos
const { connection } = require("../config.db");

exports.getReport = async (cb) => {
  connection.query(
    "SELECT DISTINCT (SELECT COUNT(id) FROM dna WHERE dna.ismutant = 200) as count_mutant_dna, (SELECT COUNT(id) FROM dna WHERE dna.ismutant = 403) as count_human_dna, sum(case when dna.ismutant = 200 then 1 else 0 end)/count(*) as mutant_ratio, sum(case when dna.ismutant = 403 then 1 else 0 end)/count(*) as human_ratio FROM dna",
    (error, results) => {
      if (error) return false;
      cb(results);
    }
  );
};

exports.storeDna = async (dna, ismutant) => {
  let status = true;
  try {
    await connection.query("INSERT INTO dna(dna, ismutant) VALUES (?, ?) ", [
      dna,
      ismutant,
    ]);
  } catch (e) {
    status = false;
    console.log(e);
  }
  return status;
};

exports.validateDnaExist = async (str, callback = null, status) => {
  connection.query(
    "select * from dna where dna = ?",
    [str],
    (error, results) => {
      if (error) return false;
      if (callback) callback(results.length > 0 ? true : false, str, status);
    }
  );
};
