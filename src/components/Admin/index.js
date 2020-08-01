import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './admin.css';
import { instance } from '../../utils/axios';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddProduct from './Product/Add';
import BtnCellRenderer from './buttonRenderer';
import { EditOutlined } from '@ant-design/icons';
export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            visible: false,
            token: localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')).access_token: '',
            categories: [],
            frameworkComponents: {
                btnCellRenderer: BtnCellRenderer,
            },
            product: null
        };
        this.formater = new Intl.NumberFormat('vn', {
            style: 'currency',
            currency: 'VND'
        });
    }

    getCategoryList() {
        instance.get('GetCategoryList')
            .then(result => {
                if (result.data.success) {
                    const { data } = result.data;
                    this.setState({ categories: data })
                }
            })
            .catch(err => console.log(err))
    }

    getAllProduct() {
        instance.get(`GetAllProduct?offSet=${0}&pageSize=${10}`, {
            headers: {
                'Authorization': `Bearer ${this.state.token}`
            }
        }).then(response => {
            if (response.data.success) {
                const { data } = response.data;

                this.setState({ products: data })
            }
        })
            .catch(error => console.log(error))
    }

    back() {
        this.setState({ visible: false });
        this.reload();
    }

    reload() {
        this.getAllProduct();
    }

    componentDidMount() {
        this.getCategoryList();
        this.getAllProduct();
    }

    addProduct() {
        this.setState({ visible: true });
    }

    editProduct(event) {
        const { rowData } = event;
        this.setState({ product: rowData, visible: true })
    }

    onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }

    render() {
        const columnDefs = [
            { 
                headerName: 'Mã sản phẩm', 
                field: 'id' 
            },
            { headerName: 'Tên sản phẩm', field: 'name' },
            { 
                headerName: 'Giá sản phẩm', 
                field: 'price',
                cellRenderer: params =>  {
                    return `<p>${this.formater.format(params.value)}</p>`
                }
            },  
            { 
                headerName: 'Chiết khấu', 
                field: 'discount',
                cellRenderer: params =>  {
                    return `<p>${params.value + '%'}</p>`
                }
            },
            { headerName: 'Kích thước', field: 'size' },
            { headerName: 'Mô tả', field: 'description' },
            { 
                headerName: 'Danh mục', 
                field: 'categoryId', 
                cellRenderer: params =>  {
                    return `<p>${this.state.categories.find(category => category.id === params.value).name}</p>`
                }
            },
            { headerName: 'Ngày cập nhật', field: 'created' },
            { headerName: 'Số lượng người xem', field: 'view' },
            { 
                headerName: 'Chức năng', 
                field: 'button',
                cellRenderer: 'btnCellRenderer',
                cellRendererParams: params => {
                    return {
                        buttons: [
                            {
                                type: 'primary',
                                label: 'Sửa',
                                clicked: this.editProduct.bind(this),
                                icon: <EditOutlined />
                            }
                        ]
                    }
                } 
            },
        ]
        const { visible } = this.state;
        return visible? <AddProduct {...this.props} product={this.state.product} back={this.back.bind(this)} />
        :<div className="admin-container">
            <div className="row mt-4">
                <div className="col-12 text-right">
                    <Tooltip title="Thêm sản phẩm">
                        <Button type="primary" onClick={this.addProduct.bind(this)} icon={<PlusOutlined/>}>Thêm sản phẩm</Button>
                    </Tooltip>
                </div>
            </div>
            <div className="ag-theme-alpine" style={{ height: '100vh', width: '100%' }}>
                <AgGridReact
                    columnDefs={columnDefs}
                    rowData={this.state?.products}
                    onGridReady={ params => this.gridApi = params.api }
                    animateRows
                    rowSelection='multiple'
                    frameworkComponents={this.state.frameworkComponents}
                    onFirstDataRendered={this.onFirstDataRendered.bind(this)}
                    defaultColDef={{
                        sortable: true,
                        filter: true,
                        headerComponentParams: {
                            menuIcon: 'fa-bars'
                        }
                    }}
                    >
                </AgGridReact>
            </div>
        </div>

    }
}