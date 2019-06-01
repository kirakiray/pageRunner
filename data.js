define({
    "animation": [{
        "type": "animeIn",
        "name": "animate_fade_in",
        "animateId": "animate_fade_in",
        "animation": {
            "from": {
                "opacity": 0
            },
            "to": {
                "opacity": 1,
                "transform": ""
            }
        }
    }, {
        "type": "animeIn",
        "name": "animate_left_fade_move_in",
        "animateId": "animate_left_fade_move_in",
        "animation": {
            "from": {
                "opacity": 0,
                "transform": {
                    "translateX": "-100%"
                }
            },
            "to": {
                "opacity": 1,
                "transform": ""
            }
        }
    }, {
        "type": "animeIn",
        "name": "animate_right_fade_move_in",
        "animateId": "animate_right_fade_move_in",
        "animation": {
            "from": {
                "opacity": 0,
                "transform": {
                    "translateX": "100%"
                }
            },
            "to": {
                "opacity": 1,
                "transform": ""
            }
        }
    }, {
        "type": "animeIn",
        "name": "animate_bottom_fade_move_in",
        "animateId": "animate_bottom_fade_move_in",
        "animation": {
            "from": {
                "opacity": 0,
                "transform": {
                    "translateY": "100%"
                }
            },
            "to": {
                "opacity": 1,
                "transform": ""
            }
        }
    }, {
        "type": "animeIn",
        "name": "animate_bottom_fade_30pxmove_in",
        "animateId": "animate_bottom_fade_30pxmove_in",
        "animation": {
            "from": {
                "opacity": 0,
                "transform": {
                    "translateY": "30px"
                }
            },
            "to": {
                "opacity": 1,
                "transform": ""
            }
        }
    }, {
        "type": "animeIn",
        "name": "animate_top_fade_30pxmove_in",
        "animateId": "animate_top_fade_30pxmove_in",
        "animation": {
            "from": {
                "opacity": 0,
                "transform": {
                    "translateY": "-30px"
                }
            },
            "to": {
                "opacity": 1,
                "transform": ""
            }
        }
    }, {
        "type": "animeIn",
        "name": "animate_rotate6to9fade_in",
        "animateId": "animate_rotate6to9fade_in",
        "animation": {
            "0": {
                "transform-origin": "100% 50% 0",
                "opacity": 0,
                "transform": {
                    "rotate": "-90deg"
                }
            },
            "100": {
                "transform-origin": "100% 50% 0",
                "opacity": 1,
                "transform": {
                    "rotate": "0deg"
                }
            }
        }
    }, {
        "type": "animeOut",
        "name": "animate_top_fade_move_out",
        "animateId": "animate_top_fade_move_out",
        "animation": {
            "from": {
                "opacity": 1,
                "transform": ""
            },
            "to": {
                "opacity": 0,
                "transform": {
                    "translateY": "-100%"
                }
            }
        }
    }, {
        "type": "animeOut",
        "name": "animate_rotateXfade1_out",
        "animateId": "animate_rotateXfade1_out",
        "animation": {
            "0": {
                "transform-origin": "0% 50% 0",
                "transform": {
                    "perspective": "100px",
                    "rotateY": "0deg"
                }
            },
            "100": {
                "transform-origin": "0% 50% 0",
                "transform": {
                    "perspective": "100px",
                    "rotateY": "90deg"
                }
            }
        }
    }],
    "mainPage": {
        "0": {
            "0": {
                "tag": "text",
                "pname": "",
                "intext": "",
                "animateIn": "animate_fade_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 0,
                "preview": 1,
                "target": "screen",
                "hor": "start",
                "ver": "center",
                "x": "0.000%",
                "y": "-0.139%",
                "w": "50.000%",
                "h": "100.000%",
                "fontSize": "2.377bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0em",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "background-image": "",
                "background-color": "#000000",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 0,
                "locksize": 1,
                "xvele": 1,
                "selected": 0,
                "inName": "空",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "1": {
                "tag": "pic",
                "pname": "index_summary",
                "selected": 0,
                "layerele": "",
                "picUrl": "source/img_1558880538659.png",
                "picWidth": 1141,
                "picHeight": 1212,
                "animateIn": "animate_fade_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 0.5,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "0.078%",
                "y": "11.250%",
                "w": "27.344%",
                "h": "106.000bw",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "xvele": 1,
                "textAlign": "",
                "textDecoration": "",
                "fontStyle": "",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "2": {
                "tag": "text",
                "pname": "redmi",
                "intext": "redmi",
                "animateIn": "animate_left_fade_move_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 1,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "-4.766%",
                "y": "-25.278%",
                "w": "14.063%",
                "h": "61.667bw",
                "fontSize": "20.258bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0em",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#ffffff",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "xvele": 1,
                "selected": 0,
                "inName": "redmi",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "3": {
                "tag": "text",
                "pname": "你值得拥有",
                "intext": "你值得拥有",
                "animateIn": "animate_right_fade_move_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 1.5,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "9.609%",
                "y": "-25.278%",
                "w": "18.281%",
                "h": "45.494bw",
                "fontSize": "13.155bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0em",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "xvele": 1,
                "selected": 0,
                "inName": "你值得拥有",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "tag": "page",
            "pname": "page1",
            "selected": 0,
            "layerele": "",
            "pageIn": "animate_fade_in",
            "pageOut": "animate_top_fade_move_out",
            "removeInOpa": false,
            "removeOutOpa": false,
            "background-image": "",
            "background-color": "",
            "background-size": "",
            "background-position": "",
            "background-repeat": "",
            "xvele": 1,
            "target": "",
            "textAlign": "",
            "textDecoration": "",
            "fontStyle": "",
            "runAnime": false,
            "runOutAnime": 0
        },
        "1": {
            "0": {
                "tag": "pic",
                "pname": "download",
                "picUrl": "source/img_1558880538631.png",
                "picWidth": 1445,
                "picHeight": 629,
                "animateIn": "animate_bottom_fade_30pxmove_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 0,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "-0.078%",
                "y": "-19.028%",
                "w": "47.188%",
                "h": "43.53bw",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "selected": 0,
                "xvele": 1,
                "textAlign": "",
                "textDecoration": "",
                "fontStyle": "",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "1": {
                "tag": "text",
                "pname": "小米首款 20W 无...",
                "intext": "小米首款 20W 无线闪充\n提速 37%，充电超级快！",
                "animateIn": "animate_top_fade_30pxmove_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 0,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "-10.313%",
                "y": "31.667%",
                "w": "29.297%",
                "h": "29.067bw",
                "fontSize": "7.843bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0em",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "xvele": 1,
                "selected": 0,
                "inName": "小米首款 20W 无...",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "2": {
                "tag": "text",
                "pname": "“放上去，就充电”很...",
                "intext": "“放上去，就充电”很方便，漫长的充电等待却让人望而却步。小米9 创新性地提高功率，将以往\n数小时的时间，提速至 90 分钟充满，这个速度与小米8 的有线快充一致。有线充电同步提速，\n27W 功率 60 分钟充满*。",
                "animateIn": "animate_rotate6to9fade_in",
                "animateOut": "",
                "animateInTime": 0.5,
                "animateOutTime": 0,
                "animateInDelay": 0,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "2.578%",
                "y": "15.000%",
                "w": "55.391%",
                "h": "13.399bw",
                "fontSize": "2.257bw",
                "lineHeight": "1.6em",
                "letterSpacing": "0em",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "xvele": 1,
                "selected": 0,
                "inName": "“放上去，就充电”很...",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "tag": "page",
            "pname": "page2",
            "xvele": 1,
            "pageIn": "animate_bottom_fade_move_in",
            "pageOut": "animate_rotateXfade1_out",
            "removeInOpa": false,
            "removeOutOpa": false,
            "background-image": "",
            "background-color": "#e5e5e5",
            "background-size": "",
            "background-position": "",
            "background-repeat": "",
            "selected": 1,
            "target": "",
            "textAlign": "",
            "textDecoration": "",
            "fontStyle": "",
            "runAnime": false,
            "runOutAnime": 0
        },
        "2": {
            "0": {
                "tag": "pic",
                "pname": "download-1",
                "picUrl": "source/img_1558880538634.png",
                "picWidth": 1061,
                "picHeight": 427,
                "animateIn": "animate_bottom_fade_30pxmove_in",
                "animateOut": "",
                "animateInTime": "0.5",
                "animateOutTime": 0,
                "animateInDelay": 0,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "-0.078%",
                "y": "0.417%",
                "w": "63.672%",
                "h": "40.137bw",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 1,
                "locksize": 1,
                "selected": 0,
                "xvele": 1,
                "textAlign": "",
                "textDecoration": "",
                "fontStyle": "",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "tag": "page",
            "pname": "page3",
            "xvele": 1,
            "pageIn": "animate_bottom_fade_move_in",
            "pageOut": "animate_top_fade_move_out",
            "removeInOpa": false,
            "removeOutOpa": false,
            "background-image": "",
            "background-color": "",
            "background-size": "",
            "background-position": "",
            "background-repeat": "",
            "selected": 0,
            "target": "",
            "textAlign": "",
            "textDecoration": "",
            "fontStyle": "",
            "runAnime": false,
            "runOutAnime": 0
        },
        "3": {
            "0": {
                "tag": "text",
                "pname": "我是标题",
                "intext": "我是标题",
                "animateIn": "",
                "animateOut": "",
                "animateInTime": 0,
                "animateOutTime": 0,
                "animateInDelay": 0,
                "preview": 1,
                "target": "safe",
                "hor": "center",
                "ver": "center",
                "x": "0px",
                "y": "0px",
                "w": "200px",
                "h": "160px",
                "fontSize": "16px",
                "lineHeight": "1.6em",
                "letterSpacing": "0em",
                "textAlign": "left",
                "textDecoration": "none",
                "fontWeight": "normal",
                "fontStyle": "normal",
                "color": "#000000",
                "background-image": "",
                "background-color": "",
                "background-size": "",
                "background-position": "",
                "background-repeat": "",
                "lockbox": 0,
                "locksize": 0,
                "xvele": 1,
                "selected": 0,
                "inName": "我是标题",
                "runAnime": 0,
                "runOutAnime": 0
            },
            "tag": "page",
            "pname": "page4",
            "xvele": 1,
            "pageIn": "animate_bottom_fade_move_in",
            "pageOut": "animate_top_fade_move_out",
            "removeInOpa": false,
            "removeOutOpa": false,
            "background-image": "",
            "background-color": "",
            "background-size": "",
            "background-position": "",
            "background-repeat": "",
            "selected": 0,
            "runAnime": false,
            "runOutAnime": 0
        },
        "w": "1280px",
        "h": "720px",
        "inselected": "",
        "pageType": "mainPage",
        "type": "h5",
        "width": 1280,
        "height": 720
    }
})