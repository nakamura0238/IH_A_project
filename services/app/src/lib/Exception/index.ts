class Exception extends Error {
  constructor(readonly message: string, readonly status: number = 500) {
    super(message);
  }
}

export default Exception;
