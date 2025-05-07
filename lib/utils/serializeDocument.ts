export const serializeDocument = (doc: any) => {
  if (!doc) return null;

  return {
    ...doc,
    _id: doc._id?.toString(), // Convert _id to a string
  };
};

export const serializeDocuments = (docs: any[]) => {
  return docs.map(serializeDocument);
};