// ==UserScript==
// @name         qB Torents Auto Resume
// @namespace    -
// @version      1.0
// @description  qBittorrent torents auto resume
// @author       Dreamray
// @match        http://127.0.0.1:60009/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let task = setInterval(qbTorentsAutoResume, 100000);
    function qbTorentsAutoResume(){
        let progress1Sum = 0,
            resumeSuccessSum = 0;
        let nowDate = new Date();
        let xhrTorrentsPaused = new XMLHttpRequest();
        xhrTorrentsPaused.open('GET', '/api/v2/torrents/info?filter=paused', true);
        xhrTorrentsPaused.send();
        xhrTorrentsPaused.onreadystatechange = function () {
            if (xhrTorrentsPaused.readyState == 4 && ((xhrTorrentsPaused.status >= 200 && xhrTorrentsPaused.status < 300) || xhrTorrentsPaused.status == 304)) {
                let pausedTorrents = JSON.parse(xhrTorrentsPaused.responseText);
                //console.log(pausedTorrents);
                for(let i=0;i<pausedTorrents.length;i++){
                    if(pausedTorrents[i].progress == 1){
                        progress1Sum+=1;
                        let xhrResume = new XMLHttpRequest();
                        xhrResume.open('GET', '/api/v2/torrents/resume?hashes=' + pausedTorrents[i].hash, true);
                        xhrResume.send();
                        xhrResume.onreadystatechange = function () {
                            if (xhrResume.readyState == 4 && ((xhrResume.status >= 200 && xhrResume.status < 300) || xhrResume.status == 304)) {
                                resumeSuccessSum+=1;
                                console.log(nowDate.toLocaleTimeString() + '：成功恢复第 ' + resumeSuccessSum + ' 个 -> ' + pausedTorrents[i].name + ' --> ' + pausedTorrents[i].tracker.split('/')[2])
                            }
                        }
                    }
                };
                if(progress1Sum > 0){
                    console.log(nowDate.toLocaleTimeString() + '：本次检查共有 ' + progress1Sum + ' 个已暂停且完成率100%的种子')
                }
            }
        }
    }
})();
