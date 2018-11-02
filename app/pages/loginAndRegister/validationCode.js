/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, ScrollView, Keyboard, View,Text,Image,
} from "react-native";

/** 全局样式的引用 */

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../components/CNavigation';
import BXTextInput from '../../components/CTextInput';
import CGradientButton from '../../components/CGradientButton';

/** 高阶组件的引用 */
import HOCNavigationFocus from '../../components/HOC/HOCNavigationEvents';

/** 获取自定义的静态方法 */
import StaticPages from '../../utils/staticPage';
import {Util} from '../../utils/util';
import {bouncedUtils} from '../../utils/bouncedUtils';
import {Layout} from "../../styles/layout";
import StorageData from "../../store/storageData";

// @HOCNavigationFocus
export default class ValidationCode extends Component {
  _count = 60;
  _isAllowPress = true;
  _timer = null;

  constructor(props) {
    super(props);
    this.titleText = '输入验证码'
    this.state = {
      validationCode: '',
      disabled: true,
      getDisabled: false,
      defaultText: '获取'
    };
  }

  componentWillMount() {}

  componentDidMount() {
    if (this.props.navigation.state.params) {
      const {title} = this.props.navigation.state.params
      this.titleText = title
    }
  }

  componentWillUnmount() {
  }

  componentWillBlur() {
  }

  componentWillReceiveProps(nextProps, nextState) {}

  /** 监听用户输入 */
  _onChangeText = (val) => {
    /** 假设验证码都是 4 位数字 */
    this.state.validationCode = val
    if (val.length >= 4) {
      this.setState({disabled: false})
    }
    else if (val.length < 4) {
      this.setState({disabled: true})
    }
  }

  /** 验证验证码, 实际开发中自行获取接口, 这里为了演示效果还是前端来做校验  */
  _validationCode = () => {
    Keyboard.dismiss()
    let validateLegal = Util.checkPureNumber(this.state.validationCode)
    if (!validateLegal) {
      bouncedUtils.notices.show({
        type: 'warning', content: '验证码错误，请重新输入'
      })
      return
    }

    if (validateLegal) {
      this.props.navigation.navigate('SettingLoginPassword')
      /** 页面进行跳转之后，对数据和状态进行重置 */
      this.setState({defaultText: '获取', getDisabled: false, disabled: true})
      clearInterval(this._timer)
      this._timer = null;
      this._count = 60;
      this._isAllowPress = true;
      this.state.validationCode = ''
      this._inputInstance._inputInstance.clear()
    }
  }

  _getValidationCode = () => {
    if (this._isAllowPress) {
      this._isAllowPress = false
      this._timer = setInterval(() => {
        if (this._count > 1) {
          this._count -= 1
          this.setState({defaultText: `${this._count}"`, getDisabled: true})
        }
        else {
          this.setState({defaultText: '获取', getDisabled: false})
          this._count = 60
          this._isAllowPress = true
          clearInterval(this._timer)
          this._timer = null
        }
      }, 1000)
    }
  }

  render() {
    return (
      <CNavigation
        LeftOrRight={'left'}
        leftButton={{
          isShowIcon: true,
        }}
      >

        <ScrollView style={styles.container}
                    keyboardDismissMode={'on-drag'}
                    keyboardShouldPersistTaps={'handled'}>

          {StaticPages.validationAndSetting(this.titleText, '验证码已发送到手机158****4460')}

          <View style={{flex: 1, ...Layout.layout.ccc,}}>

            <BXTextInput
              ref = {ref => this._inputInstance = ref}
              maxLength={4}
              isButton={true}
              placeholder={'请输入验证码'}
              keyboardType={'numeric'}
              handle={this._onChangeText}
            />

            <View style={{position: 'absolute', right: 12,}}>
              <CGradientButton
                gradientType={'btn_input'}
                contentText={this.state.defaultText}
                textStyle={styles.inputButtonStyle}
                disabled={this.state.getDisabled}
                onPress={this._getValidationCode}
              />
            </View>

          </View>


          <View style={{marginTop: 40}}>
            <CGradientButton
              gradientType={'btn_l'}
              contentText={'下一步'}
              textStyle={styles.buttonStyle}
              disabled={this.state.disabled}
              onPress={this._validationCode}
            >
            </CGradientButton>
          </View>

        </ScrollView>

      </CNavigation>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 12,
  },
  buttonStyle: {
    fontSize: 17,
    color: '#fff'
  },
  inputButtonStyle: {
    fontSize: 14,
    color: '#fff'
  },
});