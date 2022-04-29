//services
const { storeDna, validateDnaExist } = require("../services/dna.js");

exports.getTestMutant = async (request, response) => {
  const dna = request.body?.dna;
  let status = 403;
  //validate if dna exist in my request
  if (typeof dna !== "undefined") {
    await validateDnaExist(dna.toString(), setquery);
    //validate if is mutant
    const vlds = isMutant(dna);
    const mutants = vlds.filter((vl) => vl.ismutant === true);
    status = mutants.length > 0 ? 200 : 403;
  }
  response.status(status).json({
    status: status,
  });
};

const setquery = async (resp, str) => {
  if (!resp) await storeDna(str);
  return resp;
};

const isMutant = (dna) => {
  const test = dna.map((rg, i) => {
    //convert string in array
    const str = [...rg];
    //create object for analityc data
    const chars = {};
    for (const char of str) {
      //create for each key her respective value
      chars[char] = (chars[char] || 0) + 1;
    }
    let mutants = [];
    let ismutant = false;
    //map object for validate many key is mutant
    Object.entries(chars).map(([key, value]) => {
      if (value >= 4) {
        mutants = [...mutants, { rh: key, repeats: value, dna: dna[i] }];
        ismutant = true;
      }
    });

    return {
      ...mutants,
      ismutant,
    };
  });
  return test;
};
