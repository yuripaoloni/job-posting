export const formatNameSurname = (name: string, surname: string): string => {
  return `${name} ${surname?.charAt(0)}${surname?.substring(1).toLowerCase()}`;
};
