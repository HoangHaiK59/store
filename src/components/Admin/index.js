import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import './admin.css';
import { instance } from '../../utils/axios';
import { Button, Tooltip } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddProduct from './Product/Add';
export default class Admin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            products: [],
            columnDefs: [
                { headerName: 'Mã sản phẩm', field: 'id' },
                { headerName: 'Tên sản phẩm', field: 'name' },
                { headerName: 'Giá sản phẩm', field: 'price' },
                { headerName: 'Chiết khấu', field: 'discount' },
                { headerName: 'Kích thước', field: 'size' },
                { headerName: 'Mô tả', field: 'description' },
                { headerName: 'Danh mục', field: 'categoryId' },
                { headerName: 'Ngày cập nhật', field: 'created' },
                { headerName: 'Số lượng người xem', field: 'view' },
            ],
            visible: false,
            token: localStorage.getItem('token') !== null ? JSON.parse(localStorage.getItem('token')).access_token: ''
        
        };
    }

    getAllProduct() {
        instance.get(`GetAllProduct?offSet=${0}&pageSize=${10}`, {
            headers: {
                'Authorization': `Bearer ${this.state.token})}`
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
        this.setState({ visible: false })
    }

    componentDidMount() {
        this.getAllProduct();
    }

    addProduct() {
        this.setState({ visible: true });
    }

    render() {
        const { visible } = this.state;
        return visible? <AddProduct {...this.props} back={this.back.bind(this)} />
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
                    columnDefs={this.state.columnDefs}
                    rowData={this.state?.products}
                    onGridReady={ params => this.gridApi = params.api }
                    animateRows
                    >
                </AgGridReact>
            </div>
        </div>

    }
}