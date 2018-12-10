

let {mysqls} = require("./config.js")
let mysql = require("mysql")
var connection = mysql.createPool(mysqls);

function query(sql) {
    return new Promise((resolve,reject) => {
          
        connection.getConnection((err,connect) => {
            
            connect.query(sql,(sqlerr,rows,fields) => {
                if(sqlerr) {
                    reject(sqlerr)
                    return
                }
                resolve(rows)

                connect.release();
            })
        })
    })
}


module.exports = {
    query
}