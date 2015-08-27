/**
 * Created by adm-wta on 8/26/15.
 */
var mongoose     = require('mongoose');
var Schema       = mongoose.Schema;

var GodSchema   = new Schema({
    name: String
});

module.exports = mongoose.model('God', GodSchema);