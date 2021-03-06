/** react 组建的引用 */
import React, {Component} from "react";
import {
  StyleSheet, Text, View, ScrollView, Image, FlatList,
} from "react-native";

/** 全局样式的引用 */
import {Layout} from "../../../styles/layout";
import {Size} from "../../../styles/size";

/** 第三方依赖库的引用 */

/** 自定义组建的引用 */
import CNavigation from '../../../components/CNavigation';
import CGradientButton from '../../../components/CGradientButton';


/** 页面的引入 */

/** 工具类的引用 */
import StorageData from '../../../store/storageData';
import {Util} from '../../../utils/util';

/** 常量声明 */

class LoanDetailListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      item: props.item
    };
  }

  render() {
    const {item} = this.state
    return (
      <View style={{
        backgroundColor: Layout.color.white_bg,
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 12,
        height: 60,
        borderBottomColor: Layout.color.gray_line,
        borderBottomWidth: Size.screen.pixel,
        flexDirection: 'row'
      }}>

        <View style={{
          justifyContent: 'center',
          borderRightWidth: Size.screen.pixel,
          borderRightColor: Layout.color.gray_line,
          height: '100%',
          width: 48,
        }}>
          <View style={{
            backgroundColor: 'rgba(0,0,0,0.2)',
            width: 34,
            height: 34,
            borderRadius: 17,
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <Text style={{color: Layout.color.white_bg, fontSize: 14}}>
              {`${item.phaseNum}期`}
            </Text>
          </View>

        </View>

        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: 1,
          paddingLeft: 12
        }}>
          <View>
            <Text style={{color: Layout.color.wgray_main, fontSize: 16}}>
              { `￥${Util.toThousands(item.repaidAmount)}`}
              </Text>
            <Text style={{color: Layout.color.wgray_main, fontSize: 14}}>
              {item.state === 0 ? '待还款' : item.state === 1 ? '已逾期' + item.overdueDays + '天' : item.state === 2 ? '已结清' : '本期还款'}
              </Text>
          </View>
          <View style={{flexDirection: 'row',}}>
            <Text>{Util.formatDate(item.dueDate ,'m月d日')}</Text>
            <Image style={{width: 14, height: 14}}
                   source={require('../../../images/common/common_img_arrow.png')}/>
          </View>
        </View>

      </View>
    )
  }
}

export default class LoanDetail extends Component {

  constructor(props) {
    super(props);
    this.state = {
      loanDetail: {
        repaymentPlan: []
      }
    };
  }

  componentDidMount() {
  }

  componentWillMount() {
    StorageData.getData('loanDetail').then(res => {
      if (res) {
        this.setState({loanDetail: res})
      }
    })
  }

  componentWillUnmount() {
  }

  componentWillReceiveProps(nextProps, nextState) {
  }

  shouldComponentUpdate(nextProps) {
    return true
  }

  _keyExtractor = (item, index) => index + '';

  _renderItem = (item, index) => {
    return <LoanDetailListItem item={item}/>
  }

  render() {
    let {loanDetail} = this.state
    return (
      <CNavigation
        leftButton={{
          isShowTitle: false,
          isShowIcon: true,
        }}
        rightButton={{
          isShowTitle: true,
          title: '更多详情',
          handle: () => this.props.navigation.navigate('MoreDetail'),
        }}
        centerTitle={{
          title: '借款详情',
          titleStyle: {
            fontSize: 18,
            fontWeight: 'bold',
          }
        }}
        isSafeAreaBottom={false}
      >
        <ScrollView style={styles.container}
                    scrollEventThrottle={16}
                    contentContainerStyle={{paddingBottom: Util.isIPhoneX() ? 74 : 44}}
                    showsVerticalScrollIndicator={false}
        >
          <View style={styles.headWrapper}>
            <Text style={{fontSize: 13, color: Layout.color.wgray_bar}}>
              {`${Util.formatDate(loanDetail.releaseTime, 'm月d日 HH:MM:ss')} 借款(元)`}
            </Text>
            <Text style={{fontSize: 40, color: Layout.color.black,}}>
              {Util.toThousands(loanDetail.amount)}
            </Text>
            <View style={{flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center', marginTop: 33}}>
              <View style={{alignItems: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    fontSize: 13,
                    color: Layout.color.wgray_bar,
                    marginRight: 5,
                    marginBottom: 3
                  }}>{'应还合计(元)'}</Text>
                  <Image style={{width: 12, height: 12}}
                         source={require('../../../images/me/loan/loan_img_details.png')}/>
                </View>
                <Text style={{color: Layout.color.black, fontSize: 16}}>
                  {Util.toThousands(loanDetail.shouldRepayAmount)}
                </Text>
              </View>

              <View style={{
                alignItems: 'center',
                borderLeftWidth: Size.screen.pixel,
                borderRightWidth: Size.screen.pixel,
                borderLeftColor: Layout.color.gray_line,
                borderRightColor: Layout.color.gray_line,
                flex: 1
              }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    fontSize: 13,
                    color: Layout.color.wgray_bar,
                    marginRight: 5,
                    marginBottom: 3
                  }}>{'待还期数(期)'}</Text>
                </View>
                {
                  <Text style={{color: Layout.color.black, fontSize: 16}}>
                    {loanDetail.term}
                  </Text>
                }
              </View>

              <View style={{alignItems: 'center', flex: 1}}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={{
                    fontSize: 13,
                    color: Layout.color.wgray_bar,
                    marginRight: 5,
                    marginBottom: 3
                  }}>{'待还合计(元)'}</Text>
                </View>
                <Text style={{color: Layout.color.black, fontSize: 16}}>
                  {loanDetail.repaidAmount}
                </Text>
              </View>
            </View>
          </View>

          <View style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: Layout.color.white_bg,
            height: 44,
            paddingHorizontal: 12,
            borderBottomWidth: Size.screen.pixel,
            borderBottomColor: Layout.color.gray_line
          }}>
            <Text style={{fontSize: 16, color: Layout.color.black}}>{'还款计划'}</Text>
            <Text style={{fontSize: 14, color: Layout.color.wgray_bar}}>{'你有逾期请尽快还款'}</Text>
          </View>

          <FlatList
            data={loanDetail.repaymentPlan}
            keyExtractor={this._keyExtractor}
            renderItem={({item}) => this._renderItem(item)}
            onEndReachedThreshold={0.01}
            onEndReached={this._onEndReached}
          />

        </ScrollView>

        <View style={{position: 'absolute', bottom: 0}}>
          <CGradientButton
            isGradientButton={true}
            gradientType={'btn_bottom'}
            contentText={'结清借款(560.31元)'}
            contentTextStyle={{
              color: Layout.color.white_bg,
              fontSize: 17,
            }}
          />
        </View>
      </CNavigation>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Layout.color.gray_line,
  },
  headWrapper: {
    paddingBottom: 24,
    paddingTop: 20,
    marginBottom: 26,
    backgroundColor: Layout.color.white_bg,
    alignItems: 'center',
    paddingHorizontal: 12,
  }
});