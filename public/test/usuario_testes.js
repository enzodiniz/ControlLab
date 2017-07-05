process.env.NODE_ENV = 'test';

let mongoose = require("mongoose");
let User = require('../../app/model/usuario');

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

    describe('/POST user', () => {
     it('deveria fazer um POST de usuário sem erros', (done) => {
       let usuario = {
         primeiroNome: "usuario",
         ultimoNome: "um",
         userName: "usuarioUm",
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
               res.body.should.have.property('user');
             done();
           });
     });

     it('não deveria fazer POST de usuário com username, primeiro e último nome inválidos',
        function (done) {
          let usuario = {
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
                res.body.should.have.be.a('object');
                res.body.should.have.property('sucess').eql(false);
                res.body.should.have.deep.property('detail.errors.primeiroNome');
                res.body.should.have.deep.property('detail.errors.ultimoNome');
                res.body.should.have.deep.property('detail.errors.userName');
              done();
            })
        })

      it('não deveria fazer POST de um usuário existente', function (done) {
        let usuario = {
          primeiroNome: "usuario",
          ultimoNome: "um",
          userName: "usuarioUm",
          senha: "usuario1",
          matricula: "2014135123"
        }

        chai.request(server)
          .post('api/users')
          .send(usuario)
          .end((err, res) => {
            chai.request(server)
              .post('api/users')
              .send(usuario)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  res.body.should.have.property('success').eql(false);
                  res.body.should.have.deep.property('details.errors.username');
                  res.body.should.have.deep.property('details.errors.email');
              })
            done();
          })
      })
   });

  //  describe('/GET users', function () {
  //    it('deveria recuperar todos os usuários sem erros', () => {
  //      chai.request(server)
  //       .get('api/users')
  //       .end((err, res) => {
  //         res.should.have.status(200);
  //         res.should.be.a('object');
  //         res.should.have.property('sucess').eql(true);
  //         res.should.have.property()
  //         done();
  //       })
  //    })
  //  })
})
