const fs = require("fs");

const generate = (req, res) => {
  try {
    fs.readFile(req.file.path, (error, data_) => {
      var data = data_.toString();
      var rows = data.split("\n");
      var header = rows[0].split(",");
      if (header[0] != "E") {
        throw new Error(
          "Encabezado no tiene el tipo de registro que debe de tener"
        );
      }
      if (header[1].length != 9) {
        throw new Error("RNC debe de tener 9 digitos");
      }
      var globalCurrency = header[3];

      var file = `RNC entidad: ${
        header[1]
      }\nFecha de nomina: ${header[2].replace(
        /(\d\d)/,
        "$1/"
      )}\nNumero de transacciones esperadas: ${header[4]}\n`;

      file += "Cedula      Cuenta        Moneda Monto\n";
      rows.shift();

      rows.map(x => {
        x = x.split(",");
        file += `${x[1]} ${x[2]} ${
          x[3] == "" ? (globalCurrency == "" ? "DOP" : globalCurrency) : x[3]
        }    ${x[4]}\n`;
      });

      fs.writeFile(
        "nominas/" + header[1] + "-" + header[2] + ".txt",
        file,
        err => {
          if (err) {
            res.send({err: "No se pudo escribir el archivo, " + err});
            return;
          }
          console.log("Data recibida correctamente");
          res.send({error: null, data: "ok"});
        }
      );
    });
    return;
  } catch (ex) {
    console.log(ex.message);
    res({error: "Error: " + ex.message, data: null}, {status: 500});
  }
};

module.exports = {generate};
