export const retrieveImage = async (
  currentFolderToPublicFolderPath: string,
  imageName: string
) => {
  const image = await import(
    currentFolderToPublicFolderPath + `${imageName}.png`
  );
  return image.default;
};
