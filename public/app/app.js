import {notaService as service} from "./nota/service.js";
import {takeUntil, debounceTime} from "./utils/operators.js";
import {partialize} from "./utils/operators.js";
import {pipe} from "./utils/operators.js";
import {timeoutPromise} from "./utils/promise-helpers.js";
import {EventEmitter} from "./utils/event-emitter.js";
import {Maybe} from "./maybe.js";

const operations = takeUntil(3, () =>
    service.sumItens('2143')
);

const meuPart = partialize(takeUntil(), 3);

const debouncePart = partialize(meuPart, 500);


const operation2 = pipe(
    partialize(takeUntil, 3),
    partialize(debounceTime, 500)
);

const action = operation2(() => timeoutPromise(200, service.sumItens('2143'))
    .then(res => {
            EventEmitter.emit('itensTotalizados', res)
        }
    )
);

const maybe = Maybe.of(10).map(value => value + 10).map(value => value + 30).getOrElse(0);
const maybe2 = Maybe.of(null).map(value => value + 10).map(value => value + 30).getOrElse(0);
alert(maybe)
    .querySelector('#myButton')
    .onclick = action;
