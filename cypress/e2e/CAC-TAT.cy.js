describe("Central de Atendimento ao Cliente TAT", () => {
  beforeEach(() => {
    cy.visit("./src/index.html");
  });
  it("verifica o título da aplicação", () => {
    cy.title().should("be.equal", "Central de Atendimento ao Cliente TAT");
  });
  it("Preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#product").select("Cursos");
    cy.get('[type="radio"]').check("elogio");
    cy.get('[type="checkbox"]').check("email");
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.get(".button").click();
    cy.get(".success").should("be.visible");
  });

  it("Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("caio,9@gmail.com");
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });

  it("Validar se o campo de Telefone só aceita números", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("caio,9@gmail.com");
    cy.get("#phone").type("abc1").should("have.value", "1");
  });

  it("Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("caio.9@gmail.com");
    cy.get("#phone-checkbox").check();
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });

  it("Preenche e limpa os campos nome, sobrenome, email e telefone", () => {
    cy.get("#firstName")
      .type("Siegh")
      .should("have.value", "Siegh")
      .clear()
      .should("have.value", "");
    cy.get("#lastName")
      .type("Windrunner")
      .should("have.value", "Windrunner")
      .clear()
      .should("have.value", "");
    cy.get("#email")
      .type("caio.9@gmail.com")
      .should("have.value", "caio.9@gmail.com")
      .clear()
      .should("have.value", "");
    cy.get("#phone")
      .type("12345678")
      .should("have.value", "12345678")
      .clear()
      .should("have.value", "");
  });

  it("exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios", () => {
    cy.get(".button").click();
    cy.get(".error").should("be.visible");
  });

  it("Envia o formuário com sucesso usando um comando customizado", () => {
    const data = {
      firstName: "Siegh",
      lastName: "Windrunner",
      email: "teste@gmail.com",
      text: "Teste.",
    };

    cy.fillMandatoryFieldsAndSubmit(data);
    cy.get(".success").should("be.visible");
  });

  it("Preenche os campos obrigatórios e envia o formulário", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#product").select("Cursos");
    cy.get('[type="radio"]').check("elogio");
    cy.get('[type="checkbox"]').check("email");
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto (YouTube) por seu texto", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#product").select("YouTube");
    cy.get("#product").should("have.value", "youtube");
    cy.get('[type="radio"]').check("elogio");
    cy.get('[type="checkbox"]').check("email");
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto (Mentoria) por seu valor (value)", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#product").select("mentoria").should("have.value", "mentoria");
    cy.get('[type="radio"]').check("elogio");
    cy.get('[type="checkbox"]').check("email");
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Seleciona um produto (Blog) por seu índice", () => {
    cy.get("#firstName").type("Siegh");
    cy.get("#lastName").type("Windrunner");
    cy.get("#email").type("teste@gmail.com");
    cy.get("#product").select(1).should("have.value", "blog");
    cy.get('[type="radio"]').check("elogio");
    cy.get('[type="checkbox"]').check("email");
    cy.get("#open-text-area").type("Não Obrigado", { delay: 0 });
    cy.contains("button", "Enviar").click();
    cy.get(".success").should("be.visible");
  });

  it("Marca o tipo de atendimento 'Feedback' ", () => {
    cy.get('input[type="radio"]').check("feedback").should('have.value', "feedback")
  });

  it("marca cada tipo de atendimento", () => {
    cy.get('input[type="radio"]')
    .each( typeOfService => {
          cy.wrap(typeOfService)
          .check()
          .should('be.checked')
    })
  });

  it("Marca ambos checkboxes, depois desmarca o último", () => {
    cy.get('input[type="checkbox"]').check().should('be.checked')
    cy.get('input[type="checkbox"]').last().uncheck().should('not.be.checked')
  });

  it("Seleciona um arquivo da pasta fixtures", () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  });

  it("Seleciona um arquivo simulando um drag-and-drop", () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  });

  it("Seleciona um arquivo utilizando uma fixture para a qual foi dada um alias", () => {
    cy.fixture('example.json').as('sampleFile')
    cy.get('input[type="file"]').selectFile('@sampleFile')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  });

  it("Verifica que a política de privacidade abre em outra aba sem a necessidade de um clique", () => {
    cy.get('a[href="privacy.html"]').should('have.attr', 'target', '_blank')
  });

  it("Acessa a página da política de privacidade removendo o target e então clicando no link", () => {
    cy.get('a[href="privacy.html"]').invoke('removeAttr', 'target')
  });

  it("Testa a página da política de privacidade de forma independente", () => {
    cy.get('a[href="privacy.html"]').click()
  });
});
