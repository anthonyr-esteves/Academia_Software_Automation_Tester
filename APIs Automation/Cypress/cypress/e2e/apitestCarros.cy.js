describe("Testes da API de Carros", () => {
  it("Listar todos os carros", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/carros",
    }).then((response) => {
      expect(response.status).to.eq(200);

      expect(response.body).to.exist;
      expect(response.body).to.be.an("array");

      response.body.forEach((carro) => {
        expect(carro).to.have.all.keys(
          "id",
          "marca",
          "modelo",
          "ano",
          "cor",
          "preco",
        );

        expect(carro.id).to.be.a("number");
        expect(carro.marca).to.be.a("string");
        expect(carro.modelo).to.be.a("string");
        expect(carro.ano).to.be.a("number");
        expect(carro.cor).to.be.a("string");
        expect(carro.preco).to.be.a("number");
      });
    });
  });

  it("Listar carro especifico", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3001/carros/3",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.body.marca).to.eq("Toyota");
      expect(response.body.modelo).to.eq("Corolla");
      cy.log(JSON.stringify(response));
    });
  });

  const carro = {
    marca: "Toyota",
    modelo: "Corolla",
    ano: 2023,
    cor: "Prata",
    preco: 25000,
  };

  it("Criar carro", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3001/carros",
      body: carro,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.exist;
      expect(response.body.marca).to.eq(carro.marca);
      expect(response.body.modelo).to.eq(carro.modelo);
      expect(response.body.ano).to.eq(carro.ano);
      expect(response.body.cor).to.eq(carro.cor);
      expect(response.body.preco).to.eq(carro.preco);
      //cy.log(JSON.stringify(response));
    });
  });

  const carroAtualizado = {
    marca: "Toyota",
    modelo: "Corolla XEI",
    ano: 2023,
    cor: "Preto",
    preco: 27000,
  };

  it("Atualizar carro", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:3001/carros/1",
      body: carroAtualizado,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.body.marca).to.eq(carroAtualizado.marca);
      expect(response.body.modelo).to.eq(carroAtualizado.modelo);
      expect(response.body.ano).to.eq(carroAtualizado.ano);
      expect(response.body.cor).to.eq(carroAtualizado.cor);
      expect(response.body.preco).to.eq(carroAtualizado.preco);
      //cy.log(JSON.stringify(response));
    });
  });
});
