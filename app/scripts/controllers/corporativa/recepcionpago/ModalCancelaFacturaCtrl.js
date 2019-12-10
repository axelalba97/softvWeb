'use strict';
angular
  .module('softvApp')
  .controller('ModalCancelaFacturaCtrl', function ($uibModalInstance, $uibModal, ContratoMaestroFactory, ngNotify, $rootScope, options, $localStorage) {
    this.$onInit = function () {
      vm.pregunta = options.pregunta;
    }

    function cancel() {
      $uibModalInstance.dismiss('cancel');
    }

    function ok() {
      ContratoMaestroFactory.GetCancelaPagoFacturaMaestro(options.Clv_Pago).then(function (response) {
        ContratoMaestroFactory.GetAgregaBitacoraMaestro($localStorage.currentUser.usuario, 'Complementos Cancelo', options.Clv_Pago).then(function (result) {
          $rootScope.$emit('reload', options.contrato);
          $uibModalInstance.dismiss('cancel');
          ngNotify.set('La factura se ha cancelado correctamente', 'success')
        });
      });
    }

    var vm = this;
    vm.cancel = cancel;
    vm.ok = ok;
    vm.titulo = "Atención ";
  });
