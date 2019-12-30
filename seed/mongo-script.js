db.users.remove({}); //empty the db

var file = cat('/seed/data.txt');  // read the file
var lines = file.split('\n'); // create an array of lines
for (var i = 0, l = lines.length; i < l; i++){ // for every line, create an object and insert it in the collection
    var values = lines[i].split(', ');
    if(values.length<2) continue;
    var item ={};
    for(var j=0,lv=values.length;j<lv;j++){
        //Iterate every k/v and append it to the object
        var kv=values[j].split(': ',2);
        item[kv[0]]=kv[1];
    }
    db.users.insert(item);
}
