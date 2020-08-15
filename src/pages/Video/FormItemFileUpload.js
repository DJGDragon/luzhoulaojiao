import {
  Form,
  Upload,
  Button,
  Icon,
  message,
} from 'antd'
import React, { PureComponent, Fragment } from 'react'
import { formatMessage, FormattedMessage } from 'umi/locale'
import isEqual from 'lodash/isEqual';

const FormItem = Form.Item


class FormItemFileUpload extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      fileList: props.fileList||[],
    }
  }

  isAccept = file => {
    const {accept} = this.props
    const arr = accept.split(',')
    const suffix = file.name.substr(file.name.lastIndexOf(".")).toLowerCase()
    if (arr.indexOf(suffix)!=-1){return true}
    else return false
  };
  getValueFromEven = (e) => {
    if(e.fileList.length==0) e.file=''
    return e.file
  }
 propsUpLoad = {
  onRemove: file => {
    this.setState(state => {
      return {
        fileList: []
      }
    })
  },
  beforeUpload: file => {
    const isFormat =this.isAccept(file)
    if (!isFormat) {
      message.error(
        formatMessage({
          id: 'File type error'
        })
      )
      return false
    }

    this.setState(state => ({
      fileList: [file]
    }))
    return false
  },
  onChange: file => {
    this.setState(state => {
      const index = state.fileList.indexOf(file)
      const newFileList = state.fileList.slice(-1)
      return {
        fileList: newFileList
      }
    })
  },
}
  render () {
    const { form ,formLayout,label,keyId, accept,required=false} = this.props;
    const { getFieldDecorator } = form;
    const { fileList,files } = this.state
    const initformLayout = {
      labelCol: { span: 5 },
      wrapperCol: { span: 15 },
    };
    
    return (
      
          <FormItem {...initformLayout} {...formLayout} label={label}>
            {getFieldDecorator(keyId, {
               rules: [
                {
                  // required: fileList.length==0?required:false,
                  required: required,
                  message: '请上传视频文件',
                },
              ],
              initialValue:fileList.length==1?fileList[0].name:'',
              valuePropName: 'file',
              getValueFromEvent: this.getValueFromEven,
            })(
              <Upload 
                accept = {accept}
                fileList = {fileList||[]}
                {...this.propsUpLoad}
              >
                <Button>
                  <Icon type="upload" />
                      {formatMessage({ id: 'upload files' })}
                </Button>
              </Upload>
            )}
          </FormItem>
     
    )
  }
}

export default FormItemFileUpload
