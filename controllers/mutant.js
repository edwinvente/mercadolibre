//services
const { storeDna, validateDnaExist, getReport } = require("../services/dna.js");

exports.getSearchReport = async (request, response) => {
  await getReport((data) => {
    response.status(200).json({
      data,
    });
  });
};

exports.getTestMutant = async (request, response) => {
  const dna = request.body?.dna;
  let status = 403;
  //validate if dna exist in my request
  if (typeof dna !== "undefined") {
    //validate if is mutant
    status = isMutant(dna);
    //if not found the dna in db, store new record
    await validateDnaExist(dna.toString(), setquery, status);
  }
  response.status(status).json({
    status,
  });
};

const setquery = async (resp, str, ismutant) => {
  if (!resp) await storeDna(str, ismutant);
};

const isMutant = (dna) => {
  let testMaxtris = [];
  let mutant = false;
  //start test is mutant and create matrix
  const test = dna.map((rg, i) => {
    //convert string in array
    const str = [...rg];
    //create object for analityc data
    const { chars, charsM } = createChars(str);
    const { mutants, matrix, ismutant } = validateMutant(chars, dna, i);
    //matrix formada
    testMaxtris = [...testMaxtris, charsM];
    return {
      ...mutants,
      charsM,
      ismutant,
    };
  });

  //create oblicuos positions
  let oblicuos = "";
  testMaxtris.map((tm, i) => {
    oblicuos += `${testMaxtris[i][i]}`;
  });
  //create dna oblicuo
  let fv = [oblicuos];
  const obtest = fv.map((ob, i) => {
    const str = [...ob];
    const { chars, charsM } = createChars(str);
    const { mutants, matrix, ismutant } = validateMutant(chars, oblicuos, i);
    return {
      ...mutants,
      charsM,
      ismutant,
    };
  });

  console.log(testMaxtris, fv);
  const mutants = test.filter((vl) => vl.ismutant === true);
  let resp = mutants.length > 0 ? 200 : 403;
  //...
  const obmutants = obtest.filter((vl) => vl.ismutant === true);
  let obresp = obmutants.length > 0 ? 200 : 403;
  //console.log(obmutants, test, resp, obresp);
  return resp == 200 || obresp == 200 ? 200 : 403;
};

const createChars = (str) => {
  const chars = {};
  const charsM = {};
  let counter = 0;
  for (const char of str) {
    //create for each key her respective value
    chars[char] = (chars[char] || 0) + 1;
    charsM[counter] = char;
    counter++;
  }
  return {
    chars,
    charsM,
  };
};

const validateMutant = (chars, dna, i) => {
  let mutants = [];
  let matrix = [];
  let ismutant = false;
  //map object for validate many key is mutant
  Object.entries(chars).map(([key, value]) => {
    if (value >= 4) {
      mutants = [...mutants, { rh: key, repeats: value, dna: dna[i] }];
      ismutant = true;
    }
    matrix = [...mutants, { rh: key, repeats: value, dna: dna[i] }];
  });
  return {
    mutants,
    matrix,
    ismutant,
  };
};
