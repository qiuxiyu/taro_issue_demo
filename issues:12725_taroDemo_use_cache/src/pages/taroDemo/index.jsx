import React from 'react'
import { CustomWrapper,View, Text } from '@tarojs/components'
import './index.scss'

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount () {
  }

  render () {
    return (
      <View className='index'>
        <Text>Hello, world!</Text>
        <CustomWrapper>
          <Text>Hello, CustomWrapper!</Text>
        </CustomWrapper>
      </View>
    )
  }
}
