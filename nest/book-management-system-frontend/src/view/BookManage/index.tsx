import { Button, Card, Form, Input, message } from 'antd';
import './index.css';
import { CreateBookModal } from './CreateBookModal';
import { UpdateBookModal } from './UpdateBookModal';
import { list, deleteBook } from '../../api';
import { useEffect, useState } from 'react';
interface Book {
    id: number;
    name: string;
    author: string;
    description: string;
    cover: string;
}

export function BookManage(){
    const [bookList, setBookList] = useState<Array<Book>>([]);
    const [name, setName] = useState('');
    const [updateId, setUpdateId] = useState(0);
    const [num, setNum] = useState(0);
    const [isCreateBookModalOpen, setCreateBookModalOpen] = useState(false);
    const [isUpdateBookModalOpen, setUpdateBookModalOpen] = useState(false);
    async function fetchData() {
        try {
            const data = await list(name);
            
            if(data.status === 201 || data.status === 200) {
                setBookList(data.data);
            }
        } catch(e: any) {
            message.error(e.response.data.message);
        }
    }

    async function searchBook(value: { name: string }) {
        setName(value.name);
    }

    async function handleDelete(id: number) {
        try {
            await deleteBook(id);        
            message.success('删除成功');
            setNum(Math.random())
        } catch(e: any) {
            message.error(e.response.data.message);
        }
    }
    

    useEffect(() => {
        fetchData();
    }, [name, num]);
    return <div id="bookManage">
        <h1>图书管理系统</h1>
        <div className="content">
                <CreateBookModal isOpen={isCreateBookModalOpen} handleClose={() => {
                    setCreateBookModalOpen(false);
                    setNum(Math.random() * 1000);
                }}></CreateBookModal>
                <UpdateBookModal id={updateId} isOpen={isUpdateBookModalOpen} handleClose={() => {
                    setUpdateBookModalOpen(false);
                    setNum(Math.random() * 1000);
                }}></UpdateBookModal>

            <div className='book-search'>
                <Form
                    name="search"
                    layout='inline'
                    colon={false}
                    onFinish={searchBook}
                >
                    <Form.Item label="图书名称" name="name">
                        <Input />
                    </Form.Item>
                    <Form.Item label=" ">
                        <Button type="primary" htmlType="submit">
                            搜索图书
                        </Button>
                        <Button onClick={() => setCreateBookModalOpen(true)} type="primary" htmlType="submit" style={{background: 'green'}} >
                            添加图书
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <div className="book-list">
                {
                    bookList.map(book => {
                        return <Card
                            className='card'
                            hoverable
                            style={{ width: 300 }}
                            cover={<img alt="example" src={`http://localhost:3000/${book.cover}`} />}
                        >
                            <h2>{book.name}</h2>
                            <div>{book.author}</div>
                            <div className='links'>
                                <a href="#">详情</a>
                                <a href="#" onClick={() => {
                                    setUpdateId(book.id);
                                    setUpdateBookModalOpen(true);
                                }}>编辑</a>
                                <a href="#" onClick={() => handleDelete(book.id)}>删除</a>
                            </div>
                        </Card>
                    })
                }    
            </div>
        </div>
    </div>
}