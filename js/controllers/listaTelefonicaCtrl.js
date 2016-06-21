angular.module("listaTelefonica").controller("listaTelefonicaCtrl", function($scope, $http) {
	$scope.app = 'Lista Telefonica';
	// $scope.contacts = [
	// 	{nome: "Pedro", telefone: "99999-9999", data: new Date(), cor: "blue", company: {nome: 'Oi', codigo: 14, categoria: 'Celular'}},
	// 	{nome: "Ana", telefone: "99706-9102", data: new Date(), cor: "yellow", company: {nome: 'Oi', codigo: 14, categoria: 'Celular'}},
	// 	{nome: "Maria", telefone: "98871-1268", data: new Date(), cor: "black", company: {nome: 'GVT', codigo: 25, categoria: 'Fixo'}}
	// ];

	// $scope.companies = [
	// 	{nome: 'Oi', codigo: 14, categoria: 'Celular', preco: 2},
	// 	{nome: 'Vivo', codigo: 15, categoria: 'Celular', preco: 1},
	// 	{nome: 'Tim', codigo: 41, categoria: 'Celular', preco: 3},
	// 	{nome: 'GVT', codigo: 25, categoria: 'Fixo', preco: 4},
	// 	{nome: 'Embratel', codigo: 21, categoria: 'Fixo', preco: 1}
	// ];

	$scope.contacts = []
	$scope.companies = []

	$scope.classe1 = 'selecionado';
	$scope.classe2 = 'negrito';
	$scope.criterioDeOrdenacao = 'nome';

	var loadContacts = function() {
		$http.get("http://localhost:3000/contacts").success(function(data) {
			$scope.contacts = data;
		});
	}

	var loadCompanies = function() {
		$http.get("http://localhost:3000/companies").success(function(data) {
			$scope.companies = data;
		});
	}

	$scope.adicionarContato = function(contact) {
		contact.company_id = contact.company.id
		console.log(contact)
		$http.post("http://localhost:3000/contacts.json", contact).success(function(data) {
			delete $scope.contact;
			$scope.contactForm.$setPristine();
			loadContacts();
		});
	}

	$scope.apagarContatos = function(contacts) {
		$scope.contacts = contacts.filter(function(contact) {
			if(!contact.selecionado) return contact;
		});
	}

	$scope.isContatoSelecionado = function(contacts) {
		return contacts.some(function(contact) {
			return contact.selecionado;
		});
	}

	$scope.selecionarTodos = function(check, contacts) {
		$scope.contacts = contacts.filter(function(contact) {
			contact.selecionado = check;
			return contact;
		});
	}

	$scope.ordernarPor = function(campo) {
		$scope.criterioDeOrdenacao = campo;
		$scope.direcaoDaOrdenacao = !$scope.direcaoDaOrdenacao;
	}

	loadContacts();
	loadCompanies();
});