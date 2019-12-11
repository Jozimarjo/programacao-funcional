import {pipe, partialize} from "../utils/operators.js";
import {handleStatus} from "../utils/promise-helpers.js";
import '../utils/array-helpers.js'

const API = 'http://localhost:3000/notas';


const getItensFromNotas = notas => notas.$flatMap(nota => nota.itens);
const filterItensByCod = (code, items) => items.filter(item => item.codigo === code);
const sumItensValue = items => items.reduce((acumulador, valor) => acumulador + valor.valor, 0);

// const somar = (valor, valor2) => valor + valor2;
// const subtrair = (valor, valor2) => valor2 - valor;
// const somarComDez = somar.bind(null, 10);
// const subtrairComDez = subtrair.bind(null, 20);
//
// console.log('Somar:', somarComDez(70));
// console.log('Subtrair: ', subtrairComDez(70));
//
// const resultado = meuCompose(somarComDez, subtrairComDez);
// const result = meuCompose(somarComDez, subtrairComDez);
// console.log('Resultado: ', resultado(55));
// console.log('Result: ', result(70));
// export const meuCompose = (...fns) => value => {
//     return fns.reduce((acumulador, sub) => sub(acumulador), value);
// };


export const notaService = {
    listAll() {
        return fetch(API).then(handleStatus);
    },

    sumItens(code) {
        const filterItens = partialize(filterItensByCod, code);
        const sumItens1 = pipe(
            getItensFromNotas,
            filterItens,
            sumItensValue
        );

        return this.listAll().then(sumItens1)
    },


};


