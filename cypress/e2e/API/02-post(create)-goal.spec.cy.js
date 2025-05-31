const { faker } = require('@faker-js/faker');
describe('API tests', () => {
  const team_id = Cypress.env('TeamID');
  const token = Cypress.env('Token');
  const baseUrl = Cypress.env('BaseUrl');
  const url = `${baseUrl}/api/v2/team/${team_id}/goal`;
  const goalName = faker.internet.username()

  it('POST Goal', () => {
    cy.request({
      method: 'POST',
      url: url,
      headers: {
        'Authorization': token,
        'accept': 'application/json',
        'content-type': 'application/json'
      },
      body: {
        name: goalName,
      }
    }).then((response) => {
      expect(response.status).to.eq(200); 
      expect(response.body).to.have.property('goal');
      expect(response.body.goal).to.have.property('id');
      expect(response.body.goal).to.have.property('name', goalName);
    });
  });
});
