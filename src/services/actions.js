import { firestore } from "./firebase";

//SCHEMA
const getSchema = async (collectionId, setSchema) => {
  const data = await firestore.getOne("_collections", collectionId);
  setSchema(data);
};

const updateSchema = async (collectionId, schema) => {
  await firestore.set("_collections", collectionId, schema);
};

//COLLECTIONS
const getCollections = async (setCollections, setUnauthorized) => {
  try {
    const data = await firestore.get("_collections", false);
    setCollections(data);
  } catch (error) {
    console.error(error);
    setUnauthorized(true);
  }
};

const getCollection = async (collectionId, setCollection) => {
  const data = await firestore.get(collectionId, "_dateCreated");
  setCollection(data);
};

const createCollection = async (collectionId, obj, setRedirect) => {
  await firestore.set("_collections", collectionId, obj, true);
  setRedirect && setRedirect(`/${collectionId}`);
};

const removeCollection = async (collectionId) => {
  await firestore.remove("_collections", collectionId);
  firestore.deleteCollection(collectionId);
};

//ENTRY
const getEntry = async (collectionId, entryId, setEntry) => {
  const data = await firestore.getOne(collectionId, entryId);
  setEntry(data);
};

const createEntry = async (collection, entry, setId) => {
  const data = await firestore.add(collection, entry);
  setId(data);
};

const updateEntry = async (collection, id, entry) => {
  await firestore.set(collection, id, entry);
  return true;
};

const removeEntry = async (collection, entryId, setDeleted) => {
  await firestore.remove(collection, entryId);
  setDeleted(true);
};

export {
  //SCHEMA
  getSchema,
  updateSchema,
  //COLLECTIONS
  getCollections,
  getCollection,
  createCollection,
  removeCollection,
  //ENTRY
  getEntry,
  createEntry,
  updateEntry,
  removeEntry,
};
