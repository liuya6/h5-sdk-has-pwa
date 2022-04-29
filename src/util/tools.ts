interface DeepCLone<T> {
  (arg: T): T;
}
/**
 * 深克隆
 */
const deepClone: DeepCLone<any> = (target: any) => {
  if (typeof target !== "object" || target == null) {
    return target;
  }
  const result: any = target instanceof Array ? [] : {};
  for (const key in target) {
    if (Object.prototype.hasOwnProperty.call(target, key)) {
      result[key] = deepClone(target[key]);
    }
  }
  return result;
};

/**
 * 防抖
 */
const throttle = (fn: () => void, delay = 1500): (() => void) => {
  let flag = true;
  let timer = setTimeout(() => {}, delay);
  return function () {
    if (flag) {
      flag = false;
      clearTimeout(timer);
      timer = setTimeout(() => {
        fn();
        flag = true;
      }, delay);
    }
  };
};

/**
 * 节流
 */
const debounce = (fn: () => void, delay = 1500): (() => void) => {
  let timer = setTimeout(() => {}, delay);
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn();
    }, delay);
  };
};

/**
 * 生成[n,m]的随机整数
 * @param minNum 最小值
 * @param maxNum 最大值
 */

function randomNum(minNum: number, maxNum: number) {
  switch (arguments.length) {
    case 1:
      return Math.floor(Math.random() * minNum + 1);
    case 2:
      return Math.floor(Math.random() * (maxNum - minNum + 1) + minNum);
    default:
      return 0;
  }
}

/**
 * 格式化金额
 * @param number
 */
export function formatMoney(number: number | string) {
  const count = Math.floor(Number(number));
  const splitNumber = count.toString().split(".");
  let integer = splitNumber[0];
  const decimal = splitNumber[1] || "";
  let result = "";
  while (integer.length > 3) {
    result = "," + integer.slice(-3) + result;
    integer = integer.slice(0, integer.length - 3);
  }
  if (integer) {
    result = integer + result;
  }
  if (decimal === "") {
    return result;
  }
  return result + "." + decimal;
}

export { deepClone, throttle, debounce, randomNum };
