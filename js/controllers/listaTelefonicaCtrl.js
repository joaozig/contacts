angular.module("contacts").controller("listaTelefonicaCtrl", function($scope, $http) {
	$scope.app = 'Lista Telefonica';

	$scope.contacts = []
	$scope.companies = []

	$scope.sortOrder = 'name';

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
			if(!contact.selected) return contact;
		});
	}

	$scope.isContatoSelecionado = function(contacts) {
		return contacts.some(function(contact) {
			return contact.selected;
		});
	}

	$scope.selecionarTodos = function(check, contacts) {
		$scope.contacts = contacts.filter(function(contact) {
			contact.selected = check;
			return contact;
		});
	}

	$scope.ordernarPor = function(field) {
		$scope.sortOrder = field;
		$scope.directionOrder = !$scope.directionOrder;
	}

	loadContacts();
	loadCompanies();
});