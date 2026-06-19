describe("Testes da API de Livros", () => {
  it("Listar todos os livros", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/livros",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.body).to.be.an("array");
    });
  });

  it("Listar livro especifico", () => {
    cy.request({
      method: "GET",
      url: "http://localhost:3000/livros/2",
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.body.paginas).to.eq(208);
      expect(response.body.nome).to.eq("O Alquimista");
      cy.log(JSON.stringify(response));
    });
  });
  const livro = {
    nome: "O Alquimista",
    autor: "Paulo Coelho",
    paginas: 208,
  };

  it("Criar livro", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/livros",
      body: livro,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body).to.exist;
      expect(response.body.paginas).to.eq(208);
      expect(response.body.nome).to.eq("O Alquimista");
      //cy.log(JSON.stringify(response));
    });
  });

  const livroAtualizado = {
    nome: "O Alquimista - Edição Especial",
    autor: "Paulo Coelho",
    paginas: 250,
  };

  it("Atualizar livro", () => {
    cy.request({
      method: "PUT",
      url: "http://localhost:3000/livros/1",
      body: livroAtualizado,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.exist;
      expect(response.body.paginas).to.eq(250);
      expect(response.body.nome).to.eq("O Alquimista - Edição Especial");
      //cy.log(JSON.stringify(response));
    });
  });

  it("Deletar livro", () => {
    cy.request({
      method: "POST",
      url: "http://localhost:3000/livros",
      body: livro,
    }).then((response) => {
      const idLivro = response.body.id;

      cy.request({
        method: "DELETE",
        url: `http://localhost:3000/livros/${idLivro}`,
      }).then((response) => {
        expect(response.status).to.eq(204);
        //expect(response.body).not.exist
      });
    });
  });
});
