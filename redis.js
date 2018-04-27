var redis = require('redis');
var client = redis.createClient(6379, '127.0.0.1');

client.on('error', function(err) {
    console.log('Error' + err);
});

client.hmset('camping', {
    'shelter': '2-person',
    'cooking': 'campstove',
    'car': 'volvo'
}, redis.print);

client.hget('camping', 'cooking', function(err, value) {
    if(err) throw err;
    console.log('Will be cooking with' + value);
});

client.hkeys('camping', function(err, keys) {
    if(err) throw err;
    keys.forEach(function(key, i) {
        console.log(i + ' ' + key);
    });
});

client.lpush('tasks', 'paint a', redis.print);
client.lpush('tasks', 'paint b', redis.print);
client.lpush('tasks', 'paint c', redis.print);
client.lrange('tasks', 0, -1, function(err, items) {
    if(err) throw err;
    items.forEach(function(item, i) {
        console.log(' ' + item);
    });
});