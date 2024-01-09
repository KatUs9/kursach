export function buildErrorResponse(message: string, status: number) {
  return new Response(
    JSON.stringify({
      message
    }),
    {
      status
    }
  );
}
