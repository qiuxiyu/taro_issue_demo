import React from 'react'
import { View } from '@tarojs/components'
import "./index.scss";

export default class Index extends React.Component {
  constructor() {
    super();
    this.state = {
      fText: "default fText"
    }
    this.count = 1;
  }
  componentDidMount () {
    // logRaw()
    console.log(1111111);
  }
  render () {
    return (
      <View className='index'>
        123
        <React.Fragment>test fText</React.Fragment>
        <React.Fragment>{this.fText}</React.Fragment>
      </View>
    )
  }
}
