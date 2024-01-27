"use client";
import { InboxOutlined } from '@ant-design/icons';
import type { UploadProps } from 'antd';
import { message, Upload } from 'antd';
const { Dragger } = Upload;

const props: UploadProps = {
    name: 'file',
    multiple: false,
    action: '/api/upload',
    onDrop(e) {
        console.log('Dropped files', e.dataTransfer.files);
    },
};


export default function NewChat({setMessages}) {
    return (
        <div style={{
            height: '80vh',
        }}>
            <Dragger {...props}
            onChange={(info) =>{
                const { status } = info.file;
                if (status !== 'uploading') {
                    console.log(info.file, info.fileList);
                }
                if (status === 'done') {
                    console.log(info.file)
                    setMessages(prevMessages => [
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
