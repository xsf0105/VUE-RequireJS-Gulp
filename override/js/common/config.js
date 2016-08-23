/**
 * Created by Wenwu on 6/20/2016.
 */

define(function () {
    var server_host = '/yjkj-backendInterface/v1/';
    return {
        server_host: server_host,
        // 登录页面
        login_page: 'login.html',
        // 登陆
        urlLogin: server_host + 'login.do',
        // 立即预约
        urlOrderNow: server_host + 'saveUserTestPackage.do',
        // 我的体检列表
        urlMyOrderList: server_host + 'getMySubscribeList.do',
        // 我的报告列表
        urlMyReportList: server_host + 'getMyReportList.do',
        // 套餐详情
        urlPackageDetail: server_host + 'getTestItemPackageDetail.do',
        // 检测点
        urlExampoiList: server_host + 'getActivityInfo.do',
        // 支付（套餐详情）
        urlPrepay: server_host + 'payment.do',
        // 支付（订单列表）
        urlPayOrder: server_host + 'saveUserTestPackage.do',
        // 查询支付状态
        urlOrderStatus: server_host + 'queryOrderStatus.do',
        // 退款
        urlRefund: server_host + 'refund.do',
        // 删除订单
        urlDelOrder: server_host + 'delOrder.do',
        // 报告详情
        urlReportDetail: server_host + 'getTestReportDetails.do',
        // 更新用户信息
        urlUpdateUserInfo: server_host + 'updateUserInfo.do',
        // 微信授权页面
        urlWxAuth: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx1bbea72a07ee2379&redirect_uri=http%3A%2F%2Fadmin.yjkjchina.com%2Fyjpay%2FWXOauthAPI.do&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect'
    }
});
