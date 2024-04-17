      Funcionalidade: Registro bem-sucedido

      Cenário: Deve realizar registro com dados válidos com sucesso
      Dado que o usuário tenha preenchido o formulário de registro com dados válidos
      Quando clicar em Continuar
      Então o registro deve ser concluído com sucesso
      E uma mensagem "Thank you for joining us!" deve ser exibida

      Cenário:Deve realizar login com os dados registrados
      Dado que um usuário tenha se registrado com sucesso
      Quando o usuário fizer login com os mesmos dados utilizados no registro
      Então o usuário deve ser redirecionado para o painel do usuário
      E o nome completo do usuário deve ser exibido no painel

      Cenário: Verificar Validação dos Campos
      Cenário Outline: Deve exibir mensagem de erro ao clicar, digitar e apagar para o primeiro nome
      Dado que o usuário não tenha preenchido o campo do primeiro nome
      Quando clicar, digitar e apagar no campo do primeiro nome
      Então uma mensagem de erro "Precisa ser preenchido" deve ser exibida

      Cenário Outline: Deve exibir mensagem de erro ao clicar, digitar e apagar para o sobrenome
      Dado que o usuário não tenha preenchido o campo do sobrenome
      Quando clicar, digitar e apagar no campo do sobrenome
      Então uma mensagem de erro "Precisa ser preenchido" deve ser exibida

      Cenário: Deve exibir mensagem de erro para formato de data de nascimento inválido
      Dado que o usuário tenha preenchido a data de nascimento com um formato inválido
      Então uma mensagem de erro "Data de nascimento inválida." deve ser exibida

      Cenário: Deve exibir mensagem de erro para registro com data de nascimento futura
      Dado que o usuário tenha preenchido a data de nascimento com uma data futura
      Então uma mensagem de erro "Data de nascimento inválida." deve ser exibida

      Cenário: Deve exibir mensagem de erro para confirmação de senha inconsistente
      Dado que o usuário tenha preenchido a senha e a confirmação de senha de forma inconsistente
      Então uma mensagem de erro "As senhas não são iguais." deve ser exibida

      Cenário: Deve exibir mensagem de erro para e-mail inválido
      Dado que o usuário tenha preenchido um e-mail inválido
      Então uma mensagem de erro "Email inválido." deve ser exibida

      Cenário: Deve exibir mensagem de erro para e-mail incompleto
      Dado que o usuário tenha preenchido um e-mail incompleto
      Então uma mensagem de erro "Precisa ser email" deve ser exibida

      Cenário: Deve exibir mensagem de erro para confirmação de e-mail inconsistente
      Dado que o usuário tenha preenchido o e-mail e a confirmação de e-mail de forma inconsistente
      Então uma mensagem de erro "Os e-mails não são iguais." deve ser exibida

      Cenário: Deve exibir mensagem de erro para CPF inválido
      Dado que o usuário tenha preenchido um CPF inválido
      Então uma mensagem de erro "CPF inválido." deve ser exibida

      Funcionalidade: Registro Duplicado

      Cenário: Deve exibir mensagem de erro para e-mail já existente
      Dado que o usuário tenha preenchido o formulário de registro com um e-mail já existente
      Então uma mensagem de erro "Este email já está em uso." deve ser exibida

      Cenário: Deve exibir mensagem de erro para CPF já existente
      Dado que o usuário tenha preenchido o formulário de registro com um CPF já existente
      Então uma mensagem de erro "Este CPF já está em uso." deve ser exibida

      Funcionalidade: Validação de Endereço e CEP

      Cenário: Deve exibir mensagem de erro para CEP inválido
      Dado que o usuário tenha preenchido o formulário de registro com um CEP inválido
      Então uma mensagem de erro "CEP não encontrado" deve ser exibida

      Cenário: Deve preencher automaticamente dos campos de endereço com um CEP válido
      Dado que o usuário tenha preenchido o formulário de registro com um CEP válido
      Então os campos de endereço devem ser preenchidos automaticamente

      Funcionalidade: Responsividade

      Cenário: Exibir corretamente o background em diferentes modos de exibição
      Dado que o usuário acesse a página de cadastro
      Quando a visualização for ajustada para o modo <modo>
      Então o background deve ser exibido corretamente de acordo com o modo de exibição

      Exemplos:
      | modo    |
      | mobile  |
      | tablet  |
      | desktop |