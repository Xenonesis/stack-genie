/**
 * Logger utility for production-ready logging
 * Only logs in development mode, prevents console spam in production
 */

type LogLevel = 'info' | 'warn' | 'error' | 'debug';

const isDevelopment = process.env.NODE_ENV === 'development';

class Logger {
    private log(level: LogLevel, message: string, ...args: any[]) {
        if (!isDevelopment && level === 'debug') {
            return; // Skip debug logs in production
        }

        const timestamp = new Date().toISOString();
        const prefix = `[${timestamp}] [${level.toUpperCase()}]`;

        switch (level) {
            case 'error':
                console.error(prefix, message, ...args);
                break;
            case 'warn':
                console.warn(prefix, message, ...args);
                break;
            case 'info':
                if (isDevelopment) {
                    console.info(prefix, message, ...args);
                }
                break;
            case 'debug':
                if (isDevelopment) {
                    console.debug(prefix, message, ...args);
                }
                break;
        }
    }

    info(message: string, ...args: any[]) {
        this.log('info', message, ...args);
    }

    warn(message: string, ...args: any[]) {
        this.log('warn', message, ...args);
    }

    error(message: string, ...args: any[]) {
        this.log('error', message, ...args);
    }

    debug(message: string, ...args: any[]) {
        this.log('debug', message, ...args);
    }
}

export const logger = new Logger();
