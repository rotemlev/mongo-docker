#! /bin/bash

docker-compose up --d

#Rotem: Not sure if we want to export a masked version or raw.
# If we need to export masked, then uncomment the line below
#docker-compose exec test-mongo mongo cr-db --eval "function upper(lower){return  lower.replace(/^\w/, function (chr) { return chr.toUpperCase();});};printjson(db.users.find().sort({firstname:1}).map(function(item){return {username:item.username,firstname:upper(item.firstname),lastname:upper(item.lastname),password:'*'.repeat(item.password.length)}}))" --quiet >> exported.json

# If we need to export the raw version then the bellow is good
docker-compose exec test-mongo mongo cr-db --eval "printjson(db.users.find().toArray())" --quiet >> exported.json