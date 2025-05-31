const { faker } = require('@faker-js/faker');

describe('API tests', () => {
  const team_id = Cypress.env('TeamID');
  const token = Cypress.env('Token');
  const baseUrl = Cypress.env('BaseUrl');
  const postGoal = `${baseUrl}/api/v2/team/${team_id}/goal`;
  const goalName = faker.internet.displayName()
  const newGoalName = faker.internet.displayName()
  
  let goalIdFromResponse;

  before('Create a goal', () => {
    cy.request({
      method: 'POST',
      url: postGoal,
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
      goalIdFromResponse = response.body.goal.id;
    });
  });

  it('GET Goal by ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/v2/goal/${goalIdFromResponse}`,
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal).to.have.property('id', goalIdFromResponse);
      expect(response.body.goal).to.have.property('name', goalName);
    });
  });
  it('Update Goal by ID', () => {
    cy.request({
      method: 'PUT',
      url: `${baseUrl}/api/v2/goal/${goalIdFromResponse}`,
      headers: {
        'Authorization': token
      },
      body: {
        name: newGoalName,
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal).to.have.property('id', goalIdFromResponse);
      expect(response.body.goal).to.have.property('name', newGoalName);
    });
  });
  it('GET Updated Goal by ID', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/api/v2/goal/${goalIdFromResponse}`,
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goal).to.have.property('id', goalIdFromResponse);
      expect(response.body.goal).to.have.property('name', newGoalName);
    });
  });
  it('Delete Goal by ID', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/api/v2/goal/${goalIdFromResponse}`,
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
