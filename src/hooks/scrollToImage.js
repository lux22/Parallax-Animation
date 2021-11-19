export const useScrollToImage = (
  index = 0,
  width = 0,
  ImageSize = 80,
  ImageSpace = 10,
) => {
  let imageOffset;

  if (index * (ImageSize + ImageSpace + 12) - ImageSize / 2 > width / 2) {
    imageOffset =
      index * (ImageSize + ImageSpace + 12) - width / 2 + ImageSize / 2;
  } else {
    imageOffset = 0;
  }

  return {
    imageOffset,
  };
};
