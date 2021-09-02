/*
 * @Author: your name
 * @Date: 2021-06-28 11:36:37
 * @LastEditTime: 2021-06-30 14:01:10
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \answer\api\index.js
 */
import fly from '../utils/instance'
export default {
    // 登录获取登录token
    wx_mini_login(params) {
        return fly({
            url: `wx_mini_login`,
            method: 'post',
            params,
            noToastError: true
        })
    },
    // 获取答题分类
    get_class(params) {
        return fly({
            url: `get_class`,
            method: 'post',
            params
        })
    },
    // 绑定手机号
    postPhone(params) {
        return fly({
            url: `buildPhone`,
            method: 'post',
            params
        })
    },

    // 获取用户信息
    getUserInfo(params) {
        return fly({
            url: `getUserInfo`,
            method: 'get',
            params
        })

    },
    // 修改用户信息
    editUserInfo(params) {
        return fly({
            url: `editUserInfo`,
            method: 'post',
            data
        })
    },
    // 修改用户信息
    editUserInfo(params) {
        return fly({
            url: `editUserInfo`,
            method: 'post',
            params
        })
    },
    // 辅料信息
    fuliaoinfo(params) {
        return fly({
            url: `fuliaoinfo`,
            method: 'post',
            params
        })
    },
    // 辅料入库
    fuliaoSave(params) {
        return fly({
            url: `fuliaoSave`,
            method: 'post',
            params
        })
    },
    // 辅料出库
    fuliaoOut(params) {
        return fly({
            isThree: true,
            url: `fuliaoOut`,
            method: 'post',
            params
        })
    },

    // 订单入库
    saveOrder(params) {
        return fly({
            url: `saveOrder`,
            method: 'post',
            params
        })
    },

    //成品出库
    sendOrder(params) {
        return fly({
            isThree: true,
            url: `sendOrder`,
            method: 'post',
            params
        })
    },
    //余料入库
    surplusSave(params) {
        return fly({
            url: `surplusSave`,
            method: 'post',
            params
        })
    },
    //原料列表
    materialList(params) {
        return fly({
            url: `materialList`,
            method: 'get',
            // params
        })
    },
    // 员工产量登记
    staff_wages(params) {
        return fly({
            url: `staff_wages`,
            method: 'post',
            params
        })
    },
    // 工位列表
    getStationList(){
        return fly({
            url: `getStationList`,
            method: 'get',
            // params
        })
    },
    // 员工列表
    staff_list(params) {
        return fly({
            url: `staff_list`,
            method: 'get',
            // params
        })
    },

    // 获取订单号
    getOrderList(params) {
        return fly({
            url: `getOrderList`,
            method: 'get',
            // params
        })
    },
    // 获取订单详情
    getOrderInfo(params) {
        return fly({
            url: `getOrderInfo`,
            method: 'post',
            params
        })
    },
    // 原料入库
    materialSave(params) {
        return fly({
            url: `materialSave`,
            method: 'post',
            params
        })
    },
    
        // 五金列表
        haedwareList(params) {
            return fly({
                url: `haedwareList`,
                method: 'get',
                params
            })
        },
        // 原料出库
        materialOut(params) {
            return fly({
                url: `materialOut`,
                method: 'post',
                params
            })
        },
    // 人员提交
    staff_wages(params) {
        return fly({
            url: `staff_wages`,
            method: 'post',
            params
        })
    },
    // 获取订单下辅料列表
    getOrderSlaveList(params) {
        return fly({
            url: `getOrderSlaveList`,
            method: 'post',
            params
        })
    },
    // 五金出库
    hardwareOut(params) {
        return fly({
            url: `hardwareOut`,
            method: 'post',
            params
        })
    },
        // 五金入库
        hardwareSave(params) {
            return fly({
                url: `hardwareSave`,
                method: 'post',
                params
            })
        },
    



}