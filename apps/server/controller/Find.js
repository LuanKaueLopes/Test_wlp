const log = require('node-pretty-log'),
      fs = require('fs'),
      pathname = __dirname.concat('/../storage/data.json');

const find = (arg) => {
    if (arg == null) throw new Error("Arguments to find can't be null");
    const data = JSON.parse(fs.readFileSync(pathname));
    const result = [];
    const index = [];
    for(var key in arg) index.push(key);
    data.forEach(row => {
        index.forEach(key => {
            if (arg[key] === row[key]) {
                result.push(row);
            }
        })
    });
    return result;
}

module.exports = (app) => {

    app.route('/find').get((req, res) => {
        const data = JSON.parse(fs.readFileSync(pathname))
        res.send(data);
    })

    app.route('/find').post((req, res) => {
        let arg = req.body;
        log('info', `Searching for`, arg);
        let data = find(arg);
        if (data.length === 0) { 
            res.status(404).send({"status": 404, "message": "not found"});
            return;
        }
        res.send(data);
    })
}