// 参数处理
module.exports.codeUrl = (url) => {
    let urlArr = url.match(/(\w)+=[%\w]+/ig);
    const json = {};
    urlArr.forEach(item => {
        let split = item.split('=');
        let [key,val] = [split[0],split[1]];
        json[key] = val;
    });
    return json;
}
exports.codeData = (data) => {
    const json = /aside\((.*)\)/ig.exec(data);
    return JSON.parse(json[1]);
}
// 搜索处理
exports.queryCode = (data) => {
    data = data.data.song;
    let list = data.list;
    let _list = [];
    const {curnum, curpage, totalnum} = data;
    let song = {curnum, curpage, totalnum};
    for (let listKey of list) {
        let {albumid, albummid, albumname, songmid, size128, size320, songname, songid} = listKey,
            singer = listKey.singer[0].name;
        let album_min = "https://y.gtimg.cn/music/photo_new/T002R90x90M000"+albummid+".jpg",
              album_big = "https://y.gtimg.cn/music/photo_new/T002R300x300M000"+albummid+".jpg";
        
        _list.push({albumid, albummid, albumname, songmid, songname, songid, singer, album_min, album_big, size128, size320});
    }
    song.data = _list;
    return song;
};

// 推荐/热歌处理
exports.codeTopId = (data) => {
    let {cur_song_num, date, update_time} = data;
    let {ListName} = data.topinfo;
    let songList = Object.assign({}, {cur_song_num, date, update_time}, {ListName});
    data = data.songlist;
    const _list = [];
    console.log(data[0])
    for (let val of data) {
        const {cur_count, albumid, albummid, size128, size320, songid, songmid, songname, songorig} = val.data,
            singer = val.data.singer[0].name;
        const album_min = "https://y.gtimg.cn/music/photo_new/T002R90x90M000"+albummid+".jpg";
        const album_big = "https://y.gtimg.cn/music/photo_new/T002R300x300M000"+albummid+".jpg"
        _list.push({cur_count, albumid, albummid, size128, size320, songid, songmid, songname, songorig, singer, album_min, album_big});
    }
    songList.songlist = _list;
    return songList;
}

// 歌词整理并解码
exports.lyrics = (data) => {
    let base64 = Buffer.from(data.lyric, 'base64').toString().split('\n');
    const list = [];
    base64.forEach(item => {
        let split = item.split(']');
        let str = item.match(/([(\w{2})])/ig);
        const second = ((str[0]+str[1])*60+(str[2]+str[3]+'.'+str[4]+str[5])*1).toFixed(1);
        const millisecond = second*1000;
        if (/\d{2,}/.test(split[0])) {
            list.push({
                millisecond,
                second,
                date: split[0].split('[')[1],
                text: split[1]
            })
        }
    })
    data.lyric = list;
    const index = list[list.length-1]
    data.duration = index.second;
    data.date = index.date;
    return data;
}
