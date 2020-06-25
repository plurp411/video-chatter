$('#is-admin-checkbox').on('change', function() {

    IS_ADMIN = this.checked;
    emitIsAdmin(IS_ADMIN);

    // if (this.checked) {
    //     // $(this).prop("checked", returnVal);
    // } else {

    // }
});

