(function (window, document, $) {

    function showModal(titleText, bodyContent, footerContent) {
        var modalWrapper = document.createElement('div');
        modalWrapper.classList.add('modal');
        modalWrapper.setAttribute('tabindex', '-1');
        modalWrapper.setAttribute('role', 'dialog');
        var modalDialog = document.createElement('div');
        modalDialog.classList.add('modal-dialog');
        modalWrapper.setAttribute('role', 'document');
        var modalContent = document.createElement('div');
        modalContent.classList.add('modal-content');

        // header
        var modalHeader = document.createElement('div');
        modalHeader.classList.add('modal-header');
        var modalTitle = document.createElement('h5');
        modalTitle.classList.add('modal-title');
        modalTitle.innerText = titleText;
        var closeButton = document.createElement('button');
        closeButton.classList.add('close');
        closeButton.setAttribute('data-dismiss', 'modal');
        closeButton.setAttribute('aria-label', 'Close');
        var closeIcon = document.createElement('span');
        closeIcon.setAttribute('aria-hidden', 'true');
        closeIcon.innerHTML = '&times;'

        closeButton.appendChild(closeIcon);
        modalHeader.appendChild(modalTitle);
        modalHeader.appendChild(closeButton);

        // body
        var modalBody = document.createElement('div');
        modalBody.classList.add('modal-body');
        modalBody.appendChild(bodyContent);

        // footer
        var modalFooter;
        if (footerContent) {
            modalFooter = document.createElement('div');
            modalFooter.classList.add('modal-footer');
        }

        modalContent.appendChild(modalHeader);
        modalContent.appendChild(modalBody);
        if (modalFooter) {
            modalContent.appendChild(modalFooter);
        }
        modalDialog.appendChild(modalContent);
        modalWrapper.appendChild(modalDialog);

        document.body.appendChild(modalWrapper);
        var modal = $(modalWrapper).modal();

        // dispose element on close
        modal.on('hidden.bs.modal', function () {
            modal.dispose();
            modal.remove();
        });

        return modal;
    }

    $(function () {
        $('.ticket-form').on('submit', function (e) {
            e.preventDefault();
            var formData = new FormData(e.target);
            var eventId = formData.get('event-id');
            var ticketId = formData.get('ticket-id');
            var ticketDescription = formData.get('ticket-description');
            var price = formData.get('price');
            if (!ticketId || !eventId || !price) {
                alert('Fehler - ungültige Daten!');
                throw new Error('eventId, ticketId or price is empty.');
            }
            var modalBodyContent = document.createElement('div');
            modalBodyContent.id = 'paypal-ppp';
            var modal = showModal(ticketDescription, modalBodyContent);
            // modalBodyContent.innerHTML = 'Bitte warten ...';
            // paypal.Buttons({
            //     createOrder: function (data, actions) {
            //         // Set up the transaction
            //         return actions.order.create({
            //             purchase_units: [{
            //                 reference_id: 'SPKUP_E' + eventId + '_T' + ticketId,
            //                 description: ticketDescription,
            //                 soft_descriptor: 'SPEAKUP Event',
            //                 amount: {
            //                     value: (price / 100).toFixed(2).toString()
            //                 }
            //             }],
            //             application_context: {
            //                 brand_name: 'SpeakUp!',
            //                 locale: 'de-DE',
            //                 user_action: 'PAY_NOW'
            //             }
            //         });
            //     }
            // }).render(modalBodyContent);
            $.post('/ticketing/request?eventId=' + eventId + '&ticketId=' + ticketId)
                .done(function (data) {
                    var approvalLinks = data.links.filter(l => l.rel === 'approval_url');
                    var approvalUrl = approvalLinks[0].href;
                    var ppp = PAYPAL.apps.PPP({
                        approvalUrl: approvalUrl,
                        placeholder: 'paypal-ppp',
                        mode: nodeEnv === 'production' ? 'live' : 'sandbox',
                        country: 'DE'
                    });
                })
                .fail(function () {
                    alert('Ups! Da ging etwas schief :(');
                    modal.hide();
                });
        });
    });


})(window, document, jQuery);