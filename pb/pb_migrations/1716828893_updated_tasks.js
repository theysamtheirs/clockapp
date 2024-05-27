/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l988z41lmhyc4sm")

  collection.createRule = "userID = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l988z41lmhyc4sm")

  collection.createRule = ""

  return dao.saveCollection(collection)
})
