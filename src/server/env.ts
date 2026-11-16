const getRequiredEnv = (key: string) => {
  const value = process.env[key];

  if (!value) {
    throw new Error(`${key} is required.`);
  }

  return value;
};

export const serverEnv = {
  databaseUrl: () => getRequiredEnv("DATABASE_URL"),
};
