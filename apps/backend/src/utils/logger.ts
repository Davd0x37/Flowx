import pino from 'pino'

export const logger = pino({
  level: 'info',
  transport: {
    options: {
      ignore: 'pid,hostname',
      translateTime: 'HH:MM:ss Z',
    },
    target: 'pino-pretty',
  },
})
