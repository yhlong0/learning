var mongoose = require('mongoose');
var db = mongoose.connect('mongodb://localhost/test');

var Schema = mongoose.Schema;
var Tasks = new Schema({
    project: String,
    description: String
});
mongoose.model('Task', Tasks);

var Task = mongoose.model('Task');
var task = new Task();

task.project = 'Bikeshed';
task.description = 'Paint the bikes blue';
task.save(function(err) {
    if (err) throw err;
    console.log('Task Saved.');
});

Task.find({'project': 'Bikeshed'}, function(err, tasks) {
    for (var i = 0; i < tasks.length; i++) {
        console.log('ID: ' + tasks[i]._id);
        console.log(tasks[i].description);
    }
});

Task.update(
    {_id: '5ae394a6c3b0282c545c2be7'},
    {description: 'Paint to green.'},
    {multi: false},
    function(err, rows_updated) {
        if (err) throw err;
        console.log('Updated.');
    }
);

Task.findById('5ae396fa5adea70d58789b87', function(err, task) {
    task.remove();
});