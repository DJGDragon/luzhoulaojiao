import React, { Component, Fragment,PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Icon, Card, Modal } from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Preview from './Preview'
import path from './BIGBANG.mp4'
import {
  Player,
  ControlBar,
  PlayToggle, // PlayToggle 播放/暂停按钮 若需禁止加 disabled
  ReplayControl, // 后退按钮
  ForwardControl,  // 前进按钮
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,  // 倍速播放选项
  VolumeMenuButton
} from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css"; // import css


/* eslint react/no-multi-comp:0 */
@connect(({ video, loading }) => ({
  video,
  loading: loading.models.video,
}))
class PreviewForm extends Component {




  render() {
       const { updateModalVisible, handlePreviewModalVisible, values } = this.props;

    return (
    <Fragment>
      <Modal
        width={'70vw'}
        height={'50vh'}
        title="视频预览"
        visible={updateModalVisible}
        onCancel={() => handlePreviewModalVisible(false, values)}
        afterClose={() => handlePreviewModalVisible()}
      >
        <Preview/>
      </Modal>
      </Fragment>
    );
  }
}

export default PreviewForm;
