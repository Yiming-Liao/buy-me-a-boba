const formatTime = (isoString) => {

    // 將 ISO 字串轉換為 Date 物件
    const date = new Date(isoString);

    // 使用 Intl.DateTimeFormat 來格式化日期，並指定時區為 'Asia/Taipei'
    const formatter = new Intl.DateTimeFormat('zh-TW', {
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        timeZone: 'Asia/Taipei'
    });

    // 格式化日期
    return formatter.format(date);

}
export default formatTime


