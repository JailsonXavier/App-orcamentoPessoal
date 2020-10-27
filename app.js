
class Despesas {
	constructor(ano,mes,dia,tipo,descricao,valor){
		this.ano = ano,
		this.mes = mes,
		this.dia = dia,
		this.tipo = tipo,
		this.descricao = descricao,
		this.valor = valor}


		ValidarDados(){
			for(let i in this){
				
				if (this[i] == undefined || this[i] == '' || this[i] == null) {
					return false
				}
				return true
			}
		}
	}

	class Bd{

		constructor(){
			let id = localStorage.getItem('id')
			if(id === null) {
				localStorage.setItem('id',0)
			}
		}

		getProximoId(){
		let proximoId = localStorage.getItem('id')//0			
		return parseInt(proximoId) +1
	}
	

	gravar(d){
		let id = this.getProximoId()
		localStorage.setItem(id, JSON.stringify(d))
		localStorage.setItem('id',id)

	}

	RecuperarListaDespesas(){
		

		let despesa = Array()

		let id = localStorage.getItem('id');		
		for(let i=1; i<=id; i++){
			
			let despesas = JSON.parse(localStorage.getItem(i));
			
			if (despesas === null) {
				continue
			}
			despesas.id = i
			despesa.push(despesas);
		}
		return despesa
	}

	pesquisar(despesas1){
		
		let despesaFiltradas = Array();
		despesaFiltradas = this.RecuperarListaDespesas();
		
		

		if(despesas1.ano !='') {			
			despesaFiltradas =despesaFiltradas.filter(a => a.ano == despesas1.ano)
		}

		if(despesas1.mes !='') {			
			despesaFiltradas = despesaFiltradas.filter(a => a.mes == despesas1.mes)
		}

		if(despesas1.dia !='') {			
			despesaFiltradas = despesaFiltradas.filter(a => a.dia == despesas1.dia)
		}

		if(despesas1.mes !='') {			
			despesaFiltradas = despesaFiltradas.filter(a => a.mes == despesas1.mes)
		}

		if(despesas1.tipo !='') {			
			despesaFiltradas = despesaFiltradas.filter(a => a.tipo == despesas1.tipo)
		}

		if(despesas1.descricao !='') {			
			despesaFiltradas = despesaFiltradas.filter(a => a.descricao == despesas1.descricao)
		}

		if(despesas1.valor !='') {			
			despesaFiltradas = despesaFiltradas.filter(a => a.valor == despesas1.valor)
		}
		return 	despesaFiltradas
	}
	remover(id){
		localStorage.removeItem(id);
		
	}
}

let bd = new Bd()

function Cadastrar() {
	let ano =  document.getElementById('ano');
	let mes =  document.getElementById('mes');
	let dia =  document.getElementById('dia');
	let tipo =  document.getElementById('tipo');
	let descricao =  document.getElementById('descricao');
	let valor =  document.getElementById('valor');	

	let despesas = new Despesas(
		ano.value,mes.value,
		dia.value,tipo.value,
		descricao.value,valor.value);

	if(despesas.ValidarDados()){
		
		bd.gravar(despesas);
		$('#exampleModal').modal('show')
		document.getElementById('title').innerHTML = 'Sucesso'
		document.getElementById('title').className = 'text-success'
		document.getElementById('mensagem').innerHTML = 'Dados inseridos'
		document.getElementById('mensagem').className = 'text-success'
		document.getElementById('botao').className = 'btn btn-success'
		ano.value = ''
		mes.value = ''
		dia.value = ''
		tipo.value = ''
		descricao.value = ''
		valor.value = ''
	}else{
		
		$('#exampleModal').modal('show')
		document.getElementById('title').innerHTML = 'Corrigir'
		document.getElementById('title').className = 'text-danger'
		document.getElementById('mensagem').innerHTML = 'Insira os dados'
		document.getElementById('mensagem').className = 'text-danger'
		document.getElementById('botao').className = 'btn btn-danger'

	}
}

function CarregarListaDespesas(despesa = Array(), filtrado = false){

	
	if (despesa == 0 && filtrado == false) {
		despesa = bd.RecuperarListaDespesas();
	}

	
	let listaDespesas = document.getElementById('listadespesas')
	listaDespesas.innerHTML = ''


	despesa.forEach(function(d){
		
		let lista = listaDespesas.insertRow()

		
		lista.insertCell(0).innerHTML = `${d.dia}/${d.mes}/${d.ano}`
				
		switch(d.tipo){
			case '1':d.tipo = 'Alimentação'
			break
			case '2':d.tipo = 'Educação'
			break
			case '3':d.tipo = 'Lazer'
			break
			case '4':d.tipo = 'Saúde'
			break	
			case '5':d.tipo = 'Transporte'
			break	
		}
		lista.insertCell(1).innerHTML = d.tipo
		lista.insertCell(2).innerHTML = d.descricao
		lista.insertCell(3).innerHTML = d.valor

		
		let btn = document.createElement('button')
		btn.className = 'btn btn-danger';
		btn.innerHTML = '<i class ="fas fa-times"></i>'
		btn.id=`id_depesa_${d.id}`
		btn.onclick = function(){			

			let id = this.id.replace('id_depesa_', '')

			
			if(btn.id){
				alert('Excluido');
				
			}
			bd.remover(id)											
			window.location.reload()			
			
		}
		lista.insertCell(4).append(btn)
		


	})

}

function PesquisarDespesas(){
	let ano = document.getElementById('ano').value
	let mes = document.getElementById('mes').value
	let dia = document.getElementById('dia').value
	let tipo = document.getElementById('tipo').value
	let descricao = document.getElementById('descricao').value
	let valor = document.getElementById('valor').value

	let despesas1 = new Despesas(ano,mes,dia,tipo,descricao,valor)

	let despesa = bd.pesquisar(despesas1);

	CarregarListaDespesas(despesa, true);


	}	