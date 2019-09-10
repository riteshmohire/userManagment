//During the test the env variable is set to test
process.env.NODE_ENV = 'test';

//Require the dev-dependencies
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('./app');
let should = chai.should();

chai.use(chaiHttp);

let userData = {
  "user": "testUser",
  "password": "1234",
  "confirmPassword": "1234"
}
let token = null

describe('User', () => {

  beforeEach((done) => {
    //Before each test we empty the database
    done()
  });

  /*
  * Create new user, login, get and update user API test cases
  */
  describe('Test create user, login and get APIs', () => {

    it('it should create new user', (done) => {
      chai.request(server)
        .post('/user')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.result.should.have.property('n');
          res.body.result.n.should.be.equal(1);
          done();
        });
    });

    it('it should return JWT token', (done) => {
      chai.request(server)
        .post('/session')
        .send(userData)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.have.property('Token');
          res.body.should.have.property('Message');
          token = res.body.Token
          done();
        });
    });

    it('it should return all the users', (done) => {
      chai.request(server)
        .get('/user')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('it should update the newly created user', (done) => {
      chai.request(server)
        .get('/user')
        .set('token', token)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a('array');
          done();
        });
    });

    it('it should update the newly created user details', (done) => {
      chai.request(server)
        .put('/user/testUser')
        .set('token', token)
        .send({
          user: "ritesh"
        })
        .end((err, res) => {
          res.should.have.status(200);
          res.should.have.property('text');
          done();
        });
    });

  });

  after(function () {
    process.exit(1)
  });
});


