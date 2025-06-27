# language: pt

Funcionalidade: Gerenciamento do Carrinho de Compras
  Como um usuário logado,
  Eu quero adicionar produtos ao meu carrinho
  Para que eu possa comprá-los posteriormente.

  @compra @smoke
  Cenário: Adicionar um item ao carrinho e verificar o estado da aplicação
    Dado que eu estou logado no SauceDemo
    Quando eu adiciono o item "Sauce Labs Backpack" ao carrinho
    Então o ícone do carrinho deve exibir "1" item
    E o armazenamento local deve conter o item adicionado