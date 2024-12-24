
export const TableColumn = [
    {
        field: 'id',
        headerName: 'Project Id',
        width: 100,
        required: true,
        headerAlign: "center",
        align: "center",
        renderCell: (params) => params.id
    },
    {
        field: 'projectName',
        headerName: 'Project Name',
        width: 150,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center",
        renderCell: (params) => (
            <p className="cursor-pointer" style={{ color: "#1890ff" }}>
                {params.value}
            </p>
        ),
    }, 
    {
        field: 'propertyType',
        headerName: 'Property Type',
        width: 150,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center",
    },
    {
        field: 'city',
        headerName: 'City',
        width: 150,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center"
    },
    {
        field: 'state',
        headerName: 'State',
        width: 150,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center"
    },
    {
        field: 'country',
        headerName: 'Country',
        width: 150,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center"
    },
    {
        field: 'person',
        headerName: 'Contact Person Name',
        width: 200,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center"
    },
    {
        field: 'phone',
        headerName: 'Contact Number',
        width: 200,
        required: true,
        field_type: 'text',
        headerAlign: "center",
        align: "center"
    },
]