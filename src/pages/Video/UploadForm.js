import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import moment from 'moment';
import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Select,
  Icon,
  Button,
  Dropdown,
  Menu,
  InputNumber,
  DatePicker,
  Modal,
  message,
  Badge,
  Divider,
  Steps,
  Radio,
} from 'antd';
import StandardTable from '@/components/StandardTable';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import FormItemFileUpload from './FormItemFileUpload';

import styles from './TableList.less';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;

@connect(({ video, loading }) => ({
  video,
  loading: loading.models.video,
}))
@Form.create()
class UploadForm extends PureComponent {
  static defaultProps = {
    handleUpdate: () => {},
    handlePreviewModalVisible: () => {},
    values: {},
  };
  render(){
  const { modalVisible, form, handleSubmit, handleModalVisible, formValues } = this.props;
  const okHandle = () => {
    form.validateFields((err, fieldsValue) => {
      if (err) return;
      form.resetFields();
      handleSubmit(fieldsValue);
    });
  };
  const formLayout = {
    labelCol: { span: 6,offset:3 },
    wrapperCol: { span: 10 },
  };
  return (
    <Modal
      destroyOnClose
      title="上传视频"
      visible={modalVisible}
      onOk={okHandle}
      onCancel={() => handleModalVisible()}
    >
      <Form hideRequiredMark={true} {...formLayout}>
      <FormItem label="视频序列号">
        {form.getFieldDecorator('order', {
          initialValue: formValues ? formValues.order : '',
          rules: [{ required: true, message: '请输入视频序列号'}],
        })(<InputNumber style={{width:'100%'}} placeholder="请输入" />)}
      </FormItem>
      <FormItem label="视频名称">
        {form.getFieldDecorator('name', {
          initialValue: formValues ? formValues.name : '',
          rules: [{ required: true, message: '请输入视频名称'}],
        })(<Input placeholder="请输入" />)}
      </FormItem>
      <FormItemFileUpload
        label='视频上传'
        keyId='filevideo'
        required={true}
        form={this.props.form}
        formLayout={formLayout}
        accept={'.mp4'}
        fileList={formValues?[{
          uid:1,
          name: formValues.name,
        }]:[]}
      /></Form>
    </Modal>
  );
}
}

export default UploadForm;

