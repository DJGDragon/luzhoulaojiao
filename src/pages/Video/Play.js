import React, { Component, Fragment,PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import { Button, Icon, Card } from 'antd';
import Result from '@/components/Result';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
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
class Play extends Component {
  componentDidMount() {
    // subscribe state change
    this.player.subscribeToStateChange(this.handleStateChange.bind(this));
  }
  
  handleStateChange(state, prevState) {
    // copy player state to this component's state
    this.setState({
      player: state,
      currentTime: state.currentTime
    });
  }
  



  render() {
   
    return (
    <Fragment>
        <div style={{ width: '100vw', height: 'calc(100vh - 50px)',margin:'-24px'}}>
        {/* <Player

                   playsInline

                       src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"

               /> */}
          <Player
          fluid={false}
          // width={'100%'}
          height={'100%'}
            ref={c => {
              this.player = c;
            }}
            // poster="https://video-react.js.org/assets/poster.png"
          >
            <source
              src={path}
              type="video/mp4"
            />
            <ControlBar autoHide={false} disableDefaultControls={false}>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <PlayToggle />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton rates={[5, 2, 1.5, 1, 0.5]} order={7.1} />
              <VolumeMenuButton />
            </ControlBar>
          </Player>
        </div>
      </Fragment>
    );
  }
}

export default Play;
