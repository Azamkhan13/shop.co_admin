import { Table} from 'antd';



function index({columns, data, load}:any) {
  return (
    <Table columns={columns} loading={load} dataSource={data} pagination={false} size='large' />
  )
}

export default index