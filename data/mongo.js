const { MongoClient } = require('mongodb');
const ObjectID = require('mongodb').ObjectID;

let client;

function connect(locals) {

    const uri = process.env.DB_URL;

    client = new MongoClient(uri, { useUnifiedTopology: true });

    return client.connect()
        .then((connection) => {
            locals.collectionVideoGames = connection.db('games').collection('video-games');
            locals.collectionCardGames = connection.db('games').collection('card-games');
        })
        .catch(err => {
            console.log(err);
            process.exit();
        })
}

function close() {
    client.close();
}

function readAll(info) {
    return info.collection.find(info.query).toArray();
}

function readOne(info) {
    return info.collection.findOne(info.query);
}

function readOneById(info) {
    return info.collection.findOne({ _id: ObjectID(info.id) });
}

function createOne(info) {
    return info.collection.insertOne(info.doc);
}

function replaceOne(info) {
    return info.collection.findOneAndReplace({ _id: ObjectID(info.id) }, info.doc);
}

function changeOne(info) {
    return info.collection.findOneAndUpdate(info.query, { $set: info.doc });
}

function deleteOne(info) {
    return info.collection.deleteOne({ _id: ObjectID(info.id) });
}

module.exports.connect = connect;
module.exports.close = close;
module.exports.readAll = readAll;
module.exports.readOne = readOne;
module.exports.createOne = createOne;
module.exports.readOneById = readOneById;
module.exports.replaceOne = replaceOne;
module.exports.changeOne = changeOne;
module.exports.deleteOne = deleteOne;