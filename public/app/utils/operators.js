export const partialize = (fn, ...params) => {
    return fn.bind(null, ...params)
};

export const compose = (...fns) => value => {
    return fns.reduceRight((valor, fn) => fn(valor), value)
};

export const pipe = (...fns) => value => {
    return fns.reduce((valor, fn) => fn(valor), value)
};

export const takeUntil = (times, fn) => () => times-- > 0 && fn();

export const debounceTime = (milliseconds, fn) => {
    let timer = 0;
    return () => {
        clearTimeout(timer);
        timer = setTimeout(fn, milliseconds);
    };
};

export const compFunceos = (fn, parametros) => fn.bind(null, ...parametros);
