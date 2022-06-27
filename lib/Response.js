export default class Response {
  static error(res, error) {
    return res.status(error?.code || 500).json({
      message: error?.message || "An error occurred on the server!",
      errors: error?.errors || []
    });
  }
}
