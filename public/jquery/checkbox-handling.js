$('#is-admin-checkbox').on('change', function() {

    IS_ADMIN = this.checked;
    emitIsAdmin(this.checked);

    // if (this.checked) {
    //     // $(this).prop("checked", returnVal);
    // } else {

    // }
});

