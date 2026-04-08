export type LogExtra = Record<string, unknown>;

function line(level: string, message: string, extra: LogExtra = {}): string {
  const ts = new Date().toISOString();
  const tail = Object.keys(extra).length ? ` ${JSON.stringify(extra)}` : '';
  return `[${ts}] ${level} ${message}${tail}`;
}

export const logger = {
  info(message: string, extra?: LogExtra): void {
    console.log(line('INFO', message, extra ?? {}));
  },
  warn(message: string, extra?: LogExtra): void {
    console.warn(line('WARN', message, extra ?? {}));
  },
  error(message: string, extra?: LogExtra): void {
    console.error(line('ERROR', message, extra ?? {}));
  },
};
