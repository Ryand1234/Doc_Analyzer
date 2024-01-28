"use client";
import Image from 'next/image'
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
const { Dragger } = Upload;
import {Info} from '../interface/chat-interface'
import logo from '../../public/home-screen-1.png'
import './new-chat.css'
const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: '/api/upload',
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


export default function NewChat({setMessages}: any) {
    return (
        <div className='new-chat'>
            <Image className='new-chat-image' alt="logo" width={150} height={150} src={logo} />

            <Dragger {...props}
            onChange={(info) =>{
                const { status } = info.file;
                if (status !== 'uploading') {
                    // console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    // console.log(info.file)
                    setMessages((prevMessages: Array<Info>) => [
                        ...prevMessages,
                        {
                          user: "User",
                          hide: true,
                          message: `Here is the document content, ${info.file.response.content}.`
                        }
                      ]);
                    message.success(`${info.file.name} file uploaded successfully.`);
                } else if (status === 'error') {
                    message.error(`${info.file.name} file upload failed.`);
                }
            }}>
                <p className="ant-upload-drag-icon">
                    <InboxOutlined />
                </p>
                <p className="ant-upload-text">Click or drag file to this area to upload</p>
                <p className="ant-upload-hint">
                    Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                    banned files.
                </p>
            </Dragger>
        </div>
    )
}
