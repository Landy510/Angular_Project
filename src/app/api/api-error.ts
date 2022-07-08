export class ApiError {
  public static SUCCESS = 0;

  public static INVALID_TOKEN = 2;

  public static TIMEOUT = 10;

  public static REQUEST_FAILED = 99999;

  public code: number;

  public message: string;

  public title: string | undefined;

  public showAlert: boolean;

  static Timeout(): ApiError {
    return new ApiError(ApiError.TIMEOUT, 'Operation Timeout', undefined);
  }

  static InvalidToken(msg: string = 'Invalid Token', title: string | undefined, showAlert: boolean = true): ApiError {
    return new ApiError(ApiError.INVALID_TOKEN, msg, title, showAlert);
  }

  static RequestFail(): ApiError {
    return new ApiError(ApiError.REQUEST_FAILED, 'Request Fail', undefined);
  }

  private constructor(code: number, message: string, title: string | undefined, showAlert: boolean = true) {
    this.code = code;
    this.message = message;
    this.title = title;
    this.showAlert = showAlert;
  }
}
