/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l988z41lmhyc4sm")

  collection.listRule = "userID = @request.auth.id"
  collection.viewRule = "userID = @request.auth.id"
  collection.createRule = "@request.auth.id = \"\""
  collection.updateRule = "userID = @request.auth.id"
  collection.deleteRule = "userID = @request.auth.id"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("l988z41lmhyc4sm")

  collection.listRule = null
  collection.viewRule = null
  collection.createRule = null
  collection.updateRule = null
  collection.deleteRule = null

  return dao.saveCollection(collection)
})
