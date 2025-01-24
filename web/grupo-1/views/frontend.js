const protocolo = 'http://'
const baseURL = 'localhost:3001'


//cadastro evento 
//      v
async function cadastrarEvento() {
    let nomeEventoInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput')
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let bairroInput = document.querySelector('#bairroInput')
    let estadoInput = document.querySelector('#estadoInput')
    let categoriasInput = document.querySelector('#categoriasInput')

    let nomeEvento = nomeEventoInput.value
    let dataInicio = dataInicioInput.value
    let preco = precoInput.value
    let descricao = descricaoInput.value
    let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cidade = cidadeInput.value
    let bairro = bairroInput.value
    let estado = estadoInput.value
    let categoria = categoriasInput.value

    if (!nomeEvento || !dataInicio || !preco || !descricao || !urlLogo || !urlSite || !endereco || !cidade || !estado || !categoria) {
        exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        alert('Por favor, preencha todos os campos antes de cadastrar.')
        return
    }

    try {
        const cadastroEndpoint = '/cadastro'
        const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
        await axios.post(
                URLCompleta, {
                    nomeEvento: nomeEvento,
                    dataInicio: dataInicio,
                    preco: preco,
                    descricao: descricao,
                    urlLogo: urlLogo,
                    urlSite: urlSite,
                    endereco: endereco,
                    cidade: cidade,
                    estado: estado,
                    categorias: categoria,
                    data_cadastro: data_cadastro,
                    bairro: bairro
                }
            )
            // Limpar os campos após sucesso
        nomeEventoInput.value = ""
        dataInicioInput.value = ""
        precoInput.value = ""
        descricaoInput.value = ""
        urlLogoInput.value = ""
        urlSiteInput.value = ""
        enderecoInput.value = ""
        cidadeInput.value = ""
        estadoInput.value = ""
        categoriasInput.value = ""

        // Exibir mensagens de sucesso
        exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
        alert('Evento cadastrado com sucesso!')
        ocultarModal('#modalLogin', 2000)
    } catch (error) {
        // Exibir mensagens de erro
        exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show', 'alert-danger'], ['d-none', 'alert-success'], 2000)
        alert('Erro ao cadastrar o evento. Por favor, tente novamente.')
        ocultarModal('#modalLogin', 2000)
    }
}

async function cadastrarEvento2() {
    let nomeEventoInput = document.querySelector('#nomeEventoInput')
    let dataInicioInput = document.querySelector('#dataInicioInput')
    let precoInput = document.querySelector('#precoInput')
    let descricaoInput = document.querySelector('#descricaoInput')
    let urlLogoInput = document.querySelector('#urlLogoInput')
    let urlSiteInput = document.querySelector('#urlSiteInput')
    let enderecoInput = document.querySelector('#enderecoInput')
    let cidadeInput = document.querySelector('#cidadeInput')
    let estadoInput = document.querySelector('#estadoInput')
    let categoriasInput = document.querySelector('#categoriasInput')

    let nomeEvento = nomeEventoInput.value
    let dataInicio = dataInicioInput.value
    let preco = precoInput.value
    let descricao = descricaoInput.value
    let urlLogo = urlLogoInput.value
    let urlSite = urlSiteInput.value
    let endereco = enderecoInput.value
    let cidade = cidadeInput.value
    let estado = estadoInput.value
    let categoria = categoriasInput.value
    if (!nomeEvento || !dataInicio || !preco || !descricao || !urlLogo || !urlSite || !endereco || !cidade || !estado || !categoria) {
        try {
            const cadastroEndpoint = '/cadastro'
            const URLCompleta = `${protocolo}${baseURL}${cadastroEndpoint}`
            await axios.post(
                URLCompleta, {
                    nomeEvento: nomeEvento,
                    dataInicio: dataInicio,
                    preco: preco,
                    descricao: descricao,
                    urlLogo: urlLogo,
                    urlSite: urlSite,
                    endereco: endereco,
                    cidade: cidade,
                    estado: estado,
                    categorias: categoria
                }
            )
            nomeEventoInput.value = ""
            dataInicioInput.value = ""
            precoInput.value = ""
            descricaoInput.value = ""
            urlLogoInput.value = ""
            urlSiteInput.value = ""
            enderecoInput.value = ""
            cidadeInput.value = ""
            estadoInput.value = ""
            categoriasInput.value = ""
            exibirAlerta('.alert-modal-cadastro', "Usuário cadastrado com sucesso!", ['show', 'alert-success'], ['d-none', 'alert-danger'], 2000)
            ocultarModal('#modalLogin', 2000)
        } catch (error) {
            exibirAlerta('.alert-modal-cadastro', "Erro ao cadastrar usuário", ['show',
                'alert-danger'
            ], ['d-none', 'alert-success'], 2000)
            ocultarModal('#modalLogin', 2000)
        }
    } else {
        exibirAlerta('.alert-modal-cadastro', 'Preencha todos os campos', ['show',
            'alert-danger'
        ], ['d-none', 'alert-success'], 2000)
    }
}

//fora de qualquer outra função, pode ser no final, depois de todas
function exibirAlerta(seletor, innerHTML, classesToAdd, classesToRemove, timeout) {
    let alert = document.querySelector(seletor)
    alert.innerHTML = innerHTML
        //... é o spread operator
        //quando aplicado a um array, ele "desmembra" o array
        //depois disso, passamos os elementos do array como argumentos para add e
        // remove
    alert.classList.add(...classesToAdd)
    alert.classList.remove(...classesToRemove)
    setTimeout(() => {
        alert.classList.remove('show')
        alert.classList.add('d-none')
    }, timeout)
}

function ocultarModal(seletor, timeout) {
    setTimeout(() => {
        let modal = bootstrap.Modal.getInstance(document.querySelector(seletor))
        modal.hide()
    }, timeout)
}




async function obterEventos() {
    const eventosEndpoint = '/eventos'
    const URLCompleta = `${protocolo}${baseURL}${eventosEndpoint}`
    const eventos = (await axios.get(URLCompleta)).data

    let tabela = document.querySelector('.eventos')
    let corpoTabela = tabela.getElementsByTagName('tbody')[0]
    for (let evento of eventos) {
        //insertRow(0) para adicionar sempre na primeira linha
        //se quiser adicionar na última, chame insertRow sem argumentos
        let linha = corpoTabela.insertRow(0)
        let celulaTitulo = linha.insertCell(0)
        let celulaSinopse = linha.insertCell(1)
        let celulaAno = linha.insertCell(2)
        let celulaClassificacao = linha.insertCell(3)
        celulaTitulo.innerHTML = evento.nome
        celulaSinopse.innerHTML = evento.sinopse
        celulaAno.innerHTML = evento.ano
        celulaClassificacao.innerHTML = evento.classificacao
    }


    console.log(eventos)
}

async function cadastrarFilme() {
    //constrói a URL completa
    const filmesEndpoint = '/eventos'
    const URLCompleta = `${protocolo}${baseURL}${filmesEndpoint}`
        //pega os inputs que contém os valores que o usuário digitou
    let tituloInput = document.querySelector('#tituloInput')
    let sinopseInput = document.querySelector('#sinopseInput')
    let anoInput = document.querySelector("#anoInput")
    let classificacaoInput = document.querySelector("#selectClassificacao")
        //pega os valores digitados pelo usuário
    let titulo = tituloInput.value
    let sinopse = sinopseInput.value
    let ano = anoInput.value
    let classificacao = classificacaoInput.value
    if (titulo && sinopse && ano && classificacao) {

        //limpa os campos que o usuário digitou
        tituloInput.value = ""
        sinopseInput.value = ""
        anoInput.value = ""
        classificacaoInput[0].selected = 'selected'
            //envia os dados ao servidor (back end)
        const filmes = (await axios.post(URLCompleta, {
                titulo,
                sinopse,
                ano,
                classificacao
            })).data
            //limpa a tabela para preenchê-la com a coleção nova, atualizada
        let tabela = document.querySelector('.filmes')
        let corpoTabela = tabela.getElementsByTagName('tbody')[0]
        corpoTabela.innerHTML = ""
        for (let evento of eventos) {
            let linha = corpoTabela.insertRow(0)
            let celulaTitulo = linha.insertCell(0)
            let celulaSinopse = linha.insertCell(1)
            let celulaAno = linha.insertCell(2)
            let celulaClassificacao = linha.insertCell(3)
            celulaTitulo.innerHTML = evento.titulo
            celulaSinopse.innerHTML = evento.sinopse
            celulaAno.innerHTML = evento.ano
            celulaClassificacao.innerHTML = evento.classificacao

        }
        exibirAlerta('.alert-filme', 'Filme cadastrado com sucesso', ['show',
            'alert-success'
        ], ['d-none'], 2000)

    }
    //senão, exibe o alerta por até 2 segundos
    else {
        exibirAlerta('.alert-filme', 'Preencha todos os campos', ['show', 'alert-danger'], ['d-none'], 2000)
    }
}