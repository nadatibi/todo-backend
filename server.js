var express = require('express'),
    sqlite = require('sqlite3'),
    json = require('body-parser').json,
    cors = require('cors')

var app = express(),
    db = new sqlite.Database('data.db')

app.use(json())
app.use(cors())

app.get('/items', (req, res) => {
    db.all('SELECT * FROM items', function (err, rows) {
        res.json(rows)
    })
})

app.post('/items', (req, res) => {
    var data = req.body
    db.run('INSERT INTO items VALUES(NULL, ?, ?)', [data.description, false], function (err, rows) {
        db.all('SELECT * FROM items WHERE id = ?', [this.lastID], function (err, rows) {
            res.json(rows[0])
        })
    })
})

app.put('/items/:id', (req, res) => {
    var data = req.body
    db.run('UPDATE items SET status = ? WHERE id = ?', [data.status, req.params.id], function (err, rows) {
        db.all('SELECT * FROM items WHERE id = ?', [req.params.id], function (err, rows) {
            res.json(rows[0])
        })
    })
})

app.delete('/items/:id', (req, res) => {
    db.run('DELETE FROM items WHERE id = ?', [req.params.id], function (err, rows) {
        res.json({result: 'item deleted'})
    })
})

app.listen(1337)
