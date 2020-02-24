const handleLike = (noteId, likeAuthor) => {
  return {
    type: "HANDLE_LIKE",
    payload: { noteId, likeAuthor }
  };
};

export default handleLike;
