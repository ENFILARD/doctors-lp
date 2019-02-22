function Lead(){
    this.serverUrl = 'http://enfilardapi-test.azurewebsites.net/enfila/api';
    this.isValidRecaptcha = false;
}

(function($) {

    Lead.prototype = {
        constructor: Lead,
        init: function(){

        },
        validateRecaptcha: function(token){
            var _lead = this;
            var body = {token: token};
            var url = _lead.serverUrl + '/Account/ValidateRecaptcha';
            $.ajax({
                url: url,
                method: 'post',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(body),
                success: function(response){
                    _lead.isValidRecaptcha = response.success;
                    if (_lead.isValidRecaptcha) {
                        $('#btnSubmitForm').removeAttr('disabled');
                    }
                }
            });
        },
        submitForm: function() {
            var name = $('#txtName').val();
            var address = $('#txtAddress').val();
            var phoneNumber = $('#txtPhoneNumber').val();
            var ext = $('#txtExt').val();
            var email = $('#txtEmail').val();
            var schedule = $('#slcSchedule').val();
            var visitDate = $('#txtDate').val();
            if(this.selectedCmpTypeId === -1) {
                toastr.error('Error de validación', 'Tipo de compañia invalido');
            } else if(name === ''){
                toastr.error('Error de validación', 'Nombre invalido');
            } else if (address === '') {
                toastr.error('Error de validación', 'Dirección invalida');
            } else if (phoneNumber === '') {
                toastr.error('Error de validación', 'Teléfono invalido');
            } else if (email === '') {
                toastr.error('Error de validación', 'Correo invalido');
            } else if (visitDate === '') {
                toastr.error('Error de validación', 'Fecha de visita invalida');
            } else{
                var _main = this;
                var data = {
                    FullName: name,
                    Email: email,
                    Address: address,
                    ContactTimePeriod: schedule,
                    Phone: phoneNumber,
                    PhoneExt: ext,
                    VisitDateString: visitDate
                };
                $.ajax({
                    url: this.serverUrl + '/organization/demoRequest/affiliateDoctor',
                    method: 'post',
                    contentType: 'application/json',
                    dataType: 'json',
                    data: JSON.stringify(data),
                    success: function(response){
                        console.log(response);
                        if(response.Success){
                            $('#customerName').text(name);
                            $('#customerEmail').text(email);
                            $('#afterSubmit').modal('show');
                            _main.clearFormFields();
                        } else{
                            toastr.error('Error enviando solicitud', 'Ocurrio un error enviando su solicitud');
                        }
                    },
                    error: function() {
                        toastr.error('Error enviando solicitud', 'Ocurrio un error enviando su solicitud');
                    }
                })
            }
        },
        clearFormFields: function(){
            $('#txtName').val('');
            $('#txtAddress').val('');
            $('#txtPhoneNumber').val('');
            $('#txtExt').val('');
            $('#txtEmail').val('');
            $('#txtDate').val('');
        }
    };


})(jQuery);

function initComponents() {
    var lead = new Lead();
    lead.init();

    $('#invitationForm').submit(function(evt){
        evt.preventDefault();
        lead.submitForm();
    });

    $('.btnShowForm').on('click', function(){
        //$('#inviteBusiness').modal('');
        lead.clearFormFields();
        $('#inviteBusiness').modal('show');
    });

    grecaptcha.render('drlanding_recaptcha', {
        'sitekey' : '6Ld8zSUUAAAAALADDK1rtwsGJOpOUPkky4bMvv3P',
        'callback' : lead.validateRecaptcha.bind(lead)
    });
}