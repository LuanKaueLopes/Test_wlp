const log = require('node-pretty-log'),
      fs = require('fs'),
      uuidv1 = require('uuid/v1'),
      pathname = __dirname.concat('/../storage/data.json');


const save = (dataToSave) => {
    try {
        if (dataToSave === null) throw new Error(`Data to store can't be null`);
        const data = JSON.parse(fs.readFileSync(pathname));
        const row = {
            uuid: uuidv1(),
            ...dataToSave
        };
        data.push(row);
        fs.writeFileSync(pathname, JSON.stringify(data));
        return row;
    } catch (err) {
        log('error', err);
    }
    return {
        status: 422,
        message: "Failed on save data to file"
    };
}

module.exports = (app) => {

    app.route('/save').post((req, res) => {
        log('info', `Saving info`);
        let info = req.body;
        let data = save(info);
        if (data.status === undefined) { 
            res.send(data);
            return;
        }
        res.status(422).send(data);
    })

}