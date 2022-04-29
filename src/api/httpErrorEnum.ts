export enum HttpErrorEnum {
  /**
   * 参数错误
   */
  PARAM_ERR = "PARAM_ERR",
  /**
   * 找不到资料
   */
  DATA_NOT_FOUND = "DATA_NOT_FOUND",
  /**
   * 彩种已停卖
   */
  GAME_CLOSE = "GAME_CLOSE",
  /**
   * 余额不足
   */
  NOT_ENOUGH_MONEY = "NOT_ENOUGH_MONEY",
  /**
   * 奖期错误
   */
  NUMERO_ERROR = "NUMERO_ERROR",
  /**
   * 奖期不在营运期间
   */
  NUMERO_DATE_ERROR = "NUMERO_DATE_ERROR",
  /**
   * 奖期已封盘
   */
  SEAL_NUMERO = "SEAL_NUMERO",
  /**
   * 投注风险控制
   */
  BET_LIMIT = "BET_LIMIT",
  /**
   * 用户状态被关闭
   */
  CUSTOMER_DISABLE = "CUSTOMER_DISABLE",
  /**
   * 用户投注状态被关闭
   */
  CUSTOMER_BET_DISABLE = "CUSTOMER_BET_DISABLE",
  /**
   * 未登录
   */
  TOKEN_INVALID = "TOKEN_INVALID",
  /**
   * 点击过于频繁
   */
  TOO_MANY_REQUESTS = "TOO_MANY_REQUESTS",
  /**
   * 系统错误
   */
  SYS_ERR = "SYS_ERR",
  /**
   * 当前在线人数较多,请稍后再试
   */
  HYSTRIX_ERROR = "HYSTRIX_ERROR",
}
