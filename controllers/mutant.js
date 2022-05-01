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
    //creo la matrix
    let matrix = createMatrix(dna);
    //Traigo las diagonales.
    let diags = getDiags(matrix);
    //Traigo las columnas.
    let cols = getCols(matrix);
    //Traigo las filas.
    let rows = getRows(matrix);
    //console.log(/* "matrix", matrix,*/ diags /*, cols  , rows */);
    const check = [...diags, ...cols, ...rows].find((line) =>
      checkAdn(line, 4)
    );
    let resp = typeof check !== "undefined" ? 200 : 403;
    status = resp == 200 && check.length > 0 ? 200 : 403;
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

//creamos la matrix
const createMatrix = (dna) => {
  let finalMtx = [];
  dna.forEach((adn) => {
    let tmpArray = [];
    for (let i = 0; i <= adn.length - 1; i++) tmpArray.push(adn[i]);
    finalMtx.push(tmpArray);
  });
  return finalMtx;
};

//Extraigo las diagonales de la matriz
const getDiags = (matriz) => {
  let diagonales = [];
  //Traigo la diagonal superior.
  matriz.forEach((col, i) => diagonales.push(getDiagonalSup(matriz, i)));
  //Traigo la diagonal inferior.
  matriz.forEach((row, i) => {
    if (i > 0) diagonales.push(getDiagonalInfRow(matriz, i));
  });
  return diagonales;
};
//Extraigo las diagonal de la mitad superior en base al n° de columna.
const getDiagonalSup = (matriz, nCol) => {
  let line = [];
  for (let i = 0; i <= matriz.length - nCol - 1; i++)
    line.push(matriz[i][i + nCol]);
  return line;
};
//Extraigo la diagonal de la mitad inferior en base al n° de fila.
const getDiagonalInfRow = (matriz, nRow) => {
  let line = [];
  for (let i = 0; i <= matriz.length - nRow - 1; i++)
    line.push(matriz[i + nRow][i]);
  return line;
};

//Extraigo las columnas.
const getCols = (matriz) => {
  return matriz.map((col, i) => getCol(matriz, i));
};
//Extraigo la columa y la devuelvo como un array plano.
const getCol = (matriz, nCol) => {
  let groups = [];
  //Extraigo la columna entera.
  for (let i = 0; i <= matriz.length - 1; i++) groups.push(matriz[i][nCol]);
  return groups;
};

//Extraigo las filas.
const getRows = (matriz) => {
  return matriz.map((col, i) => getRow(matriz, i));
};
//Extraigo la fila y la devuelvo como un array plano.
const getRow = (matriz, nRow) => {
  let groups = [];
  //Extraigo la fila entera.
  for (let i = 0; i <= matriz.length - 1; i++) groups.push(matriz[nRow][i]);
  return groups;
};

//Recorre buscando secuencias consecutivas con una cantidad mayor o igual a tope.
const checkAdn = (line, top) => {
  let last = "";
  let actual = "";
  let count = 0;

  for (let i = 0; i <= line.length - 1; i++) {
    last = i == 0 ? line[0] : line[i - 1];
    actual = line[i];

    if (last == actual) {
      count++;
      if (count == top) return true;
    }
  }
  return false;
};
