export const getImageStrings = async (
  token: string,
  entityType: string,
  entityId: string,
  imageAttribute: string
) => {
  const response: any = await fetch(
    `https://betachplayground.crm.dynamics.com/api/data/v9.1/${entityType}(${entityId})/${imageAttribute}/?size=full`,
    { headers: { Authorization: `Bearer ${token}` } }
  );
  return (await response.json()).value;
};
