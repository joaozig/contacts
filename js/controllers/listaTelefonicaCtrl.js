angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope) {
	$scope.app = 'Lista Telefonica';
	$scope.contatos = [
		{nome: "Pedro", telefone: "99999-9999", data: new Date(), cor: "blue", operadora: {nome: 'Oi', codigo: 14, categoria: 'Celular'}},
		{nome: "Ana", telefone: "99706-9102", data: new Date(), cor: "yellow", operadora: {nome: 'Oi', codigo: 14, categoria: 'Celular'}},
		{nome: "Maria", telefone: "98871-1268", data: new Date(), cor: "black", operadora: {nome: 'GVT', codigo: 25, categoria: 'Fixo'}}
	];

	$scope.operadoras = [
		{nome: 'Oi', codigo: 14, categoria: 'Celular', preco: 2},
		{nome: 'Vivo', codigo: 15, categoria: 'Celular', preco: 1},
		{nome: 'Tim', codigo: 41, categoria: 'Celular', preco: 3},
		{nome: 'GVT', codigo: 25, categoria: 'Fixo', preco: 4},
		{nome: 'Embratel', codigo: 21, categoria: 'Fixo', preco: 1}
	];

	$scope.classe1 = 'selecionado';
	$scope.classe2 = 'negrito';
	$scope.criterioDeOrdenacao = 'nome';

	$scope.adicionarContato = function(contato) {
		$scope.contatos.push(contato);
		// $scope.contatos.push(angular.copy(contato));
		delete $scope.contato;
		$scope.contatoForm.$setPristine();
	}

	$scope.apagarContatos = function(contatos) {
		$scope.contatos = contatos.filter(function(contato) {
			if(!contato.selecionado) return contato;
		});
	}

	$scope.isContatoSelecionado = function(contatos) {
		return contatos.some(function(contato) {
			return contato.selecionado;
		});
	}

	$scope.selecionarTodos = function(check, contatos) {
		$scope.contatos = contatos.filter(function(contato) {
			contato.selecionado = check;
			return contato;
		});
	}

	$scope.ordernarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}
});