module.exports = function(app){

    app.get('/',  (req, res) => {
        res.sendFile(__dirname + '/pages/signup.html')
    })

    app.post('/success', (req, res) => {
        res.redirect('/')
    });

    app.post('/failure', (req, res) => {
        res.redirect('/')
    });

}