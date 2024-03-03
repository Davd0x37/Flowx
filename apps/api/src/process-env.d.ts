declare namespace NodeJS {
  interface ProcessEnv {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production';

    // Database environment variables
    DATABASE_URI: string;
    DATABASE_PASSWORD: string;
    DATABASE_NAME: string;
    DATABASE_SQLITE_FILE: string;

    // Redis environment variables
    REDIS_HOST: string;
    REDIS_PASSWORD: string;
    REDIS_PORT: string;
  }
}
