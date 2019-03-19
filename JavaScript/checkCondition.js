
/**
* 给 on（check_func，matched_run_this_func）
* .otherwise(run_this_if_no_match)
*
*/


const matched = x => ({
  on: () => matched(x),
  otherwise: () => x
});

const match = x => ({
  on: (pred, fn) => (pred(x) ? matched(fn(x)) : match(x)),
  otherwise: fn => fn(x)
});

const a = match(50)
  .on(x => x < 100, () => 0)
  .on(x => x > 100, () => 1)
  .otherwise(x => x + 100);

console.log(a);


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

//Save conditions to Object. 

const actions = {
    '1': ['processing', 'IndexPage'],
    '2': ['fail', 'FailPage'],
    '3': ['fail', 'FailPage'],
    '4': ['success', 'SuccessPage'],
    '5': ['cancel', 'CancelPage'],
    'default': ['other', 'Index'],
}

const onButtonClick = (status) => {
    let action = actions[status] || actions['default'],
        logName = action[0],
        pageName = action[1]
    sendLog(logName)
    jumpTo(pageName)
}


/**
 * Save conditions to Map. 
 * Map is a array of key-value pairs.
 * 
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map
 * 
 * Map.prototype.get(key)
 * Returns the value associated to the key, or undefined if there is none.
*/

const actions = new Map([
    [1, ['processing', 'IndexPage']],
    [2, ['fail', 'FailPage']],
    [3, ['fail', 'FailPage']],
    [4, ['success', 'SuccessPage']],
    [5, ['cancel', 'CancelPage']],
    ['default', ['other', 'Index']]
])

const onButtonClick = (status) => {
    let action = actions.get(status) || actions.get('default')
    sendLog(action[0])
    jumpTo(action[1])
}


/**
 * 按钮点击事件
 * @param {number} status 活动状态：1开团进行中 2开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 * @param {string} identity 身份标识：guest客态 master主态
 */
const onButtonClick = (status, identity) => {
    if (identity == 'guest') {
        if (status == 1) {
            //do sth
        } else if (status == 2) {
            //do sth
        } else if (status == 3) {
            //do sth
        } else if (status == 4) {
            //do sth
        } else if (status == 5) {
            //do sth
        } else {
            //do sth
        }
    } else if (identity == 'master') {
        if (status == 1) {
            //do sth
        } else if (status == 2) {
            //do sth
        } else if (status == 3) {
            //do sth
        } else if (status == 4) {
            //do sth
        } else if (status == 5) {
            //do sth
        } else {
            //do sth
        }
    }
}

/**
 * approach with Map object. 
 * 
 * action.call(this)
 */
const actions = new Map([
    ['guest_1', () => { /*do sth*/ }],
    ['guest_2', () => { /*do sth*/ }],
    ['guest_3', () => { /*do sth*/ }],
    ['guest_4', () => { /*do sth*/ }],
    ['guest_5', () => { /*do sth*/ }],
    ['master_1', () => { /*do sth*/ }],
    ['master_2', () => { /*do sth*/ }],
    ['master_3', () => { /*do sth*/ }],
    ['master_4', () => { /*do sth*/ }],
    ['master_5', () => { /*do sth*/ }],
    ['default', () => { /*do sth*/ }],
])

/**
 * 按钮点击事件
 * @param {string} identity 身份标识：guest客态 master主态
 * @param {number} status 活动状态：1 开团进行中 2 开团失败 3 开团成功 4 商品售罄 5 有库存未开团
 */
const onButtonClick = (identity, status) => {
    let action = actions.get(`${identity}_${status}`) || actions.get('default')
    action.call(this)
}
