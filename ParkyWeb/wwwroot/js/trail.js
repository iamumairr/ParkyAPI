﻿var dataTable;
$(document).ready(function () {
    loadDataTable();
});

function loadDataTable() {
    dataTable = $("#tableData").DataTable({
        "ajax": {
            "url": "/Trails/GetAllTrail",
            "type": "GET",
            "dataType": "json",
        },
        "columns": [
            { "data": "nationalPark.name", "width": "20%" },
            { "data": "name", "width": "20%" },
            { "data": "distance", "width": "20%" },
            { "data": "elevation", "width": "20%" },
            {
                "data": "id",
                "render": function (data) {
                    return `<div class="text-center">
                                <a href="/Trails/Upsert/${data}" class="btn btn-success text-white pe-auto">
                                    <i class="far fa-edit"></i>
                                </a>
                                &nbsp;
                                <a onclick=Delete("/Trails/Delete/${data}") class="btn btn-danger text-white pe-auto">
                                    <i class="far fa-trash-alt"></i>
                                </a>
                            </div>`
                }, "width": "30%"
            },
        ]
    });
}

function Delete(url) {
    Swal.fire({
        title: "Are you sure you want to Delete?",
        text: "You will not be able to revert the data!",
        icon: "warning",
        buttons: true,
        dangerMode: true,
        allowOutsideClick: false,
        allowEscapeKey: false
    }).then((willDelete) => {
        if (willDelete) {
            $.ajax({
                type: "Delete",
                url: url,
                success: function (data) {
                    if (data.success) {
                        toastr.success(data.message);
                        dataTable.ajax.reload();
                    } else {
                        toastr.error(data.message);
                    }
                }
            })
        }
    });
}