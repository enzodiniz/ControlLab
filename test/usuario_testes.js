process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../app/model/usuario');

let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../server');
let should = chai.should();

chai.use(chaiHttp)


describe('Usuários', () => {
    beforeEach((done) => { //Before each test we empty the database
        User.remove({}, (err) => {
           done();
        });
    });

// teste cadastrar usuario
    describe('/POST user', () => {
     it('deveria fazer um POST de usuário sem erros', (done) => {
       let usuario = {
         primeiroNome: "usuario",
         ultimoNome: "um",
         email: "user_um@email.com",
         userName: "usuarioUm",
         senha: "usuario1",
         matricula: "2014135123"
       }
       let sucessoS = {
         primeiroNome: "usuario",
         ultimoNome: "um",
         email: "user_um@email.com",
         userName: "usuarioUm",
         senha: "usuario1",
         matricula: "2014135123"
       }

       let sucessoN = {
         primeiroNome: "usuario um",
         ultimoNome: "um usuario",
         userName: "usuario uno",
         senha: "usuario1",
         matricula: "2014135123"
       }
       chai.request(server)
           .post('/api/users')
           .send(usuario)
           .end((err, res) => {
               res.should.have.status(200);
               res.body.should.be.a('object');
               res.body.should.have.property('success').eql(true);
               res.body.should.have.property('usuario');
             done();
           });
           chai.request(server)
               .post('/api/users')
               .send(sucessoS)
               .end((err, res) => {
                   res.should.have.status(200);
                   res.body.should.be.a('object');
                   res.body.should.have.property('success').eql(true);
                   res.body.should.have.property('usuario');
                 done();
               });
           chai.request(server)
             .post('/api/users')
             .send(sucessoN)
             .end((err, res) => {
                 res.should.have.status(200);
                 res.body.should.have.be.a('object');
                 res.body.should.have.property('sucess').eql(false);
                 res.body.should.have.deep.property('detail.errors.primeiroNome');
                 res.body.should.have.deep.property('detail.errors.ultimoNome');
                 res.body.should.have.deep.property('detail.errors.userName');
               done();
             })
     });

// teste alterar usuario
   describe('/GET users', function () {

        chai.request(server)
         .get('api/users')
         .send(usuario)
         .end((err, res) => {
           res.should.have.status(200);
           res.should.be.a('object');
           res.should.have.property('sucess').eql(true);
           res.should.have.property('usuario')
           done();
         })
         chai.request(server)
          .get('api/users')
          .send(sucessoS)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.should.have.property('sucess').eql(true);
            res.should.have.property('usuario')
            done();
         chai.request(server)
          .get('api/users')
          .send(sucessoN)
          .end((err, res) => {
            res.should.have.status(200);
            res.should.be.a('object');
            res.should.have.property('sucess').eql(false);
            res.should.have.property('usuario')
            done();
          })
      })
    })
    // teste alterar usuario por id
    describe('/GET user/:id', () => {
      hai.request(server)
               .get('api/users')
               .send(usuario)
               .end((err, res) => {
                 res.should.have.status(200);
                 res.should.be.a('object');
                 res.should.have.property('sucess').eql(true);
                 res.should.have.property('usuario')
                 done();
     })
   
// teste deletar usuario
     describe('/DEL user/',() =>{
       hai.request(server)
                .delete('api/users')
                .send(usuario)
                .end((err, res) => {
                  res.should.have.status(200);
                  res.should.be.a('object');
                  res.should.have.property('sucess').eql(true);
                  res.should.have.property('usuario')
                  done();
                })
                })
// teste atualizar usuario
describe('/PUT user/',() =>{
})
})
});
