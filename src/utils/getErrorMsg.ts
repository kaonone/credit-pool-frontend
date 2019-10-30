/**
 * @summary
 * Checks error, caught in try/catch block and returns correct error representation of that
 */
export function getErrorMsg(error: any): string {
  if (error instanceof Error) {
    return error.message;
  }

  return String(error);
}
