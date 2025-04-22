/*let nomeMateria:string = "Framework I";
console.log(nomeMateria);   

const variavel = 10;
const variavelNumber:number = 10;
const variavelString:string = "Framework I";
const variavelBooleano:boolean = true;

const vetor:number[] = []

const vetorstring:string[] = ["Strings", "11"]

vetor.push(10);

//como criar objetos dentro do JS
const pessoa:{nome:string, idade:number} = {
    nome: "Hélio",
    idade: 16,
}

pessoa.nome = "Gabriel";
console.log(pessoa);

//TYPE
type Estudante = {
    nome:string,
    idade:number,
    cpf:number
}

const estudante:Estudante = {
    nome: "Hélio",
    idade: 17,
    cpf: 123456789
}
console.log(estudante);

//Funções no JavaScript
function soma(a:number,b:number):number|undefined{
    return a+b;
}

console.log(`O resultado da soma é:${soma(10,20)}`);

const vetorExemplo = [1];
console.log(vetorExemplo);
console.log(vetorExemplo.pop());
console.log(vetorExemplo);

function somaA(a:number,b:number):number{
    return a+b;
}
const somaB= (a:number,b:number):number=>a+b

const somaC= (a:number,b:number):number=>{
    return a+b;
}

const somaD= function(a:number,b:number):number{
    return a+b;
}

const somay = (a,b)=>a+b;


//atividade
//Primeira atividade com tipagem do typescript

//Crei uma função que par()
//Recebe um numero e se ele for par retorna true, se não retorna false
//Usem tipagem do typescript na função

//Exemplo1 par(10) => true
//Exemplo2 par(11) => false
//Exemplo3 par(0) => undefined
//Exemplo4 par(-1) => undefined

function par(numero:number):boolean|undefined{
   if(numero<=0){
       return undefined;
   }
    if(numero%2==0){
        return true;
    }
    else{
        return false;
    }
}
console.log(par(10));
console.log(par(11));
console.log(par(0));
console.log(par(-1));


//Crie uma função que receba um vetor e some
//somaNumeros([1,2,3,4])
//10

//Quando o vetor for vazio a função deve retornar undefined

function somaNumeros(vetor:number[]):number|undefined{
    if(vetor.length==0){
        return undefined;
    }
    let soma = 0;
    for(let i = 0; i<vetor.length; i++){
        soma += vetor[i];
    }
    return soma;
}
console.log(somaNumeros([1,2,3,4]));
console.log(somaNumeros([]));


//Crie uma função que receba um vetor e um numero

//Sua função deve somar as posições do vetor elevado ao numero recebido por parametro

//Exemplo
//somaElevado([2,2,2],2) //12
//Se o vetor for vazio deve retornar undefined

function somaElevado(vetor:number[],numero:number):number|undefined{
    if(vetor.length==0){
        return undefined;
    }
    let soma = 0;
    for(let i = 0; i<vetor.length; i++){
        soma += vetor[i]**numero;
    }
    return soma;
}
console.log(somaElevado([2,2,2],2));
console.log(somaElevado([1,2,3],3));
console.log(somaElevado([],2));


//FIND
const v = [1,2,3,4,5,6,7,8,9,10]
//Criar uma função que retorna verdadeira quando é o meu elemento buscado, quando não for retorna falso
function callbacks(x:number){
    return x==5
}
    
let result = v.find(callbacks)
console.log(result)
*/

//Assincronidade -> não sincronizado -> Paralelo
//Não ficar esperando algo que demore enquanto voce pode fazer outras coisas.
//Exemplo: Enquanto esperamos o banco responder algo, podemos realizar algo com javascript

//Promessas -> É um tipo de objeto do Javascript que é o retorno de uma função que não é sincrona.
//Esse objeto chamado de (promise) quando a função termina :
//Ele pode estar em dois casos: 
//resolved -> quando a função termina e retorna o resultado esperado
//rejected -> quando a função termina e retorna um erro

// function demora():Promise<string>{
//     let promise = new Promise<string>((resolve, reject)=>{
//         setTimeout(
//             function(){
//                 resolve("Demorou 2 segundos para resolver a promessa")
//             }
//             ,2000
//         )
//     });
//     return promise;}
// const resultado = demora()
// console.log(resultado);
// console.log("Aguarde...");

// //.then => Então
// //.catch => Capturar

// resultado
// .then((resultadoEspera)=>{console.log(resultadoEspera)})
// .catch((resultadoEspera)=>{console.log("Catch" + resultadoEspera)})

import mysql, { Connection, ConnectionOptions } from 'mysql2/promise';
import fastify, { FastifyRequest, FastifyReply } from 'fastify'

const app = fastify()

app.get('/', async (request: FastifyRequest, reply: FastifyReply) => {
    reply.send("Fastify Funcionando")
})
app.get('/estudantes', async (request: FastifyRequest, reply: FastifyReply) => {
    //Código do banco de dados
    try {
        const conn = await mysql.createConnection({
            host: "localhost",
            user: 'root',
            password: "",
            database: 'banco1023a',
            port: 3306
        })
        const resultado = await conn.query("SELECT * FROM estudantes")
        const [dados, camposTabela] = resultado
        reply.status(200).send(dados)
    }
    catch (erro: any) {
        if (erro.code === 'ECONNREFUSED') {
            console.log("ERRO: LIGUE O LARAGAO => Conexão Recusada")
        } else if (erro.code === 'ER_BAD_DB_ERROR') {
            console.log("ERRO: CRIE UM BANCO DE DADOS COM O NOME DEFINIDO NA CONEXÃO")
        } else if (erro.code === 'ER_ACCESS_DENIED_ERROR') {
            console.log("ERRO: CONFERIR O USUÁRIO E SENHA DEFINIDOS NA CONEXÃO")
        } else if (erro.code === 'ER_NO_SUCH_TABLE') {
            console.log("ERRO: Você deve criar a tabela com o mesmo nome da sua QUERY")
        } else if (erro.code === 'ER_PARSE_ERROR') {
            console.log("ERRO: Você tem um erro de escrita em sua QUERY confira: VÍRGULAS, PARENTESES E NOME DE COLUNAS")
        } else {
            console.log(erro)
        }
    }
})

app.listen({ port: 8000 }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})