import { Language } from './enums';
import { ErrorObject } from './response';

export class MyError {
  public static UNKNOWN_ERROR = new MyError(
    'nomalum xatolik',
    'unknown error',
    false,
    101,
  );

  public static LOGIN_ALREADY_USED = new MyError(
    'login allaqachon band',
    'login already used',
    true,
    102,
  );

  public static INVALID_TOKEN = new MyError(
    'yaroqsiz token',
    'invalid token',
    true,
    103,
  );

  public static LOGIN_OR_PASSWORD = new MyError(
    'login yoki parol xato',
    'login or password mistake',
    true,
    104,
  );

  constructor(
    textUz: string,
    textEn: string,
    isFriendly: boolean,
    errId: number,
  ) {
    this.textUz = textUz;
    this.textEn = textEn;
    this.isFriendly = isFriendly;
    this.errId = errId;
  }

  readonly textUz: string;
  readonly textEn: string;
  readonly isFriendly: boolean;
  readonly errId: number;

  public static getErrorByLang(
    error: MyError,
    langId: number = Language.EN,
  ): ErrorObject {
    let errMsg: string;

    switch (langId) {
      case Language.EN:
        errMsg = error.textEn;
        break;
      default:
        errMsg = error.textUz;
        break;
    }

    return { errId: error.errId, errMsg, isFriendly: error.isFriendly };
  }

  public static getErrorByErrId(errId: number): ErrorObject {
    switch (errId) {
      case 102:
        return MyError.getErrorByLang(MyError.LOGIN_ALREADY_USED);
      case 103:
        return MyError.getErrorByLang(MyError.INVALID_TOKEN);
      case 104:
        return MyError.getErrorByLang(MyError.LOGIN_OR_PASSWORD);
      default:
        return MyError.getErrorByLang(MyError.UNKNOWN_ERROR);
    }
  }
}
