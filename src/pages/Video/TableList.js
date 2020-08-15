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

import styles from './TableList.less';
import UploadForm from './UploadForm';
import PreviewForm from './PreviewForm';

const FormItem = Form.Item;
const { Step } = Steps;
const { TextArea } = Input;
const { Option } = Select;
const RadioGroup = Radio.Group;


/* eslint react/no-multi-comp:0 */
@connect(({ video, loading }) => ({
  video,
  loading: loading.models.video,
}))
@Form.create()
class TableList extends PureComponent {
  state = {
    modalVisible: false,
    updateModalVisible: false,
    expandForm: false,
    selectedRows: [],
    formValues: {},
    PreviewVideo: {},
  };
  params={
    currentPage: 1,
    pageSize: 10,
  }

  columns = [
    {
      title: '视频序列号',
      dataIndex: 'order',
    },
    {
      title: '视频名称',
      dataIndex: 'name',
    },
    {
      title: '视频时长',
      dataIndex: 'duration',
    },
    {
      title: '上传时间',
      dataIndex: 'upload_time',
    },
    {
      title: '操作',
      render: (text, record) => (
        <Fragment>
          <a onClick={() => this.handlePreviewModalVisible(true, record)}>预览</a>
          <Divider type="vertical" />
          <a onClick={() => this.handleModalVisible(true,record)}>编辑</a>
          <Divider type="vertical" />
          <a onClick={() => this.deleteItem(record)}>删除</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'video/fetch',
      payload: this.params,
    });
  }

  handleStandardTableChange = (pagination) => {
    const { dispatch } = this.props;
    this.params = {
      currentPage: pagination.current,
      pageSize: pagination.pageSize,
    };
    dispatch({
      type: 'video/fetch',
      payload: this.params,
    });
  };

  reLoad = () => {
    const { form, dispatch } = this.props;
    dispatch({
      type: 'video/fetch',
      payload: this.params,
    });
  };
  deleteItem = (item) => {
    const { dispatch, form } = this.props;
    const { selectedRows } = this.state;
    const values = item.id?[item]:selectedRows

    Modal.confirm({
      title: '删除视频',
      content: '确认删除所选视频吗？确认后无法恢复！',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'video/delete',
          payload: {values,...this.params},
          callback: response => {
            message[response.msgType](response.msg);
            if (response.success) {
              this.cleanSelectedRows();
            }
          },
        });
      },
    });
  };
  empty = () => {
    const { dispatch, form } = this.props;
    Modal.confirm({
      title: '清空视频',
      content: '确认清空所有视频吗？确认后无法恢复！请谨慎操作！',
      okText: '确定',
      cancelText: '取消',
      onOk: () => {
        dispatch({
          type: 'video/empty',
          payload: this.params,
          callback: response => {
            message[response.msgType](response.msg);
            if (response.success) {
              this.cleanSelectedRows();
            }
          },
        });
      },
    });
  };

  handleSelectRows = rows => {
    this.setState({
      selectedRows: rows,
    });
  };
  cleanSelectedRows = () => {
    this.setState({
      selectedRows: [],
    });
  };

  handleModalVisible = (flag,item) => {
    this.setState({
      modalVisible: !!flag,
      formValues: item,
    });
  };

  handlePreviewModalVisible = (flag, record) => {
    this.setState({
      updateModalVisible: !!flag,
      PreviewVideo: record || {},
    });
  };

  handleSubmit = fieldsValue => {
    const { dispatch } = this.props;
    dispatch({
      type: 'video/submit',
      payload: {
        ...this.params,
        ...fieldsValue
      },
    });
    message[response.msgType](response.msg);
    this.handleModalVisible();
  };

  // handleUpdate = fieldsValue => {
  //   const { dispatch } = this.props;
  //   dispatch({
  //     type: 'video/submit',
  //     payload: {
  //       name: fields.name,
  //       desc: fields.desc,
  //       key: fields.key,
  //     },
  //   });

  //   message.success('配置成功');
  //   this.handlePreviewModalVisible();
  // };

  render() {
    const {
      video: { data },
      loading,
    } = this.props;
    const { selectedRows, modalVisible, updateModalVisible, PreviewVideo, formValues } = this.state;

    const parentMethods = {
      handleSubmit: this.handleSubmit,
      handleModalVisible: this.handleModalVisible,
    };
    const previewMethods = {
      handlePreviewModalVisible: this.handlePreviewModalVisible,
      handlePreview: this.handlePreview,
    };
    return (
      <Fragment >
        <Card bordered={false}>
          <div className={styles.tableList}>
            <div className={styles.tableListOperator}>
              <Button type="primary" onClick={() => this.handleModalVisible(true)}>
                上传
              </Button>
              {selectedRows.length > 0 && (
                <span>
                  <Button type="primary" onClick={() => this.handlePreviewModalVisible(true,selectedRows)}>视频播放预览</Button>
                </span>
              )}
              <Button onClick={this.reLoad}>刷新</Button>
              <Button onClick={this.empty}>清空</Button>
            </div>
            <StandardTable
              selectedRows={selectedRows}
              loading={loading}
              data={data}
              columns={this.columns}
              onSelectRow={this.handleSelectRows}
              onChange={this.handleStandardTableChange}
              deleteItem={this.deleteItem}

            />
          </div>
        </Card>
        <UploadForm {...parentMethods} modalVisible={modalVisible} formValues={formValues} />
        {updateModalVisible&&<PreviewForm
          {...previewMethods}
          updateModalVisible={updateModalVisible}
          values={PreviewVideo}
        />}
      </Fragment>
    );
  }
}

export default TableList;
