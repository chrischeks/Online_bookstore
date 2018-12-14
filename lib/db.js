'use strict';

var mongoose = require('mongoose');

var db = function(){
    return {
        config: function(conf){
            mongoose.connect('mongodb://localhost/tekbooks', {useNewUrlParser: true});
            var db = mongoose.connection;
            db.on('error', console.error.bind(console, 'Connection Failed'));
            db.once('open', function(){
                console.log('Db connection open ...');
            });
        }

    };
};


module.exports = db();
