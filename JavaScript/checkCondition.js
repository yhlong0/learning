/**
 * 按钮点击事件
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 商品售罄 4 开团成功 5 系统取消
 */
const onButtonClick = (status) => {
    if (status == 1) {
        sendLog('processing') 
        jumpTo('IndexPage')
    } else if (status == 2) {
        sendLog('fail') 
        jumpTo('FailPage')
    } else if (status == 3) {
        sendLog('fail') 
        jumpTo('FailPage')
    } else if (status == 4) {
        sendLog('success') 
        jumpTo('SuccessPage')
    } else if (status == 5) {
        sendLog('cancel') 
        jumpTo('CancelPage')
    } else {
        sendLog('other') 
        jumpTo('Index')
    }
}


const onButtonClick = (status) => {
    switch (status) {
        case 1:
            sendLog('processing')
            jumpTo('IndexPage')
            break
        case 2:
        case 3:
            sendLog('fail')
            jumpTo('FailPage')
            break
        case 4:
            sendLog('success')
            jumpTo('SuccessPage')
            break
        case 5:
            sendLog('cancel')
            jumpTo('CancelPage')
            break
        default:
            sendLog('other')
            jumpTo('Index')
            break
    }
}