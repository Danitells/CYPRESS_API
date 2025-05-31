describe('API tests', () => {
  const team_id = Cypress.env('TeamID');
  const token = Cypress.env('Token');
  const baseUrl = Cypress.env('BaseUrl');
  const url = `${baseUrl}/api/v2/team/${team_id}/goal`;

  it('GET Goals with valid token', () => {
    cy.request({
      method: 'GET',
      url: url,
      headers: {
        'Authorization': token
      }
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.goals).to.be.an('array');
      
      if (response.body.goals.length > 0) {
        const goal = response.body.goals[0];
        expect(goal).to.have.property('id');
        expect(goal).to.have.property('name');
        expect(goal).to.have.property('team_id');
      }
    });
  });

  it('GET Goals with expired token', () => {
    cy.request({
      failOnStatusCode: false,
      method: 'GET',
      url: url,
      headers: {
        'Authorization': 'pk_138202173_2SJ1325IBAPGOENXMBLLOJDV51O1TGP2' // expired/invalid token
      }
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });
});
