import { useState } from 'react';
import { Button, Form, Input, Modal } from 'antd';
import { useCategoryStore } from '@store';
import './style.scss'
import { toast } from 'react-toastify';

function index(props:any) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {addCategory}:any = useCategoryStore()

    const showModal = () => {
      setIsModalOpen(true);
    };
  
    const handleOk = () => {
      setIsModalOpen(false);
    };
  
    const handleCancel = () => {
      setIsModalOpen(false);
    };

    async function handleSubmit(value:any){
        const response = await addCategory(value)
        if(response.status == 201){
          toast.success('Category added successfully')
          props.getData()
          handleCancel()
        }else{
          toast.error('Failed to add category')
        }
    }
  

    return (
      <>
        <Button type="primary" onClick={showModal}>
          Add Category
        </Button>
        <Modal footer={false} title="Add Category" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Form className='addForm' onFinish={handleSubmit}>
                <Form.Item rules={[{
                    required: true,
                    message: 'Please input the category title!',
                }]} hasFeedback name="title">
                    <Input placeholder='Enter Category name' />
                </Form.Item>
                <Button type='primary' htmlType='submit'>
                    Submit
                </Button>

            </Form>
        </Modal>
      </>
    );
}

export default index